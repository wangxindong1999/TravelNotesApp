
const express = require('express');
const router = express.Router();
router.post('/logout', async function(req, res) {
    // console.log(req.cookies.username);
    try {
        console.log(269)
        const cookiesBeforeClearing = req.cookies;
        console.log('当前的 cookies：', cookiesBeforeClearing);

        // 清除指定的 cookies
        res.clearCookie('userId');
        res.clearCookie('username');
        res.clearCookie('userImg');
        req.cookies = {}; // 清空 req.cookies 对象


        // 获取清除后剩余的 cookies
        const cookiesAfterClearing = req.cookies;
        console.log('清除后剩余的 cookies：', cookiesAfterClearing);
        if (!res.getHeaders()['set-cookie']) {
            console.log(999)
            return res.status(200).json({ message: '无法删除cookie！' });
        }else{
            return res.status(200).json({ message: '成功退出！' });
        }

    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: '退出失败！', err });
    }
  });

  module.exports = router;