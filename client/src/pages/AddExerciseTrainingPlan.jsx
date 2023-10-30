import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import appService from "../services/app.service";
import Exercises from "./Exercises";

function AddExerciseTrainingPlan() {
  const { training_id } = useParams();
  const [oneTrainingPlan, setOneTrainingPlan] = useState({});
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    appService
      .getOneTrainingPlan(training_id)
      .then((response) => {
        const { oneTrainingPlan } = response.data;
        console.log("resposta do treino", oneTrainingPlan);
        setOneTrainingPlan(oneTrainingPlan);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, []);

  return (
    <React.Fragment>
      <Exercises oneTrainingPlan={oneTrainingPlan} />
    </React.Fragment>
  );
}

export default AddExerciseTrainingPlan;
