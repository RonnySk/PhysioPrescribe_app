import { Link, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Dashboard from "../components/Dashboard";

function HomePage() {
  const { user } = useContext(AuthContext);

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
          WELCOME {user.name.toUpperCase()}
        </Typography>

        {user.isPhysiotherapist ? (
          <Stack
            direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
            spacing={2}
            alignItems="center"
            justifyContent="flex-start"
          >
            <Link
              href="/patients"
              sx={{
                backgroundColor: "white",
                border: 1,
                borderRadius: 3,
                p: 5,
                width: 150,
                fontSize: 20,
              }}
              underline="none"
            >
              Patients
            </Link>
            <Link
              href="/exercises"
              sx={{
                backgroundColor: "white",
                border: 1,
                borderRadius: 3,
                p: 5,
                width: 150,
                fontSize: 20,
              }}
              underline="none"
            >
              Exercises
            </Link>
            <Link
              href="/trainingplans"
              sx={{
                backgroundColor: "white",
                border: 1,
                borderRadius: 3,
                p: 5,
                width: 150,
                fontSize: 20,
              }}
              underline="none"
            >
              Training Plans
            </Link>
          </Stack>
        ) : (
          <Stack
            direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
            spacing={2}
            alignItems="center"
            justifyContent="flex-start"
          >
            <Link
              href={`/patienttrainingplans/${user._id}`}
              sx={{
                backgroundColor: "white",
                border: 1,
                borderRadius: 3,
                p: 5,
                width: 150,
                fontSize: 20,
              }}
              underline="none"
            >
              Training Plans
            </Link>
            <Link
              // href="/exercises"
              sx={{
                backgroundColor: "white",
                border: 1,
                borderRadius: 3,
                p: 5,
                width: 150,
                fontSize: 20,
              }}
              underline="none"
            >
              Settings
            </Link>
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default HomePage;
