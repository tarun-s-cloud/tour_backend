import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  phoneno:{type: Number,
    required: true
  },
  bookon: { type: Date, required: true },
  // service: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

export const Booking = mongoose.model("Booking", BookingSchema)
