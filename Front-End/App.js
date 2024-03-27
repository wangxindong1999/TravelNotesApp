import { StyleSheet } from "react-native"
import Menu from "./src/router/menu"
import { Provider } from "react-redux"
import store from "./src/store"

export default function App() {
  return (
    <Provider store={store}>
      <Menu></Menu>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "red",
  },
})
