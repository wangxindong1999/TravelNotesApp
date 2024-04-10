import React, { useEffect, useRef, useState } from "react"
import {
  Button,
  Row,
  Col,
  Drawer,
  Select,
  Input,
  message,
  Flex,
  Spin,
} from "antd"
import { useNavigate, useSearchParams } from "react-router-dom"
import "./Details.css"
import ImgUrl from "@/assets/avatar1.jpg"
import { getDetail, postReason } from "@/api/travels"
import { ArrowLeftOutlined } from "@ant-design/icons"
let rejectType = ""
let rejectContent = ""

export default function Details(props) {
  const [open, setOpen] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  let [searchParams, setSearchParams] = useSearchParams()
  let [travelDetail, settraveldetail] = useState({})
  const id = searchParams.get("id")
  const flag = searchParams.get("flag")
  const ref = useRef(null)
  const nav = useNavigate()
  const changeStatus = (data) => {
    postReason(data)
      .then((res) => {
        messageApi
          .open({
            type: "success",
            content: "提交成功",
            duration: 1,
          })
          .then(() => {
            nav("/" + sessionStorage.getItem("currentPath"))
          })
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "提交失败",
        })
      })
  }
  const handlePassed = () => {
    changeStatus({
      status: "published",
      _id: id,
    })
  }
  const onClose = () => {
    setOpen(false)
  }
  const handleReject = () => {
    setOpen(true)
  }
  useEffect(() => {
    ref.current.parentNode.style.padding = "0"
    getDetail(id)
      .then((res) => {
        // console.log(res)
        settraveldetail(
          res.data.map((item) => {
            return {
              id: item._id,
              imgUrl: item.images,
              title: item.title,
              content: item.content,
              flag: item.status,
              userName: item.username,
              updatedAt: item.updatedAt,
              reason: item.reason,
              reason_type: item.reason_type,
            }
          })[0]
        )
      })
      .catch((err) => {
        console.log(err)
      })
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
  const handleChange = (_, data) => {
    rejectType = data.label
  }
  const handleInput = (e) => {
    rejectContent = e.target.value
  }
  const submitReason = () => {
    if (!rejectType || !rejectContent) {
      messageApi.open({
        type: "error",
        content: "请填写拒绝原因",
      })
      return
    }
    changeStatus({
      reason: rejectContent,
      reason_type: rejectType,
      status: "rejected",
      _id: id,
    })
  }
  const goback = () => {
    nav("/" + sessionStorage.getItem("currentPath"))
  }
  return (
    <>
      {contextHolder}
      {travelDetail.id ? (
        <section ref={ref} className="detail">
          <div
            onClick={goback}
            style={{
              position: "absolute",
              padding: "10px",
              cursor: "pointer",
              color: "white",
              fontSize: "20px",
            }}
          >
            <ArrowLeftOutlined />
          </div>
          <section className="detail-header">
            <div className="detail-header-info">
              <div className="detail-header-img">
                <img src={ImgUrl} alt="" />
              </div>
              <div className="detail-header-content">
                <p>
                  <span
                    style={{ verticalAlign: "middle", marginRight: "10px" }}
                  >
                    {travelDetail.userName}
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
                    {travelDetail.flag === "committed"
                      ? "待审核"
                      : travelDetail.flag === "published"
                      ? "已通过"
                      : "未通过"}
                  </Button>
                </p>
                <p>提交时间：{travelDetail.updatedAt?.replace("T", " ")}</p>
              </div>
            </div>
            {travelDetail.flag === "committed" ? (
              <div className="detail-header-flag">审核</div>
            ) : null}
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
              {travelDetail.imgUrl?.map((item, index) => {
                return (
                  <Col span={5} className="detail-body-img" key={index}>
                    <img src={item} alt="" />
                  </Col>
                )
              })}
            </Row>
          </section>
          <section className="detail-footer">
            <p>{travelDetail.title}</p>
            <p>{travelDetail.content}</p>
          </section>
          {flag === "committed" ? (
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
                    placeholder="请选择违规类型"
                    style={{
                      width: 150,
                    }}
                    onChange={handleChange}
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
                    onChange={handleInput}
                  />
                </div>
                <Button
                  style={{
                    backgroundColor: "rgb(143, 179, 157)",
                    color: "white",
                    marginTop: "30px",
                    float: "right",
                  }}
                  onClick={submitReason}
                >
                  确认
                </Button>
              </Drawer>
            </>
          ) : flag === "rejected" ? (
            // 审核未通过页脚
            <section className="detail-failed">
              <h3>违规类型：{travelDetail.reason_type}</h3>
              <h3>具体原因：{travelDetail.reason}</h3>
            </section>
          ) : null}
        </section>
      ) : (
        <section
          ref={ref}
          className="detail"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Flex gap="large" vertical>
            <Spin size="large"></Spin>
          </Flex>
        </section>
      )}
    </>
  )
}
