const { body, param, validationResult } = require("express-validator");

const ValidateCreateUser = [
  body("username")
    .isString()
    .withMessage("The username is must and should be a string."),
  body("password")
    .isString()
    .withMessage("The password is must and should be a string."),
  body("location")
    .isString()
    .withMessage("The location is must and should be a string."),
  body("image")
    .isString()
    .optional()
    .withMessage("The image should be a string."),
  body("modifiedBy")
    .isMongoId()
    .optional()
    .withMessage("The modifiedBy should be a valid MongoId."),
  body("createdBy")
    .isMongoId()
    .optional()
    .withMessage("The createdBy should be a valid MongoId."),

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

const ValidateUpdateUser = [
  body("username")
    .isString()
    .optional()
    .withMessage("The username is must and should be a string."),
  body("password")
    .isString()
    .optional()
    .withMessage("The password is must and should be a string."),
  body("location")
    .isString()
    .optional()
    .withMessage("The location is must and should be a string."),
  body("image")
    .isString()
    .optional()
    .withMessage("The image should be a string."),
  body("modifiedBy")
    .isMongoId()
    .optional()
    .withMessage("The modifiedBy should be a valid MongoId."),
  body("createdBy")
    .isMongoId()
    .optional()
    .withMessage("The createdBy should be a valid MongoId."),

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
  ValidateCreateUser,
  ValidateUpdateUser,
  ValidateId,
};
