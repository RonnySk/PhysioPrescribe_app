const { Schema, model } = require("mongoose");

const trainingPlanSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Name is required."],
    },
    therapeutId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    exercisesId: [
      {
        type: String,
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const TrainingPlan = model("TrainingPlan", trainingPlanSchema);

module.exports = TrainingPlan;
