import {
  Box,
  Button,
  createTheme,
  IconButton,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import Loading from "../components/Loading/Loading";
import appService from "../services/app.service";
import SearchIcon from "@mui/icons-material/Search";

function AllTrainingPlans() {
  const [allTrainingPlans, setAllTrainingPlans] = useState([]);
  const [filteredTrainingPlans, setfilteredTrainingPlans] = useState([]);
  const [searchInput, setSearchInput] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    appService
      .getAllTrainingPlans()
      .then((response) => {
        const { allTrainingPlans } = response.data;
        // console.log("all training from DB", allTrainingPlans);
        setAllTrainingPlans(allTrainingPlans);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, []);

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value.toLowerCase());
  };

  const handleSearchSubmit = () => {
    // // const requestBody = { a };
    // appService
    //   .getSearchedPatientsTraining(searchInput)
    //   .then((response) => {
    //     console.log("response from search", response.data);
    //   })
    //   .catch((error) => {
    //     const errorDescription = error.response.data.message;
    //     setErrorMessage(errorDescription);
    //   });
    const filteredTrainings = allTrainingPlans.filter((oneTraining) => {
      if (searchInput === "") {
        return oneTraining;
      } else {
        return oneTraining.trainingName.toLowerCase().includes(searchInput);
      }
    });
    setfilteredTrainingPlans(filteredTrainings);
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
            backgroundColor: "#EAEFF1",
            display: { xs: "block", sm: "flex", md: "flex", lg: "flex" },
            flexDirection: "column",
            justifyContent: "flex-start",
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
              borderRadius: 5,
              width: { xs: "90%", sm: "90%", md: "80%" },
            }}
          >
            <Typography variant="h4" color="#808080" m={2}>
              Training Plans
            </Typography>
            <TextField
              id="outlined-basic"
              label="Patient name"
              variant="outlined"
              onChange={handleSearchInput}
              sx={{ width: "100%" }}
            ></TextField>
            <IconButton
              type="button"
              onClick={handleSearchSubmit}
              sx={{ p: "10px" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <Button
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.light",
                },
              }}
              onClick={() => setfilteredTrainingPlans([])}
            >
              All Training Plans
            </Button>
            <Stack
              direction="row"
              justifyContent="flex-start"
              color="white"
              spacing="18%"
              pl="6%"
              sx={{ backgroundColor: "primary.main" }}
            >
              <Typography>Patient</Typography>
              <Typography>Plan</Typography>
            </Stack>

            {filteredTrainingPlans.length === 0
              ? allTrainingPlans.map((oneTrainingPlan) => (
                  <>
                    <Stack
                      justifyContent="space-around"
                      alignItems="center"
                      direction="row"
                      spacing={1}
                      p={1}
                      borderTop={1}
                      ml={4}
                      mr={4}
                    >
                      <Typography>{oneTrainingPlan.patientId.name}</Typography>
                      <Typography>{oneTrainingPlan.trainingName}</Typography>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "primary.main",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "primary.light",
                          },
                        }}
                        href={`/trainingplan/${oneTrainingPlan._id}`}
                      >
                        Open
                      </Button>
                    </Stack>
                  </>
                ))
              : filteredTrainingPlans.map((oneTrainingPlan) => (
                  <>
                    <Stack
                      justifyContent="space-around"
                      alignItems="center"
                      direction="row"
                      spacing={1}
                      p={1}
                      borderTop={1}
                      ml={4}
                      mr={4}
                    >
                      <Typography>{oneTrainingPlan.patientId.name}</Typography>
                      <Typography>{oneTrainingPlan.trainingName}</Typography>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "primary.main",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "primary.light",
                          },
                        }}
                        href={`/trainingplan/${oneTrainingPlan._id}`}
                      >
                        Open
                      </Button>
                    </Stack>
                  </>
                ))}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AllTrainingPlans;
