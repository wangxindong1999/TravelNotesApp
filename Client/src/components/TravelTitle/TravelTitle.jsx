import React from "react"
import { Row, Col, Button } from "antd"
import "./TravelTitle.css"
export default function TravelTitle() {
  return (
    <section className="all-title">
      <Row>
        <Col style={{ textAlign: "center" }} className="gutter-row" span={6}>
          <div>首图</div>
        </Col>
        <Col style={{ textAlign: "center" }} className="gutter-row" span={12}>
          <div>内容</div>
        </Col>
        <Col style={{ textAlign: "center" }} className="gutter-row" span={6}>
          <div>编辑</div>
        </Col>
      </Row>
    </section>
  )
}
