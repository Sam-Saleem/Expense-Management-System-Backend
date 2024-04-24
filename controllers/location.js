const Location = require("../db/models/Location");

// Get All Locations:
const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    if (locations.length) {
      return res.status(200).json(locations);
    }
    return res.status(404).json({ message: "There isn't any locations yet." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not retrieve locations",
    });
  }
};

// Add a new Location:
const addLocation = async (req, res) => {
  const { locationName, locationRegion, modifiedBy, createdBy } = req.body;
  try {
    await Location.create({
      locationName,
      locationRegion,
      modifiedBy,
      createdBy,
    });

    return res.status(200).json({ message: "Location added successfully." });
  } catch (err) {
    console.error(err);

    // Check if the error is a duplicate key error
    if (err.code === 11000 && err.keyPattern) {
      return res.status(409).json({
        error:
          "Duplicate key error, The combination of locationName and locationRegion should be unique.",
        message: err.errmsg,
      });
    } else {
      // Handle other types of errors
      return res.status(500).json({
        error: "Server Error: Failed to add new location.",
      });
    }
  }
};

// Get a Location By Id:
const getLocationById = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findById(id);
    if (location) {
      return res.status(200).json(location);
    }
    return res
      .status(404)
      .json({ message: "There isn't any Location of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not find location.",
    });
  }
};

// Update a Location:
const updateLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findById(id);

    if (!location) {
      return res
        .status(404)
        .json({ message: "There isn't any Location of this id exist." });
    } else if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: "req.body is empty." });
    } else {
      const updatedLocation = await Location.findByIdAndUpdate(id, req.body, {
        returnDocument: "after",
      });
      // console.log("updatedLocation: ", updatedLocation);
      return res.status(200).json({
        message: "Location updated successfully.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "Server Error: Could not update the location.",
    });
  }
};

// Delete a Location:
const deleteLocation = async (req, res) => {
  const { id } = req.params;

  try {
    const location = await Location.findByIdAndDelete(id);
    // console.log(location);
    if (location) {
      return res.status(200).json({ message: "Location deleted successfully" });
    }
    return res
      .status(404)
      .json({ message: "There isn't any Location of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Failed to delete the location.",
    });
  }
};

module.exports = {
  addLocation,
  getAllLocations,
  getLocationById,
  deleteLocation,
  updateLocation,
};
