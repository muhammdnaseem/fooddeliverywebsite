import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

export const connectDB = async () => {
    try {
        const dbUri = process.env.DB_URI || 'mongodb+srv://muhammadnaseem0342:Naseem@123@cluster0.b0x9g5j.mongodb.net/reactjs-food-delivery-app?retryWrites=true&w=majority&appName=Cluster0
'; // Fallback to local DB
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1); // Exit the process if DB connection fails
    }
};
