import axios from "axios";

class AppService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // GET One Patient

  getOnePatient = async (patientId) => {
    return this.api.get(`/api/onepatient/${patientId}`);
  };

  // GET All Patients
  getAllPatients = async () => {
    return this.api.get("/api/allPatients");
  };

  // GET All Patient Trainings Plans
  getAllPatientTrainings = async (patientId) => {
    return this.api.get(`/api/allpatienttrainings/${patientId}`);
  };

  // POST Exercises
  ExercisesAPI = async (requestBody) => {
    return this.api.post("/api/exercisesApi", requestBody);
  };

  // POST /api/examples/:id
  addExercisesTrainingPlan = async (requestBody) => {
    return this.api.post("/api/addExerciseTp", requestBody);
  };

  // POST Create Training Plan
  createTrainingPlan = async (requestBody) => {
    return this.api.post("/api/createTrainingPlan", requestBody);
  };

  // GET All Training Plans
  getAllTrainingPlans = async () => {
    return this.api.get("/api/trainingplans");
  };

  // GET One Training Plan
  getOneTrainingPlan = async (training_id) => {
    return this.api.get(`/api/onetrainingplan/${training_id}`);
  };

  // DELETE One Training Plan
  deleteOneTrainingPlan = async (training_id) => {
    return this.api.delete(`/api/onetrainingplan/${training_id}`);
  };

  // DELETE One Patient
  deletePatient = async (requestBody) => {
    return this.api.post("/api/deletpatient", requestBody);
  };
}

// Create one instance of the service
const appService = new AppService();

export default appService;
