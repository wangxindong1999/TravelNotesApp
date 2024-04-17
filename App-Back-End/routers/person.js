const express = require("express")
const router = express.Router()
const cookieParser = require("cookie-parser")
router.use(cookieParser())
const fs = require("fs")
const User = require("./usersModel")

router.post("/person", async function (req, res) {
  const username = req.cookies.username
  // const userImg = req.cookies.userImg;
  console.log(username)
  try {
    if (username !== undefined) {
      console.log(2255)
      const user = await User.findOne({ username: username })
      let userImg
      const userImage = user.userImg
      if (userImage.startsWith("http://") || userImage.startsWith("https://")) {
        userImg = userImage
      } else {
        const imagePath = "img/" + userImage + ".png"
        const imageBuffer = fs.readFileSync(imagePath)
        userImg = "data:image/jpeg;base64," + imageBuffer.toString("base64")
      }

      return res.send({
        username: username,
        userImg: userImg,
      })
    } else {
      console.log(22255544)
      return res.status(200).json({ message: "当前账号未登录！" })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "请求错误！", err })
  }
})

module.exports = router
