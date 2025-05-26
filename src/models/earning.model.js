const mongoose = require("mongoose");

const earningSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Technician",
      required: true,
    },
    amount: { type: Number, required: true },
    currency: {
      type: String,
      default: "KES",
    },
    date: {
      type: Date,
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    payments : {
      type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Earning", earningSchema);
