const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (user.status === "Inactive") {
      return res
        .status(400)
        .json({ message: "User is Inactive! Please contact admin" });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // console.log(user.role);

    // Fetch role information
    const role = await Role.findOne({ rolename: user.role });
    // console.log(role);

    // Extract permissions from role and filter the ones with `true` values
    const permissions = role
      ? Object.keys(role.permissions).filter((key) => role.permissions[key])
      : []; // Handle case where role is not found

    // Send user info along with token and permissions array
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: role ? role.rolename : user.role, // Fallback if role is not found
        status: user.status,
        permissions, // Array of true permissions
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Logout function (invalidate JWT on client-side)
const logout = (req, res) => {
  res.json({ message: "Logged out successfully" });
};

module.exports = { login, logout };
