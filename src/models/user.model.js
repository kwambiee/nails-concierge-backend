const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, sparse: true,
      lowercase: true, trim: true,
      required: true, validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      }, },
    password: { type: String }, // Only for local strategy
    name: { type: String },
    googleId: { type: String },
    provider: { type: String }, // 'local', 'github', 'google'
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
