import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import nodemailer from 'nodemailer';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();


// Create JWT token
const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24d' });

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: 'User does not exist' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const token = createToken(user._id);
        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        if (await userModel.findOne({ email })) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        if (!validator.isEmail(email)) return res.status(400).json({ success: false, message: 'Invalid email' });
        if (password.length < 8) return res.status(400).json({ success: false, message: 'Password too short' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const verificationToken = crypto.randomBytes(20).toString('hex');

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });

        const user = await newUser.save();
        await sendVerificationEmail(email, verificationToken);

        const token = createToken(user._id);
        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error registering user' });
    }
};

// Send verification email
const sendVerificationEmail = async (email, verificationToken) => {
    const verificationUrl = `http://localhost:5173/verify?token=${verificationToken}`;
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"Your App" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Email Verification',
            text: `Please verify your email by clicking the following link: ${verificationUrl}`,
            html: `<p>Please verify your email by clicking the following link: <a href="${verificationUrl}">${verificationUrl}</a></p>`,
        };

        await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully');
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};

// Forgot password
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = Date.now() + 3600000; // 1 hour

        await user.save();

        const resetUrl = `http://localhost:5173/resetpassword?token=${resetToken}`;
        await sendVerificationEmail(email, resetUrl);

        res.status(200).json({ success: true, message: 'Reset link sent to your email!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error processing request' });
    }
};

// Reset password
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
        });

        if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired token' });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();
        res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error resetting password' });
    }
};

// Get user details
const userDetails = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching user details' });
    }
};

// Update user details
const userUpdate = async (req, res) => {
    const { userId, ...updatedData } = req.body;
    try {
        const user = await userModel.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error updating user' });
    }
};

// Google OAuth Strategy Setup
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:5173/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await userModel.findOne({ googleId: profile.id });
                if (existingUser) return done(null, existingUser);

                const newUser = new userModel({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    profilePicture: profile.photos[0].value,
                });

                const savedUser = await newUser.save();
                done(null, savedUser);
            } catch (error) {
                done(error, false);
            }
        }
    )
);


// Google authentication routes
const authGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });

const googleCallback = passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/dashboard',
});

export {
    loginUser,
    registerUser,
    sendVerificationEmail,
    forgotPassword,
    resetPassword,
    userDetails,
    userUpdate,
    authGoogle,
    googleCallback,
};
