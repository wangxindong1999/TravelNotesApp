import { StyleSheet } from "react-native"
import { ConfigProvider } from "antd-mobile"
import zhCN from "antd-mobile/es/locales/zh-CN"
import Menu from "./src/router/menu"
import { Provider } from "react-redux"
import store from "./src/store"

export default function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <Menu></Menu>
      </Provider>
    </ConfigProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "red",
  },
})
