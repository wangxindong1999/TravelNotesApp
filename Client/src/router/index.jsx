import { lazy } from "react"
import { Navigate } from "react-router-dom"
import Home from "../view/Home/Home"
import Passed from "../view/Passed/Passed"
import Pending from "../view/Pending/Pending"
import Failed from "../view/Failed/Failed"
import AllIcon from "../components/Icon/AllIcon"
import PassedIcon from "../components/Icon/Passed"
import PendingIcon from "../components/Icon/Pending"
import FailedIcon from "../components/Icon/Failed"
const routes = [
  {
    path: "/login",
    component: lazy(() => import("../view/Login/Login")),
  },
  {
    path: "/register",
    component: lazy(() => import("../view/Register/Register")),
  },
  {
    path: "/",
    name: "layout",
    component: lazy(() => import("../components/layout/layout")),
    children: [
      {
        path: "/",
        name: "home",
        component: () => <Navigate to="/home"></Navigate>,
      },
      {
        path: "home",
        name: "全部游记",
        // component: lazy(() => import("../view/Home/Home")),
        component: Home,
        icon: <AllIcon></AllIcon>,
      },
      {
        path: "passed",
        name: "已通过",
        // component: lazy(() => import("../view/Passed/Passed")),
        component: Passed,
        icon: <PassedIcon></PassedIcon>,
      },
      {
        path: "pending",
        name: "待审核",
        // component: lazy(() => import("../view/Pending/Pending")),
        component: Pending,
        icon: <PendingIcon></PendingIcon>,
      },
      {
        path: "failed",
        name: "未通过",
        // component: lazy(() => import("../view/Failed/Failed")),
        component: Failed,
        icon: <FailedIcon></FailedIcon>,
      },
    ],
  },
]
export const MenuItems = [
  {
    path: "home",
    name: "全部游记",
    // component: lazy(() => import("../view/Home/Home")),
    component: Home,
    icon: <AllIcon></AllIcon>,
  },
  {
    path: "passed",
    name: "已通过",
    // component: lazy(() => import("../view/Passed/Passed")),
    component: Passed,
    icon: <PassedIcon></PassedIcon>,
  },
  {
    path: "pending",
    name: "待审核",
    // component: lazy(() => import("../view/Pending/Pending")),
    component: Pending,
    icon: <PendingIcon></PendingIcon>,
  },
  {
    path: "failed",
    name: "未通过",
    // component: lazy(() => import("../view/Failed/Failed")),
    component: Failed,
    icon: <FailedIcon></FailedIcon>,
  },
]
export default routes
