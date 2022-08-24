import { lazy } from 'react'

import MerchantList from "../../views/merchants/list"
import AddMerchants from "../../views/merchants/add"
import EditMerchants from "../../views/merchants/edit"

const Home = lazy(() => import("../../views/Home"))
const SecondPage = lazy(() => import("../../views/SecondPage"))
const Error = lazy(() => import("../../views/Error"))

const DashboardRoutes = [
  
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/second-page",
    element: <SecondPage />
  },
  {
    path: "/merchants",
    element: <MerchantList />
  },
  {
    path: "/merchants/add",
    element: <AddMerchants />
  },
  {
    path: "/merchants/edit",
    element: <EditMerchants />
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank"
    }
  }
]

export default DashboardRoutes
