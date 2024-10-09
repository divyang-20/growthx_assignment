// Import JWT for verifying tokens and User model for database interaction
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Protect middleware: Ensures that the request is coming from an authenticated user
exports.protect = (req, res, next) => {
  let token = req.headers.authorization; // Extract the token from the request headers

  // Check if token exists and is in the correct format ("Bearer <token>")
  if (!token || !token.startsWith("Bearer")) {
    return res.status(401).json({ message: "Not authorized" }); // Return an error if no valid token is provided
  }

  try {
    // Extract the actual token by splitting the "Bearer <token>" string
    token = token.split(" ")[1];

    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token (which contains userId and role) to the request object
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid or expired tokens
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Admin Protect middleware: Ensures that the request is coming from an authenticated admin
exports.adminProtect = async (req, res, next) => {
  try {
    // Fetch the user from the database using the userId from the token
    const admin = await User.findById(req.user.userId);

    // Check if the user exists and has the role of 'admin'
    if (admin && admin.role === "admin") {
      // If the user is an admin, proceed to the next middleware or route handler
      next();
    } else {
      // Return a 403 error if the user is not an admin
      res.status(403).json({ message: "Admin access required" });
    }
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: "Server error" });
  }
};
