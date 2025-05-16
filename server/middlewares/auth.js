import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies["chatt-token"];    

    if (!token) return next(new ErrorHandler("Please login to access this route", 401));

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodeToken._id;

    next();
  } catch (error) {
    next(error);
  }
};


const adminOnly = async (req, res, next) => {
  try {
    const token = req.cookies["chat-admin-token"];    

    if (!token) return next(new ErrorHandler("Only admin can access this route", 401));

    const secretKey = jwt.verify(token, process.env.JWT_SECRET);

    const isMatched = secretKey === adminSecretKey;

    if (!isMatched) return next(new ErrorHandler("Only admin can access this route", 401));

    next();
  } catch (error) {
    next(error);
  }
};

export { isAuthenticated, adminOnly };
