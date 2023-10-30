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
import Dashboard from "../components/Dashboard";
import { AuthContext } from "../context/auth.context";
import appService from "../services/app.service";

function CreateTrainingPlan() {
  const { user } = useContext(AuthContext);
  const [allPatients, setAllPatients] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    appService
      .getAllPatients()
      .then((response) => {
        const { allPatients } = response.data;
        console.log("resposta do API", allPatients);
        setAllPatients(allPatients);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, []);

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
              Create a new Training Plan
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
                  // onChange={handleName}
                  sx={{ width: "100%" }}
                />
                <TextField
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  // onChange={handleName}
                  sx={{ width: "100%" }}
                />

                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-label">
                    Patients
                  </InputLabel>
                  <Select
                    id="demo-simple-select-label"
                    value=""
                    label="Patients"
                    // onChange={handlePhysiotherapist}
                  >
                    {allPatients.map((patient) => (
                      <MenuItem
                        key={patient.name}
                        value={patient.name}
                        // style={getStyles(name, personName, theme)}
                      >
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
                  // onClick={handleSubmit}
                >
                  Create
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default CreateTrainingPlan;
