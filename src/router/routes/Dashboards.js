import { lazy } from 'react'

import MerchantList from "../../views/merchants/list"
import AddMerchants from "../../views/merchants/add"
import EditMerchants from "../../views/merchants/edit"
import MarchantView from "../../views/merchants/view"
import MarchantLogin from '../../views/merchants/marchantlogin/marchantLogin'


import RiderList from "../../views/rider/list"
import AddRider from "../../views/rider/add"
import EditRider from "../../views/rider/edit"
import RiderView from "../../views/rider/view"
import RiderLogin from '../../views/rider/riderlogin/riderLogin'


import AgentList from "../../views/agent/list"
import AddAgent from "../../views/agent/add"
import EditAgent from "../../views/agent/edit"
import AgentView from "../../views/agent/view"
import AgentLogin from '../../views/agent/agentlogin/agentLogin'


import CitiesList from "../../views/cities/list"
import AddCities from "../../views/cities/add"
import EditCities from "../../views/cities/edit"

import AreasList from "../../views/areas/list"
import AddAreas from "../../views/areas/add"
import EditAreas from "../../views/areas/edit"

import ShipmentTypeList from "../../views/shipment_type/list"
import AddShipmentType from "../../views/shipment_type/add"
import EditShipmentType from "../../views/shipment_type/edit"

import ProductTypeList from "../../views/product_type/list"
import AddProductType from "../../views/product_type/add"
import EditProductType from "../../views/product_type/edit"

import PricingPolicyList from "../../views/pricing_policy/list"
import AddPricingPolicy from "../../views/pricing_policy/add"
import EditPricingPolicy from "../../views/pricing_policy/edit"
import PricingPolicyView from "../../views/pricing_policy/view"


import CreateOrderList from "../../views/create_order/list"
import AddCreateOrder from "../../views/create_order/add"
import EditCreateOrder from "../../views/create_order/edit"
import CreateOrderView from "../../views/create_order/view"


import PaymentMethodList from "../../views/payment_method/list"
import AddPaymentMethod from "../../views/payment_method/add"
import EditPaymentMethod from "../../views/payment_method/edit"
import AnalyticsDashboard from '../../views/dashboard/analytics'


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
    path: "/marchantlogin",
    element: <MarchantLogin />
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
    path: "/merchants/view/:id",
    element: <MarchantView />
  },
  {
    path: "/riderlogin",
    element: <RiderLogin />
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
    path: "/rider/view/:id",
    element: <RiderView />
  },
  {
    path: "/agentlogin",
    element: <AgentLogin/>
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
    path: "/agent/view/:id",
    element: <AgentView />
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
    path: "/shipment_type",
    element: <ShipmentTypeList />
  },
  {
    path: "/shipment_type/add",
    element: <AddShipmentType />
  },
  {
    path: "/shipment_type/edit/:id",
    element: <EditShipmentType/>
  },

  {
    path: "/product_type",
    element: <ProductTypeList />
  },
  {
    path: "/product_type/add",
    element: <AddProductType />
  },
  {
    path: "/product_type/edit/:id",
    element: <EditProductType/>
  },

  {
    path: "/pricing_policy",
    element: <PricingPolicyList />
  },
  {
    path: "/pricing_policy/add",
    element: <AddPricingPolicy/>
  },
  {
    path: "/pricing_policy/edit/:id",
    element: <EditPricingPolicy />
  },
  {
    path: "/pricing_policy/view/:id",
    element: <PricingPolicyView />
  },

  {
    path: "/create_order",
    element: <CreateOrderList />
  },
  {
    path: "/create_order/add",
    element: <AddCreateOrder />
  },
  {
    path: "/create_order/edit/:id",
    element: <EditCreateOrder/>
  },
  {
    path: "/create_order/view/:id",
    element: <CreateOrderView />
  },

  {
    path: "/payment_method",
    element: <PaymentMethodList />
  },
  {
    path: "/payment_method/add",
    element: <AddPaymentMethod />
  },
  {
    path: "/payment_method/edit/:id",
    element: <EditPaymentMethod/>
  },

  {
  
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank"
    }
  }
]

const MarchantRoutes = [
  {
    path: "/marchant-dashboard",
    element: <AnalyticsDashboard />
  },
 
  {
    path: "/create_order",
    element: <CreateOrderList />
  },
  {
    path: "/create_order/add",
    element: <AddCreateOrder />
  },
  {
    path: "/create_order/edit/:id",
    element: <EditCreateOrder />
  },
  {
    path: "/create_order/view/:id",
    element: <CreateOrderView />
  },
]
const RiderRoutes = [
  {
    path: "/rider-dashboard",
    element: <AnalyticsDashboard />
  },

]
const AgentRoutes = [
  {
    path: "/agent-dashboard",
    element: <AnalyticsDashboard />
  },

]
export default [...DashboardRoutes, ...MarchantRoutes, ...RiderRoutes, ...AgentRoutes]
