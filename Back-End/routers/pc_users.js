const express = require("express")
const router = express.Router()
const { MongoClient } = require("mongodb")
const uri = "mongodb://127.0.0.1:27017"
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
    // const compare = bcrypt.compareSync(
    //   Base64.decode(req.body.password),
    //   result[0].password
    // )
    // if (!compare) {
    //   res.status(401)
    //   res.send("密码错误")
    //   res.end()
    //   return
    // }
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
      res.send("登录成功")
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
  try {
    await client.connect()
    const database = client.db("task")
    const collection = database.collection("users")
    const result = await collection
      .find({ username: req.body.username })
      .toArray()
    if (result.length !== 0) {
      res.status(203)
      res.send("用户已存在")
      res.end()
      return
    }
    const result2 = await collection.insertOne({
      username: req.body.username,
      password: bcrypt.hashSync(Base64.decode(req.body.password), saltRounds),
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
module.exports = router
