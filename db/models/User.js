const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String },
    modifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true, // Enable timestamps
    immutable: true, // Make createdAt and updatedAt fields immutable
  }
);
// UserSchema.index({ username: 1, location: 1 }, { unique: true });
const User = mongoose.model("User", UserSchema);
module.exports = User;
