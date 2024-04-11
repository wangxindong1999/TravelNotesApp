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
    console.log(req.query.search)
    try {
      await client.connect()
      const database = client.db("travels")
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
      const database = client.db("travels")
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
      const database = client.db("travels")
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
      const database = client.db("travels")
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
      const database = client.db("travels")
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
      const database = client.db("travels")
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
      const database = client.db("travels")
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

// router.get("/travels/findTravel", async (req, res) => {
//   const cookieValue = req.session.username
//   if (!cookieValue) {
//     res.status(401)
//     res.send("未登录")
//     res.end()
//     return
//   }
//   if (req.session.newdate) {
//     try {
//       await client.connect()
//       const database = client.db("travels")
//       const collection = database.collection("posts")
//       const result = await collection
//         .find({
//           $and: [
//             req.query.status === "all"
//               ? {
//                   $and: [
//                     { status: { $ne: "draft" } },
//                     { status: { $ne: "-1" } },
//                   ],
//                 }
//               : { status: req.query.status },
//             {
//               $or: [
//                 { title: { $regex: req.query.search, $options: "i" } },
//                 { content: { $regex: req.query.search, $options: "i" } },
//               ],
//             },
//           ],
//         })
//         .toArray()
//       req.session.newdate = Date.now()
//       res.send(result)
//       res.end()
//     } catch (e) {
//       res.status(500)
//       res.end("服务器错误")
//     } finally {
//       await client.close()
//     }
//   }
// })
module.exports = router
