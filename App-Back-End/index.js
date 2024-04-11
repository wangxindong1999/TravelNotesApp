const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const Users = require('./routers/usersModel');
const Post = require('./routers/postsModel');
require('dotenv').config();
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
    .then(() => {
        console.log('Database connection successful');
    })
    .catch(err => {
        console.error('Database connection error', err);
    });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 注册
app.post('/register', async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
  
    // 先查找数据库中是否已经有同名的用户存在
    const user = await Users.findOne({ username: username });
  
    if(user) {
      // 如果已经存在同名用户，返回错误消息
      res.status(400).json({ message: 'Username already exists' });
    } else {
      try {
        // 对密码进行哈希处理
        const hashedPassword = await bcrypt.hash(password, 10);
        
        var newUser = new Users({
          username: username,
          password: hashedPassword
        });
  
        await newUser.save();
        
        res.json({ message: 'User created successfully' });
      } catch(err) {
        console.error('Error occurred during registration:', err);
        res.status(500).json({ message: 'Could not create user', error: err.message });
      }
    }
});

// 登录
app.post('/login', async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    
    try {
      // 查询用户名是否存在
      const user = await Users.findOne({ username: username });
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid username' });
      }
      
      // 检查密码是否匹配
      user.checkPassword(password, function(err, isMatch) {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: 'Error logging in', err });
        }
        
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid password' });
        }

        // 检查用户头像是否存在
        // if (!user.userImg) {
        //   user.userImg = 'https://www.gravatar.com/avatar/?d=mp';
        //   user.save();
        // }
        
        return res.status(200).json({ message: 'Logged in successfully' });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error logging in', err });
    }
  });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});