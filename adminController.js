const User = require("../models/User");
const Membership = require("../models/Membership");
const Attendance = require("../models/Attendance");

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Block User
const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.isBlocked = true;

    await user.save();

    res.json({
      message: "User blocked successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Unblock User
const unblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.isBlocked = false;

    await user.save();

    res.json({
      message: "User unblocked successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Analytics
const analytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalMembers = await User.countDocuments({
      role: "member",
    });

    const totalTrainers = await User.countDocuments({
      role: "trainer",
    });

    const activeMemberships =
      await Membership.countDocuments({
        status: "active",
      });

    const totalAttendance =
      await Attendance.countDocuments();

    res.json({
      totalUsers,
      totalMembers,
      totalTrainers,
      activeMemberships,
      totalAttendance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  blockUser,
  unblockUser,
  analytics,
};