import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

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
        dark: "#006db3",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box flexGrow={1}>
        <AppBar sx={{ backgroundColor: "primary" }} position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography
              component="a"
              href="/"
              sx={{
                color: "inherit",
                textDecoration: "none",
                fontSize: 30,
              }}
            >
              PhysioPrescribe
            </Typography>
            <Box sx={{ display: { xs: "block", md: "none", lg: "none" } }}>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                color="inherit"
              >
                <MenuIcon sx={{ color: "darkblue" }} />
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
                  sx={{ backgroundColor: "#6aa9e9" }}
                  onClick={handleClose}
                >
                  <Link href="#sobremim" underline="none" color="white">
                    Sobre mim
                  </Link>
                </MenuItem>
                <MenuItem
                  sx={{ backgroundColor: "#6aa9e9" }}
                  onClick={handleClose}
                >
                  <Link
                    href="#terapiaOcupacional"
                    underline="none"
                    color="white"
                  >
                    Terapia Ocupacional
                  </Link>
                </MenuItem>
                <MenuItem
                  sx={{ backgroundColor: "#6aa9e9" }}
                  onClick={handleClose}
                >
                  <Link href="#atendimento" underline="none" color="white">
                    Áreas de Atendimento
                  </Link>
                </MenuItem>
                <MenuItem
                  sx={{ backgroundColor: "#6aa9e9" }}
                  onClick={handleClose}
                >
                  <Link href="#espaco" underline="none" color="white">
                    Espaço
                  </Link>
                </MenuItem>
                <MenuItem
                  sx={{ backgroundColor: "#6aa9e9" }}
                  onClick={handleClose}
                >
                  <Link href="#contato" underline="none" color="white">
                    Contato
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ display: { xs: "none", md: "block", lg: "block" } }}>
              <Stack direction="row" spacing={2}>
                {!isLoggedIn && (
                  <>
                    <Link
                      href="/profile"
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

// <nav>
//   <Link to="/">
//     <button>Home</button>
//   </Link>

//   {isLoggedIn && (
//     <>
//       <button onClick={logOutUser}>Logout</button>

//       <Link to="/profile">
//         <button>Profile</button>
//         {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
//       </Link>

//       <span>{user && user.name}</span>
//     </>
//   )}

//   {!isLoggedIn && (
//     <>
//       <Link to="/signup">
//         {" "}
//         <button>Sign Up</button>{" "}
//       </Link>
//       <Link to="/login">
//         {" "}
//         <button>Login</button>{" "}
//       </Link>
//     </>
//   )}
// </nav>

export default Navbar;
