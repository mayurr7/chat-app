import express from "express";
import { connectDb } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";

import userRoute from './routes/user.js';
import chatRoute from "./routes/chat.js";
import { createUser } from "./seeders/userSeeders.js";


dotenv.config({
    path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

connectDb(mongoURI);

const app  = express();

//createUser(10);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    console.log("home page");
    
});



app.use('/user', userRoute);
app.use('/chat', chatRoute);




app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
