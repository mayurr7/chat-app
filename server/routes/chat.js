import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';

const app = express();





app.use(isAuthenticated);



export default app;