import Cookies from "js-cookie"
import React, { Suspense, useEffect, useState } from "react"

import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
  Navigate,
} from "react-router-dom"
const Element = (props) => {
  let { component: Component } = props
  const nav = useNavigate()
  const location = useLocation()
  const params = useParams()
  const [searchParams] = useSearchParams()
  if (!Cookies.get("Login")) {
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      return <Navigate to="/login"></Navigate>
    }
  } else if (
    Cookies.get("Login") &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    return <Navigate to="/"></Navigate>
  }
  return (
    <Component
      navigate={nav}
      location={location}
      params={params}
      searchParams={searchParams}
    />
  )
}
const fn = (routes) => {
  return routes.map((item, index) => {
    if (!item.children) {
      return (
        <Route
          key={index}
          path={item.path}
          element={<Element {...item}></Element>}
        ></Route>
      )
    } else {
      return (
        <Route
          key={index}
          path={item.path}
          element={<Element {...item}></Element>}
        >
          {fn(item.children)}
        </Route>
      )
    }
  })
}
const RouterView = (props) => {
  let { routes } = props
  return (
    <Suspense>
      <Routes>{fn(routes)}</Routes>
    </Suspense>
  )
}

export default RouterView
