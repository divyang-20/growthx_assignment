// Import Mongoose for interacting with MongoDB
const mongoose = require("mongoose");

// Define the schema for the Assignment model
const assignmentSchema = new mongoose.Schema({
  // Reference to the User model (the user who uploaded the assignment)
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId type for MongoDB
    ref: "User", // Reference to the "User" model
    required: true, // This field is mandatory
  },

  // The task description for the assignment
  task: {
    type: String, // The task is a string
    required: true, // This field is mandatory
  },

  // Reference to the User model (the admin assigned to review the assignment)
  adminId: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId type for MongoDB
    ref: "User", // Reference to the "User" model
    required: true, // This field is mandatory
  },

  // The current status of the assignment
  status: {
    type: String, // Status is a string
    enum: ["pending", "accepted", "rejected"], // Allowed values for status
    default: "pending", // Default status is "pending"
  },

  // Timestamp for when the assignment was created
  createdAt: {
    type: Date, // The createdAt field is a date
    default: Date.now, // Default value is the current date and time
  },
});

// Export the Assignment model based on the defined schema
module.exports = mongoose.model("Assignment", assignmentSchema);
