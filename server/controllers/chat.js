import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chatSchema.js";
import { User } from "../models/userSchema.js";
import { emitEvent } from "../utils/features.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherUser } from "../lib/helper.js";

const newGroupChat = async (req, res, next) => {
  try {
    const { name, members } = req.body;
    console.log(members);

    if (members.length < 2)
      return next(
        new ErrorHandler("Group chat must have atleast 3 members", 400)
      );

    const allMembers = [...members, req.user];

    await Chat.create({
      name,
      groupChat: true,
      creator: req.user,
      members: allMembers,
    });

    emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
    emitEvent(req, REFETCH_CHATS, members);

    return res.status(201).json({
      sucess: true,
      messgae: "Group created",
    });
  } catch (error) {
    next(error);
  }
};

const getMyChat = async (req, res, next) => {
  try {
    const chats = await Chat.find({ members: req.user }).populate(
      "members",
      "name avatar"
    );

    const transFormChats = chats.map(({ _id, name, members, groupChat }) => {
      const otherMembers = getOtherUser(members, req.user);

      return {
        _id,
        groupChat,
        avatar: groupChat
          ? members.slice(0, 3).map(({ avatar }) => avatar.url)
          : [otherMembers.avatar.url],
        name: groupChat ? name : otherMembers.name,
        members: members.reduce((prev, curr) => {
          if (curr._id.toString() !== req.user.toString()) {
            prev.push(curr._id);
          }
          return prev;
        }, []),
      };
    });

    return res.status(200).json({
      sucess: true,
      chats: transFormChats,
    });
  } catch (error) {
    next(error);
  }
};

const getMyGroups = async (req, res, next) => {
  try {
    const chats = await Chat.find({
      creator: req.user,
    }).populate("members", "name avatar");

    const groups = chats.map(({ members, _id, groupChat, name }) => ({
      _id,
      groupChat,
      name,
      avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
    }));

    return res.status(200).json({
      status: true,
      groups,
    });
  } catch (error) {
    next(error);
  }
};

const addMembers = async (req, res, next) => {
  try {
    const { chatId, members } = req.body;

    if(!members || members.length < 1) return next(new ErrorHandler("Please provide a members", 400));

    const chat = await Chat.findById(chatId);

    if (!chat) return next(new ErrorHandler("Chat not found", 404));

    if (!chat.groupChat)
      return next(new ErrorHandler("This is not group chat", 400));

    if (chat.creator.toString() !== req.user.toString())
      return next(new ErrorHandler("You are not allowed to add members", 403));

    const allNewMembersPromise = members.map((i) => User.findById(i), "name");

    const allNewMembers = await Promise.all(allNewMembersPromise);

    const uniqueMembers = allNewMembers.filter((i) => !chat.members.includes(i._id.toString())).map(i => i._id);

    chat.members.push(...uniqueMembers);


    if ((chat.members, chat.members.length > 100))
      return next(new ErrorHandler("Group members limit reached", 400));

    await chat.save();

    const allUsersName = allNewMembers.map((i) => i.name).join(",");

    emitEvent(
      req,
      ALERT,
      chat.members,
      `${allUsersName} has been added in the group`
    );

    emitEvent(req, REFETCH_CHATS, chat.members);

    res.status(200).json({
      status: true,
      message: "members added successfully",
    });

  } catch (error) {
    next(error);
  }
};


const removeMember = async (req, res, next) => {
    try {

      const {userId, chatId } = req.body;

      const [chat, userThatWillBeRemoved ] = await Promise.all([
        Chat.findById(chatId),
        User.findById(userId),
      ]);


      if (!chat) return next(new ErrorHandler("Chat not found", 404));

      if (!chat.groupChat)
        return next(new ErrorHandler("This is not group chat", 400));
  
      if (chat.creator.toString() !== req.user.toString())
        return next(new ErrorHandler("You are not allowed to add members", 403));

      if(chat.members.length <= 3) return next(new ErrorHandler("Group must have atleast 3 members", 400));


      chat.members = chat.members.filter(
        (member) => member.toString() !== userId.toString()
      );

      await chat.save();


      emitEvent(
        req,
        ALERT,
        chat.members,
        `${userThatWillBeRemoved.name} has been removed from the group`
      );

      emitEvent(req, REFETCH_CHATS, chat.members);
  
      return res.status(200).json({
        status: true,
        message: 'member removed successfully'
      })

    } catch (error) {
      next(error);
    }
}




export { newGroupChat, getMyChat, getMyGroups, addMembers, removeMember, leaveGroup };
