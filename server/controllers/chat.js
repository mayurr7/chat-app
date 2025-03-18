import { ErrorHandler } from "../utils/utility.js";
import {Chat} from '../models/chatSchema.js';
import { emitEvent } from "../utils/features.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";


const newGroupChat = async(req, res, next) => {
    try {
        
        const {name, members} = req.body;
        console.log(members);
        

        if(members.length < 2) return next(new ErrorHandler("Group chat must have atleast 3 members", 400));


        const allMembers = [...members, req.user];

        await Chat.create({
            name,
            groupChat: true,
            creator: req.user,
            members: allMembers

        });

        emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
        emitEvent(req, REFETCH_CHATS, members);

        return res.status(201).json({
            sucess: true,
            messgae: "Group created"
        });


    } catch (error) {
        next(error);
    }

};

export { newGroupChat };