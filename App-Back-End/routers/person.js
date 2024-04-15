
const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.post('/person', async function (req, res) {
    const username = req.cookies.username;
    const userImg = req.cookies.userImg;
    console.log(username)
    try{
    if (username !== undefined && userImg !== undefined) {
        console.log(2255)
        return res.send({
            message: '1111',
            username: username,
            userImg: userImg
        });
    } else {
        console.log(22255544)
        return res.status(200).json({ message: '0000' });
    }
    
   }catch(err){
        console.log(err);
        return res.status(500).json({ message: '请求错误！', err });
   }
        

});

module.exports = router;
