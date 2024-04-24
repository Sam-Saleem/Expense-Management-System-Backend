const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  loginUser,
} = require("../controllers/user");
const {
  ValidateId,
  ValidateCreateUser,
  ValidateUpdateUser,
} = require("../middleware/userValidators");

router.get("/getUsers", getAllUsers);
router.get("/getUser/:id", ValidateId, getUserById);
router.post("/createUser", ValidateCreateUser, createUser);
router.put("/updateUser/:id", ValidateId, ValidateUpdateUser, updateUser);
router.delete("/deleteUser/:id", ValidateId, deleteUser);
router.post("/loginUser", loginUser);

module.exports = router;
