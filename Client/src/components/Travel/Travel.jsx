import React, { useEffect, useState } from "react"
import TravelList from "@/components/TravelList/TravelList"
import TravelTitle from "@/components/TravelTitle/TravelTitle"
import { Outlet } from "react-router-dom"
import {
  getList,
  getPublishList,
  getCommittedList,
  getRejectedList,
} from "@/api/travels"
import { Pagination, Empty, Spin, Flex } from "antd"
import { useSelector, useDispatch } from "react-redux"
const mapLsit = (travelData) => {
  return travelData.map((item, index) => {
    return (
      <TravelList
        id={item.id}
        key={index}
        imgUrl={item.imgUrl}
        title={item.title}
        content={item.content}
        flag={item.flag}
      />
    )
  })
}
let total = 0

const reflect = {
  all: getList,
  committed: getCommittedList,
  published: getPublishList,
  rejected: getRejectedList,
}
export default function Travel(props) {
  const store = useSelector((state) => state.user)
  const { type } = props
  let [isShow, setisShow] = useState(true)
  const [currentPage, setcurrentPage] = useState(1)
  const [travelData, setTraveldata] = useState([])
  useEffect(() => {
    reflect[type]({ page: 1, pageSize: 3, search: store.searchKey })
      .then((res) => {
        setTraveldata(
          res.data.data.map((item) => {
            return {
              id: item._id,
              imgUrl: item.images[0].thumbURL,
              title: item.title,
              content: item.content,
              flag: item.status,
            }
          })
        )
        setisShow(false)
        total = res.data.total
        setcurrentPage(1)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [store.searchKey])
  const handleChange = (page, pageSize) => {
    setTraveldata([])
    setisShow(true)
    reflect[type]({ page, pageSize, search: store.searchKey })
      .then((res) => {
        total = res.data.total
        setcurrentPage(page)
        setTraveldata(
          res.data.data.map((item) => {
            return {
              id: item._id,
              imgUrl: item.images[0].thumbURL,
              title: item.title,
              content: item.content,
              flag: item.status,
            }
          })
        )
        setisShow(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // useEffect(() => {
  //   // console.log(666)
  // }, [store.searchKey])
  return (
    <div>
      <section className="travel-card">
        {travelData.length ? (
          <>
            <TravelTitle></TravelTitle>
            {mapLsit(travelData)}
          </>
        ) : (
          <Flex gap="large" vertical>
            {isShow ? (
              <Spin size="large">
                <Empty
                  style={{
                    height: "70vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </Spin>
            ) : (
              <Empty
                style={{
                  height: "70vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            )}
          </Flex>
        )}
      </section>
      <Outlet></Outlet>
      <Pagination
        style={{ textAlign: "center" }}
        defaultCurrent={1}
        total={total}
        defaultPageSize={3}
        showSizeChanger={true}
        current={currentPage}
        pageSizeOptions={[3, 5, 7, 10, 20, 50]}
        onChange={handleChange}
      />
    </div>
  )
}
