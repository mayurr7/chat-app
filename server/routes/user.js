import express from 'express';
import { getMyProfile, login, logOut, newUser, searchUser} from '../controllers/user.js';
import { singleAvatar } from "../middlewares/multer.js"
import { isAuthenticated } from '../middlewares/auth.js';
import { registerValidator, validateHandler, loginValidator } from '../lib/validator.js';


const app = express();

app.post('/newuser', singleAvatar, registerValidator(), validateHandler, newUser)

app.post('/login',loginValidator(),validateHandler, login);


app.use(isAuthenticated);

app.get('/me', getMyProfile);
app.post('/logout', logOut);
app.post('/searchuser', searchUser);

export default app;