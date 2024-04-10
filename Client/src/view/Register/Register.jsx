import { Button, Form, Input, message } from "antd"
import "./Register.css"
import { register as registerUser } from "@/api/user"

export default function Register(props) {
  const { navigate } = props
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const onFinish = (values) => {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,15}$/
    if (values.password !== values.confirm) {
      form.setFields([
        {
          name: "confirm",
          errors: ["两次密码不一致"],
        },
      ])
      return
    }
    if (!reg.test(values.password)) {
      form.setFields([
        {
          name: "password",
          errors: ["密码必须包含字母和数字，长度6-15位"],
        },
      ])
      return
    }
    // values.password = Base64.encode(values.password)
    const date = new Date()
    const createDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    const data = {
      username: "",
      password: "",
      isAdmin: false,
      isReviewer: true,
      admin_id: "",
      reviewer_id: "",
      createdAt: createDate,
      updatedAt: createDate,
      userImg: "",
    }
    registerUser({ ...data, ...values })
      .then((res) => {
        if (res.status === 200) {
          messageApi
            .open({
              type: "success",
              content: "注册成功，请登录",
              duration: 1,
            })
            .then(() => {
              navigate("/login")
            })
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          messageApi.open({
            type: "error",
            content: "用户名已存在",
          })
        } else {
          messageApi.open({
            type: "error",
            content: "注册失败",
          })
        }
      })
  }

  return (
    <>
      {contextHolder}
      <div className="register-main">
        <div className="register-form">
          <Form
            form={form}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
              width: "50vw",
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入用户名",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="登陆密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="确认密码"
              name="confirm"
              rules={[
                {
                  required: true,
                  message: "请确认密码",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button type="primary" htmlType="submit">
                  注册
                </Button>
                <Button onClick={() => navigate("/login")}>去登录</Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}
