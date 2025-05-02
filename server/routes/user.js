import express from 'express';
import { acceptFriendRequest, getAllNotification, getMyFriends, getMyProfile, login, logOut, newUser, searchUser, sendFriendRequest} from '../controllers/user.js';
import { singleAvatar } from "../middlewares/multer.js"
import { isAuthenticated } from '../middlewares/auth.js';
import { registerValidator, validateHandler, loginValidator, sendRequestValidator, acceptRequestValidator } from '../lib/validator.js';


const app = express();

app.post('/newuser', singleAvatar, registerValidator(), validateHandler, newUser)

app.post('/login',loginValidator(),validateHandler, login);


app.use(isAuthenticated);

app.get('/me', getMyProfile);

app.post('/logout', logOut);

app.post('/searchuser', searchUser);

app.put('/sendrequest', sendRequestValidator(), validateHandler, sendFriendRequest);

app.put('/acceptrequest', acceptRequestValidator(), validateHandler, acceptFriendRequest);


app.get('/notification', getAllNotification);

app.get('/myfriends', getMyFriends)

export default app;