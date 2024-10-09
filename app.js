// Load environment variables from .env file
require("dotenv").config();

// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db"); // Database connection file
const userRoutes = require("./routes/userRoutes"); // User routes
const adminRoutes = require("./routes/adminRoutes"); // Admin routes

// Initialize express app
const app = express();

// Use body-parser middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Connect to the MongoDB database
connectDB();

// User-related routes (register, login, upload assignment, etc.)
app.use("/api/users", userRoutes);

// Admin-related routes (register, login, view assignments, accept/reject assignments, etc.)
app.use("/api/admins", adminRoutes);

// Set the server's port (from .env or default to 5000)
const PORT = process.env.PORT || 5000;

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
