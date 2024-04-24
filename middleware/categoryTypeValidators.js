const { body, param, validationResult } = require("express-validator");

const ValidateAddCategoryType = [
  body("categoryType")
    .isString()
    .withMessage("The categoryType is must and should be a string."),
  body("isExpense")
    .isBoolean()
    .optional()
    .withMessage("The isExpense should be a boolean."),
  body("modifiedBy")
    .isMongoId()
    .withMessage("The modifiedBy is must and should be a valid MongoId."),
  body("createdBy")
    .isMongoId()
    .withMessage("The createdBy is must and should be a valid MongoId."),

  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Invalid Input Data", error: errors.array() });
    }
    next();
  },
];

const ValidateUpdateCategoryType = [
  body("categoryType")
    .isString()
    .optional()
    .withMessage("The categoryType is must and should be a string."),
  body("isExpense")
    .isBoolean()
    .optional()
    .withMessage("The isExpense should be a boolean."),
  body("modifiedBy")
    .isMongoId()
    .optional()
    .withMessage("The modifiedBy is must and should be a valid MongoId."),
  body("createdBy")
    .isMongoId()
    .optional()
    .withMessage("The createdBy is must and should be a valid MongoId."),

  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Invalid Input Data", error: errors.array() });
    }
    next();
  },
];

const ValidateId = [
  param("id").isMongoId().withMessage("This is not a valid Mongo Id."),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Invalid Input Data", error: errors.array() });
    }
    next();
  },
];
module.exports = {
  ValidateAddCategoryType,
  ValidateUpdateCategoryType,
  ValidateId,
};
