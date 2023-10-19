import {
  Autocomplete,
  Button,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import appService from "../services/app.service";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

function Exercises() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [muscle, setMuscle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [exercises, setExercises] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleName = (e) => setName(e.target.value);
  const handleType = (event, newInputValue) => setType(newInputValue);
  const handleMuscle = (event, newInputValue) => setMuscle(newInputValue);
  const handlDifficulty = (event, newInputValue) =>
    setDifficulty(newInputValue);

  const handleSubmit = () => {
    const requestBody = {
      name,
      type,
      muscle,
      difficulty,
    };
    appService
      .getExercisesAPI(requestBody)
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  console.log("os exercicios", exercises);

  console.log("tipos", type, "name", name);

  return (
    <Box
      sx={{
        backgroundColor: "#EAEFF1",
        display: { xs: "block", sm: "flex", md: "flex", lg: "flex" },
        flexDirection: "row",
        height: "100vh",
      }}
    >
      <Dashboard />
      <Box
        sx={{
          backgroundColor: "#EAEFF1",
          display: { xs: "block", sm: "flex", md: "flex", lg: "flex" },
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          mt: 7,
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            display: { xs: "block", sm: "flex", md: "flex", lg: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            width: "60vw",
            height: "40vh",
          }}
        >
          <form>
            <TextField
              id="outlined-basic"
              label="Exercise name"
              variant="outlined"
              onChange={handleName}
            />

            <Autocomplete
              disablePortal
              inputValue={type}
              onInputChange={handleType}
              options={[
                "cardio",
                "olympic_weightlifting",
                "plyometrics",
                "powerlifting",
                "strength",
                "stretching",
                "strongman",
              ]}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Type" />}
            />
            <Autocomplete
              disablePortal
              inputValue={muscle}
              onInputChange={handleMuscle}
              options={[
                "abdominals",
                "abductors",
                "adductors",
                "biceps",
                "calves",
                "chest",
                "forearms",
                "glutes",
                "hamstrings",
                "lats",
                "lower_back",
                "middle_back",
                "neck",
                "quadriceps",
                "traps",
                "triceps",
              ]}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Muscle" />}
            />
            <Autocomplete
              disablePortal
              inputValue={difficulty}
              onInputChange={handlDifficulty}
              options={["beginner", "intermediate", "expert"]}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Difficulty" />
              )}
            />
            <Button onClick={handleSubmit}>Search</Button>
          </form>

          {exercises.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 15,
              }}
            >
              <HourglassTopIcon
                sx={{ color: "#808080", mb: 2 }}
                fontSize="medium"
              />
              <Typography sx={{ fontSize: 25 }} color="#808080">
                Loading...
              </Typography>
            </Box>
          ) : (
            exercises.map((exercise) => (
              <Stack border={1} spacing={2}>
                <Typography m={2} variant="h1" fontSize={20}>
                  {exercise.name}
                </Typography>
              </Stack>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Exercises;
