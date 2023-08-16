const express = require("express");
const authMiddleware = require("../middlewares/auth");

const secureRouter = express.Router();

// Apply the authMiddleware to secure routes
secureRouter.use(authMiddleware);

// Define your secure routes here
secureRouter.get("/profile", (req, res) => {
  // Access the authenticated user's ID from req.user.user_id

  const userId = req.user.user_id;
  // Perform actions related to the secure route
  res.json({ message: `Accessing profile of user ${userId}`,req:req.user });
});

module.exports = secureRouter;
