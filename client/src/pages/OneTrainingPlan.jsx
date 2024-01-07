import { ThemeProvider } from "@emotion/react";
import { createTheme, Typography, Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import ExerciseCard from "../components/ExerciseCard";
import Loading from "../components/Loading/Loading";
import { AuthContext } from "../context/auth.context";
import appService from "../services/app.service";

function OneTrainingPlan() {
  const { user } = useContext(AuthContext);
  const { training_id } = useParams();
  const [oneTrainingPlan, setOneTrainingPlan] = useState({});
  const [oneExercise, setOneExercise] = useState({});
  const [trainingPlanExercises, setTrainingPlanExercises] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    appService
      .getOneTrainingPlan(training_id)
      .then((response) => {
        const { oneTrainingPlan, exercisesFromTP } = response.data;
        setOneTrainingPlan(oneTrainingPlan);
        setTrainingPlanExercises(exercisesFromTP);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, [training_id]);

  const handleDeleteTrainigPlan = () => {
    appService
      .deleteOneTrainingPlan(training_id)
      .then((response) => {
        alert("Training Plan removed successfully!");
        navigate("/trainingplans");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleDeleteExercise = (exercise) => {
    const requestBody = { training_id, exercise };
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
            <Typography variant="h4" color="#808080" mt={3}>
              Training Plan
            </Typography>
            {Object.keys(oneTrainingPlan).length === 0 ? (
              <Box>
                <Loading />
              </Box>
            ) : (
              <>
                <Stack mb={2} mt={2}>
                  <Typography variant="p" fontSize={14} color="#808080">
                    Training Plan Name: {oneTrainingPlan.trainingName}
                  </Typography>
                  <Typography variant="p" fontSize={14} color="#808080">
                    Patient: {oneTrainingPlan.patientId.name}
                  </Typography>
                </Stack>
                {user.isPhysiotherapist ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      href={`/addexercises/${training_id}`}
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
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleDeleteTrainigPlan}
                      sx={{
                        mb: 2,
                        backgroundColor: "primary.main",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "primary.light",
                        },
                      }}
                    >
                      Delete Training Plan
                    </Button>
                  </Box>
                ) : null}
              </>
            )}
            {trainingPlanExercises.length >= 1
              ? trainingPlanExercises.map((exercise) => (
                  <>
                    <ExerciseCard
                      key={exercise.id}
                      training_id={training_id}
                      oneExercise={exercise}
                    />
                    {user.isPhysiotherapist ? (
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
                        onClick={() => {
                          handleDeleteExercise(exercise);
                        }}
                      >
                        Delete exercise
                      </Button>
                    ) : null}
                  </>
                ))
              : null}{" "}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default OneTrainingPlan;
