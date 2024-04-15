
const express = require('express');
const router = express.Router();
const Post = require('./postsModel');
const mongoose=require('mongoose')

router.post('/publishPost', async function (req, res) {
    const postId = req.body.postId;
    console.log(postId)
    try {
        const publishPost = await Post.findOne({_id:postId}); // 使用正确的查询语法
        console.log(publishPost)
        if (publishPost) {
            // 检查是否存在user字段，如果不存在则设置默认值
            if (!publishPost.hasOwnProperty('user')) {
                // 创建一个默认用户并将其ObjectId分配给user字段
                const defaultUser = new mongoose.Types.ObjectId(); // 创建一个新的ObjectId
                publishPost.user = defaultUser;
            }

            // 检查是否存在userImg字段，如果不存在则设置默认值
            if (!publishPost.hasOwnProperty('userImg')) {
                publishPost.userImg = 'https://img0.baidu.com/it/u=600715282,1120039690&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1083';
            }

            publishPost.status = 'committed';
            console.log(publishPost)
            const updatedPost = await publishPost.save();
            if (updatedPost) {
                console.log(888);
                return res.status(200).json({ message: '发布成功!'});
            } else {
                return res.status(404).json({ message: '未找到匹配的帖子或发布失败!' });
            }
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: '请求错误！', error: err });
    }

});

module.exports = router;
