import express from "express"
import { bookService, cancelBooking, getBooking,updateBooking } from "../controllers/bookingController.js"
import {authenticateUser} from '../middleware/bookingMiddleware.js'
const router = express.Router();

router.post('/book',authenticateUser, bookService);
router.delete('/cancel/:id', cancelBooking);
router.get('/profile', authenticateUser, getBooking);
router.put("/update/:id",authenticateUser, updateBooking);
export default router
