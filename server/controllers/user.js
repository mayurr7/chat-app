import { compare } from "bcrypt";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/features.js";

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

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");

  if (!user) return next(new Error("Invalid Username"));

  const isMatch = await compare(password, user.password);

  if (!isMatch)  return next(new Error("Invalid Password"));

  sendToken(res, user, 200, `Welcome back ${user.name}`);

  } catch (error) {
    next(error);
  }
};



const getMyProfile = (req, res) => {

};
export { login, newUser, getMyProfile };
