import mongoose from "mongoose";

let isConnected = false;

export default async function dbConnect() {
  if (isConnected) {
    return;
  }

  try {
    const MONGO_URI = process.env.MONGO_URI;  
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log('DB connected');
  } catch (error) {
    console.error('DB connection failed!, error:', error);
    throw error;
  }
}
