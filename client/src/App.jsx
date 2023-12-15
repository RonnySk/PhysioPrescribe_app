import "./App.css";
import { Routes, Route } from "react-router-dom";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import HomePage from "./pages/HomePage";
import Exercises from "./pages/Exercises";
import Patients from "./pages/Patients";
import PatientTrainingPlans from "./pages/PatientTrainingPlans";
import CreateTrainingPlan from "./pages/CreateTrainingPlan";
import OneTrainingPlan from "./pages/OneTrainingPlan";
import AllTrainingPlans from "./pages/AllTrainingPlans";
import Settings from "@mui/icons-material/Settings";

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
          path="/addexercises/:training_id"
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

        <Route
          path="/patienttrainingplans/:patientId"
          element={
            <IsPrivate>
              <PatientTrainingPlans />
            </IsPrivate>
          }
        />

        <Route
          path="/trainingplans"
          element={
            <IsPrivate>
              <AllTrainingPlans />
            </IsPrivate>
          }
        />

        <Route
          path="/createtrainingplan"
          element={
            <IsPrivate>
              <CreateTrainingPlan />
            </IsPrivate>
          }
        />

        <Route
          path="/trainingplan/:training_id"
          element={
            <IsPrivate>
              <OneTrainingPlan />
            </IsPrivate>
          }
        />

        <Route
          path="/settings"
          element={
            <IsPrivate>
              <Settings />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
