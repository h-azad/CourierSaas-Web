import { lazy } from 'react'

import MerchantList from "../../views/merchants/list"
import AddMerchants from "../../views/merchants/add"
import EditMerchants from "../../views/merchants/edit"

import RiderList from "../../views/rider/list"
import AddRider from "../../views/rider/add"
import EditRider from "../../views/rider/edit"

import AgentList from "../../views/agent/list"
import AddAgent from "../../views/agent/add"
import EditAgent from "../../views/agent/edit"

import CitiesList from "../../views/cities/list"
import AddCities from "../../views/cities/add"
import EditCities from "../../views/cities/edit"

import AreasList from "../../views/areas/list"
import AddAreas from "../../views/areas/add"
import EditAreas from "../../views/areas/edit"

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
    path: "/merchants/edit/:id",
    element: <EditMerchants />
  },
  

  {
    path: "/rider",
    element: <RiderList />
  },
  {
    path: "/rider/add",
    element: <AddRider />
  },
  {
    path: "/rider/edit/:id",
    element: <EditRider />
  },


  {
    path: "/agent",
    element: <AgentList />
  },
  {
    path: "/agent/add",
    element: <AddAgent />
  },
  {
    path: "/agent/edit/:id",
    element: <EditAgent />
  },
  
  {
    path: "/cities",
    element: <CitiesList />
  },
  {
    path: "/cities/add",
    element: <AddCities />
  },
  {
    path: "/cities/edit/:id",
    element: <EditCities />
  },



  {
    path: "/areas",
    element: <AreasList />
  },
  {
    path: "/areas/add",
    element: <AddAreas />
  },
  {
    path: "/areas/edit/:id",
    element: <EditAreas />
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
