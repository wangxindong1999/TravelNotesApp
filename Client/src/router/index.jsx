import { lazy, Suspense } from "react"
import { Navigate } from "react-router-dom"
// import Home from "../view/Home/Home"
// import Passed from "../view/Passed/Passed"
// import Pending from "../view/Pending/Pending"
// import Failed from "../view/Failed/Failed"
import AllIcon from "../components/Icon/AllIcon"
import PassedIcon from "../components/Icon/PassedIcon"
import PendingIcon from "../components/Icon/PendingIcon"
import FailedIcon from "../components/Icon/FailedIcon"
// import Details from "../view/Details/Details"

const basicRoutes = [
  {
    path: "/login",
    component: lazy(() => import("../view/Login/Login")),
  },
  {
    path: "/register",
    component: lazy(() => import("../view/Register/Register")),
  },
]
const otherRoutes = [
  {
    path: "/",
    name: "layout",
    component: lazy(() => import("../components/layout/layout")),
    children: [
      {
        path: "/",
        name: "home",
        isShow: false,
        component: () => <Navigate to="/home"></Navigate>,
      },
      {
        path: "details",
        name: "详情",
        isShow: false,
        component: lazy(() => import("../view/Details/Details")),
        // component: Details,
      },
      {
        path: "home",
        name: "全部游记",
        component: lazy(() => import("../view/Home/Home")),
        // component: Home,
        icon: <AllIcon></AllIcon>,
      },
      {
        path: "passed",
        name: "已通过",
        component: lazy(() => import("../view/Passed/Passed")),
        // component: Passed,
        icon: <PassedIcon></PassedIcon>,
      },
      {
        path: "pending",
        name: "待审核",
        component: lazy(() => import("../view/Pending/Pending")),
        // component: Pending,
        icon: <PendingIcon></PendingIcon>,
      },
      {
        path: "failed",
        name: "未通过",
        component: lazy(() => import("../view/Failed/Failed")),
        // component: Failed,
        icon: <FailedIcon></FailedIcon>,
      },
    ],
  },
]
const routes = [...basicRoutes, ...otherRoutes]
export const MenuItems = [...otherRoutes]
export default routes
