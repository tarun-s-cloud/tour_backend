import express from "express"
import { register, login, getProfile, updateProfile, logout } from "../controllers/authController.js"
import {auth} from'../middleware/authMiddleware.js'
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getProfile);
router.put('/update', auth, updateProfile);
router.post('/logout', logout);

export default router
