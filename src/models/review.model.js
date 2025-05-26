const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    professional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Technician",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
