import { Input } from "antd"
import React from "react"
import "./PageHeader.css"
export default function PageHeader() {
  return (
    <header className="header">
      <h1>游记本</h1>
      <Input.Search
        className="header-search"
        placeholder="Search list"
      ></Input.Search>
      <section className="header-userinfo">
        <div className="header-userinfo-img"></div>
        <p>
          name<span>/</span>
        </p>
        <p style={{ color: "black" }}>职务</p>
      </section>
    </header>
  )
}
