import express from 'express';
import { loginUser, registerUser, authGoogle, googleCallback, sendVerificationEmail, userDetails, userUpdate, forgotPassword, resetPassword } from '../controllers/userController.js';
import authMiddleware from './../middleware/auth.js';
import passport from 'passport';

const userRouter = express.Router();

// Register and Login routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// Google authentication routes
userRouter.get('/auth/google', authGoogle); // Initiate Google login
userRouter.get('/auth/google/callback', googleCallback); // Handle callback from Google

// Email verification
userRouter.get('/sendEmail', sendVerificationEmail);

// Forgot and Reset Password
userRouter.post('/forgotpassword', forgotPassword);
userRouter.post('/resetpassword', resetPassword);

// User details and profile update
userRouter.post('/details', authMiddleware, userDetails);
userRouter.put('/updateprofile', authMiddleware, userUpdate);

export default userRouter;
