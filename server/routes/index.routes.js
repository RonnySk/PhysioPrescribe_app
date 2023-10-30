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
    res.json({ allPatients });
  } catch (err) {
    next(err);
  }
});

// get exercises from Api Route
router.post("/exercisesApi", async (req, res, next) => {
  try {
    const { name, type, muscle, difficulty } = req.body;
    const config = {
      headers: {
        "X-Api-Key": process.env.REACT_APP_X_API_KEY,
      },
    };

    const url = `https://api.api-ninjas.com/v1/exercises?name=${name}&type=${type}&muscle=${muscle}&difficulty=${difficulty}`;

    axios.get(url, config).then((response) => {
      console.log("response from API", response.data);
      res.json(response.data);
    });
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

module.exports = router;
