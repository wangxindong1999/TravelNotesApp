
const express = require('express');
const router = express.Router();
const Post = require('./postsModel');

router.post('/deletePost', async function (req, res) {
    const postId = req.body.postId;
    console.log(postId)
    try{
        const deletedPost = await Post.findByIdAndDelete(postId);
    if (deletedPost) {
        return res.status(200).json({ message: '删除成功！' });
    } else {
        return res.status(200).json({ message: '删除失败！' });
    }
   }catch(err){
        console.log(err);
        return res.status(500).json({ message: '请求错误！', err });
   }

});

module.exports = router;
