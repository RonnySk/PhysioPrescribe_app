import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isPhysiotherapist, setIsPhysiotherapist] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  const [personType, setPersonType] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handlePhysiotherapist = (e) => setIsPhysiotherapist(!isPhysiotherapist);
  const handlePatient = (e) => setIsPatient(!isPatient);
  const handlePersonType = (e) => setPersonType(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = {
      email,
      password,
      name,
      isPhysiotherapist,
      isPatient,
      personType,
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

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <label>Are you:</label>
        <input
          type="checkbox"
          name="physioterapist"
          value={name}
          onChange={handlePhysiotherapist}
        />
        <label>Physiotherapeut</label>

        <input
          type="checkbox"
          name="patient"
          // checked={isAgent}
          onChange={handlePatient}
        />
        <label>Patient</label>

        <label>Are you:2</label>
        <select value={personType} onChange={handlePersonType}>
          <option value="">--Please choose an option--</option>
          <option value="physioterapist">Physioterapist</option>
          <option value="patient">Patient</option>
        </select>

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
