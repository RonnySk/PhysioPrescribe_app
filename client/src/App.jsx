import "./App.css";
import { Routes, Route } from "react-router-dom";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import HomePage from "./pages/HomPage/HomePage";
import Exercises from "./pages/Exercises";
import Patients from "./pages/Patients";
import TrainingPlan from "./pages/CreateTrainingPlan";
import ExercisesTrainingPlan from "./pages/ExercisesTrainingPlan";

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
          path="/exercisestrainingplan/:id"
          element={
            <IsPrivate>
              <ExercisesTrainingPlan />
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
          path="/trainingplan"
          element={
            <IsPrivate>
              <TrainingPlan />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
