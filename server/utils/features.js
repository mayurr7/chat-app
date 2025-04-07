import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOption = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true,
}


//Database connectivity

const connectDb = (uri) => {
    mongoose.connect(uri)
    .then((data) => console.log(`connected to DB: ${data.connection.host}`))
    .catch((err) => {
        throw err;
    });
};

//json web token created
const sendToken = (res, user, code, message) => {
    const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET);
    return res
        .status(code)
        .cookie("chatt-token", token,cookieOption)
        .json({
            sucess: true,
            message,
        });
};


const emitEvent = (req, event, user, data) => {};


const deleteFilesFromCloudinary = async(public_id) => {

}

export {connectDb, sendToken, cookieOption, emitEvent, deleteFilesFromCloudinary };