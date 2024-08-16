import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://calendarapp.beeceptor.com",
});

export default axiosInstance;
