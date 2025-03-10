import express from "express";
import userRoute from './routes/user.js';
import { connectDb } from "./utils/features.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

connectDb(mongoURI);

const app  = express();

app.use(express.json());

app.get("/", (req, res) => {
    console.log("home page");
    
})

app.use('/user', userRoute);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
