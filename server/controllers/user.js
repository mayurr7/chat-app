import { compare } from "bcrypt";
import { User } from "../models/userSchema.js";
import { emitEvent, sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { cookieOption } from "../utils/features.js";
import { Chat } from "../models/chatSchema.js";
import { Request } from "../models/requestSchema.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { getOtherUser } from "../lib/helper.js";

//create a new user

const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;

  const avatar = {
    public_id: "dfdfds",
    url: "sdbhsd",
  };

  const user = await User.create({
    name,
    username,
    password,
    avatar,
    bio,
  });

  sendToken(res, user, 201, "User created");
};

//Login API
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return next(
        new ErrorHandler("Please provide both username and password", 400)
      );

    const user = await User.findOne({ username }).select("+password");

    if (!user)
      return next(new ErrorHandler("Invalid Username or Password", 404));

    const isMatch = await compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Username or Password", 404));

    sendToken(res, user, 200, `Welcome back ${user.name}`);
  } catch (error) {
    next(error);
  }
};

//get profile
const getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    res.status(200).json({
      status: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

//logout
const logOut = async (req, res, next) => {
  try {
    return res
      .status(200)
      .cookie("chatt-token", "", { ...cookieOption, maxAge: 0 })
      .json({
        status: true,
        message: "Logout successfully",
      });
  } catch (error) {
    next(error);
  }
};

const searchUser = async (req, res, next) => {
  try {
    const { name } = req.query;

    const myChats = await Chat.find({ groupChat: false, members: req.user });

    //All users from my chat means I chatted all people
    const allUsersFromMyChats = myChats.map((chat) => chat.members).flat();

    const allUsersExceptMeAndFriends = await User.find({
      _id: { $nin: allUsersFromMyChats },
      name: { $regex: name, $options: "i" },
    });

    const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar.url,
    }));

    return res.status(200).json({
      status: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

const sendFriendRequest = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const request = await Request.findOne({
      $or: [
        { sender: req.user, receiver: userId },
        { sender: userId, receiver: req.user },
      ],
    });

    if (request) return next(new ErrorHandler("Request already sent", 400));

    await Request.create({
      sender: req.user,
      receiver: userId,
    });

    emitEvent(req, NEW_REQUEST, [userId]);

    return res.status(200).json({
      success: true,
      message: "Friend Request Sent",
    });
  } catch (error) {
    next(error);
  }
};

const acceptFriendRequest = async (req, res, next) => {
  try {
    const { requestId, accept } = req.body;

    const request = await Request.findById(requestId)
      .populate("sender", "name")
      .populate("receiver", "name");

    if (!request) return next(new ErrorHandler("Request not found", 400));

    if (request.receiver._id.toString() !== req.user.toString())
      return next(
        new ErrorHandler("You are not authorized to accept this request", 401)
      );

    if (!accept) {
      await request.deleteOne();

      return res.status(200).json({
        success: true,
        message: "Friend Request Rejected",
      });
    }

    const members = [request.sender._id, request.receiver._id];

    await Promise.all([
      Chat.create({
        members,
        name: `${request.sender.name} - ${request.receiver.name}`,
      }),
      request.deleteOne(),
    ]);

    emitEvent(req, REFETCH_CHATS, members);

    return res.status(200).json({
      success: true,
      message: "Friend Request Accepted",
      senderId: request.sender._id,
    });
  } catch (error) {
    next(error);
  }
};

const getAllNotification = async (req, res, next) => {
  try {
    const requests = await Request.find({ receiver: req.user }).populate(
      "sender",
      "name avatar"
    );

    const allRequests = requests.map(({ _id, sender }) => ({
      _id,
      sender: {
        _id: sender._id,
        name: sender.name,
        avatar: sender.avatar.url,
      },
    }));

    return res.status(200).json({
      status: true,
      allRequests,
    });
  } catch (error) {
    next(error);
  }
};

const getMyFriends = async (req, res, next) => {
  try {
    const chatId = req.query.chatId;

    const chats = await Chat.find({
      members: req.user,
      groupChat: false,
    }).populate("members", "name avatar");

    const friends = chats.map(({ members }) => {
      const otherUser = getOtherUser(members, req.user);

      return {
        _id: otherUser._id,
        name: otherUser.name,
        avatar: otherUser.avatar.url,
      };
    });

    if (chatId) {
      const chat = await Chat.findById(chatId);

      const availableFriends = friends.filter(
        (friend) => !chat.members.includes(friend._id)
      );

      return res.status(200).json({
        success: true,
        friends: availableFriends,
      });
    } else {
      return res.status(200).json({
        success: true,
        friends,
      });
    }

    return res.status(200).json({
      status: true,
      allRequests,
    });
  } catch (error) {
    next(error);
  }
};

export {
  login,
  newUser,
  getMyProfile,
  logOut,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  getAllNotification,
  getMyFriends,
};
