import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { Provider } from "react-redux"
import store from "./store"
import { HashRouter } from "react-router-dom"
import zhCN from "antd/locale/zh_CN"
import { ConfigProvider } from "antd"

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ConfigProvider
    locale={zhCN}
    theme={{
      components: {
        Menu: {
          colorPrimary: "#858585",
          itemSelectedBg: "#cbe3d4",
          algorithm: true,
        },
      },
    }}
  >
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </ConfigProvider>
  // </React.StrictMode>
)
