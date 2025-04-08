import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  booking_place:{type: String, required: true},
  fullname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phoneno:{type: Number,
    required: true
  },
  current_location:{type:String, required: true},
  bookon: { type: Date, required: true },
  adult:{type:Number},
  child:{type:Number,
  },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

export const Booking = mongoose.model("Booking", BookingSchema)
