
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"
import connectDB from "./db/dataconnection.js"
import {errorHandler} from "./middleware/errorHandler.js"
dotenv.config({path: './.env'})

connectDB()
  .then(() =>{
     app.listen(process.env.PORT || 9000, () => {
        console.log(`⚙️ Server is running at port : http://localhost:${process.env.PORT}`);
    })
    })
  .catch((err) => {
    console.log("MongoDB Connection failed !!",err);
  });


const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use('/user', authRoutes);
app.use('/booking', bookingRoutes);

app.use(errorHandler);
app.get("/",(req,res) => {
  res.send("server is running")
}); 
