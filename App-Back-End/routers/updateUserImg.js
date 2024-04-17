const express = require("express")
const router = express.Router()
const fs = require("fs")
const User = require("./usersModel")
const Post = require("./postsModel")

router.post("/updateUserImg", async function (req, res) {
  const userImg = req.body.userImg.uri
  const username = req.body.username
  try {
    let buffer = Buffer.from(userImg, "base64")
    let uuid = username + new Date().getTime()
    let filePath = "img/" + uuid + ".png"
    fs.writeFileSync(filePath, buffer)
    const user = await User.findOne({ username: username })
    //   const posts = await Post.find({ username: username })
    const posts = await Post.updateMany(
      { username: username },
      { userImg: uuid }
    )
    if (user) {
      user.userImg = uuid
      // if (posts) {
      //   posts.forEach(async (post) => {
      //     post.userImg = uuid
      //     await post.save()
      //     console.log(post.userImg)
      //   })
      // }
      // 保存更新后的 post到数据库
      const updatedUser = await user.save()
      console.log("成功更新 post:", updatedUser.userImg)
      return res.status(200).json({ message: "成功修改！" })
    } else {
      return res.status(404).json({ message: "修改失败！" })
    }
  } catch (err) {
    console.error("Error occurred during user creation:", err)
    return res
      .status(500)
      .json({ message: "Could not create user", error: err.message })
  }
})

module.exports = router
