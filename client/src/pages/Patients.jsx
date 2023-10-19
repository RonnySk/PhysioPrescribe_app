import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import appService from "../services/app.service";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { Typography } from "@mui/material";

function Patients() {
  const [allPatients, setAllPatients] = useState([]);
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

  //   const getAllPatients = () => {
  //     axios.get();
  //   };

  return (
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
          height: "100vh",
        }}
      >
        {allPatients.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 15,
            }}
          >
            <HourglassTopIcon
              sx={{ color: "#808080", mb: 2 }}
              fontSize="medium"
            />
            <Typography sx={{ fontSize: 25 }} color="#808080">
              Loading...
            </Typography>
          </Box>
        ) : (
          allPatients.map((patient) => <Typography>{patient.name}</Typography>)
        )}
      </Box>
    </Box>
  );
}

export default Patients;
