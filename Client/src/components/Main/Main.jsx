import React from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import router from "../../router/index"
import { Layout, Menu } from "antd"
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons"
import { MenuItems } from "../../router/index"
const { Content, Sider } = Layout
const MenuItem = MenuItems.map((item) => {
  return {
    key: item.path,
    label: item.name,
    path: item.path,
    icon: item.icon,
  }
})
// const items = [
//   UserOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
//   UserOutlined,
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: React.createElement(icon),
//   label: `nav ${index + 1}`,
// }))

export default function Main() {
  const nav = useNavigate()
  const location = useLocation()
  const routerChange = ({
    item: {
      props: { path },
    },
  }) => {
    nav(path)
  }
  return (
    <div>
      <Layout>
        <Sider
          style={{ backgroundColor: "white" }}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken)
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type)
          }}
        >
          <Menu
            onSelect={routerChange}
            mode="inline"
            defaultSelectedKeys={[location.pathname.split("/")[1]]}
            items={MenuItem}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              backgroundColor: "#dcf5e6",
              minHeight: "calc(100vh - 118px)",
            }}
          >
            <div
              style={{
                margin: 24,
                backgroundColor: "#fff",
                height: "calc(100% - 48px)",
                boxShadow: "0 0 10px rgba(0, 21, 41, 0.08)",
                borderRadius: 10,
                padding: 5,
              }}
            >
              <Outlet></Outlet>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}
