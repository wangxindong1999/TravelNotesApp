import axios from "axios"
import Cookies from "js-cookie"
const service = axios.create({
  withCredentials: true,
  baseURL: "/api",
  // baseURL: "http://127.0.0.1:3005",
  timeout: 50000 * 10, // request timeout
})
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  (response) => {
    const res = response
    if (res.status === 200) {
      return res
    } else {
      return Promise.reject(new Error(res.message || "Error"))
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
