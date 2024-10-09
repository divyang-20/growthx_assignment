// Import Mongoose for interacting with MongoDB
const mongoose = require("mongoose");
// Import bcrypt for hashing passwords
const bcrypt = require("bcryptjs");

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  // The name of the user
  name: {
    type: String, // Name is a string
    required: true, // This field is mandatory
  },

  // The email of the user
  email: {
    type: String, // Email is a string
    required: true, // This field is mandatory
    unique: true, // Email must be unique across all users
  },

  // The password of the user (hashed)
  password: {
    type: String, // Password is a string
    required: true, // This field is mandatory
  },

  // The role of the user (user or admin)
  role: {
    type: String, // Role is a string
    enum: ["user", "admin"], // Allowed values are "user" and "admin"
    default: "user", // Default role is "user"
  },
});

// Middleware to encrypt password before saving user
userSchema.pre("save", async function (next) {
  // Check if the password is modified before hashing
  if (!this.isModified("password")) {
    return next(); // Proceed to the next middleware
  }

  // Generate a salt for hashing the password
  const salt = await bcrypt.genSalt(10);
  // Hash the password with the generated salt
  this.password = await bcrypt.hash(this.password, salt);

  // Proceed to the next middleware
  next();
});

// Method to compare entered password with stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Compare the entered password with the hashed password
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model based on the defined schema
module.exports = mongoose.model("User", userSchema);
