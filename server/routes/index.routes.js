const express = require("express");
const User = require("../models/User.model");
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

module.exports = router;
