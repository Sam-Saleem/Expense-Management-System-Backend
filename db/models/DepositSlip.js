const mongoose = require("mongoose");
const { Schema } = mongoose;

const DepositSlipSchema = new Schema(
  {
    entryTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EntryType",
      required: true,
    },
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    depositNumber: { type: String, required: true },
    bagSerialNumber: { type: String },
    modifiedBy: { type: String, required: true },
  },
  { timestamps: true }
);
const DepositSlip = mongoose.model("DepositSlip", DepositSlipSchema);
module.exports = DepositSlip;
