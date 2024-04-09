const express = require("express")
const router = express.Router()
const { MongoClient } = require("mongodb")
const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)
const { ObjectId } = require("mongodb")

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
      await client.connect()
      const database = client.db("travels")
      const collection = database.collection("posts")
      // const result = await collection.find({ username: cookieValue }).toArray()4
      const result = await collection
        .find({
          $and: [{ username: cookieValue }, { status: { $ne: "draft" } }],
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
      const database = client.db("travels")
      const collection = database.collection("posts")
      const result = await collection
        .find({
          $and: [{ username: cookieValue }, { status: "published" }],
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
      const database = client.db("travels")
      const collection = database.collection("posts")
      const result = await collection
        .find({
          $and: [{ username: cookieValue }, { status: "rejected" }],
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
      const database = client.db("travels")
      const collection = database.collection("posts")
      const result = await collection
        .find({
          $and: [{ username: cookieValue }, { status: "committed" }],
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
router.post("/task/addTask", async (req, res) => {
  const cookieValue = req.session.username
  if (!cookieValue) {
    res.status(203)
    res.send("未登录")
    res.end()
    return
  }
  if (req.session.newdate) {
    try {
      await client.connect()
      const database = client.db("task")
      const collection = database.collection("task")
      const result = await collection.insertOne({
        username: cookieValue,
        taskname: req.body.taskname,
        taskcontent: req.body.taskcontent,
      })
      req.session.newdate = Date.now()
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

router.post("/task/deleteTask", async (req, res) => {
  const cookieValue = req.session.username
  if (!cookieValue) {
    res.status(203)
    res.send("未登录")
    res.end()
    return
  }
  if (req.session.newdate) {
    try {
      await client.connect()
      const database = client.db("task")
      const collection = database.collection("task")
      const result = await collection.deleteOne({
        _id: new ObjectId(req.body._id),
      })
      req.session.newdate = Date.now()
      res.send("删除成功")
      res.end()
    } catch (e) {
      res.status(500)
      res.end("服务器错误")
    } finally {
      await client.close()
    }
  }
})

router.post("/task/editTask", async (req, res) => {
  const cookieValue = req.session.username
  if (!cookieValue) {
    res.status(203)
    res.send("未登录")
    res.end()
    return
  }
  if (req.session.newdate) {
    try {
      await client.connect()
      const database = client.db("task")
      const collection = database.collection("task")
      const result = await collection.updateOne(
        { _id: new ObjectId(req.body._id) },
        {
          $set: {
            taskname: req.body.taskname,
            taskcontent: req.body.taskcontent,
          },
        }
      )
      req.session.newdate = Date.now()
      res.send("修改成功")
      res.end()
    } catch (e) {
      res.status(500)
      res.end("服务器错误")
    } finally {
      await client.close()
    }
  }
})
module.exports = router
