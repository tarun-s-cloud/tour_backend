import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  parent_ID:{type: String, required: true },
  booking_place:{type: String},
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  phoneno:{type: Number,
    required: true
  },
  current_location:{type:String, required: true},
  bookon: { type: Date, required: true },
  adult:{type:Number},
  child:{type:Number,
  },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' }
}, { timestamps: true });

export const Booking = mongoose.model("Booking", BookingSchema)
