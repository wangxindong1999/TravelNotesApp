import { Row, Col, Button, Popconfirm, message } from "antd"
import "./TravelList.css"
import { useNavigate } from "react-router-dom"
import { deleteTravel } from "@/api/travels"
import { useSelector } from "react-redux"

import { LazyLoadImage } from "react-lazy-load-image-component"

export default function TravelList(props) {
  const { id, imgUrl, title, content, flag } = props
  const [messageApi, contextHolder] = message.useMessage()
  const store = useSelector((state) => state.user)
  const nav = useNavigate()
  //路由跳转至详情页
  const toDetail = (id) => {
    console.log("toDetail", id, flag)
    nav(`/details?id=${id}&flag=${flag}`)
  }
  //删除
  const delteConfirm = (id, e) => {
    e.stopPropagation()
    deleteTravel({
      _id: id,
    }).then(() => {
      messageApi.open({
        type: "success",
        content: "删除成功",
      })
      window.location.reload()
    })
  }
  return (
    <div className="travel-card-item" onClick={toDetail.bind(null, id)}>
      {contextHolder}
      <Row>
        <Col span={6}>
          <div id="travel-img">
            <LazyLoadImage src={imgUrl} alt="Image Alt" />
            {/* <img src={imgUrl} alt="ceshi" /> */}
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
            {flag === "published" ? (
              <Button className="travel-content-button">已通过</Button>
            ) : flag === "committed" ? (
              <Button className="travel-content-button pending-btn">
                待审核
              </Button>
            ) : (
              <Button className="travel-content-button failed-btn">
                未通过
              </Button>
            )}
          </div>
          {store.userInfo.position === "管理者" ? (
            <div onClick={(e) => e.stopPropagation()}>
              <Popconfirm
                description={`确认删除"${title}"吗`}
                onConfirm={delteConfirm.bind(null, id)}
                onCancel={(e) => e.stopPropagation()}
                okText="是"
                cancelText="否"
              >
                <Button className="travel-content-button delete-btn">
                  删除
                </Button>
              </Popconfirm>
            </div>
          ) : null}
        </Col>
      </Row>
    </div>
  )
}
