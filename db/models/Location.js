const mongoose = require("mongoose");
const { Schema } = mongoose;

const LocationSchema = new Schema(
  {
    locationName: { type: String, required: true },
    locationRegion: { type: String, required: true },
    modifiedBy: { type: String, required: true },
  },
  { timestamps: true }
);
const Location = mongoose.model("Location", LocationSchema);
module.exports = Location;
