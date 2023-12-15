import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import appService from "../services/app.service";
import SearchIcon from "@mui/icons-material/Search";
import FolderIcon from "@mui/icons-material/Folder";
import Paper from "@mui/material/Paper";
import {
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

function Patients() {
  const [allPatients, setAllPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [notFoundPatient, setNotFoundPatient] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    appService
      .getAllPatients()
      .then((response) => {
        const { allPatients } = response.data;
        setAllPatients(allPatients);
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

  console.log("search info", searchInput);

  const handleSearchSubmit = () => {
    setNotFoundPatient("");

    const filteredPatients = allPatients.filter((onePatient) => {
      if (searchInput !== "") {
        if (onePatient.name.toLowerCase().includes(searchInput))
          return onePatient;
      }
    });

    if (filteredPatients.length === 0) {
      setNotFoundPatient("Patient not found!");
    } else {
      setFilteredPatients(filteredPatients);
    }
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
              Patients
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
                onClick={() => {
                  setFilteredPatients([]);
                  setNotFoundPatient("");
                }}
              >
                All Patients
              </Button>
            </Box>

            <Box
              sx={{
                display: {
                  xs: "block",
                  sm: "flex",
                  md: "flex",
                  lg: "flex",
                },
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
            {notFoundPatient !== "" ? (
              <Typography variant="p" color="red" mt={1} mb={2}>
                {notFoundPatient}
              </Typography>
            ) : null}

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: "70%" }}>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "primary.main",
                      color: "#000000",
                    }}
                  >
                    <TableCell sx={{ color: "white" }} align="center">
                      Patient
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="center">
                      Trainings Plans
                    </TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPatients.length === 0
                    ? allPatients.map((onePatient) => (
                        <TableRow key={onePatient._id}>
                          <TableCell component="th" scope="row" align="center">
                            {onePatient.name}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                            // href={`/trainingplan/${}`}
                            >
                              <FolderIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    : filteredPatients.map((onePatient) => (
                        <TableRow key={onePatient._id}>
                          <TableCell component="th" scope="row" align="center">
                            {onePatient.name}
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                            // href={`/trainingplan/${}`}
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

export default Patients;
