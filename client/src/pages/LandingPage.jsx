import { Button, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import Image from "mui-image";
import React from "react";
import firstFoto from "../images/HomeWorkout.jpg";
import bgImg from "../images/backgroundLines.png";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function LandingPage() {
  return (
    <React.Fragment>
      <Image
        src={firstFoto}
        alt="man doing exercise in front of notebook"
        height={350}
      />
      <Stack
        sx={{
          width: "100%",
          height: "60%",
          backgroundImage: `url(${bgImg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" color="#808080" fontSize={26} p={3}>
          Your Personalized Physiotherapy Training at Home!
        </Typography>
        <FitnessCenterIcon sx={{ color: "#808080", mt: 2 }} fontSize="large" />
        <Typography variant="p" color="#808080" fontSize={18} p={3}>
          As a Patient, have your treatment plan available on your computer,
          tablet or cellphone.
        </Typography>
        <AccessTimeIcon sx={{ color: "#808080", mt: 2 }} fontSize="large" />
        <Typography variant="p" color="#808080" fontSize={18} p={3}>
          Save time by doing the exercises prescribed by your therapist
          anywhere!
        </Typography>
        <FolderOpenIcon sx={{ color: "#808080", mt: 2 }} fontSize="large" />
        <Typography variant="p" color="#808080" fontSize={18} p={3}>
          As a therapist, prescribe exercises for your patients without worrying
          about pen and paper. More than 10,000 options available.
        </Typography>
        <Button
          variant="contained"
          href="/signup"
          size="small"
          sx={{ p: 1.5, mb: 2, backgroundColor: "#009be5" }}
        >
          Start your training now!
        </Button>
      </Stack>
      <Stack
        sx={{
          backgroundColor: "#009be5",
          width: "100vw",
          color: "white",
        }}
        alignItems="center"
      >
        <Typography mt={2}>Developed by Ronny Skaraboto</Typography>
        <Box>
          <IconButton href="https://github.com/RonnySk" target="_blank">
            <GitHubIcon sx={{ m: 1, color: "white" }} fontSize="large" />
          </IconButton>
          <IconButton
            href="https://www.linkedin.com/in/ronny-skaraboto/"
            target="_blank"
          >
            <LinkedInIcon sx={{ m: 1, color: "white" }} fontSize="large" />
          </IconButton>
        </Box>
      </Stack>
    </React.Fragment>
  );
}

export default LandingPage;
