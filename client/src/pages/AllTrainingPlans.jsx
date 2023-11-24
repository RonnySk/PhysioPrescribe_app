import {
  Box,
  Button,
  createTheme,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import Loading from "../components/Loading/Loading";
import appService from "../services/app.service";
import SearchIcon from "@mui/icons-material/Search";
import FolderIcon from "@mui/icons-material/Folder";
import Paper from "@mui/material/Paper";

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
            <Typography variant="h4" color="#808080" mt={3}>
              Training Plans
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "center",
                alignItems: "center",
                m: 2,
              }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "primary.main",
                  m: 2,
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                }}
                onClick={() => setfilteredTrainingPlans([])}
              >
                All Training Plans
              </Button>
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
                href={"/createtrainingplan"}
              >
                Create new Training Plan
              </Button>
            </Box>

            <Box
              sx={{
                display: { xs: "block", sm: "flex", md: "flex", lg: "flex" },
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
              }}
            >
              <TextField
                id="outlined-basic"
                label="Patient name"
                variant="outlined"
                onChange={handleSearchInput}
                sx={{ width: { xs: "60%", sm: "30%" } }}
              ></TextField>
              <IconButton
                type="button"
                onClick={handleSearchSubmit}
                sx={{ p: "10px" }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Box>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: "70%" }}>
                <TableHead>
                  <TableRow
                    sx={{ backgroundColor: "primary.main", color: "#000000" }}
                  >
                    <TableCell sx={{ color: "white" }}>Patient</TableCell>
                    <TableCell sx={{ color: "white" }} align="center">
                      Training Name
                    </TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTrainingPlans.length === 0
                    ? allTrainingPlans.map((oneTrainingPlan) => (
                        <TableRow key={oneTrainingPlan._id}>
                          <TableCell component="th" scope="row">
                            {oneTrainingPlan.patientId.name}
                          </TableCell>
                          <TableCell align="center">
                            {oneTrainingPlan.trainingName}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              href={`/trainingplan/${oneTrainingPlan._id}`}
                            >
                              <FolderIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    : filteredTrainingPlans.map((oneTrainingPlan) => (
                        <TableRow key={oneTrainingPlan._id}>
                          <TableCell component="th" scope="row">
                            {oneTrainingPlan.patientId.name}
                          </TableCell>
                          <TableCell align="center">
                            {oneTrainingPlan.trainingName}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              href={`/trainingplan/${oneTrainingPlan._id}`}
                            >
                              <FolderIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AllTrainingPlans;