const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    technician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Technician",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: {type: String, required: true, trim: true},
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
