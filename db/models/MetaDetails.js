const mongoose = require("mongoose");
const { Schema } = mongoose;

const MetaDetailsSchema = new Schema(
  {
    tillEntryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TillEntry",
      required: true,
    },
    depositSlipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DepositSlip",
      //   required: true,
    },
    chequeNo: { type: String },
    partitionNo: { type: String },
    bankName: { type: String },
    chequeDate: { type: Date },
    phoneNo: { type: String },
    modifiedBy: { type: String, required: true },
  },
  { timestamps: true }
);
const MetaDetails = mongoose.model("MetaDetails", MetaDetailsSchema);
module.exports = MetaDetails;
