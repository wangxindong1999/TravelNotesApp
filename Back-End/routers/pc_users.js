const express = require("express")
const router = express.Router()
// const uri = "mongodb://127.0.0.1:27017"
const usersSchema = require("../modules/usersModel")
const fs = require("fs")
const path = require("path")

router.get("/user/login", async (req, res) => {
  try {
    const result = await usersSchema.findOne({ username: req.query.username })
    if (!result.id || (!result.isAdmin && !result.isReviewer)) {
      res.status(404)
      res.send("用户不存在")
      res.end()
      return
    }
    const compare = req.query.password === result.password
    if (!compare) {
      res.status(401)
      res.send("密码错误")
      res.end()
      return
    }
    if (compare) {
      req.session.newdate = Date.now()
      req.session.username = req.query.username
      const imageName = result.userImg // 图片名称
      const imagePath = "img/" + imageName + ".png" // 图片的完整路径
      const imageBuffer = fs.readFileSync(imagePath) // 读取图片
      const imageBase64 = imageBuffer.toString("base64") // 转换为 Base64
      res.send({
        message: "登录成功",
        username: req.query.username,
        position: result.isAdmin ? "管理者" : "审核者",
      })
      res.end()
      return
    }
    res.end()
  } catch (e) {
    res.status(500)
    res.end("服务器错误")
  }
})
router.post("/user/register", async (req, res) => {
  try {
    const result = await usersSchema.find({ username: req.body.username })
    if (result.length !== 0) {
      res.status(401)
      res.send("用户已存在")
      res.end()
      return
    }
    // 将 Base64 数据转换为 Buffer
    const buffer = Buffer.from(req.body.userImg, "base64")
    const uuid = req.body.username + new Date().getTime()
    const filePath = "img/" + uuid + ".png"
    fs.writeFileSync(filePath, buffer)
    const result2 = await usersSchema.create({
      username: req.body.username,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
      isReviewer: req.body.isReviewer,
      admin_id: req.body.admin_id,
      reviewer_id: req.body.reviewer_id,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
      userImg: uuid,
    })
    res.send("注册成功")
    res.end()
  } catch (e) {
    res.status(500)
    res.end("服务器错误")
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
      const result = await usersSchema.findOne({ username: cookieValue })
      req.session.newdate = Date.now()
      const imageName = result.userImg // 图片名称
      const imagePath = "img/" + imageName + ".png" // 图片的完整路径
      const imageBuffer = fs.readFileSync(imagePath) // 读取图片
      const imageBase64 = imageBuffer.toString("base64") // 转换为 Base64
      res.status(200)
      res.send({
        userImg: imageBase64,
        username: result.username,
        position: result.isAdmin ? "管理者" : "审核者",
      })
      res.end()
    } catch (e) {
      res.status(500)
      res.end("服务器错误")
    }
  }
})
module.exports = router
