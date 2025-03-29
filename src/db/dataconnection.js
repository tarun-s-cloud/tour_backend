import mongoose from "mongoose"
import {DB_NAME} from "../constant.js"
import dotenv from "dotenv"
dotenv.config({path:'./.env'})

const connectDB = async () => {
  try {
   const connectionInstanse = await mongoose.connect(`${process.env.MONGO_URI}`)
   console.log(`\n mongodb connected !! DB HOST: ${connectionInstanse.connection.host}`);
  } 
  catch (error) {
    console.error("mongodb connection error", error);
    process.exit(1)
    
  }
};

export default connectDB


// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB Connected');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
