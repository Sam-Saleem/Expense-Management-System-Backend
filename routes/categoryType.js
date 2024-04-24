const express = require("express");
const router = express.Router();
const {
  getAllCategoryTypes,
  addCategoryType,
  getCategoryTypeById,
  updateCategoryType,
  deleteCategoryType,
} = require("../controllers/categoryType");
const {
  ValidateId,
  ValidateAddCategoryType,
  ValidateUpdateCategoryType,
} = require("../middleware/categoryTypeValidators");

router.get("/getCategories", getAllCategoryTypes);
router.get("/getCategory/:id", ValidateId, getCategoryTypeById);
router.post("/addCategory", ValidateAddCategoryType, addCategoryType);
router.put(
  "/updateCategory/:id",
  ValidateId,
  ValidateUpdateCategoryType,
  updateCategoryType
);
router.delete("/deleteCategory/:id", ValidateId, deleteCategoryType);

module.exports = router;
