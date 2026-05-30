const User = require("../models/User");
const Membership = require("../models/Membership");

// Get Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Subscribe Membership
const subscribeMembership = async (req, res) => {
  try {
    const { planName, amount, duration, features } = req.body;

    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + duration);

    const membership = await Membership.create({
      member: req.user.id,
      planName,
      price: {
        amount,
        currency: "INR",
      },
      duration,
      features,
      status: "active",
      expiryDate,
    });

    res.status(201).json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View Membership
const getMembership = async (req, res) => {
  try {
    const membership = await Membership.findOne({
      member: req.user.id,
    });

    res.json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Renew Membership
const renewMembership = async (req, res) => {
  try {
    const membership = await Membership.findOne({
      member: req.user.id,
    });

    if (!membership) {
      return res.status(404).json({
        message: "Membership not found",
      });
    }

    membership.expiryDate.setMonth(
      membership.expiryDate.getMonth() + membership.duration
    );

    membership.status = "active";

    await membership.save();

    res.json(membership);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  subscribeMembership,
  getMembership,
  renewMembership,
};