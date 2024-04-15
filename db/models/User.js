const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String },
    modifiedBy: { type: String },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
module.exports = User;
