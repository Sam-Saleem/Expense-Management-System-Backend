const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategoryTypeSchema = new Schema(
  {
    categoryType: { type: String, required: true },
    isExpense: { type: Boolean },
    modifiedBy: { type: String, required: true },
  },
  { timestamps: true }
);
const CategoryType = mongoose.model("CategoryType", CategoryTypeSchema);
module.exports = CategoryType;
