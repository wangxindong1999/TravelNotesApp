import axios from "axios"
const service = axios.create({
  withCredentials: true,
  baseURL: "/api",
  timeout: 50000 * 10, // request timeout
})

export default service
