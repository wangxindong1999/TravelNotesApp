import React, { useEffect } from "react"
import Travel from "@/components/Travel/Travel"
import testimg from "@/assets/avatar1.jpg"
import { useState } from "react"
import { getCommittedList } from "@/api/travels"
export default function Pending() {
  const [travelData, setTraveldata] = useState([])
  useEffect(() => {
    getCommittedList()
      .then((res) => {
        // console.log(res)
        setTraveldata(
          res.data.map((item) => {
            return {
              id: item._id,
              imgUrl: item.images[0],
              title: item.title,
              content: item.content,
              flag: item.status,
            }
          })
        )
      })
      .catch((err) => {
        console.log(err)
      })
    // dispatch(getList())
  }, [])
  return (
    <>
      <Travel data={travelData} type="committed"></Travel>
    </>
  )
}
