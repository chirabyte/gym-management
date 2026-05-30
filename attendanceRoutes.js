const express = require("express");

const {
  checkIn,
  checkOut,
  getAttendanceHistory,
} = require("../controllers/attendanceController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/checkin",
  protect,
  authorize("member"),
  checkIn
);

router.put(
  "/checkout",
  protect,
  authorize("member"),
  checkOut
);

router.get(
  "/history",
  protect,
  authorize("member"),
  getAttendanceHistory
);

module.exports = router;