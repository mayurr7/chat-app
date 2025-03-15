import express from 'express';
import { getMyProfile, login, logOut, newUser, searchUser} from '../controllers/user.js';
import { singleAvatar } from "../middlewares/multer.js"
import { isAuthenticated } from '../middlewares/auth.js';

const app = express();

app.post('/newuser', singleAvatar, newUser)

app.post('/login', login);


app.use(isAuthenticated);

app.get('/me', getMyProfile);
app.post('/logout', logOut);
app.post('/searchuser', searchUser);

export default app;