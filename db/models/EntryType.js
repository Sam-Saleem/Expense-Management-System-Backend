const mongoose = require("mongoose");
const { Schema } = mongoose;

const EntryTypeSchema = new Schema(
  {
    categoryTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryType",
      required: true,
    },
    entryType: { type: String, required: true },
    hasDepositSlip: { type: Boolean, required: true },
    hasPartition: { type: Boolean, required: true },
    hasCheque: { type: Boolean, required: true },
    modifiedBy: { type: String, required: true },
  },
  { timestamps: true }
);
const EntryType = mongoose.model("EntryType", EntryTypeSchema);
module.exports = EntryType;
