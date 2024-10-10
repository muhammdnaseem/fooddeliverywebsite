import express from 'express'
import { loginUser, registerUser, sendVerificationEmail, userDetails, userUpdate, forgotPassword, resetPassword } from '../controllers/userController.js'
import authMiddleware from './../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.get('/sendEmail', sendVerificationEmail)
userRouter.post('/login', loginUser)
userRouter.post('/forgotpassword', forgotPassword)
userRouter.post('/resetpassword', resetPassword)
userRouter.post('/details', authMiddleware, userDetails)
userRouter.put('/updateprofile', authMiddleware, userUpdate)



export default userRouter;
