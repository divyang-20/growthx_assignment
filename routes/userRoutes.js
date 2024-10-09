// Import required modules
const express = require("express");
const {
  register,
  login,
  uploadAssignment,
  getAdmins,
} = require("../controllers/userController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// Route for user registration
// POST /api/users/register
router.post("/register", register); // Register a new user

// Route for user login
// POST /api/users/login
router.post("/login", login); // User login

// Route for uploading an assignment
// Protected route requiring authentication
// POST /api/users/upload
router.post("/upload", protect, uploadAssignment); // Upload an assignment (protected route)

// Route for fetching all admins
// Protected route requiring authentication
// GET /api/users/admins
router.get("/admins", protect, getAdmins); // Fetch all admins (protected route)

// Export the router to use in the main application
module.exports = router;
