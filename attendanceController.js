const Attendance = require("../models/Attendance");
const Membership = require("../models/Membership");

// Check In
const checkIn = async (req, res) => {
  try {
    const membership = await Membership.findOne({
      member: req.user.id,
      status: "active",
    });

    if (!membership || membership.expiryDate < new Date()) {
      return res.status(400).json({
        message: "Membership expired",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendanceExists = await Attendance.findOne({
      member: req.user.id,
      date: {
        $gte: today,
      },
    });

    if (attendanceExists) {
      return res.status(400).json({
        message: "Attendance already marked today",
      });
    }

    const attendance = await Attendance.create({
      member: req.user.id,
      checkIn: new Date(),
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Check Out
const checkOut = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      member: req.user.id,
      date: {
        $gte: today,
      },
    });

    if (!attendance) {
      return res.status(404).json({
        message: "Check-in not found",
      });
    }

    attendance.checkOut = new Date();

    await attendance.save();

    res.json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Attendance History
const getAttendanceHistory = async (req, res) => {
  try {
    const attendance = await Attendance.find({
      member: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  checkIn,
  checkOut,
  getAttendanceHistory,
};