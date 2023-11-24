import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";
import { Box, Stack, ThemeProvider } from "@mui/system";
import bgImg from "../images/backgroundLines.png";
import {
  createTheme,
  TextField,
  Typography,
  Button,
  Link,
} from "@mui/material";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/home");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
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
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${bgImg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          width={{ xs: "80%", md: "40%" }}
          m={5}
          p={2}
          spacing={3}
          sx={{
            backgroundColor: "#EAEFF1",
            borderRadius: 5,
          }}
        >
          <Typography variant="h3" color="#808080">
            LOGIN
          </Typography>
          <Typography variant="p" color="#808080">
            Not member yet?
            <Link href="/signup" color="#808080" ml={1}>
              Sign Up here
            </Link>
          </Typography>
          <TextField
            required
            label="Email"
            variant="outlined"
            onChange={handleEmail}
            sx={{ width: "80%" }}
          />
          <TextField
            required
            type="password"
            label="Password"
            variant="outlined"
            onChange={handlePassword}
            sx={{ width: "80%" }}
          />
          {errorMessage && (
            <Typography variant="p" color="#FF0000">
              {errorMessage}
            </Typography>
          )}
          <Button
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.light",
              },
              width: "80%",
              p: 2,
            }}
            onClick={handleLoginSubmit}
          >
            LOGIN
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default LoginPage;
