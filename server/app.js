import express from "express";
import { connectDb } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
import { Message } from "./models/messageSchema.js";

import {
  createGroupsChats,
  createMessagesInChat,
  createSingleChats,
} from "./seeders/chatSeeders.js";
import { createUser } from "./seeders/userSeeders.js";

//Soket.io
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { v4 as uuid } from "uuid";
import { getSockets } from "./lib/helper.js";

dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "mayur";

const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

const userSocketIDs = new Map();

connectDb(mongoURI);

// createSingleChats(10);
// createGroupsChats(10);
//createMessagesInChat(10, "67f3a5b2972ba08aaf5aa41b")

const app = express();
const server = createServer(app);
const io = new Server(server, {});

//createUser(10);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("home page");
});

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);

io.use((Socket, next) => {

});

io.on("connection", (Socket) => {
  const user = {
    _id: "aaaa",
    name: "mayur",
  };

  userSocketIDs.set(user._id.toString(), Socket.id);

  console.log(userSocketIDs);

  Socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageFromRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };

    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(NEW_MESSAGE, {
      chatId,
      message: messageFromRealTime,
    });
    io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });

    try {
      await Message.create(messageForDB);
    } catch (error) {
      console.error(error);
    }
  });

  //disconnect
  Socket.on("disconnect", () => {
    console.log("User disconnected");

    userSocketIDs.delete(user._id.toString());
  });
});

app.use(errorMiddleware);

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT} in ${envMode} Mode`);
});

export { envMode, adminSecretKey, userSocketIDs };
