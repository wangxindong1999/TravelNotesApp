const express = require("express")
const router = express.Router()
const fs = require("fs")
const Post = require("./postsModel")


router.post("/updatePost", async function (req, res) {
    const postId = req.body.postId;
    const title = req.body.title;
    const content = req.body.content;
    const images = req.body.images;
    const status = req.body.status;
    const username = req.body.username;
    const imageArr = [];

    try {
        for (const item of images) {
            let buffer = Buffer.from(item.base64, "base64");
            let uuid = username + new Date().getTime();
            imageArr.push({
                width: item.width,
                height: item.height,
                thumbURL: null,
                base64: uuid,
            });
            let filePath = "img/" + uuid + ".png";
            fs.writeFileSync(filePath, buffer);
        }

        const post = await Post.findOne({ _id: postId });

        if (post) {
            // 更新 post 的属性
            post.title = title;
            post.content = content;
            post.images = imageArr;
            post.status = status;

            // 保存更新后的 post到数据库
            const updatedPost = await post.save();
            console.log("成功更新 post:", updatedPost.title);
            return res.status(200).json({ message: "成功修改！" });
        } else {
            console.log("未找到对应的 post");
        }
    } catch (err) {
        console.error("Error occurred during post creation:", err);
        return res.status(500).json({ message: "Could not create post", error: err.message });
    }
});

  module.exports = router