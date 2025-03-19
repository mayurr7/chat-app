import { ErrorHandler } from "../utils/utility.js";
import {Chat} from '../models/chatSchema.js';
import { emitEvent } from "../utils/features.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherUser } from "../lib/helper.js";



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




const getMyChat = async(req, res, next) => {
    try {
        
       const chats = await Chat.find({ members: req.user }).populate("members", "name avatar");

       const transFormChats = chats.map(({ _id, name, members, groupChat }) => {

        const otherMembers = getOtherUser(members, req.user);

        return{
            _id,
            groupChat,
            avatar: groupChat ? members.slice(0,3).map(({ avatar }) => avatar.url): [otherMembers.avatar.url],
            name: groupChat ? name : otherMembers.name,
            members: members.reduce((prev, curr) => {
                if(curr._id.toString() !== req.user.toString()){
                    prev.push(curr._id);
                }
                return prev;
            }, [])

        }
       });
    

        return res.status(200).json({
            sucess: true,
            chats: transFormChats
        });


    } catch (error) {
        next(error);
    }

};


const getMyGroups = async(req, res, next) => {
    try {
        
        const chats = await Chat.find({
            creator: req.user
        }).populate("members", "name avatar");

        const groups = chats.map(({ members, _id, groupChat, name}) => ({
            _id,
            groupChat,
            name,
            avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),

        }));

        return res.status(200).json({
            status: true,
            groups
        });

    } catch (error) {
        next(error);
    }
}

export { newGroupChat, getMyChat, getMyGroups };