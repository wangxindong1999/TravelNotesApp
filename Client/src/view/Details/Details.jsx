import React, { useEffect, useRef } from "react"
import { Button, Row, Col } from "antd"
import "./Details.css"
import ImgUrl from "@/assets/avatar1.jpg"
export default function Details() {
  const ref = useRef(null)
  useEffect(() => {
    ref.current.parentNode.style.padding = "0"
  }, [])
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
      <section className="detail-btn">
        <Button>通过</Button>
        <Button>拒绝</Button>
      </section>
    </section>
  )
}
