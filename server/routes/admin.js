import express from "express";
import { allChats, allMessages, allUsers, getDashBoardStats, adminLogin, adminLogout, getAdminData} from "../controllers/admin.js";
import {adminLoginValidator, validateHandler} from "../lib/validator.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

    
app.post('/verify',adminLoginValidator(), validateHandler, adminLogin);

app.get('/logout', adminLogout);


//Only Admin Can Access these routes

app.use(adminOnly);

app.get('/checkadmin', getAdminData)

app.get('/users', allUsers);

app.get('/chats', allChats);

app.get('/messages', allMessages);

app.get('/stats', getDashBoardStats);

export default app;