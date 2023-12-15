import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import appService from "../services/app.service";
import SearchIcon from "@mui/icons-material/Search";
import FolderIcon from "@mui/icons-material/Folder";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
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
import Loading from "../components/Loading/Loading";

function Patients() {
  const { patientId } = useParams();
  const [onePatient, setOnePatient] = useState({});
  const [allPatients, setAllPatients] = useState([]);
  const [allPatientTrainingPlans, setAllPatientTrainingPlans] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [notFoundPatient, setNotFoundPatient] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    appService
      .getAllPatientTrainings(patientId)
      .then((response) => {
        const { allPatientTrainingPlans } = response.data;
        setAllPatientTrainingPlans(allPatientTrainingPlans);
      })

      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });

    appService
      .getOnePatient(patientId)
      .then((response) => {
        const { onePatient } = response.data;
        setOnePatient(onePatient);
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
            <Typography variant="h4" color="#808080" mt={3} mb={3}>
              {onePatient.name}
            </Typography>

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
                      Training name
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="center">
                      Training Plan
                    </TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allPatientTrainingPlans.length === 0 ? (
                    <Box>
                      <Loading />
                    </Box>
                  ) : (
                    allPatientTrainingPlans.map((oneTraining) => (
                      <TableRow key={oneTraining._id}>
                        <TableCell component="th" scope="row" align="center">
                          {oneTraining.trainingName}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton href={`/trainingplan/${oneTraining._id}`}>
                            <FolderIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
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
