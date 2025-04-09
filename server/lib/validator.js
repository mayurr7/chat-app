import { body, check, param, validationResult } from 'express-validator';
import { ErrorHandler } from '../utils/utility.js';

const validateHandler = (req, res, next) => {
    const errors = validationResult(req);

    const errorMessage = errors
    .array()
    .map((error) => error.msg)
    .join(" ,");

    if(errors.isEmpty()) return next();
    else next(new ErrorHandler(errorMessage, 400));
}  

const registerValidator = () => [
    body("name","Please Enter name" ).notEmpty(),
    body("username","Please Enter username" ).notEmpty(),
    body("password","Please Enter password" ).notEmpty(),
    body("bio","Please Enter bio" ).notEmpty(),
    check("avatar","Please upload avatar").notEmpty(),
];


const loginValidator = () => [
    body("name","Please Enter name" ).notEmpty(),
    body("username","Please Enter username" ).notEmpty(),
    
];

const newGroupValidator = () => [
    body("name","Please Enter name" ).notEmpty(),
    body("members")
    .notEmpty()
    .withMessage("Please add a members")
    .isArray({min: 2,max : 100})
    .withMessage("Members must be between 2 to 100"),
    
];

const addMemberValidator = () => [
    body("chatId","Please Enter chat ID" ).notEmpty(),
    body("members")
    .notEmpty()
    .withMessage("Please add a members")
    .isArray({min:1, max : 97})
    .withMessage("Members must be between 2 to 100"),
    
];

const removeMemberValidator = () => [
    body("chatId","Please Enter chat ID" ).notEmpty(),
    body("userId","Please Enter User ID" ).notEmpty(),  
    
];


const sendAttachmentsValidator = () => [
    body("chatId","Please Enter chat ID" ).notEmpty(),
    check("files")
    .notEmpty()
    .withMessage("Please upload attachments")
    .isArray({min: 1,max : 5})
    .withMessage("Attachments must be between 1 to 5"),
    
];


const chatIdValidator = () => [
    param("id","Please Enter chat ID" ).notEmpty()     
    
];


const renameValidator = () => [
    param("id","Please Enter chat ID" ).notEmpty(),
    body("name","Please Enter new name").notEmpty(),

    
];    

export {
    addMemberValidator, chatIdValidator, loginValidator,
    newGroupValidator, registerValidator, removeMemberValidator,
    sendAttachmentsValidator, validateHandler, renameValidator
};
