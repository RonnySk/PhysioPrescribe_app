import {
  Autocomplete,
  Button,
  createTheme,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import appService from "../services/app.service";
import ExerciseCard from "../components/ExerciseCard";
import { useParams } from "react-router-dom";

function Exercises(props) {
  const { training_id } = useParams();
  const [oneTrainingPlan, setOneTrainingPlan] = useState({});
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [muscle, setMuscle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [exercises, setExercises] = useState([]);
  const [exercisesNotFound, setExerciseNotFound] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  console.log("id do TP no Params", training_id);

  useEffect(() => {
    setExercises([]);

    if (training_id !== undefined) {
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
    }
    appService
      .ExercisesAPI()
      .then((response) => {
        if (response.data.length === 0) {
          setExerciseNotFound("No exercise found, search again!");
        } else {
          setExercises(response.data);
          console.log("exercise from Api", response.data);
        }
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, []);

  const handleName = (e) => setName(e.target.value);
  const handleType = (event, newInputValue) => setType(newInputValue);
  const handleMuscle = (event, newInputValue) => setMuscle(newInputValue);
  const handlDifficulty = (event, newInputValue) =>
    setDifficulty(newInputValue);

  const handleSubmit = () => {};

  let theme = createTheme({
    palette: {
      primary: {
        light: "#1976D2",
        main: "#009be5",
        dark: "#00008B",
      },
    },
  });

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
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            mt: 5,
          }}
        >
          {Object.keys(oneTrainingPlan).length !== 0 ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Stack mb={2}>
                <Typography variant="p" fontSize={14} color="#808080">
                  Training Plan: {oneTrainingPlan.trainingName}
                </Typography>
                <Typography variant="p" fontSize={14} color="#808080">
                  Patient: {oneTrainingPlan.patientId.name}
                </Typography>
              </Stack>
              <Button
                variant="contained"
                size="small"
                sx={{
                  ml: 2,
                  mr: 2,
                  mb: 2,
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                }}
              >
                Open Plan
              </Button>
            </Box>
          ) : null}
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
              <Typography fontSize={18} m={3} color="#FF0000">
                {exercisesNotFound}
              </Typography>
            ) : (
              exercises.map((exercise, index) => (
                <ExerciseCard
                  key={exercise.id}
                  training_id={training_id}
                  oneExercise={exercise}
                />
              ))
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Exercises;