import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import "./Home.css"
import { getList } from "@/api/travels"
import testimg from "@/assets/avatar1.jpg"
import Travel from "@/components/Travel/Travel"
import imgi from "@/assets/1.jpg"
export default function Home(props) {
  const dispatch = useDispatch()
  // const testData = [
  //   {
  //     id: 1,
  //     imgUrl: testimg,
  //     title: "一起郊游吧！快乐快乐出发！！！",
  //     content: `
  //     薯条世、炸鱿鱼抗饿小食:披萨、炸鸡🥞🥓、喜圈、鸭脖子、鸡爪(虎皮、酸辣)、素丝、腐竹、藕片)、🥕鸡翅甜品:蛋糕罍、酥、泡芙、肉松小贝零食:薯片、虾条## 薯dwadwa`,
  //     flag: "passed",
  //   },
  //   {
  //     id: 2,
  //     imgUrl: imgi,
  //     title: "一起郊游吧！快乐快乐出发！！！",
  //     content: `
  //     薯条世、炸鱿鱼抗饿小食:披萨、炸鸡🥞🥓、喜圈、鸭脖子、鸡爪(虎皮、酸辣)、素丝、腐竹、藕片)、🥕鸡翅甜品:蛋糕罍、酥、泡芙、肉松小贝零食:薯片、虾条## 薯dwadwa`,
  //     flag: "pending",
  //   },
  //   {
  //     id: 3,
  //     imgUrl: testimg,
  //     title: "一起郊游吧！快乐快乐出发！！！",
  //     content: `
  //     薯条世、炸鱿鱼抗饿小食:披萨、炸鸡🥞🥓、喜圈、鸭脖子、鸡爪(虎皮、酸辣)、素丝、腐竹、藕片)、🥕鸡翅甜品:蛋糕罍、酥、泡芙、肉松小贝零食:薯片、虾条## 薯dwadwa`,
  //     flag: "failed",
  //   },
  //   {
  //     id: 4,
  //     imgUrl: testimg,
  //     title: "一起郊游吧！快乐快乐出发！！！",
  //     content: `
  //     薯条世、炸鱿鱼抗饿小食:披萨、炸鸡🥞🥓、喜圈、鸭脖子、鸡爪(虎皮、酸辣)、素丝、腐竹、藕片)、🥕鸡翅甜品:蛋糕罍、酥、泡芙、肉松小贝零食:薯片、虾条## 薯dwadwa`,
  //     flag: "failed",
  //   },
  //   {
  //     id: 5,
  //     imgUrl: testimg,
  //     title: "一起郊游吧！快乐快乐出发！！！",
  //     content: `
  //     薯条世、炸鱿鱼抗饿小食:披萨、炸鸡🥞🥓、喜圈、鸭脖子、鸡爪(虎皮、酸辣)、素丝、腐竹、藕片)、🥕鸡翅甜品:蛋糕罍、酥、泡芙、肉松小贝零食:薯片、虾条## 薯dwadwa`,
  //     flag: "failed",
  //   },
  //   {
  //     id: 6,
  //     imgUrl: testimg,
  //     title: "一起郊游吧！快乐快乐出发！！！",
  //     content: `
  //     薯条世、炸鱿鱼抗饿小食:披萨、炸鸡🥞🥓、喜圈、鸭脖子、鸡爪(虎皮、酸辣)、素丝、腐竹、藕片)、🥕鸡翅甜品:蛋糕罍、酥、泡芙、肉松小贝零食:薯片、虾条## 薯dwadwa`,
  //     flag: "failed",
  //   },
  // ]
  const [travelData, setTraveldata] = useState([])

  useEffect(() => {
    getList()
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
  return <Travel data={travelData}></Travel>
}
