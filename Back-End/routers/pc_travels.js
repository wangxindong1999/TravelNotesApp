const express = require("express")
const router = express.Router()
const { ObjectId } = require("mongodb")
const postSchema = require("../modules/postModel")
const path = require("path")
const fs = require("fs")
// const uri = "mongodb://127.0.0.1:27017"

router.get("/travels/getTravelsList", async (req, res) => {
  const cookieValue = req.session.username
  if (!cookieValue) {
    res.status(401)
    res.send("未登录")
    res.end()
    return
  }

  if (req.session.newdate) {
    // try {
    const result = await postSchema.find({
      $and: [
        { status: { $nin: ["draft", "-1"] } },
        req.query.search !== ""
          ? {
              $or: [
                { title: { $regex: req.query.search, $options: "i" } },
                { content: { $regex: req.query.search, $options: "i" } },
              ],
            }
          : {},
      ],
    })

    const page = req.query.page
    const pageSize = req.query.pageSize
    const result1 = JSON.parse(JSON.stringify(result)).slice(
      (page - 1) * pageSize,
      page * pageSize
    )

    result1.forEach((item) => {
      item.images.forEach((item1) => {
        if (item1.base64) {
          const imageName = item1.base64 // 图片名称
          const imagePath =
            path.join(path.join(__dirname, ".."), "../App-Back-End/img/") +
            imageName +
            ".png" // 图片的完整路径
          const imageBuffer = fs.readFileSync(imagePath) // 读取图片
          const imageBase64 = imageBuffer.toString("base64") // 转换为 Base64
          item1.base64 = imageBase64
        }
      })
    })
    const total = result.length
    req.session.newdate = Date.now()
    res.status(200)
    res.send({
      total: total,
      data: JSON.parse(JSON.stringify(result1)).map((item) => {
        return {
          ...item,
          images: item.images[0],
        }
      }),
    })
    res.end()
    // } catch (e) {
    //   res.status(500)
    //   res.end("服务器错误")
    // }
  }
})
router.get("/travels/getPublishList", async (req, res) => {
  const cookieValue = req.session.username
  if (!cookieValue) {
    res.status(401)
    res.send("未登录")
    res.end()
    return
  }
  if (req.session.newdate) {
    try {
      const result = await postSchema
        .find({
          $and: [
            // { username: cookieValue },
            { status: "published" },
            req.query.search !== ""
              ? {
                  $or: [
                    { title: { $regex: req.query.search, $options: "i" } },
                    { content: { $regex: req.query.search, $options: "i" } },
                  ],
                }
              : {},
          ],
        })
        .exec()
      const page = req.query.page
      const pageSize = req.query.pageSize
      const result1 = JSON.parse(JSON.stringify(result)).slice(
        (page - 1) * pageSize,
        page * pageSize
      )

      result1.forEach((item) => {
        item.images.forEach((item1) => {
          if (item1.base64) {
            const imageName = item1.base64 // 图片名称
            const imagePath =
              path.join(path.join(__dirname, ".."), "../App-Back-End/img/") +
              imageName +
              ".png" // 图片的完整路径
            const imageBuffer = fs.readFileSync(imagePath) // 读取图片
            const imageBase64 = imageBuffer.toString("base64") // 转换为 Base64
            item1.base64 = imageBase64
          }
        })
      })
      const total = result.length
      req.session.newdate = Date.now()
      res.status(200)
      res.send({
        total: total,
        data: JSON.parse(JSON.stringify(result1)).map((item) => {
          return {
            ...item,
            images: item.images[0],
          }
        }),
      })
      res.end()
    } catch (e) {
      res.status(500)
      res.end("服务器错误")
    }
  }
})

router.get("/travels/getRejectedList", async (req, res) => {
  const cookieValue = req.session.username
  if (!cookieValue) {
    res.status(401)
    res.send("未登录")
    res.end()
    return
  }
  if (req.session.newdate) {
    try {
      const result = await postSchema
        .find({
          $and: [
            // { username: cookieValue },
            { status: "rejected" },
            req.query.search !== ""
              ? {
                  $or: [
                    { title: { $regex: req.query.search, $options: "i" } },
                    { content: { $regex: req.query.search, $options: "i" } },
                  ],
                }
              : {},
          ],
        })
        .exec()
      const page = req.query.page
      const pageSize = req.query.pageSize
      const result1 = JSON.parse(JSON.stringify(result)).slice(
        (page - 1) * pageSize,
        page * pageSize
      )

      result1.forEach((item) => {
        item.images.forEach((item1) => {
          if (item1.base64) {
            const imageName = item1.base64 // 图片名称
            const imagePath =
              path.join(path.join(__dirname, ".."), "../App-Back-End/img/") +
              imageName +
              ".png" // 图片的完整路径
            const imageBuffer = fs.readFileSync(imagePath) // 读取图片
            const imageBase64 = imageBuffer.toString("base64") // 转换为 Base64
            item1.base64 = imageBase64
          }
        })
      })
      const total = result.length
      req.session.newdate = Date.now()
      res.status(200)
      res.send({
        total: total,
        data: JSON.parse(JSON.stringify(result1)).map((item) => {
          return {
            ...item,
            images: item.images[0],
          }
        }),
      })
      res.end()
    } catch (e) {
      res.status(500)
      res.end("服务器错误")
    }
  }
})

router.get("/travels/getCommittedList", async (req, res) => {
  const cookieValue = req.session.username
  if (!cookieValue) {
    res.status(401)
    res.send("未登录")
    res.end()
    return
  }
  if (req.session.newdate) {
    try {
      const result = await postSchema
        .find({
          $and: [
            { status: "committed" },
            req.query.search !== ""
              ? {
                  $or: [
                    { title: { $regex: req.query.search, $options: "i" } },
                    { content: { $regex: req.query.search, $options: "i" } },
                  ],
                }
              : {},
          ],
        })
        .exec()
      const page = req.query.page
      const pageSize = req.query.pageSize
      const result1 = JSON.parse(JSON.stringify(result)).slice(
        (page - 1) * pageSize,
        page * pageSize
      )

      result1.forEach((item) => {
        item.images.forEach((item1) => {
          if (item1.base64) {
            const imageName = item1.base64 // 图片名称
            const imagePath =
              path.join(path.join(__dirname, ".."), "../App-Back-End/img/") +
              imageName +
              ".png" // 图片的完整路径
            const imageBuffer = fs.readFileSync(imagePath) // 读取图片
            const imageBase64 = imageBuffer.toString("base64") // 转换为 Base64
            item1.base64 = imageBase64
          }
        })
      })
      const total = result.length
      req.session.newdate = Date.now()
      res.status(200)
      res.send({
        total: total,
        data: JSON.parse(JSON.stringify(result1)).map((item) => {
          return {
            ...item,
            images: item.images[0],
          }
        }),
      })
      res.end()
    } catch (e) {
      res.status(500)
      res.end("服务器错误")
    }
  }
})

router.get("/travels/getDetail", async (req, res) => {
  const cookieValue = req.session.username
  if (!cookieValue) {
    res.status(401)
    res.send("未登录")
    res.end()
    return
  }
  if (req.session.newdate) {
    try {
      const result = await postSchema
        .find({
          $and: [{ _id: new ObjectId(req.query.id) }],
        })
        .exec()
      req.session.newdate = Date.now()
      const result1 = JSON.parse(JSON.stringify(result))
      result1.forEach((item) => {
        item.images.forEach((item1) => {
          if (item1.base64) {
            const imageName = item1.base64 // 图片名称
            const imagePath =
              path.join(path.join(__dirname, ".."), "../App-Back-End/img/") +
              imageName +
              ".png" // 图片的完整路径
            const imageBuffer = fs.readFileSync(imagePath) // 读取图片
            const imageBase64 = imageBuffer.toString("base64") // 转换为 Base64
            item1.base64 = imageBase64
          }
        })
      })
      res.status(200)
      res.send(result1)
      res.end()
    } catch (e) {
      res.status(500)
      res.end("服务器错误")
    }
  }
})

router.post("/travels/changeReason", async (req, res) => {
  const cookieValue = req.session.username
  if (!cookieValue) {
    res.status(401)
    res.send("未登录")
    res.end()
    return
  }
  if (req.session.newdate) {
    try {
      await postSchema
        .updateOne(
          { _id: new ObjectId(req.body._id) },
          {
            $set: {
              reason: req.body.reason ? req.body.reason : "",
              reason_type: req.body.reason_type ? req.body.reason_type : "",
              status: req.body.status,
            },
          }
        )
        .exec()
      req.session.newdate = Date.now()
      res.status(200)
      res.send("添加成功")
      res.end()
    } catch (e) {
      res.status(500)
      res.end("服务器错误")
    }
  }
})
router.post("/travels/deleteTravel", async (req, res) => {
  const cookieValue = req.session.username
  if (!cookieValue) {
    res.status(401)
    res.send("未登录")
    res.end()
    return
  }
  if (req.session.newdate) {
    try {
      await postSchema.updateOne(
        { _id: new ObjectId(req.body._id) },
        {
          $set: {
            isDeleted: true,
            status: "-1",
          },
        }
      )
      req.session.newdate = Date.now()
      res.status(200)
      res.send("添加成功")
      res.end()
    } catch (e) {
      res.status(500)
      res.end("服务器错误")
    }
  }
})

module.exports = router
