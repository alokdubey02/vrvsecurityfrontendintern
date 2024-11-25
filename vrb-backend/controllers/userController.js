const User = require("../models/User");
const bcrypt = require("bcryptjs");

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               status:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *               - status
 *     responses:
 *       201:
 *         description: Successfully created user
 *       400:
 *         description: Bad request
 */

// Create a new user
const createUser = async (req, res) => {
  const { name, email, password, role, status } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      password,
      role,
      status,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error creating user" });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error fetching users" });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error fetching user" });
  }
};

// Update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, status } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided in the request
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.status = status || user.status;

    // Only update the password if it's provided
    if (password && password.trim() !== "") {
      user.password = await bcrypt.hash(password, 10);
    } else {
      // Keep the existing password by not modifying it
      user.password = user.password;
    }

    // Save the updated user
    await user.save();

    // Respond with the updated user
    res.status(200).json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(400).json({ message: "Error updating user" });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id); // Use findByIdAndDelete for deletion
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error deleting user" });
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
