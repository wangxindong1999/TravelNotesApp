import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import testimg from "@/assets/avatar1.jpg"
import TravelList from "@/components/TravelList/TravelList"
import TravelTitle from "@/components/TravelTitle/TravelTitle"
import { Outlet } from "react-router-dom"
import { Pagination } from "antd"
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
const filterList = (travelData, type) => {
  return travelData
    .filter((item) => {
      return item.flag === type
    })
    .map((item, index) => {
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
export default function Travel(props) {
  const { data: travelData, type } = props
  return (
    <div>
      <section className="travel-card">
        <TravelTitle></TravelTitle>
        {type ? filterList(travelData, type) : mapLsit(travelData)}
      </section>
      <Outlet></Outlet>
      <Pagination
        style={{ textAlign: "center" }}
        defaultCurrent={1}
        total={30}
        // pageSize={3}
        showSizeChanger={true}
        pageSizeOptions={[3, 5, 7, 10, 20, 50]}
      />
    </div>
  )
}
