import {
  Box,
  Button,
  createTheme,
  Link,
  Menu,
  MenuItem,
  ThemeProvider,
  Typography,
  useRadioGroup,
} from "@mui/material";
import React, { useContext } from "react";
import AppsIcon from "@mui/icons-material/Apps";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../../context/auth.context";

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
        light: "#63ccff",
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
          display: { xs: "none", sm: "block", md: "block", lg: "block" },
          height: "100vh",
        }}
        position="static"
        color="white"
      >
        Teste porra
      </Box>
      {/* From here Mini Menu */}
      <Box
        sx={{
          display: { xs: "flex", md: "none", lg: "none" },
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
          sx={{
            color: "black",
          }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            <FolderOpenIcon
              sx={{ color: "primary.dark", marginRight: 1 }}
              fontSize="small"
            />
            <Link href="/login" underline="none" color="primary.dark">
              Your Trainings
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <AccountCircleIcon
              sx={{ color: "primary.dark", marginRight: 1 }}
              fontSize="small"
            />
            <Link href="/signup" underline="none" color="primary.dark">
              Account
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
