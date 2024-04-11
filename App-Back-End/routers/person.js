
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.post('/person', async function (req, res) {
    const username = req.cookies.username;
    const userImg = req.cookies.userImg;
   try{
        if(username){
            return res.send(
                {
                    username:username,
                    userImg:userImg
                })
            
        }else{
            return res.status(200).json({ message: '0000' });
        }
   }catch(err){
        console.log(err);
        return res.status(500).json({ message: '请求错误！', err });
   }
        

});

module.exports = router;
