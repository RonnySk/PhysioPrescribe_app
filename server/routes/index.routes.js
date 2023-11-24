const express = require("express");
const axios = require("axios");
const User = require("../models/User.model");
const TrainingPlan = require("../models/TrainingPlan.models");
const router = express.Router();

// get all Patients Route
router.get("/allPatients", async (req, res, next) => {
  try {
    const allPatients = await User.find({ isPhysiotherapist: "false" });
    console.log("all Patients", allPatients);
    res.status(201).json({ allPatients });
  } catch (err) {
    next(err);
  }
});

// Route Exercises
router.post("/exercisesApi", async (req, res, next) => {
  try {
    const { name, type, muscle, difficulty } = req.body;
    const config = {
      headers: {
        "X-Api-Key": process.env.REACT_APP_X_API_KEY,
      },
    };

    const url = `https://api.api-ninjas.com/v1/exercises?name=${name}&type=${type}&muscle=${muscle}&difficulty=${difficulty}`;

    const ExercisesFromAPI = await axios.get(url, config);

    const exerciseWithIds = ExercisesFromAPI.data.map((exercise) => ({
      id: exercise.name.split(" ").join("_"),
      ...exercise,
    }));

    res.status(201).json(exerciseWithIds);
  } catch (err) {
    next(err);
  }
});

// Add Exercise to Training Plan Route

router.post("/addExerciseTp", async (req, res, next) => {
  try {
    // const oneTrainingPlan = await TrainingPlan.find({ isPhysiotherapist: "false" });
    const { training_id, oneExercise } = req.body;

    const findandUpdateTrainingPlan = await TrainingPlan.findByIdAndUpdate(
      training_id,
      {
        $push: { exercisesId: oneExercise.id },
      },
      {
        new: true,
      }
    );

    res.status(201).json({ message: "Exercise successfully added!" });
  } catch (err) {
    next(err);
  }
});

//get all Training PLans
router.get("/trainingplans", async (req, res, next) => {
  try {
    const allTrainingPlans = await TrainingPlan.find().populate("patientId");
    res.status(201).json({ allTrainingPlans });
  } catch (err) {
    next(err);
  }
});

// Search Patient and Training Plan

router.get("/searchedtraining", async (req, res, next) => {
  try {
    const { searchInfo } = req.body;

    // const searchedTrainingPlans = await TrainingPlan.find({
    //   trainingName: searchInfo,
    // });

    console.log("req", req.body);
    // res.status(201).json({ allTrainingPlans });
  } catch (err) {
    next(err);
  }
});

// create new Training Plan
router.post("/createTrainingPlan", async (req, res, next) => {
  try {
    const { therapeutId, patientId, trainingName, trainingDescription } =
      req.body;

    if (trainingName === "" || patientId === "") {
      res
        .status(400)
        .json({ message: "Provide Training Name and/or Patient." });
      return;
    }

    const newTrainingPlan = await TrainingPlan.create({
      therapeutId,
      patientId,
      trainingName,
      trainingDescription,
    });
    res.status(201).json({ newTrainingPlan });
  } catch (err) {
    next(err);
  }
});

// get One Training Plan Route
router.get("/onetrainingplan/:training_id", async (req, res, next) => {
  try {
    const { training_id } = req.params;

    const oneTrainingPlan = await TrainingPlan.findById(training_id).populate(
      "patientId"
    );
    console.log("treino com populate", oneTrainingPlan);
    res.status(201).json({ oneTrainingPlan });
  } catch (err) {
    next(err);
  }
});

// Delete One Training Plan Route
router.delete("/onetrainingplan/:training_id", async (req, res, next) => {
  try {
    const { training_id } = req.params;

    const deleteTrainingPlan = await TrainingPlan.findByIdAndRemove(
      training_id
    );
    res.status(201).json({ message: "Training plan successfully removed" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
