const express = require("express");

const {
  getProfile,
  updateProfile,
  subscribeMembership,
  getMembership,
  renewMembership,
} = require("../controllers/memberController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/profile",
  protect,
  authorize("member"),
  getProfile
);

router.put(
  "/profile",
  protect,
  authorize("member"),
  updateProfile
);

router.post(
  "/subscribe",
  protect,
  authorize("member"),
  subscribeMembership
);

router.get(
  "/membership",
  protect,
  authorize("member"),
  getMembership
);

router.put(
  "/renew",
  protect,
  authorize("member"),
  renewMembership
);

module.exports = router;