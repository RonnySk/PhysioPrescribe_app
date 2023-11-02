import { ThemeProvider } from "@emotion/react";
import { createTheme, Typography, Button } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import appService from "../services/app.service";
import Exercises from "./Exercises";

function TrainingPlan() {
  const { training_id } = useParams();
  const [oneTrainingPlan, setOneTrainingPlan] = useState({});
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    appService
      .getOneTrainingPlan(training_id)
      .then((response) => {
        const { oneTrainingPlan } = response.data;
        setOneTrainingPlan(oneTrainingPlan);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, []);

  console.log("log fora", oneTrainingPlan);
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
            height: "100%",
            mt: 2,
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
              Training Plan
            </Typography>

            {Object.keys(oneTrainingPlan).length === 0 ? (
              <Box>
                <Typography>Loading...</Typography>
              </Box>
            ) : (
              <>
                <Stack mb={2}>
                  <Typography variant="p" fontSize={14} color="#808080">
                    Training Plan Name: {oneTrainingPlan.trainingName}
                  </Typography>
                  <Typography variant="p" fontSize={14} color="#808080">
                    Patient: {oneTrainingPlan.patientId.name}
                  </Typography>
                  {/* card com os exercicios... */}
                </Stack>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
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
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      mb: 2,
                      backgroundColor: "primary.main",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "primary.light",
                      },
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default TrainingPlan;
