const express = require("express");

const {
  createWorkout,
  getWorkouts,
} = require("../controllers/trainerController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/workout",
  protect,
  authorize("trainer"),
  createWorkout
);

router.get(
  "/workouts",
  protect,
  authorize("trainer"),
  getWorkouts
);

module.exports = router;