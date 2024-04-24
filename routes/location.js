const express = require("express");
const router = express.Router();
const {
  addLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
} = require("../controllers/location");
const {
  ValidateId,
  ValidateAddLocation,
  ValidateUpdateLocation,
} = require("../middleware/locationValidators");

router.get("/getLocations", getAllLocations);
router.get("/getLocation/:id", ValidateId, getLocationById);
router.post("/addLocation", ValidateAddLocation, addLocation);
router.put(
  "/updateLocation/:id",
  ValidateId,
  ValidateUpdateLocation,
  updateLocation
);
router.delete("/deleteLocation/:id", ValidateId, deleteLocation);

module.exports = router;
