const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const Users = require("./routers/usersModel")
const Posts = require("./routers/postsModel")
const myInfo = require("./routers/myInfo")
const indexList = require("./routers/indexList")
const search = require("./routers/search")
const person = require("./routers/person")
const deletePost = require("./routers/deletePost")
const publishPost = require("./routers/pubulishPost")
const logout = require("./routers/logout")
const updateName = require("./routers/updateName")
const updatePassword = require("./routers/updatePassword")
const getPost=require('./routers/getPost')
const updatePost=require('./routers/updatePost')
const updateUserImg=require('./routers/updateUserImg')
require("dotenv").config()
const uri = process.env.MONGODB_URI
const fs = require("fs")

mongoose
  .connect(uri)
  .then(() => {
    console.log("Database connection successful")
  })
  .catch((err) => {
    console.error("Database connection error", err)
  })

const app = express()
app.use(bodyParser.json({ limit: "10mb", extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(indexList)
app.use(search)
app.use(myInfo)
app.use(person)
app.use(deletePost)
app.use(publishPost)
app.use(logout)
app.use(updateName)
app.use(updatePassword)
app.use(getPost)
app.use(updatePost)
app.use(updateUserImg)

// 注册
app.post("/register", async function (req, res) {
  const username = req.body.username
  const password = req.body.password

  const defaultAvatarUrl = "https://img2.baidu.com/it/u=2248368782,3106831784&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=666";

  // 先查找数据库中是否已经有同名的用户存在
  const user = await Users.findOne({ username: username })

  if (user) {
    // 如果已经存在同名用户，返回错误消息
    res.status(400).json({ message: "用户名已存在" })
  } else {
    try {
      // 对密码进行哈希处理
      const hashedPassword = await bcrypt.hash(password, 10)

      let newUser = new Users({
        username: username,
        password: hashedPassword,
        userImg: defaultAvatarUrl,
      })

      await newUser.save()

      res.json({ message: "用户创建成功" })
    } catch (err) {
      console.error("Error occurred during registration:", err)
      res
        .status(500)
        .json({ message: "无法创建用户，请稍后重试", error: err.message })
    }
  }
})

// 登录
app.post("/login", async function (req, res) {
  const username = req.body.username
  const password = req.body.password

  try {
    // 查询用户名是否存在
    const user = await Users.findOne({ username: username })

    if (!user) {
      return res.status(401).json({ message: "用户名不存在，请先注册" })
    }

    // 检查密码是否匹配
    user.checkPassword(password, function (err, isMatch) {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: "登陆错误，请稍后重试", err })
      }

      if (!isMatch) {
        return res.status(401).json({ message: "密码错误" })
      }

      // 检查用户头像是否存在
      if (!user.userImg) {
        user.userImg = "https://www.gravatar.com/avatar/?d=mp"
        user.save()
      }

      res.cookie("userId", user._id.toString())
      res.cookie("username", username)
      res.cookie("userImg", user.userImg)

      return res.status(200).json({ message: "登录成功" })
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error logging in", err })
  }
})

// 游记创建
app.post("/posts", async function (req, res) {
  const title = req.body.title
  const content = req.body.content
  const images = req.body.images
  const status = req.body.status
  const username = req.body.username
  const userImg = req.body.userImg
  const userId = req.body.userId
  const imageArr = []
  try {
    images.forEach((item) => {
      let buffer = Buffer.from(item.base64, "base64")
      let uuid = username + new Date().getTime()
      imageArr.push({
        width: item.width,
        height: item.height,
        thumbURL: null,
        base64: uuid,
      })
      let filePath = "img/" + uuid + ".png"
      fs.writeFileSync(filePath, buffer)
    })
    let newPost = new Posts({
      title: title,
      content: content,
      images: imageArr,
      status: status,
      username: username,
      userImg: userImg,
      user: userId,
    })

    await newPost.save()

    res.json({ message: "游记创建成功" })
  } catch (err) {
    console.error("Error occurred during post creation:", err)
    res
      .status(500)
      .json({ message: "游记创建失败", error: err.message })
  }
})

// 以id获取posts集合中数据
app.get("/posts/:id", async function (req, res) {
  console.log(req.params.id);
  try {
    const post = await Posts.findById(req.params.id)
    console.log(post);
    if (!post) {
      return res.status(404).json({ message: "未找到游记" })
    }
    const newpost = post.images.map((item) => {
      return {
        width: item.width,
        height: item.height,
        thumbURL: item.thumbURL ? item.thumbURL : null,
        base64: item.base64
          ? fs.readFileSync("img/" + item.base64 + ".png").toString("base64")
          : null,
      }
    })
    post.images = newpost
    console.log(post.images)
    return res.json(post)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: "获取游记失败",
      error: err.message,
    })
  }
})

// 以id获取users集合中数据
app.get("/users/:id", async function (req, res) {
  try {
    const user = await Users.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: "未找到用户" })
    }

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: "获取用户失败",
      error: err.message,
    })
  }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
