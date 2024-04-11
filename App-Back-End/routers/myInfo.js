const express = require('express');
const router = express.Router();
const Post = require('./postsModel');
const User=require('./usersModel')
// const jwt = require('jsonwebtoken');


router.post('/myinfo', async function (req, res) {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    } else {
        try {
            // 验证并解码 token
            // const decoded = jwt.verify(token, 'secret_key');

            // 假设 token 中包含用户的 ID
            // const userId = decoded.userId;
            const userId="111";

            const user = await User.findOne({ userid: userId }).populate('Posts').exec();

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            console.log('用户信息:', user.username, user.userImg);

            const formattedPosts = user.Posts.map(post => {
                return {
                    reviewer_id: post._id,
                    username: post.username,
                    title: post.title,
                    content: post.content,
                    images: post.images.length > 0 ? post.images[0] : [],
                    status: post.status,
                    created_at: post.createdAt,
                    posted_at: post.postedAt,
                    updated_at: post.updatedAt,
                    deleted_at: post.deletedAt,
                    isDeleted: post.isDeleted,
                    reason_type: post.reason_type,
                    reason: post.reason,
                    userImg: post.userImg
                };
            });

            return res.send(formattedPosts);
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
});

module.exports = router;