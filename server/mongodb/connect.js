import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(url);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

export default connectDB;
