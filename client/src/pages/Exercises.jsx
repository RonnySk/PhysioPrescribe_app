import {
  Autocomplete,
  Button,
  createTheme,
  Input,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import appService from "../services/app.service";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import ExerciseCard from "../components/ExerciseCard";

function Exercises() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [muscle, setMuscle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [exercises, setExercises] = useState([]);
  const [exercisesNotFound, setExerciseNotFound] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  let theme = createTheme({
    palette: {
      primary: {
        light: "#1976D2",
        main: "#009be5",
        dark: "#00008B",
      },
    },
  });

  const handleName = (e) => setName(e.target.value);
  const handleType = (event, newInputValue) => setType(newInputValue);
  const handleMuscle = (event, newInputValue) => setMuscle(newInputValue);
  const handlDifficulty = (event, newInputValue) =>
    setDifficulty(newInputValue);

  const handleSubmit = () => {
    setExercises([]);
    const requestBody = {
      name,
      type,
      muscle,
      difficulty,
    };

    appService
      .getExercisesAPI(requestBody)
      .then((response) => {
        if (response.data.length === 0) {
          setExerciseNotFound("No exercise found, search again!");
        } else {
          setExercises(response.data);
        }
        console.log("teste api", response.data);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  console.log("os exercicios", exercises);

  console.log("tipos", type, "name", name);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "#EAEFF1",
          display: { xs: "block", sm: "flex", md: "flex", lg: "flex" },
          flexDirection: "row",
        }}
      >
        <Dashboard />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100vw",
            height: "100%",
            mt: 5,
          }}
        >
          <Box
            mb={4}
            sx={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              borderRadius: 5,
              width: { xs: "90%", sm: "90%", md: "80%" },
            }}
          >
            <Typography variant="h4" color="#808080" mt={2}>
              Exercises
            </Typography>
            <form style={{ width: "100%" }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 2, sm: 2, md: 4 }}
                sx={{
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                }}
                mt={5}
                ml={3}
                mr={3}
                mb={4}
              >
                <TextField
                  id="outlined-basic"
                  label="Exercise name"
                  variant="outlined"
                  onChange={handleName}
                  sx={{ width: "100%" }}
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
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Type" />
                  )}
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
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Muscle" />
                  )}
                />
                <Autocomplete
                  disablePortal
                  inputValue={difficulty}
                  onInputChange={handlDifficulty}
                  options={["beginner", "intermediate", "expert"]}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Difficulty" />
                  )}
                />
              </Stack>
              <Button
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                }}
                onClick={handleSubmit}
              >
                Search
              </Button>
            </form>

            {exercises.length === 0 ? (
              <Typography fontSize={18} m={3} color="#808080">
                {exercisesNotFound}
              </Typography>
            ) : (
              exercises.map((exercise) => (
                <ExerciseCard oneExercise={exercise} />
              ))
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Exercises;
