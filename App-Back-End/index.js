

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const Users = require('./routers/usersModel');
const Posts = require('./routers/postsModel');
const myInfo=require('./routers/myInfo')
const indexList=require('./routers/indexList')
const search=require('./routers/search')
const person=require('./routers/person')
const deletePost=require('./routers/deletePost')
const publishPost=require('./routers/pubulishPost')
const logout=require('./routers/logout')
const updateName=require('./routers/updateName')
const updatePassword=require('./routers/updatePassword')
require('dotenv').config();
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
    .then(() => {
        console.log('Database connection successful');
    })
    .catch(err => {
        console.error('Database connection error', err);
    });

const app = express();
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(indexList);
app.use(search);
app.use(myInfo);
app.use(person);
app.use(deletePost);
app.use(publishPost);
app.use(logout);
app.use(updateName);
app.use(updatePassword)


// 注册
app.post("/register", async function (req, res) {
  const username = req.body.username
  const password = req.body.password

  // 先查找数据库中是否已经有同名的用户存在
  const user = await Users.findOne({ username: username })

  if (user) {
    // 如果已经存在同名用户，返回错误消息
    res.status(400).json({ message: "Username already exists" })
  } else {
    try {
      // 对密码进行哈希处理
      const hashedPassword = await bcrypt.hash(password, 10)

      let newUser = new Users({
        username: username,
        password: hashedPassword,
      })

      await newUser.save()

      res.json({ message: "User created successfully" })
    } catch (err) {
      console.error("Error occurred during registration:", err)
      res
        .status(500)
        .json({ message: "Could not create user", error: err.message })
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
      return res.status(401).json({ message: "Invalid username" })
    }

    // 检查密码是否匹配
    user.checkPassword(password, function (err, isMatch) {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: "Error logging in", err })
      }

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" })
      }

      // 检查用户头像是否存在
      if (!user.userImg) {
        user.userImg = "https://www.gravatar.com/avatar/?d=mp"
        user.save()
      }

      res.cookie("userId", user._id.toString())
      res.cookie("username", username)
      res.cookie("userImg", user.userImg)

      return res.status(200).json({ message: "Logged in successfully" })
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error logging in", err })
  }
})

// 游记

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

    res.json({ message: "Post created successfully" })
  } catch (err) {
    console.error("Error occurred during post creation:", err)
    res
      .status(500)
      .json({ message: "Could not create post", error: err.message })
  }
})

// 以id获取posts集合中数据
app.get("/posts/:id", async function (req, res) {
  // console.log(req);
  // console.log(req.params);
  // console.log(req.params.id);
  // console.log(res.json());
  try {
    const post = await Posts.findById(req.params.id)
    // console.log(post);
    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }
    // console.log(res.json(post));
    // console.log(post, "156161")
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
    return res.json(post)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: "Error occurred during post retrieval",
      error: err.message,
    })
  }
})

// 以id获取users集合中数据
app.get("/users/:id", async function (req, res) {
  try {
    const user = await Users.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: "Error occurred during user retrieval",
      error: err.message,
    })
  }
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
