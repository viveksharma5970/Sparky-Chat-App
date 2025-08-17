import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const DB_USER = encodeURIComponent(process.env.DB_USER)
const DB_PASS = encodeURIComponent(process.env.DB_PASS)

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@sparkychatapp.qdnmqt1.mongodb.net/?retryWrites=true&w=majority&appName=SparkyChatApp`);
        console.log(`MongoDB connected: ${connection.connection.host}`);
    }
    catch (error) {
        console.log("MongoDB connection error: ", error);
    }
}