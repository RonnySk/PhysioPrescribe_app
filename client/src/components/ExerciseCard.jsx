import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import appService from "../services/app.service";

function ExerciseCard({ oneExercise, training_id }) {
  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleAddExercise = () => {
    const requestBody = { training_id, oneExercise };

    appService
      .addExercisesTrainingPlan(requestBody)
      .then((response) => {
        const { message } = response.data;
        alert(message);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleDeleteExercise = () => {
    const requestBody = { training_id, oneExercise };

    appService
      .deleteExerciseTrainingPlan(requestBody)
      .then((response) => {
        const { message } = response.data;
        alert(message);
        window.location.reload(false);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <React.Fragment>
      <Stack
        spacing={2}
        border={2}
        borderRadius={2}
        borderColor={"#808080"}
        padding={3}
        margin={2}
      >
        <Typography variant="h4" color="#808080">
          {oneExercise.name}
        </Typography>
        <Typography variant="p" color="#808080">
          Equipment: {oneExercise.equipment}
        </Typography>
        <Typography variant="p" color="#808080">
          Body Part: {oneExercise.bodyPart}
        </Typography>
        <Typography variant="p" color="#808080">
          {oneExercise.instructions}
        </Typography>
        {!user.isPhysiotherapist ? null : training_id ? (
          <>
            <Button
              variant="contained"
              size="small"
              sx={{
                mr: 2,
                mb: 2,
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.light",
                },
              }}
              onClick={handleAddExercise}
            >
              Add exercise
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{
                mr: 2,
                mb: 2,
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.light",
                },
              }}
              onClick={handleDeleteExercise}
            >
              Delete exercise
            </Button>
          </>
        ) : null}
      </Stack>
    </React.Fragment>
  );
}

export default ExerciseCard;
