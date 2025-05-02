import { Booking } from "../models/booking.model.js";
const bookService = async (req, res) => {
    try {
        const userId = req.user.id
        const { parent_ID, booking_place, fullname, email, phoneno, current_location, bookon, adult, child, status } = req.body;
        const newBooking = new Booking({ parent_ID, userId, booking_place, fullname, email, phoneno, current_location, bookon, adult, child, status});
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


const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (booking.userId.toString() !== userId) {
      return res.status(403).json({ error: "Not authorized to update this booking" });
    }

    // Only update the allowed fields
    const { bookon, adult, child } = req.body;

    if (bookon) booking.bookon = bookon;
    if (adult !== undefined) booking.adult = adult;
    if (child !== undefined) booking.child = child;

    await booking.save();

    res.status(200).json({ message: "Booking updated", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};



const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json({ message: 'Booking canceled' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};


export{
    bookService,
    cancelBooking,
    getBooking,
    updateBooking
}
