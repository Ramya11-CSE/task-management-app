import axios from "axios"

const API = axios.create({
  baseURL: "https://task-management-app-u3e0.onrender.com/api",
})

export default API