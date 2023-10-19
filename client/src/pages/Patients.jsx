import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import appService from "../services/app.service";
function Patients() {
  const [allPatients, setAllPatients] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    appService
      .getAllPatients()
      .then((response) => {
        setAllPatients(response.data);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  }, []);

  console.log(allPatients);
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
      ></Box>
    </Box>
  );
}

export default Patients;
