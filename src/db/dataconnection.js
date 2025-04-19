import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config({path:'./.env'})

const connectDB = async () => {
  try {
   const connectionInstanse = await mongoose.connect(process.env.MONGO_URI)
   console.log(`\n mongodb connected !! DB HOST: ${connectionInstanse.connection.host}`);

  } 
  catch (error) {
    console.error("mongodb connection error", error);
    process.exit(1)
    
  }
};
export default connectDB