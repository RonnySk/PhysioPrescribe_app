import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import Dashboard from "../components/Dashboard";
import appService from "../services/app.service";
import { useNavigate } from "react-router-dom";

function Account() {
  const { user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(user._id);

  console.log("user id", userId);

  const handlePatientDelete = () => {
    const requestBody = { userId };
    appService
      .deletePatient(requestBody)
      .then((response) => {
        const { message } = response.data;
        alert(message);
        logOutUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        console.log(errorDescription);
      });
  };

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
        <Typography variant="h4" color="#808080" m={7}>
          {user.name.toUpperCase()}
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
          spacing={2}
          alignItems="center"
          justifyContent="flex-start"
        >
          <Button
            sx={{
              backgroundColor: "white",
              border: 1,
              borderRadius: 3,
              p: 3,
              fontSize: 20,
            }}
            onClick={handlePatientDelete}
          >
            Delete Account
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default Account;
