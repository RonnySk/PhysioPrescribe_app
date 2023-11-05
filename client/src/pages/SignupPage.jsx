import {
  Box,
  Button,
  createTheme,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  Link,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import bgImg from "../images/backgroundLines.png";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isPhysiotherapist, setIsPhysiotherapist] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handlePhysiotherapist = (e) => setIsPhysiotherapist(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = {
      email,
      password,
      name,
      isPhysiotherapist,
    };

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Or using a service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
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

  console.log("isPhysiotherapist", isPhysiotherapist);
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
            SIGN UP
          </Typography>
          <Typography variant="p" color="#808080">
            Already have account?
            <Link href="/login" color="#808080" ml={1}>
              Login here
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

          <TextField
            required
            label="Name"
            variant="outlined"
            onChange={handleName}
            sx={{ width: "80%" }}
          />
          <FormControl sx={{ width: "80%" }}>
            <InputLabel id="demo-simple-select-label">
              Patient/Therapeut
            </InputLabel>
            <Select
              id="demo-simple-select-label"
              value={isPhysiotherapist}
              label="Patient/Therapeut"
              onChange={handlePhysiotherapist}
            >
              <MenuItem value={true}>Therapeut</MenuItem>
              <MenuItem value={false}>Patient</MenuItem>
            </Select>
          </FormControl>

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
            onClick={handleSignupSubmit}
          >
            SIGNUP
          </Button>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default SignupPage;
