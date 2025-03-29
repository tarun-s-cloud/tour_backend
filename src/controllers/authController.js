import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { username, email, password, order} = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: 'All fields are required' });
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already registered' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword , order});
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully',
       user: { id: newUser._id, username, email, password ,order}
     });
  } catch (error) {
    console.error("registration error: ",error)
    res.status(500).json({ error: 'Error registering user' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'All fields are required' });
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, username: user.username, email} });
  } catch (error) {
    console.error("login error: ",error)
    res.status(500).json({ error: 'Error logging in' });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user.id, { username, email }, { new: true }).select('-password');
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile' });
  }
};

const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

export{
  register,
  login,
  getProfile,
  updateProfile,
  logout
}
