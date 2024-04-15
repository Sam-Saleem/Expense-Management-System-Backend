const { Long } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const TillEntrySchema = new Schema(
  {
    tillConfigurationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tillConfiguration",
      required: true,
    },
    entryPartitionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EntryPartition",
      //   required: true,
    },
    depositSlipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DepositSlip",
      //   required: true,
    },
    entryTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EntryType",
      required: true,
    },
    date: { type: Date, required: true },
    entryAmount: { type: Long, required: true }, //or Number
    modifiedBy: { type: String, required: true },
  },
  { timestamps: true }
);
const TillEntry = mongoose.model("TillEntry", TillEntrySchema);
module.exports = TillEntry;
