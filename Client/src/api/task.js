import request from "../util/request"

export function getList() {
  return request({
    url: "/list/getList",
    method: "get",
  })
}

export function addList(data) {
  return request({
    url: "/list/addTask",
    method: "post",
    data,
  })
}

export function deleteTask(data) {
  return request({
    url: "/list/deleteTask",
    method: "post",
    data,
  })
}

// export function editTask(data) {
//   return request({
//     url: "/task/editTask",
//     method: "post",
//     data,
//   })
// }

export function findList(data) {
  return request({
    url: "/list/findList",
    method: "post",
    data,
  })
}

export function changeShare(data) {
  return request({
    url: "/list/changeShare",
    method: "post",
    data,
  })
}
