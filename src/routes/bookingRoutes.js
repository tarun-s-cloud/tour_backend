import express from "express"
import { bookService, cancelBooking, getBooking } from "../controllers/bookingController.js"
import {auth} from '../middleware/authMiddleware.js'
import {adminAuth} from '../middleware/adminAuthMiddleware.js'
import {authenticateUser} from '../middleware/bookingMiddleware.js'
const router = express.Router();

router.post('/book',authenticateUser, bookService);
router.delete('/booking/:id', authenticateUser, cancelBooking);
router.get('/profile', authenticateUser, getBooking);

export default router
