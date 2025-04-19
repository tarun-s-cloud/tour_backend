import { Booking } from "../models/booking.model.js";
// Create a new booking
const bookService = async (req, res) => {
    try {
        const userId = req.user
        const {booking_place, fullname, email, phoneno, current_location, bookon, adult, child, status } = req.body;
        const newBooking = new Booking({ userId, booking_place, fullname, email, phoneno, current_location, bookon, adult, child, status});
        await newBooking.save();
        res.status(201).json({ message: 'Booking successful', booking: newBooking });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

const getBooking = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookings = await Booking.find({ userId });
        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};



// Cancel a booking
const cancelBooking = async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Booking canceled' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

export{
    bookService,
    cancelBooking,
    getBooking
}
