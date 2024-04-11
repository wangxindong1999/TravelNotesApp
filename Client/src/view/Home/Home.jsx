import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import "./Home.css"
import { getList } from "@/api/travels"
import testimg from "@/assets/avatar1.jpg"
import Travel from "@/components/Travel/Travel"
import imgi from "@/assets/1.jpg"
export default function Home(props) {
  // const [travelData, setTraveldata] = useState([])

  // useEffect(() => {
  //   getList()
  //     .then((res) => {
  //       // console.log(res)
  //       setTraveldata(
  //         res.data.map((item) => {
  //           return {
  //             id: item._id,
  //             imgUrl: item.images[0],
  //             title: item.title,
  //             content: item.content,
  //             flag: item.status,
  //           }
  //         })
  //       )
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [])
  return <Travel type={"all"}></Travel>
}
