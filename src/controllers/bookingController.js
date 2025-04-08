// import express from "express";
import { Booking } from "../models/booking.model.js";
// Create a new booking
const bookService = async (req, res) => {
    try {
        const userId = req.user.id
        const {fullname, email, phoneno, bookon, adult, child, status } = req.body;
        const newBooking = new Booking({ userId, fullname, email, phoneno, bookon, adult, child, status});
        await newBooking.save();
        res.status(201).json({ message: 'Booking successful', booking: newBooking });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

// Get user bookings
const updateBookingStatus = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId });
         console.log("User ID:", req.params.userId);
        console.log(bookings);
        
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

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
    updateBookingStatus
}
