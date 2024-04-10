import request from "../util/request"

export function getList(params) {
  return request({
    url: "/travels/getTravelsList",
    method: "get",
    params,
  })
}

export function getRejectedList(params) {
  return request({
    url: "/travels/getRejectedList",
    method: "get",
    params,
  })
}

export function getPublishList(params) {
  return request({
    url: "/travels/getPublishList",
    method: "get",
    params,
  })
}
export function getCommittedList(params) {
  return request({
    url: "/travels/getCommittedList",
    method: "get",
    params,
  })
}
export function getDetail(id) {
  return request({
    url: "/travels/getDetail",
    method: "get",
    params: { id },
  })
}
export function postReason(data) {
  return request({
    url: "/travels/changeReason",
    method: "post",
    data,
  })
}
export function deleteTravel(data) {
  return request({
    url: "/travels/deleteTravel",
    method: "post",
    data,
  })
}

export function findTravel(params) {
  return request({
    url: "/travels/findTravel",
    method: "get",
    params,
  })
}

/**/
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
