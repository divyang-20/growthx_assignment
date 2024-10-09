// Import required modules
const express = require("express");
const { protect, adminProtect } = require("../middleware/authMiddleware");
const {
  register,
  login,
  getAssignments,
  acceptAssignment,
  rejectAssignment,
} = require("../controllers/adminController");

// Create a router instance
const router = express.Router();

// Route for admin registration
// POST /api/admins/register
router.post("/register", register);

// Route for admin login
// POST /api/admins/login
router.post("/login", login);

// Route for getting assignments assigned to the logged-in admin
// Protected route requiring authentication
// GET /api/admins/assignments
router.get("/assignments", protect, adminProtect, getAssignments);

// Route for accepting an assignment by ID
// Protected route requiring authentication
// POST /api/admins/assignments/:id/accept
router.post("/assignments/:id/accept", protect, adminProtect, acceptAssignment);

// Route for rejecting an assignment by ID
// Protected route requiring authentication
// POST /api/admins/assignments/:id/reject
router.post("/assignments/:id/reject", protect, adminProtect, rejectAssignment);

// Export the router to use in the main application
module.exports = router;
