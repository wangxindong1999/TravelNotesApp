import React, { useEffect } from "react"
import { Button, Form, Input, message, Col, Row, Image } from "antd"
import "./Login.css"
import { login } from "@/api/user"
import Cookies from "js-cookie"
import UserIcon from "@/components/Icon/UserIcon"
import PasswordIcon from "@/components/Icon/PasswordIcon"
import { useDispatch } from "react-redux"
import { setUserInfo } from "@/store/userSlice"
let isLogin = false
export default function Login(props) {
  const { navigate } = props
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage()
  const onFinishFailed = (errorInfo) => {}
  const onFinish = (values) => {
    if (isLogin) return
    isLogin = true
    login(values)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setUserInfo(res.data))
          navigate("/")
          isLogin = true
        } else {
          messageApi.open({
            type: "error",
            content: "用户名或密码错误",
          })
          isLogin = true
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          messageApi.open({
            type: "error",
            content: "密码错误",
          })
          isLogin = true

          return
        }
        if (err.response.status === 404) {
          messageApi.open({
            type: "error",
            content: "用户不存在",
          })
          isLogin = true
          return
        }
      })
  }
  const register = () => {
    navigate("/register")
  }
  useEffect(() => {
    Cookies.remove("taskLogin")
  }, [])
  return (
    <>
      {contextHolder}
      <div className="login-main">
        <div className="login-form">
          <Row style={{ height: "100%" }}>
            <Col className="login-form-img" span={12}></Col>
            <Col className="login-form-right" span={12}>
              <div className="login-title">
                <h1>游记本</h1>
                <p>
                  <span>记录生活</span>
                  <span>享受生活</span>
                  <span>管理生活</span>
                </p>
              </div>
              <Form
                style={{
                  maxWidth: 800,
                }}
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "请输入用户名",
                    },
                  ]}
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Input
                    placeholder="Username"
                    style={{ width: "70%" }}
                    prefix={<UserIcon />}
                  />
                </Form.Item>

                <Form.Item
                  style={{
                    textAlign: "center",
                  }}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "请输入密码",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    prefix={<PasswordIcon />}
                    style={{ width: "70%" }}
                  />
                </Form.Item>
                <Form.Item style={{ width: "85%", textAlign: "right" }}>
                  <a
                    style={{
                      fontSize: "12px",
                      color: "#808080",
                    }}
                    onClick={register}
                  >
                    注册账号
                  </a>
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }}>
                  <Button
                    className="login-submit"
                    type="primary"
                    htmlType="submit"
                    disabled={isLogin}
                  >
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}
