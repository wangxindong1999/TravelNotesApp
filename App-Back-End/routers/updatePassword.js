const express = require('express');
const router = express.Router();
const User=require('./usersModel')
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const bcrypt = require('bcrypt');
router.post('/updatePassword', async function(req, res) {
    try {
        const username = req.body.username;
        const prePassword = req.body.prePassword;
        const newPassword=req.body.newPassword;
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        const user = await User.findOne({ username: username });
        console.log(prePassword,newPassword,username)
        if (user) {
            bcrypt.compare(prePassword, user.password, function(err, result) {
                if (result) {
                    bcrypt.hash(newPassword, 10, function(err, hashedPassword) {
                        User.findOneAndUpdate({ username: user.username }, { password: hashedPassword }, { new: true })
                            .exec()
                            .then(updatedUser => {
                                if (updatedUser) {
                                    return res.status(200).json({ message: '修改成功' });
                                } else {
                                    return res.status(404).json({ message: '修改失败' });
                                }
                            })
                            .catch(err => {
                                return res.status(500).json({ message: '修改失败' });
                            });
                    });
                } else {
                    return res.status(404).json({ message: '修改失败或原密码错误' });
                }
            });
        }
        

    }catch(err){
        res.status(500).json({ error: err.message });
    }
})
module.exports = router;