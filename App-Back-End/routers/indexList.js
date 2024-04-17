const express = require("express")
const router = express.Router()
const Post = require("./postsModel")
const fs = require("fs")

router.post("/indexList", async function (req, res) {
  const currentPage = req.body.currentPage
  const pageSize = req.body.pageSize
  const startIndex = (currentPage - 1) * pageSize
  const searchText = req.body.searchText
  try {
    // 查询指定索引范围内的Post数组列表
    const posts = await Post.find({
      $and: [
        { status: "published" },
        {
          $or: [
            { username: { $regex: searchText, $options: "i" } },
            { title: { $regex: searchText, $options: "i" } },
          ],
        },
      ],
    })
      .skip(startIndex)
      .limit(pageSize)
    if (posts.length === undefined) {
      // return res.status(404).json({ message: "未找到的帖子！" })
    }
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
        //获取所有图片
        let all_images = []
        if (!post.userImg.includes("http")) {
          const imagePath = "img/" + post.userImg + ".png"
          const imageBuffer = fs.readFileSync(imagePath)
          post.userImg =
            "data:image/jpeg;base64," + imageBuffer.toString("base64")
        }
        post.images.forEach((item) => {
          let image = {}
          if (item.thumbURL) {
            image = {
              width: item.width,
              height: item.height,
              thumbURL: item.thumbURL,
              base64: null,
            }
          } else {
            const imagePath = "img/" + item.base64 + ".png"
            const imageBuffer = fs.readFileSync(imagePath)
            image = {
              width: item.width,
              height: item.height,
              thumbURL: null,
              base64:
                "data:image/jpeg;base64," + imageBuffer.toString("base64"),
            }
          }
          all_images.push(image)
        })

        return {
          reviewer_id: post._id,
          username: post.username,
          title: post.title,
          content: post.content,
          images: image,
          all_images: all_images,
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
