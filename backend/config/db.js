import mongoose from "mongoose";

const dbConnect = async (req, res) => {
  try {
    const MONGO_URI = process.env.MONGO_URI;  
    await mongoose.connect(MONGO_URI);
    console.log('DB connected');
  } catch (error) {
    console.error('DB connection failed!, error:', error);
    process.exit(1);
  }
}
export default dbConnect;