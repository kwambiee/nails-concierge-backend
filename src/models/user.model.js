const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
      required: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: { type: String }, // Only for local strategy
    firstName: { type: String },
    lastName: { type: String },
    googleId: { type: String },
    provider: { type: String }, // 'local', 'google'
    role: {
      type: String,
      enum: ["client", "technician", "admin"],
      default: "client",
    },
    phone: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
    },
    location: { // For geospatial queries (find nearby techs)
    type: { type: String, default: "Point" },
    coordinates: [Number] // [longitude, latitude]
  },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
