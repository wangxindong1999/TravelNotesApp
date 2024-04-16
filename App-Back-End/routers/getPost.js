
const express = require("express")
const router = express.Router()
const Post = require("./postsModel")
const fs = require("fs")

router.post("/getPost", async function (req, res) {
    console.log(req.body.postId);
    try {
      const post = await Post.findById(req.body.postId)
      console.log(post);
      if (!post) {
        return res.status(404).json({ message: "Post not found" })
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
        message: "Error occurred during post retrieval",
        error: err.message,
      })
    }
  })
  module.exports = router