const express = require("express")
const router = express.Router()
const Post = require("./postsModel")
const fs = require("fs")

router.post("/myInfo", async function (req, res) {
  const currentPage = req.body.currentPage
  const pageSize = req.body.pageSize
  const startIndex = (currentPage - 1) * pageSize
  const status = req.body.status
  const { username } = req.body
  let statusString = {}
  console.log(currentPage)

  switch (status) {
    case 3:
      statusString = "draft"
      break
    case 1:
      statusString = "committed"
      break
    case 2:
      statusString = "rejected"
      break
    case 0:
      statusString = "published"
      break
    default:
      statusString = ""
  }
  console.log(statusString)
  try {
    // 查询指定索引范围内的Post数组列表
    const posts = await Post.find({ username: username, status: statusString })
      .skip(startIndex)
      .limit(pageSize)
    if (posts.length !== 0) {
      // 只返回每个Post中images数组的第一个元素的信息
      const formattedPosts = await posts.map((post) => {
        let image = {}
        if (post.images.length > 0 && !post.images[0].thumbURL) {
          const imagePath = "img/" + post.images[0].base64 + ".png"
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
          status: post.status,
          reason_type: post.reason_type,
          reason: post.reason,
          images: image,
          //   images: post.images.length > 0 ? post.images[0] : [],
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
      return res.status(200).json({ message: "没有新的数据啦~" })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "请求错误！", err })
  }
})

module.exports = router
