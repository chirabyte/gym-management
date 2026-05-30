const Workout = require("../models/Workout");

const createWorkout = async (req, res) => {
  try {
    const { member, exercises, schedule, difficulty } = req.body;

    const workout = await Workout.create({
      trainer: req.user.id,
      member,
      exercises,
      schedule,
      difficulty,
    });

    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({
      trainer: req.user.id,
    })
      .populate("member", "name email")
      .populate("trainer", "name");

    res.json(workouts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
};