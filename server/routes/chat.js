import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { addMembers, getMyChat, getMyGroups, leaveGroup, newGroupChat, removeMember } from '../controllers/chat.js';

const app = express();




app.use(isAuthenticated);

app.post('/new', newGroupChat);
app.get('/my', getMyChat);
app.get('/my/group', getMyGroups);
app.put('/addmembers', addMembers);
app.put('/removemember', removeMember);
app.delete('/leave/:id', leaveGroup);




export default app;