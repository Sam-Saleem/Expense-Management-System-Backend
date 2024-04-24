const CategoryType = require("../db/models/CategoryType");

// Get All CategoryTypes:
const getAllCategoryTypes = async (req, res) => {
  try {
    const categories = await CategoryType.find({});
    if (categories.length) {
      return res.status(200).json(categories);
    }
    return res.status(404).json({ message: "There isn't any categories yet." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not retrieve categories",
    });
  }
};

// Add a new CategoryType:
const addCategoryType = async (req, res) => {
  const { categoryType, isExpense, modifiedBy, createdBy } = req.body;
  try {
    await CategoryType.create({
      categoryType,
      isExpense,
      modifiedBy,
      createdBy,
    });

    return res.status(200).json({ message: "Category added successfully." });
  } catch (err) {
    console.error(err);

    // Check if the error is a duplicate key error
    if (err.code === 11000 && err.keyPattern) {
      return res.status(409).json({
        error: "Duplicate key error, Category Type should be unique.",
        message: err.errmsg,
      });
    } else {
      // Handle other types of errors
      return res.status(500).json({
        error: "Server Error: Failed to add new CategoryType.",
      });
    }
  }
};

// Get a CategoryType By Id:
const getCategoryTypeById = async (req, res) => {
  const { id } = req.params;
  try {
    const categoryType = await CategoryType.findById(id);
    if (categoryType) {
      return res.status(200).json(categoryType);
    }
    return res
      .status(404)
      .json({ message: "There isn't any CategoryType of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not find CategoryType.",
    });
  }
};

// Update a CategoryType:
const updateCategoryType = async (req, res) => {
  const { id } = req.params;
  try {
    const categoryType = await CategoryType.findById(id);

    if (!categoryType) {
      return res
        .status(404)
        .json({ message: "There isn't any CategoryType of this id exist." });
    } else if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: "req.body is empty." });
    } else {
      const updatedCategoryType = await CategoryType.findByIdAndUpdate(
        id,
        req.body,
        {
          returnDocument: "after",
        }
      );
      return res.status(200).json({
        message: "CategoryType updated successfully.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "Server Error: Could not update the CategoryType.",
    });
  }
};

// Delete a CategoryType:
const deleteCategoryType = async (req, res) => {
  const { id } = req.params;

  try {
    const categoryType = await CategoryType.findByIdAndDelete(id);
    if (categoryType) {
      return res
        .status(200)
        .json({ message: "CategoryType deleted successfully" });
    }
    return res
      .status(404)
      .json({ message: "There isn't any CategoryType of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Failed to delete the CategoryType.",
    });
  }
};

module.exports = {
  addCategoryType,
  getAllCategoryTypes,
  getCategoryTypeById,
  deleteCategoryType,
  updateCategoryType,
};
