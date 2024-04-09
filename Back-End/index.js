const express = require("express")
const session = require("express-session")
const app = express()
const cookieParser = require("cookie-parser")
const port = 3005
const MongoStore = require("connect-mongo")
const bodyParser = require("body-parser")
const usersRouter = require("./routers/pc_users")
const taskRouter = require("./routers/pc_travels")
app.use(cookieParser())
app.use(
  session({
    name: "Login", //cookie的name，默认值是connect.sid
    secret: "travels", //编码密钥
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000 * 10, secure: false, httpOnly: false },
    rolling: false, //每次请求都重新设置cookie的时间
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/user_session",
      ttl: 1000 * 60 * 10,
    }),
  })
)
app.all("*", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  res.setHeader("Access-Control-Allow-Credentials", "true")
  next()
})
app.use(bodyParser.json())

app.use(usersRouter)
app.use(taskRouter)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
