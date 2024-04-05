import React from "react"
import { Row, Col, Button } from "antd"
import testimg from "../../assets/avatar1.jpg"
import "./TravelList.css"
import { useNavigate } from "react-router-dom"

export default function TravelList(props) {
  const { id, imgUrl, title, content, flag } = props
  const nav = useNavigate()
  //路由跳转至详情页
  const toDetail = (id) => {
    console.log("toDetail", id)
    nav(`/details`)
  }
  //删除
  const handleDelete = (id, e) => {
    // console.log("handleDelete", id, e)
    e.stopPropagation()
  }
  return (
    <div className="travel-card-item" onClick={toDetail.bind(null, id)}>
      <Row>
        <Col span={6}>
          <div id="travel-img">
            <img src={imgUrl} alt="ceshi" />
          </div>
        </Col>
        <Col span={12}>
          <div id="travel-content">
            <p className="travel-content-title">{title}</p>
            <p title={content} className="travel-content-dec">
              {content}
            </p>
          </div>
        </Col>
        <Col className="travel-btn" span={6}>
          <div>
            {flag === "passed" ? (
              <Button className="travel-content-button">已通过</Button>
            ) : flag === "pending" ? (
              <Button className="travel-content-button pending-btn">
                待审核
              </Button>
            ) : (
              <Button className="travel-content-button failed-btn">
                未通过
              </Button>
            )}
          </div>
          <div>
            <Button
              onClick={handleDelete.bind(null, id)}
              className="travel-content-button delete-btn"
            >
              删除
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}
