// Import the User and Assignment models for interacting with the database
const User = require("../models/user");
const Assignment = require("../models/assignment");

// Import JWT for creating tokens and bcrypt for password hashing
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Admin Registration: Handles registration of a new admin
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if an admin with the given email already exists
    const adminExists = await User.findOne({ email, role: "admin" });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create a new admin user
    const admin = await User.create({ name, email, password, role: "admin" });

    // Respond with success message
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: "Server error" });
  }
};

// Admin Login: Handles login for admin users
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the admin by email and role
    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token for the authenticated admin
    const token = jwt.sign(
      { userId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Respond with the generated token
    res.status(200).json({ token });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: "Server error" });
  }
};

// View Assignments for Admin: Allows an admin to view assignments tagged to them
exports.getAssignments = async (req, res) => {
  const adminId = req.user.userId; // Retrieve the admin's ID from the token

  try {
    // Find all pending assignments tagged to the admin and populate the user data
    const assignments = await Assignment.find({
      adminId,
      status: "pending",
    }).populate("userId", "name");

    // Respond with the list of assignments
    res.status(200).json(assignments);
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: "Server error" });
  }
};

// Accept Assignment: Allows an admin to accept a pending assignment
exports.acceptAssignment = async (req, res) => {
  try {
    // Find the assignment by ID and ensure it belongs to the admin
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment || assignment.adminId.toString() !== req.user.userId) {
      return res
        .status(404)
        .json({ message: "Assignment not found or unauthorized" });
    }

    // Update the assignment status to "accepted"
    assignment.status = "accepted";
    await assignment.save();

    // Respond with success message
    res.status(200).json({ message: "Assignment accepted" });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: "Server error" });
  }
};

// Reject Assignment: Allows an admin to reject a pending assignment
exports.rejectAssignment = async (req, res) => {
  try {
    // Find the assignment by ID and ensure it belongs to the admin
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment || assignment.adminId.toString() !== req.user.userId) {
      return res
        .status(404)
        .json({ message: "Assignment not found or unauthorized" });
    }

    // Update the assignment status to "rejected"
    assignment.status = "rejected";
    await assignment.save();

    // Respond with success message
    res.status(200).json({ message: "Assignment rejected" });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: "Server error" });
  }
};
