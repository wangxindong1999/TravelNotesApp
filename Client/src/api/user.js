import request from "../util/request"

export function login(params) {
  return request({
    url: "/user/login",
    method: "get",
    params,
  })
}

export function register(data) {
  return request({
    url: "/user/register",
    method: "post",
    data,
  })
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "post",
  })
}

export function getUserInfo() {
  return request({
    url: "/user/info",
    method: "get",
  })
}
