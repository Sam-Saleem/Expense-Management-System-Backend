const mongoose = require("mongoose");
const { Schema } = mongoose;

const TillConfigurationSchema = new Schema(
  {
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    tillIdentifier: { type: String, required: true },
    modifiedBy: { type: String, required: true },
  },
  { timestamps: true }
);
const TillConfiguration = mongoose.model(
  "TillConfiguration",
  TillConfigurationSchema
);
module.exports = TillConfiguration;
