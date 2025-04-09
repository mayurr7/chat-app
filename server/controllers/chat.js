import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chatSchema.js";
import { User } from "../models/userSchema.js";
import { Message } from "../models/messageSchema.js";
import { deleteFilesFromCloudinary, emitEvent } from "../utils/features.js";
import { ALERT, NEW_ATTACHMENT, NEW_MESSAGE_ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherUser } from "../lib/helper.js";

const newGroupChat = async (req, res, next) => {
  try {
    const { name, members } = req.body;
   

    const allMembers = [...members, req.user];

    await Chat.create({
      name,
      groupChat: true,
      creator: req.user,
      members: allMembers,
    });

    emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
    emitEvent(req, REFETCH_CHATS, members);

    return res.status(201).json({
      sucess: true,
      messgae: "Group created",
    });
  } catch (error) {
    next(error);
  }
};

const getMyChat = async (req, res, next) => {
  try {
    const chats = await Chat.find({ members: req.user }).populate(
      "members",
      "name avatar"
    );

    const transFormChats = chats.map(({ _id, name, members, groupChat }) => {
      const otherMembers = getOtherUser(members, req.user);

      return {
        _id,
        groupChat,
        avatar: groupChat
          ? members.slice(0, 3).map(({ avatar }) => avatar.url)
          : [otherMembers.avatar.url],
        name: groupChat ? name : otherMembers.name,
        members: members.reduce((prev, curr) => {
          if (curr._id.toString() !== req.user.toString()) {
            prev.push(curr._id);
          }
          return prev;
        }, []),
      };
    });

    return res.status(200).json({
      sucess: true,
      chats: transFormChats,
    });
  } catch (error) {
    next(error);
  }
};

const getMyGroups = async (req, res, next) => {
  try {
    const chats = await Chat.find({
      creator: req.user,
    }).populate("members", "name avatar");

    const groups = chats.map(({ members, _id, groupChat, name }) => ({
      _id,
      groupChat,
      name,
      avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
    }));

    return res.status(200).json({
      status: true,
      groups,
    });
  } catch (error) {
    next(error);
  }
};

const addMembers = async (req, res, next) => {
  try {
    const { chatId, members } = req.body;

    if(!members || members.length < 1) return next(new ErrorHandler("Please provide a members", 400));

    const chat = await Chat.findById(chatId);

    if (!chat) return next(new ErrorHandler("Chat not found", 404));

    if (!chat.groupChat)
      return next(new ErrorHandler("This is not group chat", 400));

    if (chat.creator.toString() !== req.user.toString())
      return next(new ErrorHandler("You are not allowed to add members", 403));

    const allNewMembersPromise = members.map((i) => User.findById(i), "name");

    const allNewMembers = await Promise.all(allNewMembersPromise);

    const uniqueMembers = allNewMembers.filter((i) => !chat.members.includes(i._id.toString())).map(i => i._id);

    chat.members.push(...uniqueMembers);


    if ((chat.members, chat.members.length > 100))
      return next(new ErrorHandler("Group members limit reached", 400));

    await chat.save();

    const allUsersName = allNewMembers.map((i) => i.name).join(",");

    emitEvent(
      req,
      ALERT,
      chat.members,
      `${allUsersName} has been added in the group`
    );

    emitEvent(req, REFETCH_CHATS, chat.members);

    res.status(200).json({
      status: true,
      message: "members added successfully",
    });

  } catch (error) {
    next(error);
  }
};


const removeMember = async (req, res, next) => {
    try {

      const {userId, chatId } = req.body;

      const [chat, userThatWillBeRemoved ] = await Promise.all([
        Chat.findById(chatId),
        User.findById(userId, "name"),
      ]);


      if (!chat) return next(new ErrorHandler("Chat not found", 404));

      if (!chat.groupChat)
        return next(new ErrorHandler("This is not group chat", 400));
  
      if (chat.creator.toString() !== req.user.toString())
        return next(new ErrorHandler("You are not allowed to remove members", 403));

      if(chat.members.length <= 3) return next(new ErrorHandler("Group must have atleast 3 members", 400));


      chat.members = chat.members.filter(
        (member) => member.toString() !== userId.toString()
      );

      await chat.save();


      emitEvent(
        req,
        ALERT,
        chat.members,
        `${userThatWillBeRemoved.name} has been removed from the group`
      );

      emitEvent(req, REFETCH_CHATS, chat.members);
  
      return res.status(200).json({
        status: true,
        message: 'member removed successfully'
      })

    } catch (error) {
      next(error);
    }
};


const leaveGroup = async(req, res, next) => {
  try {
    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);

    if (!chat) return next(new ErrorHandler("Chat not found", 404));

    if (!chat.groupChat)
      return next(new ErrorHandler("This is not group chat", 400)); 

    const remainingMembers = chat.members.filter(
      (member) => member.toString() !== req.user.toString()
    );


    if(remainingMembers.length <= 3) return next(new ErrorHandler("Group must have atleast 3 members", 400));
    
    if(chat.creator.toString() === req.user.toString()){

      const randomElement = Math.floor(Math.random() * remainingMembers.length);

      const newCreator = remainingMembers[randomElement];

      chat.creator = newCreator;
    }

    chat.members = remainingMembers;

   
    

    const [user] = await Promise.all([
      User.findById(req.user, "name"),
      chat.save()]);

    emitEvent(
      req,
      ALERT,
      chat.members,
     ` User ${user.name} has left the group`
    );

    emitEvent(req, REFETCH_CHATS, chat.members);
    
  return res.status(200).json({
    status: true,
    message: "user left successfully"
  });

  } catch (error) {
    
    next(error);

  }

};


const sendAttachments = async(req, res, next) => {
    try {

      const { chatId } = req.body;

      const [chat, me] = await Promise.all([
        Chat.findById(chatId),
        User.findById(req.user, "name"),
      ]);


      if (!chat) return next(new ErrorHandler("Chat not found", 404));

      const files = req.files || []; 

      if(files.length < 1) return next(new ErrorHandler("Please provide attachmnets", 400));


      //Upload file
      const attachmeents = [];

     

      const messageForDB = {
        content: "", 
        attachmeents,
        sender: me._id,
        chat: chatId
      };

      const messageForRealTime ={
        ...messageForDB,
        sender: {
          _id: me._id,
          name: me.name,
        },
      }; 

      const message = await Message.create(messageForDB);

      emitEvent(req, NEW_ATTACHMENT, chat.members, {
        message: messageForRealTime,
        chatId,
      });

      emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });


      

      return res.status(200).json({
        sucess: true,
        message,
      })
    } catch (error) {
      next(error);
    }
};


const getChatDetails = async(req, res, next) =>{

  try {
      if(req.query.populate === "true"){

        const chat = await Chat.findById(req.params.id).populate("members", "name avatar").lean();
      

        if(!chat) return next(new ErrorHandler("Chat not found", 404));

        chat.members = chat.members.map(({_id, name, avatar}) => ({
          _id,
          name,
          avatar: avatar.url,
        }));

        return res.status(200).json({
          sucess: true,
          chat,
        })

      }else{
          const chat = await Chat.findById(req.params.id);
          if(!chat) return next (new ErrorHandler("Chat not found", 404));

          return res.status(200).json({
            sucess: true,
            chat,
          })
      };


  } catch (error) {
    next(error);
  }
};

const renameGroup = async(req, res, next) =>{
     try {
      
      const chatId = req.params.id;
      const { name } = req.body;

      if (!name || name.trim() === "") {
        return next(new ErrorHandler("Group name cannot be empty", 400));
      }

      const chat = await Chat.findById(chatId);
      

      if(!chat) return next(new ErrorHandler("Chat not found", 404));
      // console.log(chat.groupChat);
      

      if(!chat.groupChat) return next(new ErrorHandler("This is not group chat", 404));

      if(chat.creator.toString() !== req.user.toString())  return next(new ErrorHandler("You are not allowed to rename the group", 403));

      chat.name = name;


      await chat.save();

      emitEvent(req, REFETCH_CHATS, chat.members);

      return res.status(200).json({
        sucess: true,
        message: "Group renamed successfully",
      });

      
     } catch (error) {
        next(error);
     }
};


const deleteChat = async(req, res, next) =>  {
    try {
      
      const chatId = req.params.id;

      const chat = await Chat.findById(chatId);
      

      if(!chat) return next(new ErrorHandler("Chat not found", 404));
      // console.log(chat.groupChat);
      

      if(!chat.groupChat) return next(new ErrorHandler("This is not group chat", 404));

      const members = chat.members;

      if(chat.groupChat && chat.creator.toString() !== req.user.toString())  return next(new ErrorHandler("You are not allowed to rename the group", 403));


      if(!chat.groupChat && !chat.members.includes(req.user.toString())){
        return next(new ErrorHandler("You are not allowed to rename the group", 403));
      };

      //here we have to delete messsages and attchments

      const messageWithAttachments = await Message.find({
        chat: chatId,
        attachments: { $exists: true, $ne: []},
      });

      const public_id = [];

      messageWithAttachments.forEach(({ attachments }) => {
          attachments.forEach(({ public_id }) => {
            public_id.push(public_id)
          });
      });


      await Promise.all([
        deleteFilesFromCloudinary(public_id),
        chat.deleteOne(),
        Message.deleteMany({ chat: chatId }),
      ]);

        emitEvent(req, REFETCH_CHATS, members);

        return res.status(200).json({
          sucess: true,
          message: "Chat deleted successfully",
        })

    } catch (error) {
      next(error);
    }
};


const getMessages = async(req, res, next) =>{
      try {
        
        const chatId = req.params.id;
        const { page = 1 } = req.query;

        const limit = 20;
        const skip = (page -1) * limit;

        const [messages, totalMessagesCount ]  = await Promise.all([
          Message.find({ chat: chatId })
          .sort({ createdAt: -1})
          .skip(skip)
          .limit(limit)
          .populate("sender", "name")
          .lean(),
        Message.countDocuments({ chat: chatId }),  
        ]);

        const totalPages = Math.ceil(totalMessagesCount / limit);

        return res.status(200).json({
          sucess: true,
          message: messages.reverse(),
          totalPages
        })
        
      } catch (error) {
        next(error);
      }
};

export { 
   newGroupChat,
   getMyChat,
   getMyGroups,
   addMembers,
   removeMember,
   leaveGroup,
   sendAttachments,
   getChatDetails,
   renameGroup,
   deleteChat,
   getMessages
};
