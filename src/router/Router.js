// ** Router imports
import { lazy } from 'react'

// ** Router imports
import { useRoutes, Navigate } from 'react-router-dom'

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'

// ** Hooks Imports
import { useLayout } from '@hooks/useLayout'

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from '../utility/Utils'

// ** GetRoutes
import { getRoutes } from './routes'
import CreateOrganization from '../views/pages/authentication/CreateOrganization'

// ** Components
const Error = lazy(() => import('../views/pages/misc/Error'))
const Login = lazy(() => import('../views/pages/authentication/Login'))
// const RegisterCopy = lazy(() => import("../views/pages/authentication/RegisterCopy"))
const Register = lazy(() => import("../views/pages/authentication/Register"))
const NotAuthorized = lazy(() => import('../views/pages/misc/NotAuthorized'))

const Router = () => {
  // ** Hooks
  const { layout } = useLayout()

  const allRoutes = getRoutes(layout)
  const getHomeRoute = () => {
    const user = getUserData()
    if (user) {
      return getHomeRouteForLoggedInUser(user.role)
    } else {
      return '/login'
    }
  }

  const routes = useRoutes([
    {
      path: "/",
      index: true,
      element: <Navigate replace to={getHomeRoute()} />,
    },
    {
      path: "/login",
      element: <BlankLayout />,
      children: [{ path: "/login", element: <Login /> }],
    },
    // {
    //   path: "/registercopy",
    //   element: <BlankLayout />,
    //   children: [{ path: "/registercopy", element: <RegisterCopy /> }],
    // },
    {
      path: "create_organization",
      element: <BlankLayout />,
      children: [
        { path: "/create_organization", element: <CreateOrganization /> },
      ],
    },
    {
      path: "register",
      element: <BlankLayout />,
      children: [{ path: "/register", element: <Register /> }],
    },
    {
      path: "/auth/not-auth",
      element: <BlankLayout />,
      children: [{ path: "/auth/not-auth", element: <NotAuthorized /> }],
    },
    {
      path: "*",
      element: <BlankLayout />,
      children: [{ path: "*", element: <Error /> }],
    },
    ...allRoutes,
  ])

  return routes
}

export default Router
