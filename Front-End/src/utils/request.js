import axios from "axios"
import { useNavigation } from "@react-navigation/native"
const navigation = useNavigation()
const service = axios.create({
  baseURL: "",
  timeout: 50000 * 10,
})
service.interceptors.request.use(
  (config) => {},
  (error) => {}
)

service.interceptors.response.use(
  (response) => {
    // navigation.navigate("Home")
  },
  (error) => {}
)
