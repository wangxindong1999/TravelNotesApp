const express = require("express")
const router = express.Router()
const fs = require("fs")
const Post = require("./postsModel")

router.post("/search", async (req, res) => {
  const currentPage = req.body.currentPage
  const pageSize = req.body.pageSize
  const startIndex = (currentPage - 1) * pageSize
  const searchText = req.body.searchText
  try {
    const posts = await Post.find({
      $or: [
        { username: { $regex: searchText, $options: "i" } }, // 模糊查询 username
        { title: { $regex: searchText, $options: "i" } }, // 模糊查询 title
      ],
    })
    if (posts.length !== 0) {
      // 只返回每个Post中images数组的第一个元素的信息
      const formattedPosts = await posts.map((post) => {
        let image = {}
        if (post.images.length > 0 && !post.images[0].thumbURL) {
          const imagePath = "img/" + post.images[0] + ".png"
          const imageBuffer = fs.readFileSync(imagePath)
          image = {
            width: post.images[0].width,
            height: post.images[0].height,
            thumbURL: null,
            base64: imageBuffer.toString("base64"),
          }
        } else {
          image = {
            width: post.images[0].width,
            height: post.images[0].height,
            thumbURL: post.images[0].thumbURL,
            base64: null,
          }
        }
        return {
          reviewer_id: post._id,
          username: post.username,
          title: post.title,
          content: post.content,
          images: image,
          // images: post.images.length > 0 ? post.images[0] : [],
          status: post.status,
          created_at: post.createdAt,
          posted_at: post.postedAt,
          updated_at: post.updatedAt,
          deleted_at: post.deletedAt,
          isDeleted: post.isDeleted,
          reason_type: post.reason_type,
          reason: post.reason,
          userImg: post.userImg,
        }
      })
      return res.send(formattedPosts)
    } else {
      return res.status(200).json({ message: "没有查询结果" })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
