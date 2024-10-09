// Import the mongoose library for MongoDB interaction
const mongoose = require("mongoose");

// Function to connect to MongoDB using the URI from environment variables
const connectDB = async () => {
  try {
    // Attempt to establish a connection to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    // Log a success message if connection is established
    console.log("MongoDB connected");
  } catch (error) {
    // Log an error message if the connection fails
    console.error("MongoDB connection failed:", error);

    // Exit the process with failure if the connection couldn't be established
    process.exit(1);
  }
};

// Export the connectDB function to be used in other parts of the application
module.exports = connectDB;
