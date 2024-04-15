const express = require('express');
const router = express.Router();
const Post = require('./postsModel');
const User=require('./usersModel')
const cookieParser = require('cookie-parser');
router.use(cookieParser());
router.post('/updateName', async function(req, res) {
    try {
        const username = req.body.username;
        const newUsername = req.body.newUsername;
        console.log(username,newUsername);
        res.clearCookie('username');
        req.cookies.username='';
        res.cookie('username', newUsername);
        req.cookies.username=newUsername;
        // 更新 userSchema 中的 username
        const userUpdateResult = await User.findOneAndUpdate({ username: username }, { username: newUsername });

        // 更新 postSchema 中的 username
        const postUpdateResult = await Post.updateMany({ username: username }, { username: newUsername });

        if (userUpdateResult && postUpdateResult) {
            return res.status(200).json({ message: '修改成功' });
        } else {
            console.log(55569)
            return res.status(404).json({ message: '修改失败' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;