const express = require("express");

const {
  getAllUsers,
  blockUser,
  unblockUser,
  analytics,
} = require("../controllers/adminController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/users",
  protect,
  authorize("admin"),
  getAllUsers
);

router.put(
  "/block/:id",
  protect,
  authorize("admin"),
  blockUser
);

router.put(
  "/unblock/:id",
  protect,
  authorize("admin"),
  unblockUser
);

router.get(
  "/analytics",
  protect,
  authorize("admin"),
  analytics
);

module.exports = router;