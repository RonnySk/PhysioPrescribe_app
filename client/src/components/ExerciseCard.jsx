import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

function ExerciseCard({ oneExercise, exerciseId }) {
  console.log("teste do card", oneExercise, exerciseId);
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
          Difficulty: {oneExercise.difficulty}
        </Typography>{" "}
        <Typography variant="p" color="#808080">
          Type: {oneExercise.type}
        </Typography>
        <Typography variant="p" color="#808080">
          {oneExercise.instructions}
        </Typography>
        {exerciseId.length !== 0 && (
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
          >
            Add exercise
          </Button>
        )}
      </Stack>
    </React.Fragment>
  );
}

export default ExerciseCard;
