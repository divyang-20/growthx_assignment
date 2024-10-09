// Import the User and Assignment models for interacting with the database
const User = require("../models/user");
const Assignment = require("../models/assignment");

// Import JWT for token creation and bcrypt for password hashing
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// User Registration: Handles registration for new users
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if a user with the given email already exists
    const userExists = await User.findOne({ email, role: "user" });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user in the database
    const user = await User.create({ name, email, password });

    // Respond with a success message
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: "Server error" });
  }
};

// User Login: Handles user login and token generation
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email and role
    const user = await User.findOne({ email, role: "user" });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token is valid for 1 hour
    );

    // Respond with the generated token
    res.status(200).json({ token });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: "Server error" });
  }
};

// Upload Assignment: Allows a user to upload an assignment
exports.uploadAssignment = async (req, res) => {
  const { task, adminId } = req.body; // Task and adminId from request body

  try {
    // Create a new assignment with the user's ID, task, and adminId
    const assignment = await Assignment.create({
      userId: req.user.userId, // User ID from the authenticated user's token
      task,
      adminId,
    });

    // Respond with the newly created assignment
    res.status(201).json({ assignment });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch All Admins: Retrieves a list of all registered admins
exports.getAdmins = async (req, res) => {
  try {
    // Find all users with the role of admin and return their name and email
    const admins = await User.find({ role: "admin" }).select("name email");

    // Respond with the list of admins
    res.status(200).json(admins);
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: "Server error" });
  }
};
