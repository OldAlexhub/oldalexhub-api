import mongoose from "mongoose";

const connectToDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB Successfully`);
  } catch (error) {
    console.log(`Failed to connect to MongoDB`);
  }
};
export default connectToDB;
