import { lazy } from "react"
import UserChangePassword from "../../views/user_setting/ChangePassword"

const Login = lazy(() => import("../../views/Login"))
const Register = lazy(() => import("../../views/Register"))
const ForgotPassword = lazy(() => import("../../views/ForgotPassword"))

const AuthRoutes = [
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
    
  },
  
]

export default AuthRoutes
