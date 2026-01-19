import mongoose from "mongoose";

export const connectDb = async() => {
  try {
    const mongoUri = process.env.MONGOURI;
    if (!mongoUri) {
      throw new Error("MONGOURI not defined in env");
    }
    await mongoose.connect(mongoUri);
    console.log('mongo db connections successful')
  } catch (error) {
    console.log(error, 'mongodb connection failed')
    process.exit(1);
  }
}


