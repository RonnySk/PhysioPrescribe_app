import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

function ExerciseCard({ oneExercise }) {
  console.log("teste do card", oneExercise);
  return (
    <React.Fragment>
      <Stack spacing={2} border={2}>
        <Typography variant="h4" color="#808080">
          {oneExercise.name}
        </Typography>

        <Typography variant="p" color="#808080">
          {oneExercise.type}
        </Typography>
      </Stack>
    </React.Fragment>
  );
}

export default ExerciseCard;
