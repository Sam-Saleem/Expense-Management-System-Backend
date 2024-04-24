const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategoryTypeSchema = new Schema(
  {
    categoryType: { type: String, required: true, unique: true },
    isExpense: { type: Boolean },
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
  { timestamps: true }
);
const CategoryType = mongoose.model("CategoryType", CategoryTypeSchema);
module.exports = CategoryType;
