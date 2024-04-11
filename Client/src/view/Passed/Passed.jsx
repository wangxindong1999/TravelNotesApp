import React from "react"
import Travel from "@/components/Travel/Travel"
import testimg from "@/assets/avatar1.jpg"
import { useState, useEffect } from "react"
import { getPublishList } from "@/api/travels"

export default function Passed() {
  // useEffect(() => {
  //   getPublishList()
  //     .then((res) => {
  //       console.log(res)
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
  //   // dispatch(getList())
  // }, [])
  // const [travelData, setTraveldata] = useState([])

  return (
    <>
      <Travel type="published"></Travel>
    </>
  )
}
