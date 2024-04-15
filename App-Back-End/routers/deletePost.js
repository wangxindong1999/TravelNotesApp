
const express = require('express');
const router = express.Router();
const Post = require('./postsModel');

router.post('/deletePost', async function (req, res) {
    const postId = req.body.postId;
    console.log(postId)
    try {
        const deletedPost = await Post.findOne({_id:postId}); // 使用正确的查询语法
        console.log(deletedPost)
        if (deletedPost) {
            const deleteResult = await Post.deleteOne({ _id: postId }); // 删除找到的帖子
            if (deleteResult.deletedCount > 0) {
                return res.status(200).json({ message: '删除成功！' });
            } else {
                return res.status(404).json({ message: '未找到匹配的帖子或删除失败！' });
            }
        } 
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: '请求错误！', error: err });
    }

});

module.exports = router;
