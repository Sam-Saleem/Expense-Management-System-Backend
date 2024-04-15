const mongoose = require("mongoose");
const { Schema } = mongoose;

const EntryPartitionSchema = new Schema(
  {
    entryType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EntryType",
      required: true,
    },
    entryPartition: { type: String, required: true },
    modifiedBy: { type: String, required: true },
  },
  { timestamps: true }
);
const EntryPartition = mongoose.model("EntryPartition", EntryPartitionSchema);
module.exports = EntryPartition;
