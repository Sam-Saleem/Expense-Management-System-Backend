const mongoose = require("mongoose");
const { Schema } = mongoose;

const LocationSchema = new Schema(
  {
    locationName: { type: String, required: true },
    locationRegion: { type: String, required: true },
    modifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Enable timestamps
    immutable: true, // Make createdAt and updatedAt fields immutable
  }
);

LocationSchema.index({ locationName: 1, locationRegion: 1 }, { unique: true });
const Location = mongoose.model("Location", LocationSchema);
module.exports = Location;
