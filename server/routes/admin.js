import express from "express";
import { allChats, allUsers } from "../controllers/admin.js";

const app = express.Router();

app.get('/users', allUsers);

app.get('/chats', allChats)

export default app;