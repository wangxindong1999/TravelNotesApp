该文档为后台管理模块
采用 React + vite 形式进行搭建，UI 组件库采用 antd，公共状态管理库采用的是 toolkit，使用 axios 来进行网络请求管理。
1、目录结构
assets 中存放着我们的图片登静态资源
components 中存放着我们的公共组件，比如 Travel 等复用组件
router 为我们的路由表，以及自己封装的路由结构
store 为我们的公共状态管理库
util 中存放着本项目所需的各种工具，目前存放着 axios 的请求拦截器和响应拦截器的封装
view 为路由组件
