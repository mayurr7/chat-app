import express from 'express';
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChat, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from '../controllers/chat.js';
import { addMemberValidator, chatIdValidator, newGroupValidator, removeMemberValidator, renameValidator, sendAttachmentsValidator, validateHandler } from '../lib/validator.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { attachmentsMulter } from '../middlewares/multer.js';

const app = express();




app.use(isAuthenticated);

app.post('/new', newGroupValidator(), validateHandler, newGroupChat);
app.get('/my', getMyChat);
app.get('/my/group', getMyGroups);
app.put('/addmembers', addMemberValidator(), validateHandler, addMembers);
app.put('/removemember',removeMemberValidator(), validateHandler, removeMember);
app.delete('/leave/:id',chatIdValidator(), validateHandler, leaveGroup);


app.post('/message', attachmentsMulter,sendAttachmentsValidator(), validateHandler, sendAttachments);

app.get('/messages/:id',chatIdValidator(), validateHandler, getMessages);

//Get chat details, rename, delete
app.route('/:id')
.get(chatIdValidator(), validateHandler, getChatDetails)
.put(renameValidator(), validateHandler, renameGroup)
.delete(chatIdValidator(), validateHandler,deleteChat);



export default app;