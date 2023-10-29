import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Stack,
  Link,
  Typography,
  createTheme,
  ThemeProvider,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import { Image } from "mui-image";
import MenuIcon from "@mui/icons-material/Menu";
import Logout from "@mui/icons-material/Logout";
import logoSide from "../images/logo_side.png";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

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
      <Box flexGrow={1}>
        <AppBar sx={{ backgroundColor: "primary" }} position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <IconButton href="/">
              <Image src={logoSide} duration={0} width={250} />
            </IconButton>

            {/* Small Menu */}

            <Box sx={{ display: { xs: "block", md: "none", lg: "none" } }}>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                color="inherit"
              >
                <MenuIcon sx={{ color: "primary.dark" }} />
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
                {!isLoggedIn && (
                  <>
                    <MenuItem onClick={handleClose}>
                      <Link href="/login" underline="none" color="primary.dark">
                        Login
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link
                        href="/signup"
                        underline="none"
                        color="primary.dark"
                      >
                        Sign up
                      </Link>
                    </MenuItem>
                  </>
                )}
                {isLoggedIn && (
                  <>
                    <MenuItem onClick={(handleClose, logOutUser)}>
                      <ListItemIcon>
                        <Logout
                          sx={{ color: "primary.dark" }}
                          fontSize="small"
                        />
                      </ListItemIcon>
                      <Link
                        href="#atendimento"
                        underline="none"
                        color="primary.dark"
                      >
                        Logout
                      </Link>
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>

            {/* Normal menu */}

            <Box sx={{ display: { xs: "none", md: "block", lg: "block" } }}>
              <Stack direction="row" spacing={2}>
                {!isLoggedIn && (
                  <>
                    <Link
                      href="/login"
                      underline="none"
                      color="white"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 17,
                        p: 1,
                        "&:hover": {
                          color: "white",
                          backgroundColor: "#318CE7",
                          borderRadius: 2,
                          p: 1,
                        },
                      }}
                    >
                      LOGIN
                    </Link>
                    <Link
                      href="/signup"
                      underline="none"
                      color="white"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 17,
                        p: 1,
                        "&:hover": {
                          color: "white",
                          backgroundColor: "#318CE7",
                          borderRadius: 2,
                          p: 1,
                        },
                      }}
                    >
                      SIGN UP
                    </Link>
                  </>
                )}

                {isLoggedIn && (
                  <>
                    <Link
                      href="/"
                      underline="none"
                      color="white"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 17,
                        p: 1,
                        "&:hover": {
                          color: "white",
                          backgroundColor: "#318CE7",
                          borderRadius: 2,
                          p: 1,
                        },
                      }}
                      onClick={logOutUser}
                    >
                      LOGOUT
                    </Link>
                  </>
                )}
              </Stack>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default Navbar;
