import "./App.css";
import { Routes, Route } from "react-router-dom";

import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import LandingPage from "./pages/LandingPage/LandingPage";

import Navbar from "./components/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import HomePage from "./pages/HomPage/HomePage";
import Exercises from "./pages/Exercises";
import Patients from "./pages/Patients";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />

        <Route
          path="/home"
          element={
            <IsPrivate>
              <HomePage />
            </IsPrivate>
          }
        />

        <Route
          path="/exercises"
          element={
            <IsPrivate>
              <Exercises />
            </IsPrivate>
          }
        />

        <Route
          path="/patients"
          element={
            <IsPrivate>
              <Patients />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
