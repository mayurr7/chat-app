import express from "express";
import { allChats, allMessages, allUsers, getDashBoardStats } from "../controllers/admin.js";

const app = express.Router();

app.get('/users', allUsers);

app.get('/chats', allChats);

app.get('/messages', allMessages);

app.get('/stats', getDashBoardStats);

export default app;