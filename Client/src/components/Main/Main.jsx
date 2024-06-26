import { Outlet, useNavigate } from "react-router-dom"
import { Layout, Menu } from "antd"

import { MenuItems } from "@/router/index"
const { Content, Sider } = Layout
const MenuItem = MenuItems[0].children
  .filter((item) => {
    return item.isShow !== false
  })
  .map((item) => {
    return {
      key: item.path,
      label: item.name,
      path: item.path,
      icon: item.icon,
    }
  })
export default function Main() {
  const nav = useNavigate()

  if (!sessionStorage.getItem("currentPath")) {
    sessionStorage.setItem("currentPath", "home")
  }
  const routerChange = ({
    item: {
      props: { path },
    },
  }) => {
    sessionStorage.setItem("currentPath", path)
    nav(path)
  }
  const defaultkeys = () => {
    const path = sessionStorage.getItem("currentPath")
    return [path]
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
            defaultSelectedKeys={defaultkeys()}
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
