import {
  Button,
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import { AuthContext } from "../context/auth.context";
import appService from "../services/app.service";

function CreateTrainingPlan() {
  const { user } = useContext(AuthContext);
  const [therapeutId, setTherapeutId] = useState(user._id);
  const [allPatients, setAllPatients] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [trainingName, setTrainingName] = useState("");
  const [trainingDescription, setTrainingDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    appService
      .getAllPatients()
      .then((response) => {
        const { allPatients } = response.data;
        console.log("all patients", allPatients);
        setAllPatients(allPatients);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, []);

  const handlePatientId = (e) => {
    setPatientId(e.target.value);
    setPatientName(e.target.value);
  };
  const handleTrainingName = (e) => setTrainingName(e.target.value);
  const handleTrainingDescription = (e) =>
    setTrainingDescription(e.target.value);

  const handleCreateTrainingPlan = () => {
    const requestBody = {
      therapeutId,
      patientId,
      trainingName,
      trainingDescription,
    };

    appService
      .createTrainingPlan(requestBody)
      .then((response) => {
        const { newTrainingPlan } = response.data;
        navigate(`/trainingplan/${newTrainingPlan._id}`);
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
              Create new Training Plan
            </Typography>
            <form style={{ width: "100%" }}>
              <Stack
                direction="column"
                spacing={{ xs: 2, sm: 2, md: 4 }}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                  backgroundColor: "white",
                  borderRadius: 5,
                }}
                mt={5}
                ml={3}
                mr={3}
                mb={4}
              >
                <TextField
                  id="outlined-basic"
                  label="Training name"
                  variant="outlined"
                  onChange={handleTrainingName}
                  sx={{ width: "100%" }}
                />
                <TextField
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  onChange={handleTrainingDescription}
                  sx={{ width: "100%" }}
                />

                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-label">
                    Patients
                  </InputLabel>
                  <Select
                    id="demo-simple-select-label"
                    value={patientName}
                    label="Patients"
                    onChange={handlePatientId}
                  >
                    {allPatients.map((patient) => (
                      <MenuItem key={patient._id} value={patient._id}>
                        {patient.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "primary.light",
                    },
                  }}
                  size="large"
                  onClick={handleCreateTrainingPlan}
                >
                  Create
                </Button>
              </Stack>
            </form>
            {errorMessage && (
              <Typography variant="p" color="#808080" mb={2}>
                {errorMessage}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default CreateTrainingPlan;
