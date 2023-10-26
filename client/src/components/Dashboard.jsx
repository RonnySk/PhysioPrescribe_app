import {
  Box,
  Button,
  createTheme,
  Link,
  Menu,
  MenuItem,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import AppsIcon from "@mui/icons-material/Apps";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import HomeIcon from "@mui/icons-material/Home";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import { AuthContext } from "../context/auth.context";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          backgroundColor: "black",
          width: { sm: 256, md: 256 },
          display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
          flexDirection: "column",
        }}
        position="static"
        color="white"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "left",

            p: 2,
            borderBottom: 0.5,
            borderColor: "#009BE514",
            "&:hover": {
              backgroundColor: "#009BE514",
            },
          }}
        >
          <HomeIcon sx={{ color: "#808080", ml: 1 }} fontSize="small" />
          <Link
            href="Home"
            underline="none"
            color="#808080"
            sx={{
              fontWeight: "bold",
              ml: 2,
            }}
          >
            Home
          </Link>
        </Box>
        <Box
          sx={{
            backgroundColor: "#101F33",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "left",

            p: 2,
            "&:hover": {
              backgroundColor: "#3b82f680",
            },
          }}
        >
          <PeopleIcon sx={{ color: "#808080", margin: 1 }} fontSize="small" />
          <Link
            href="/patients"
            underline="none"
            color="#808080"
            sx={{
              fontWeight: "bold",
              ml: 1,
            }}
          >
            Patients
          </Link>
        </Box>
        <Box
          sx={{
            backgroundColor: "#101F33",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "left",

            p: 2,
            "&:hover": {
              backgroundColor: "#3b82f680",
            },
          }}
        >
          <FitnessCenterIcon
            sx={{ color: "#808080", ml: 1 }}
            fontSize="small"
          />
          <Link
            href="/trainings"
            underline="none"
            color="#808080"
            sx={{
              fontWeight: "bold",
              ml: 2,
            }}
          >
            Exercises
          </Link>
        </Box>
        <Box
          sx={{
            backgroundColor: "#101F33",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "left",

            p: 2,
            "&:hover": {
              backgroundColor: "#3b82f680",
            },
          }}
        >
          <FolderOpenIcon sx={{ color: "#808080", ml: 1 }} fontSize="small" />
          <Link
            href="/trainings"
            underline="none"
            color="#808080"
            sx={{
              fontWeight: "bold",
              ml: 2,
            }}
          >
            Trainings Plan
          </Link>
        </Box>
        <Box
          sx={{
            backgroundColor: "#101F33",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "left",

            p: 2,
            borderBottom: 0.5,
            borderColor: "#009BE514",
            "&:hover": {
              backgroundColor: "#3b82f680",
            },
          }}
        >
          <SettingsIcon sx={{ color: "#808080", ml: 1 }} fontSize="small" />
          <Link
            href="/trainings"
            underline="none"
            color="#808080"
            sx={{
              fontWeight: "bold",
              ml: 2,
            }}
          >
            Settings
          </Link>
        </Box>
      </Box>

      {/* From here Small Menu */}

      <Box
        sx={{
          display: { xs: "flex", sm: "none", md: "none", lg: "none" },
          justifyContent: "left",
          backgroundColor: "primary.main",
          borderTop: 1,
          borderColor: "white",
        }}
      >
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <AppsIcon sx={{ color: "primary.dark" }} />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={handleClose}
            sx={{
              backgroundColor: "#EAEFF1",
            }}
          >
            <PeopleIcon
              sx={{ color: "primary.light", marginRight: 1 }}
              fontSize="small"
            />
            <Link href="/patients" underline="none" color="primary.light">
              Patients
            </Link>
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{
              backgroundColor: "#EAEFF1",
            }}
          >
            <FitnessCenterIcon
              sx={{ color: "primary.light", marginRight: 1 }}
              fontSize="small"
            />
            <Link href="/exercises" underline="none" color="primary.light">
              Exercises
            </Link>
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{
              backgroundColor: "#EAEFF1",
            }}
          >
            <FolderOpenIcon
              sx={{ color: "primary.light", marginRight: 1 }}
              fontSize="small"
            />
            <Link href="/trainingsPlan" underline="none" color="primary.light">
              Trainings Plan
            </Link>
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            sx={{
              backgroundColor: "#EAEFF1",
            }}
          >
            <SettingsIcon
              sx={{ color: "primary.light", marginRight: 1 }}
              fontSize="small"
            />
            <Link href="/settings" underline="none" color="primary.light">
              Settings
            </Link>
          </MenuItem>
        </Menu>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {user.name}
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;
