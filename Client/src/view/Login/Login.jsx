import React, { useEffect } from "react"
import { Button, Form, Input, message, Col, Row, Image } from "antd"
import { Base64 } from "js-base64"
import "./Login.css"
import { login } from "../../api/user"
import Cookies from "js-cookie"
import UserIcon from "../../components/Icon/UserIcon"
import PasswordIcon from "../../components/Icon/PasswordIcon"
import loginImg from "@/assets/登录web.jpg"
export default function Login(props) {
  const { navigate } = props
  // const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage()
  const onFinishFailed = (errorInfo) => {}
  const onFinish = (values) => {
    values.password = Base64.encode(values.password)
    login(values).then((res) => {
      if (res.status === 200) {
        navigate("/")
      } else {
        messageApi.open({
          type: "error",
          content: "用户名或密码错误",
        })
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
