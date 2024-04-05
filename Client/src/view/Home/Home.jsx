import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import "./Home.css"
import testimg from "@/assets/avatar1.jpg"
import Travel from "@/components/Travel/Travel"
export default function Home(props) {
  const dispatch = useDispatch()
  const testData = [
    {
      id: 1,
      imgUrl: testimg,
      title: "一起郊游吧！快乐快乐出发！！！",
      content: `
      薯条世、炸鱿鱼抗饿小食:披萨、炸鸡🥞🥓、喜圈、鸭脖子、鸡爪(虎皮、酸辣)、素丝、腐竹、藕片)、🥕鸡翅甜品:蛋糕罍、酥、泡芙、肉松小贝零食:薯片、虾条## 薯dwadwa`,
      flag: "passed",
    },
    {
      id: 2,
      imgUrl: testimg,
      title: "一起郊游吧！快乐快乐出发！！！",
      content: `
      薯条世、炸鱿鱼抗饿小食:披萨、炸鸡🥞🥓、喜圈、鸭脖子、鸡爪(虎皮、酸辣)、素丝、腐竹、藕片)、🥕鸡翅甜品:蛋糕罍、酥、泡芙、肉松小贝零食:薯片、虾条## 薯dwadwa`,
      flag: "pending",
    },
    {
      id: 3,
      imgUrl: testimg,
      title: "一起郊游吧！快乐快乐出发！！！",
      content: `
      薯条世、炸鱿鱼抗饿小食:披萨、炸鸡🥞🥓、喜圈、鸭脖子、鸡爪(虎皮、酸辣)、素丝、腐竹、藕片)、🥕鸡翅甜品:蛋糕罍、酥、泡芙、肉松小贝零食:薯片、虾条## 薯dwadwa`,
      flag: "failed",
    },
  ]
  const [travelData, setTraveldata] = useState(testData)
  return <Travel data={travelData}></Travel>
}
