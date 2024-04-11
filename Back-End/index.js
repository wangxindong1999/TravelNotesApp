const express = require("express")
const session = require("express-session")
const app = express()
const cookieParser = require("cookie-parser")
const port = 3005
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const MongoStore = require("connect-mongo")

// Import routers
const userRouter = require("./routers/pc_users")
const taskRouter = require("./routers/pc_travels")
const cardList = require("./routers/app/cardList")

app.use(cookieParser())
app.use(
  session({
    name: "Login",
    secret: "travels",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000 * 10, secure: false, httpOnly: false },
    rolling: false,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://admin:admin@ctrip.e8joe2r.mongodb.net/?retryWrites=true&w=majority&appName=Ctrip",
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

app.use(bodyParser.json({ limit: "50mb" }))
app.use(userRouter)
app.use(taskRouter)
app.use(cardList)

mongoose.connect(
  "mongodb+srv://admin:admin@ctrip.e8joe2r.mongodb.net/test?retryWrites=true&w=majority&appName=Ctrip",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

const db = mongoose.connection

// 连接
db.once("open", () => {
  console.log("Database connection successful")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
