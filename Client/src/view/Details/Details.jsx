import React, { useEffect, useRef, useState } from "react"
import { Button, Row, Col, Drawer, Select, Input } from "antd"
import { useNavigate, useSearchParams } from "react-router-dom"
import "./Details.css"
import ImgUrl from "@/assets/avatar1.jpg"
export default function Details(props) {
  const [open, setOpen] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get("id")
  const flag = searchParams.get("flag")
  const ref = useRef(null)
  const nav = useNavigate()
  const handlePassed = () => {
    console.log("通过", id)
    nav("/home")
  }
  const onClose = () => {
    setOpen(false)
  }
  const handleReject = () => {
    console.log("拒绝", id)
    setOpen(true)
  }
  useEffect(() => {
    ref.current.parentNode.style.padding = "0"
  }, [])
  const rejectReason = [
    {
      value: "title",
      label: "标题问题",
    },
    {
      value: "pic",
      label: "图片问题",
    },
    {
      value: "content",
      label: "内容问题",
    },
  ]
  return (
    <section className="detail">
      <section ref={ref} className="detail-header">
        <div className="detail-header-info">
          <div className="detail-header-img">
            <img src={ImgUrl} alt="" />
          </div>
          <div className="detail-header-content">
            <p>
              <span style={{ verticalAlign: "middle", marginRight: "10px" }}>
                鲁西西
              </span>
              <Button
                style={{
                  verticalAlign: "middle",
                  borderRadius: "20px",
                  width: "90px",
                  fontSize: "12px",
                  padding: "0",
                  height: "20px",
                }}
              >
                待审核
              </Button>
            </p>
            <p>提交时间：2021-08-02 14:00:00</p>
          </div>
        </div>
        <div className="detail-header-flag">审核</div>
      </section>
      <section className="detail-body">
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
          style={{ padding: "0 20px" }}
        >
          <Col span={6} className="detail-body-img">
            <img src={ImgUrl} alt="" />
          </Col>
          <Col span={6} className="detail-body-img">
            <img src={ImgUrl} alt="" />
          </Col>
          <Col span={6} className="detail-body-img">
            <img src={ImgUrl} alt="" />
          </Col>
          {/* <Col span={6} className="detail-body-img">
            <img src={ImgUrl} alt="" />
          </Col>
          <Col span={6} className="detail-body-img">
            <img src={ImgUrl} alt="" />
          </Col> */}
        </Row>
      </section>
      <section className="detail-footer">
        <p>Title</p>
        <p>
          路西西提交时间：24.05.26待审核审核一起郊游吧！快乐快乐出发！！！
          薯条世、炸鱿鱼抗饿小食:披萨、炸鸡🥞🥓、喜圈、鸭脖子、鸡爪(虎皮、酸辣)、素的卤菜(海带丝、腐竹、藕片)、🥕鸡翅(喜欢汉堡号、自热锅之类的也可以)甜品:蛋糕罍、麻薯、桃酥、泡芙、肉松小贝零食:薯片、虾条、瓜子、辣条，🥞🥔反正是喜欢吃什么就带什么水果:各种果切🥓🥙🥕和方便带的水果，
        </p>
      </section>
      {flag === "pending" ? (
        //  待审核页脚
        <>
          <section className="detail-btn">
            <Button onClick={handlePassed}>通过</Button>
            <Button onClick={handleReject}>拒绝</Button>
          </section>
          <Drawer
            title="未通过原因"
            placement="bottom"
            closable={false}
            onClose={onClose}
            open={open}
            getContainer={false}
          >
            <div
              style={{
                borderBottom: "2px solid rgb(124,110,110)",
                paddingBottom: "20px",
              }}
            >
              <span>违规类型：</span>
              <Select
                defaultValue="title"
                style={{
                  width: 120,
                }}
                // onChange={handleChange}
                options={rejectReason}
              />
            </div>
            <div
              style={{
                paddingTop: "20px",
              }}
            >
              <Input.TextArea
                rows={4}
                placeholder="具体原因(不超过200字)"
                maxLength={200}
                showCount
              />
            </div>
          </Drawer>
        </>
      ) : flag === "failed" ? (
        // 审核未通过页脚
        <section className="detail-failed">
          <h3>违规类型：违规词</h3>
          <h3>具体原因：出现“XXX”词，请删除</h3>
        </section>
      ) : null}
    </section>
  )
}
