import { Input } from "antd"
import React from "react"
import "./PageHeader.css"
import { Dropdown, Space, Button } from "antd"
import { useNavigate } from "react-router-dom"

export default function PageHeader() {
  const nav = useNavigate()
  //退出登录
  const logOut = () => {
    nav("/login")
  }
  const items = [
    {
      key: "1",
      label: <a onClick={logOut}>退出登录</a>,
    },
  ]
  return (
    <header className="header">
      <h1>游记本</h1>
      <Input.Search
        className="header-search"
        placeholder="Search list"
      ></Input.Search>
      <section className="header-userinfo">
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space style={{ cursor: "pointer" }}>
              <div className="header-userinfo-img"></div>
              <p>
                name<span>/</span>
              </p>
              <p style={{ color: "black" }}>职务</p>
            </Space>
          </a>
        </Dropdown>
      </section>
    </header>
  )
}
