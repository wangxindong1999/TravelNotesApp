const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const Users = require('./routers/usersModel');
const Post = require('./routers/postsModel');
const myInfo=require('./routers/myInfo')
const indexList=require('./routers/indexList')
const search=require('./routers/search')
const Posts = require('./routers/postsModel');
const person=require('./routers/person')
const deletePost=require('./routers/deletePost')
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
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(indexList);
app.use(search);
app.use(myInfo);
app.use(person);
app.use(deletePost);

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
        
        let newUser = new Users({
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
        if (!user.userImg) {
          user.userImg = 'https://www.gravatar.com/avatar/?d=mp';
          user.save();
        }

        res.cookie('username', username)
        res.cookie('userImg', user.userImg)
        
        return res.status(200).json({ message: 'Logged in successfully' });
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error logging in', err });
    }
  });

// 游记
app.post('/posts', async function(req, res) {
    const title = req.body.title;
    const content = req.body.content;
    const images = req.body.images;
    const status = req.body.status;
    const user = req.body.user;
    
    try {
      let newPost = new Posts({
        title: title,
        content: content,
        images: images,
        status: status,
        user: user,
      });
  
      await newPost.save();
      
      res.json({ message: 'Post created successfully' });
    } catch(err) {
      console.error('Error occurred during post creation:', err);
      res.status(500).json({ message: 'Could not create post', error: err.message });
    }
}
)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});