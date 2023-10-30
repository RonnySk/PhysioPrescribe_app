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

  // POST /api/examples
  createTrainingPlan = async (requestBody) => {
    return this.api.post("/api/createTrainingPlan", requestBody);
  };

  // GET /api/examples
  getAllPatients = async () => {
    return this.api.get("/api/allPatients");
  };

  // GET /api/examples
  getExercisesAPI = async (requestBody) => {
    return this.api.post("/api/exercisesApi", requestBody);
  };

  // GET /api/examples/:id
  getOne = async (id) => {
    return this.api.get(`/api/examples/${id}`);
  };

  // PUT /api/examples/:id
  updateOne = async (id, requestBody) => {
    return this.api.put(`/api/examples/${id}`, requestBody);
  };

  // DELETE /api/examples/:id
  deleteProject = async (id) => {
    return this.api.delete(`/api/examples/${id}`);
  };
}

// Create one instance of the service
const appService = new AppService();

export default appService;
