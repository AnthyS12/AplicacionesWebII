const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReservationSchema = new Schema(
  {
    user: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
