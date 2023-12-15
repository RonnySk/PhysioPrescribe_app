const express = require("express");
const axios = require("axios");
const User = require("../models/User.model");
const TrainingPlan = require("../models/TrainingPlan.models");
const router = express.Router();

// get all Patients Route

router.get("/allPatients", async (req, res, next) => {
  try {
    const allPatients = await User.find({ isPhysiotherapist: "false" });

    res.status(201).json({ allPatients });
  } catch (err) {
    next(err);
  }
});

// get One Patient Route

router.get("/onepatient/:patientId", async (req, res, next) => {
  try {
    const { patientId } = req.params;

    const onePatient = await User.findById(patientId);

    res.status(201).json({ onePatient });
  } catch (err) {
    next(err);
  }
});

// Route Exercise API

router.post("/exercisesApi", async (req, res, next) => {
  try {
    const config = {
      params: { limit: "10" },
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    };

    const url = "https://exercisedb.p.rapidapi.com/exercises";

    const exercisesFromAPI = await axios.get(url, config);

    console.log("exeercises from API", exercisesFromAPI.data);

    res.status(201).json(exercisesFromAPI.data);
  } catch (err) {
    next(err);
  }
});

// Add Exercise to Training Plan Route

router.post("/addExerciseTp", async (req, res, next) => {
  try {
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

// GET all Patient Training Plans

router.get("/allpatienttrainings/:patientId", async (req, res, next) => {
  try {
    const { patientId } = req.params;

    const allPatientTrainingPlans = await TrainingPlan.find({ patientId });

    res.status(201).json({ allPatientTrainingPlans });
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

    let exercisesFromApi = oneTrainingPlan.exercisesId.map(async (Id) => {
      const config = {
        params: { limit: "10" },
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      };
      const url = `https://exercisedb.p.rapidapi.com/exercises/exercise/${Id}`;

      const exercisesFromAPI = await axios.get(url, config);

      return exercisesFromAPI.data;
    });

    const promiseExercisesFromTP = Promise.all(exercisesFromApi);

    try {
      const exercisesFromTP = await promiseExercisesFromTP;
      res.status(201).json({
        oneTrainingPlan,
        exercisesFromTP,
      });
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    next(err);
  }
});

// Delete One Training Plan Routee
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

// Delete One Patient Routee
router.post("/deletpatient", async (req, res, next) => {
  try {
    const { userId } = req.body;

    const deletePatient = await User.findByIdAndRemove(userId);

    res.status(201).json({ message: "Account successfully removed" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
