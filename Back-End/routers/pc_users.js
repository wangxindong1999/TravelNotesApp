const express = require("express")
const router = express.Router()
const { MongoClient } = require("mongodb")
const uri = "mongodb+srv://admin:admin@ctrip.e8joe2r.mongodb.net/test?retryWrites=true&w=majority&appName=Ctrip"
const client = new MongoClient(uri)
const Base64 = require("js-base64").Base64
const bcrypt = require("bcrypt")
const saltRounds = 10

router.post("/user/login", async (req, res) => {
  try {
    await client.connect()
    const database = client.db("travels")
    const collection = database.collection("users")
    const result = await collection
      .find({ username: req.body.username })
      .toArray()
    if (result.length === 0 || (!result[0].isAdmin && !result[0].isReviewer)) {
      res.status(404)
      res.send("用户不存在")
      res.end()
      return
    }
    const compare = req.body.password === result[0].password
    if (!compare) {
      res.status(401)
      res.send("密码错误")
      res.end()
      return
    }
    if (compare) {
      req.session.newdate = Date.now()
      req.session.username = req.body.username
      // res.status(200)
      res.send({
        message: "登录成功",
        username: req.body.username,
        position: result[0].isAdmin ? "管理者" : "审核者",
        userImg: result[0].userImg,
      })
      res.end()
      return
    }
    res.end()
  } catch (e) {
    res.status(500)
    res.end("服务器错误")
  } finally {
    await client.close()
  }
})
router.post("/user/register", async (req, res) => {
  console.log(req.body)
  try {
    await client.connect()
    const database = client.db("travels")
    const collection = database.collection("users")
    const result = await collection
      .find({ username: req.body.username })
      .toArray()
    if (result.length !== 0) {
      res.status(401)
      res.send("用户已存在")
      res.end()
      return
    }
    const result2 = await collection.insertOne({
      username: req.body.username,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
      isReviewer: req.body.isReviewer,
      admin_id: req.body.admin_id,
      reviewer_id: req.body.reviewer_id,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
      userImg: req.body.userImg,
    })
    res.send("注册成功")
    res.end()
  } catch (e) {
    res.status(500)
    res.end("服务器错误")
  } finally {
    await client.close()
  }
})
router.post("/user/logout", async (req, res) => {
  req.session.destroy()
  res.send("退出成功")
  res.end()
})
//查找用户信息
router.get("/user/info", async (req, res) => {
  const cookieValue = req.session.username
  if (!cookieValue) {
    res.status(401)
    res.send("未登录")
    res.end()
    return
  }
  if (req.session.newdate) {
    try {
      await client.connect()
      const database = client.db("travels")
      const collection = database.collection("users")
      const result = await collection.find({ username: cookieValue }).toArray()
      req.session.newdate = Date.now()
      res.status(200)
      res.send({
        userImg: result[0].userImg,
        username: result[0].username,
        position: result[0].isAdmin ? "管理者" : "审核者",
      })
      res.end()
    } catch (e) {
      res.status(500)
      res.end("服务器错误")
    } finally {
      await client.close()
    }
  }
})
module.exports = router
