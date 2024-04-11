const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const { MongoClient } = require("mongodb")
// const uri = "mongodb://127.0.0.1:27017"
const uri =
  "mongodb+srv://admin:admin@ctrip.e8joe2r.mongodb.net/test?retryWrites=true&w=majority&appName=Ctrip"
// const client = new MongoClient(uri)
const { ObjectId } = require("mongodb")
const postSchema = require("../modules/postModel")
mongoose
  .connect(uri)
  .then(() => {
    console.log("Database connection successful")
  })
  .catch((err) => {
    console.error("Database connection error", err)
  })

router.get("/travels/getTravelsList", async (req, res) => {
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
        .exec()
      const page = req.query.page
      const pageSize = req.query.pageSize
      const result1 = result.slice((page - 1) * pageSize, page * pageSize)
      const total = result.length
      req.session.newdate = Date.now()
      res.status(200)
      res.send({
        total: total,
        data: result1,
      })
      res.end()
    } catch (e) {
      res.status(500)
      res.end("服务器错误")
    }
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
      const result1 = result.slice((page - 1) * pageSize, page * pageSize)
      const total = result.length
      req.session.newdate = Date.now()
      res.status(200)
      res.send({
        total: total,
        data: result1,
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
      const result1 = result.slice((page - 1) * pageSize, page * pageSize)
      const total = result.length
      req.session.newdate = Date.now()
      res.status(200)
      res.send({
        total: total,
        data: result1,
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
      const result1 = result.slice((page - 1) * pageSize, page * pageSize)
      const total = result.length
      req.session.newdate = Date.now()
      res.status(200)
      res.send({
        total: total,
        data: result1,
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
      res.status(200)
      res.send(result)
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

/*
router.get("/travels/getTravelsList", async (req, res) => {
  const cookieValue = req.session.username
  if (!cookieValue) {
    res.status(401)
    res.send("未登录")
    res.end()
    return
  }
  if (req.session.newdate) {
    try {
      console.log(new Date().getSeconds())
      await client.connect()
      console.log(new Date().getSeconds())
      const database = client.db("test")
      const collection = database.collection("posts")
      // const result = await collection.find({ username: cookieValue }).toArray()4
      const result = await collection
        .find({
          $and: [
            {
              $and: [{ status: { $ne: "draft" } }, { status: { $ne: "-1" } }],
            },
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
        .toArray()
      const page = req.query.page
      const pageSize = req.query.pageSize
      const result1 = result.slice((page - 1) * pageSize, page * pageSize)
      const total = result.length
      req.session.newdate = Date.now()
      res.status(200)
      res.send({
        total: total,
        data: result1,
      })
      res.end()
    } catch (e) {
      res.status(500)
      res.end("服务器错误")
    } finally {
      await client.close()
    }
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
      await client.connect()
      const database = client.db("test")
      const collection = database.collection("posts")
      const result = await collection
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
        .toArray()
      const page = req.query.page
      const pageSize = req.query.pageSize
      const result1 = result.slice((page - 1) * pageSize, page * pageSize)
      const total = result.length
      req.session.newdate = Date.now()
      res.status(200)
      res.send({
        total: total,
        data: result1,
      })
      res.end()
    } catch (e) {
      res.status(500)
      res.end("服务器错误")
    } finally {
      await client.close()
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
      await client.connect()
      const database = client.db("test")
      const collection = database.collection("posts")
      const result = await collection
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
        .toArray()
      const page = req.query.page
      const pageSize = req.query.pageSize
      const result1 = result.slice((page - 1) * pageSize, page * pageSize)
      const total = result.length
      req.session.newdate = Date.now()
      res.status(200)
      res.send({
        total: total,
        data: result1,
      })
      res.end()
    } catch (e) {
      res.status(500)
      res.end("服务器错误")
    } finally {
      await client.close()
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
      await client.connect()
      const database = client.db("test")
      const collection = database.collection("posts")
      const result = await collection
        .find({
          $and: [
            // { username: cookieValue },
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
        .toArray()
      const page = req.query.page
      const pageSize = req.query.pageSize
      const result1 = result.slice((page - 1) * pageSize, page * pageSize)
      const total = result.length
      req.session.newdate = Date.now()
      res.status(200)
      res.send({
        total: total,
        data: result1,
      })
      res.end()
    } catch (e) {
      res.status(500)
      res.end("服务器错误")
    } finally {
      await client.close()
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
      await client.connect()
      const database = client.db("test")
      const collection = database.collection("posts")
      const result = await collection
        .find({
          $and: [
            // { username: cookieValue },
            { _id: new ObjectId(req.query.id) },
          ],
        })
        .toArray()
      req.session.newdate = Date.now()
      res.status(200)
      res.send(result)
      res.end()
    } catch (e) {
      res.status(500)
      res.end("服务器错误")
    } finally {
      await client.close()
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
      await client.connect()
      const database = client.db("test")
      const collection = database.collection("posts")
      await collection.updateOne(
        { _id: new ObjectId(req.body._id) },
        {
          $set: {
            reason: req.body.reason ? req.body.reason : "",
            reason_type: req.body.reason_type ? req.body.reason_type : "",
            status: req.body.status,
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
    } finally {
      await client.close()
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
      await client.connect()
      const database = client.db("test")
      const collection = database.collection("posts")
      await collection.updateOne(
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
    } finally {
      await client.close()
    }
  }
})
*/
module.exports = router
