import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import nodemailer from 'nodemailer';


//login user
const loginUser = async (req,res) =>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if(!user){
           return res.json({success:false, message:'User does not exist'}) 
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false, message:'Invalid credentials'})
        }

        
        // Generate a new JWT token each time the user logs in
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24d' });

        res.json({ success: true, token });
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) =>{
    const {name,password,email} = req.body;
    try {

        // checking is user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false, message:'User already exists'})
        }

        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message:'Please enter a valid email'})
        }

        if(password.length<8){
            return res.json({success:false, message:'Please enter a strong password'})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        })

      const user =  await newUser.save()
    await sendVerificationEmail(email, verificationToken);
      const token = createToken(user._id);
      res.json({success:true, token});

    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Error'})
    }
}
// Function to send verification email
const sendVerificationEmail = async () => {
    const email = "muhammadnaseem0342@gmail.com";
    const verificationToken = "234567";
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "saidj4671@gmail.com", // Your Ethereal email
            pass: "kmkqkifocaqlfmjm", // Your Ethereal password
        },
    });

    const verificationUrl = `http://localhost:5173/verify?token=${verificationToken}`;

    const mailOptions = {
        from: '"Maddison Foo Koch 👻" <saidj4671@gmail.com>', // sender address
        to: email, // recipient's email
        subject: 'Email Verification', // Subject line
        text: `Please verify your email by clicking on the following link: ${verificationUrl}`, // plain text body
        html: `<b>Please verify your email by clicking on the following link:</b> <a href="${verificationUrl}">${verificationUrl}</a>`, // html body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent:', info);
    } catch (error) {
        console.error('Error sending verification email:', error);
        console.error('Error details:', {
            errno: error.errno,
            code: error.code,
            syscall: error.syscall,
            address: error.address,
            port: error.port,
        });
    }
    
};


const userDetails = async (req, res) => {
    try {
        const userDetails = await userModel.find({_id:req.body.userId})
        res.json({success:true, data:userDetails})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error})
    }
}

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



export {loginUser, registerUser, sendVerificationEmail, userDetails, userUpdate}