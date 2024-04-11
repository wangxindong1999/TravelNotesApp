const express = require("express")
const router = express.Router()
const { MongoClient } = require("mongodb")
const uri = "mongodb+srv://admin:admin@ctrip.e8joe2r.mongodb.net/test?retryWrites=true&w=majority&appName=Ctrip"
const client = new MongoClient(uri)
const Base64 = require("js-base64").Base64
const bcrypt = require("bcrypt")
const saltRounds = 10

router.post("/userApp/indexList", async (req, res) => {
    // const page=req.body.page;
    // const pageSize=req.body.pageSize;
    console.log(req.body)
    try {
      await client.connect()
      const database = client.db("travels")
      const collection = database.collection("posts")
      const result = await collection
        .find({ username: req.body.username })
        .toArray();
      if(result.length!==0){
        res.send(result); 
        console.log(result);
        res.end();
      }else{
        res.send("不存在");
      }
    // try {
    //   const startIndex = (page - 1) * pageSize;
    //   const posts = await CardModel.find({ "username": "username" });// 查询 status 为 "1" 的数据
    //                            .skip(startIndex)
    //                            .limit(pageSize)
    //                            .select('reviewer_id title username userimg images')
    //                            .exec();
    //       // 处理每个对象，只保留图片数组中的第一张图片
    //       const formattedPosts = posts.map(post => {
    //           return {
    //               reviewer_id: post.reviewer_id,
    //               title: post.title,
    //               username: post.username,
    //               userimg: post.userimg,
    //               images: post.images.length > 0 ? post.images[0] : null
    //           };
    //       });
    
    //       // 如果返回的数据为空，说明到底了
    //       if (posts.length === 0) {
    //           const hhh="buttom!"
    //           // return hhh;
    //           console.log(hhh);
    //       }
    //       else
    //         console.log(posts);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "服务器错误" });
    }
})
module.exports = router
