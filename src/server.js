
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"
import connectDB from "./db/dataconnection.js"
import {errorHandler} from "./middleware/errorHandler.js"
dotenv.config({path: './.env'})


// middleware
// const app = express();
// app.use(express.json());
// app.use(cors());

// const PORT = process.env.PORT || 5000;
// // MongoDB Connection
// connectDB()
//   .then(() =>{
//    console.log("MongoDB connect");
   
//   })
//   .catch((err) => {
//     console.log(err);
    
//   });
// // register users
// app.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "User already exists" });

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Save user
//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Login User
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     // Compare password
//     const isMatch = bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     // Create JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.json({ token, user });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Protected Route (Example)
// app.get("/dashboard", auth, (req, res) => {
//   res.json({ message: "Welcome to your dashboard", user: req.user });
// });
// app.listen( PORT, () => console.log(`Server running on port http://localhost:${PORT}`));

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
