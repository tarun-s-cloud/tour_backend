import express from "express"
import { bookService, cancelBooking, getBooking } from "../controllers/bookingController.js"
import {authenticateUser} from '../middleware/bookingMiddleware.js'
const router = express.Router();

router.post('/book',authenticateUser, bookService);
router.delete('/cancel/:id', authenticateUser, cancelBooking);
router.get('/profile', authenticateUser, getBooking);

export default router
