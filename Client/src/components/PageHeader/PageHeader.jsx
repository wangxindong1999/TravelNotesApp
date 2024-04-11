import { Input } from "antd"
import { useEffect, useState } from "react"
import "./PageHeader.css"
import { Dropdown, Space, Button, Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useDispatch, useSelector } from "react-redux"
import { setUserInfo, setSearchKey } from "@/store/userSlice"
import { getUserInfo, logout } from "@/api/user"
import _ from "lodash"

export default function PageHeader() {
  const nav = useNavigate()
  const store = useSelector((state) => state.user)
  const [loding, setLoding] = useState(true)
  const dispatch = useDispatch()
  //退出登录
  const logOut = () => {
    dispatch(setUserInfo({}))
    Cookies.remove("Login")
    dispatch(setUserInfo({}))
    sessionStorage.removeItem("currentPath")
    logout()
    nav("/login")
  }
  const items = [
    {
      key: "1",
      label: <a onClick={logOut}>退出登录</a>,
    },
  ]
  useEffect(() => {
    if (store.userInfo.username && Cookies.get("Login")) {
      setLoding(false)
    }
    if (!store.userInfo.username && Cookies.get("Login")) {
      getUserInfo().then((res) => {
        console.log(res)
        dispatch(setUserInfo(res.data))
        setLoding(false)
      })
      return
    }
    if (!Cookies.get("Login")) {
      nav("/login")
    }
  }, [])

  const searchTravel = _.debounce((e) => {
    dispatch(setSearchKey(e.target.value))
  }, 500)
  return (
    <header className="header">
      <h1>游记本</h1>
      <Input.Search
        className="header-search"
        placeholder="Search list"
        onChange={searchTravel}
      ></Input.Search>
      <section className="header-userinfo">
        {loding ? (
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 24,
                }}
                spin
              />
            }
          />
        ) : (
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space style={{ cursor: "pointer" }}>
                <div className="header-userinfo-img">
                  {store.userInfo.userImg !== "" ? (
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={store.userInfo.userImg}
                    />
                  ) : null}
                </div>
                <p>
                  {store.userInfo.username}
                  <span>/</span>
                </p>
                <p style={{ color: "black" }}>{store.userInfo.position}</p>
              </Space>
            </a>
          </Dropdown>
        )}
      </section>
    </header>
  )
}
