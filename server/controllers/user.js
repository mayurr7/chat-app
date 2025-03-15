import { compare } from "bcrypt";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { cookieOption } from "../utils/features.js";


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

    const user = await User.findOne({ username }).select("+password");

    if (!user)
      return next(new ErrorHandler("Invalid Username or Password", 404));

    const isMatch = await compare(password, user.password);

    if (!isMatch) return next(new Error("Invalid Username or Password", 404));

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


    return res
      .status(200)
      .json({
        status: true,
        message: name,
      });
  } catch (error) {
    next(error);
  }
};

export { login, newUser, getMyProfile, logOut, searchUser };
