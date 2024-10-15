import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import nodemailer from 'nodemailer';
import postmark from 'postmark';
import crypto from 'crypto';



// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid credentials' });
        }

        // Generate a new JWT token each time the user logs in
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24d' });

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        // Checking if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: 'User already exists' });
        }

        // Validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong password' });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });

        const user = await newUser.save();
        await sendVerificationEmail(email, verificationToken);
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};






// Create Postmark client
var client = new postmark.ServerClient("45b06232-1340-48ef-828c-b85744341170"); // Use API key from your environment variable

// Nodemailer transport configuration for Postmark
// const transporter = nodemailer.createTransport({
//     sendMail: (mailOptions, callback) => {
//         client.sendEmail({
//             From: mailOptions.from,
//             To: mailOptions.to,
//             Subject: mailOptions.subject,
//             TextBody: mailOptions.text,
//             HtmlBody: mailOptions.html,  // Use HTML content if available
//         }, (error, result) => {
//             callback(error, result);
//         });
//     },
// });


// Function to send verification email using Postmark
const sendVerificationEmail = async (email, verificationToken) => {
    const verificationUrl = `http://localhost:5173/verify?token=${verificationToken}`;
    try {
        const transporter =  nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure:false,
            requireTLS:true,
            auth:{
                user:'saidj4671@gmail.com',
                pass:''
            }
        })
        const result = client.sendEmail = {
            from: 'hr@hifahtechnologies.com',  // Replace with your verified Postmark sender email
            to: email,
            subject: 'Email Verification',
            text: `Please verify your email by clicking the following link: ${verificationUrl}`,
            html: `<p>Please verify your email by clicking the following link: <a href="${verificationUrl}">${verificationUrl}</a></p>`,  // HTML version for email clients
        };
        console.log('Verification email sent successfully:', result);
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
};








const userDetails = async (req, res) => {
    try {
        const userDetails = await userModel.find({ _id: req.body.userId });
        res.json({ success: true, data: userDetails });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error });
    }
};


const forgotPassword = async (req, res) => {
    const { email } = req.body; // Expecting only email

    // Log the incoming request
    console.log("Received forgot password request for email:", email);

    if (!email) {
        return res.json({ success: false, message: 'Email is required' });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
        console.log("User not found:", email); // Log if user not found
        return res.json({ success: false, message: 'User not found' });
    }

    // Generate a secure random token
    const resetToken = crypto.randomBytes(32).toString('hex'); // 64 characters long

    // Store the reset token and its expiration
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration

    await user.save(); // Save changes to the user

    // Here you would send the reset token to the user's email
    const verificationToken = `http://localhost:5173/resetpassword?token=${resetToken}`;
    await sendVerificationEmail(email, verificationToken); // Define this function to send the email

    res.json({ success: true, message: 'Reset link sent to your email!' });
};

// Function to reset password
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body; // Get token and new password from request
    try {
        const user = await userModel.findOne({ resetToken: token, resetTokenExpiresAt: { $gt: Date.now() } });
        if (!user) {
            return res.json({ success: false, message: 'Invalid or expired token' });
        }
         // Hash the new password
         const salt = await bcrypt.genSalt(10);
         user.password = await bcrypt.hash(newPassword, salt);
         user.resetToken = undefined; // Clear the reset token
         user.resetTokenExpiresAt = undefined; // Clear the expiry date
         await user.save();
 
         res.json({ success: true, message: 'Password reset successfully' });
     } catch (error) {
         console.log(error);
         res.json({ success: false, message: 'Error' });
     }
 };

const userUpdate = async (req, res) => {
    try {
        const { userId } = req.body; // Extract userId from decoded token
        const updatedData = req.body; // New user data from request
        const user = await userModel.findByIdAndUpdate(userId, updatedData, { new: true }); // Update user
        res.json({ success: true, data: user });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { loginUser, registerUser, sendVerificationEmail, userDetails, userUpdate, forgotPassword, resetPassword };
