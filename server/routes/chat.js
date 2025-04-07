import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { addMembers, deleteChat, getChatDetails, getMessages, getMyChat, getMyGroups, leaveGroup, newGroupChat, removeMember, renameGroup, sendAttachments } from '../controllers/chat.js';
import { attachmentsMulter } from '../middlewares/multer.js';

const app = express();




app.use(isAuthenticated);

app.post('/new', newGroupChat);
app.get('/my', getMyChat);
app.get('/my/group', getMyGroups);
app.put('/addmembers', addMembers);
app.put('/removemember', removeMember);
app.delete('/leave/:id', leaveGroup);


app.post('/message', attachmentsMulter, sendAttachments);

app.get('/messages/:id', getMessages);

//Get chat details, rename, delete
app.route('/:id').get(getChatDetails).put(renameGroup).delete(deleteChat);



export default app;