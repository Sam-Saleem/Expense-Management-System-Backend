const User = require("../db/models/User");
const bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Get All Users:
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length) {
      return res.status(200).json(users);
    }
    return res.status(404).json({ message: "There isn't any users yet." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not retrieve users",
    });
  }
};

// Create a new User:
const createUser = async (req, res) => {
  const { username, password, location, image, modifiedBy } = req.body;
  try {
    // check whether the user with this username exists:
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({
        error: "Sorry a user with this username already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    user = await User.create({
      username,
      location,
      image,
      modifiedBy,
      password: secPass,
    });
    const data = {
      user: {
        id: user.id,
        // role: user.role,
        username: user.username,
        location: user.location,
        modifiedBy: user.modifiedBy,
        image: user.image,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);

    return res.status(200).json({ authToken });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not create new user.",
    });
  }
};

// Get a User By Id:
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      return res.status(200).json(user);
    }
    return res
      .status(404)
      .json({ message: "There isn't any User of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not find user.",
    });
  }
};

// Update a User:
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    // const [user] = await User.update(req.body, {
    //   where: { id },
    // });
    if (!user) {
      return res
        .status(404)
        .json({ message: "There isn't any User of this id exist." });
    } else if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: "req.body is empty." });
    } else {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        returnDocument: "after",
      });
      //   console.log("updatedUser", updatedUser);
      const data = {
        user: {
          id: updatedUser.id,
          // role: user.role,
          username: updatedUser.username,
          location: updatedUser.location,
          modifiedBy: updatedUser.modifiedBy,
          image: updatedUser.image,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      return res.status(200).json({
        message: "User updated successfully.",
        authToken,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      error: "Server Error: Could not update the user.",
    });
  }
};

// Delete a User:
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    // console.log(user);
    if (user) {
      return res.status(200).json({ message: "User deleted successfully" });
    }
    return res
      .status(404)
      .json({ message: "There isn't any User of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Failed to delete the user.",
    });
  }
};

// Login a User:
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "Please try to login with correct credentials.",
      });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({
        message: "Please try to login with correct credentials.",
      });
    }
    const data = {
      user: {
        id: user.id,
        // role: user.role,
        username: user.username,
        location: user.location,
        modifiedBy: user.modifiedBy,
        image: user.image,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    return res.status(200).json({ authToken });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: User Login Failed.",
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  loginUser,
};
