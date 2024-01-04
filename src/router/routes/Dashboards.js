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
import PickupView from '../../components/rider_view/task/pickup/TaskVIew'
import DelivaryView from '../../components/rider_view/task/delivary/DelivaryView'


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

import AccountWallet from '../../views/account_wallet/list'
import AccountWalletAdd from "../../views/account_wallet/add"
import AccountWalletEdit from "../../views/account_wallet/edit"


import WithdrawRequest from "../../views/withdraw_request/list"
import WithdrawRequestAdd from "../../views/withdraw_request/add"
import WithdrawRequestEdit from "../../views/withdraw_request/edit"
import AdminList from '../../views/admin/partials/list-table'
import AddAdmin from '../../views/admin/add'
import EditAdmin from '../../views/admin/edit'
import RiderAssignmentList from '../../views/assignment/rider/riderAssignment'
import RiderTasks from '../../views/assignment/rider/riderTaks'
import DeliveryRiderTask from '../../views/assignment/rider/deliveryRiderTask'
import Transections from '../../views/transection/transections'
import WalletAdjustment from '../../views/wallet_adjustment/partials/wallet_adjustment'
import AddWalletAdjustment from '../../views/wallet_adjustment/add'
import AdminOrderReport from '../../views/reports/adminOrderReport'
import AdminGetTransectionReport from '../../views/reports/transectionReport'
import AdminGetWithdrawRequestReport from '../../views/reports/withdrawRequest'
import GetAdminPickupReport from '../../views/reports/pickupReport'
import GetAdminDeliveryReport from '../../views/reports/deliveryReport'
import AdminGetCollectionReport from '../../views/reports/collectionReport'
import AdminOrderRevenueReport from '../../views/reports/revenueOrderReport'
import AddAgentType from '../../views/agent/agentType/add'
import AgentTypeList from '../../views/agent/agentType/partials/list-table'
import AgentTypeEdit from '../../views/agent/agentType/edit'
import AssignmentToAgent from '../../views/agent_assignment/delivery/assignmentToAgent'
import DeliveryToAgentTask from '../../views/agent_assignment/delivery/deliveryToAgentTask'

import SettingComponent from "../../views/pages/setting/SettingComponent"
import UserChangePassword from '../../views/user_setting/ChangePassword'
import Profile from '../../views/pages/profile'
import EditProfile from "../../views/pages/profile/EditProfile"
import PermissionList from '../../views/permission/PermissionList/PermissionList'
import AdminRoleList from '../../views/admin/role/AddminRoleList'
import AddAdminRole from '../../views/admin/role/AddAdminRole'
import EditAdminRole from '../../views/admin/role/EditAdminRole'
import RouteList from '../../views/route/list'
import AddRoute from '../../views/route/add'
import EditRoute from '../../views/route/edit/edit'
import GetAdminCencelIssue from '../../views/reports/cancelIssue'
import ReturnWarehouseOrderList from '../../views/return_order/warehouse/list'
import CurrentLocationSet from '../../views/rider/currentLocation/currentLocationSet'
import GetCurrentLocationRider from '@src/views/rider/currentLocation/getRiderLocation'
import AddOrder from '@src/views/create_order/add/add'
import InvoicePreview from '@src/views/create_order/invoice/preview'
import HoldOrderList from '@src/views/hold_order/list'
import ReturnOrderList from '@src/views/return_order/returns/list'
import PickupFailedList from '@src/views/return_order/cancelled/list'
import ReturnOrderToMarcahntLits from '@src/views/return_order/return_to_marchant/list'
import SetRiderInRoute from '@src/views/route/setRider/setRider'
import RiderRouteList from '@src/views/route/setRider/riderRouteList'
import MarchantAndRiderDistance from '@src/views/create_order/marchantAndRiderDistance/marchantAndRiderDistance'
import SetAreaToRoute from '@src/views/route/setArea/setArea'
import RouteAreaList from '@src/views/route/setArea/routeAreaList'
import CreateApplicationSetting from '@src/views/application_setting_app/application_setting/createApplicationSetting'
import AddHub from '@src/views/hub_app/hub/create'
import HubList from '@src/views/hub_app/hub'
import EditHub from '@src/views/hub_app/hub/edit'
import HubAdminCreate from '@src/views/hub_app/admin/create'
import HubAdminEdit from '@src/views/hub_app/admin/edit'
import HubAdminList from '@src/views/hub_app/admin'
import HubAdminDashboard from '@src/views/dashboard/hub_admin/hubAdminDashboard'
import HubAdminCreateMerchant from '@src/views/merchants/hubAdmin/hubAdminCreateMarchant'
import PendingCODCollectionList from '@src/views/assignment/adminCODCollection/PendingCODCollectionList'
import FundTransferList from '@src/views/fund_transfer/list'
import CreateFundTransfer from '@src/views/fund_transfer/add'
import CreateFundTransferByHubAdmin from '@src/views/fund_transfer/hub_admin/add'
import FundTransferListFoHubAdmin from '@src/views/fund_transfer/hub_admin/list'
import WalletAdjustmentMerchantIndex from '@src/views/wallet_adjustment/partials/merchant_adjustment_index'
import OrderReport from '@src/views/reports/orderReport'


const Home = lazy(() => import("../../views/Home"))
const SecondPage = lazy(() => import("../../views/SecondPage"))
const Error = lazy(() => import("../../views/Error"))

const DashboardRoutes = [

  
  {
    path: "/create_order/invoice/:id",
    element: <InvoicePreview />
  },
  {
    path: "/create_order/add-order",
    element: <AddOrder />
  },
  {
    path: "/user/current-location",
    element: <CurrentLocationSet />
  },
  {
    path: "/rider/locations-list",
    element: <GetCurrentLocationRider />
  },

  {
    path: "/profile",
    element: <Profile />
  },
  
  {
    path: "/profile/edit",
    element: <EditProfile />
  },

  {
    path: "/admin-role",
    element: <AdminRoleList />
  },
  {
    path: "/admin-role/add",
    element: <AddAdminRole />
  },
  {
    path: "/admin-role/edit/:id",
    element: <EditAdminRole />
  },

  {
    path: "/permission",
    element: <PermissionList />
  },
  

  {
    path: "/order/report",
    element: <OrderReport />
  },
  {
    path: "/revenue-report",
    element: <AdminOrderRevenueReport />
  },
  {
    path: "/transactions-report",
    element: <AdminGetTransectionReport />
  },
  {
    path: "/withdraw-request-report",
    element: <AdminGetWithdrawRequestReport />
  },
  {
    path: "/pickup-report",
    element: <GetAdminPickupReport />
  },
  {
    path: "/cancel-issue/report",
    element: <GetAdminCencelIssue />
  },

  {
    path: "/delivery-report",
    element: <GetAdminDeliveryReport />
  },
  {
    path: "/delivery-collection-report",
    element: <AdminGetCollectionReport />
  },
  
  {
    path: "/assignment/delivery/:id",
    element: <DeliveryRiderTask />
  },

  {
    path: "/assignment/pending-cod/collection/:id",
    element: <PendingCODCollectionList />
  },

  {
    path: "/agent-assignment/delivery/:id",
    element: <DeliveryToAgentTask />
  },

  {
    path: "/assignment/agent-delivery/:id",
    element: <DeliveryRiderTask />
  },

  {
    path: "/assignment/task/:id",
    element: <RiderTasks />
  },
  {
    path: "/assignment",
    element: <RiderAssignmentList />
  },

  {
    path: "/agent-assignment",
    element: <AssignmentToAgent />
  },

  {
    path: "/account-wallet",
    element: <AccountWallet />
  },
  {
    path: "/account-wallet/add",
    element: <AccountWalletAdd />
  },
  {
    path: "/account-wallet/edit/:id",
    element: <AccountWalletEdit />
  },

  {
    path: "/withdraw-request",
    element: <WithdrawRequest />
  },
  {
    path: "/withdraw-request/add",
    element: <WithdrawRequestAdd />
  },
  {
    path: "/withdraw-request/edit/:id",
    element: <WithdrawRequestEdit />
  },

  {
    path: "/fund-transfer/index/",
    element: <FundTransferList />
  },
  

  {
    path: "/fund-transfer/add/",
    element: <CreateFundTransfer />
  },

  {
    path: "/hub/admin/fund-transfer/index/",
    element: <FundTransferListFoHubAdmin />
  },


  {
    path: "/hub/admin/fund-transfer/add/",
    element: <CreateFundTransferByHubAdmin />
  },

  {
    path: "/transactions",
    element: <Transections />
  },
  {
    path: "/wallet-adjustment",
    element: <WalletAdjustment />
  },
  {
    path: "/wallet-adjustment/add",
    element: <AddWalletAdjustment />
  },

  {
    path: "/merchant/wallet-adjustment",
    element: <WalletAdjustmentMerchantIndex />
  },
  
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
    path: "/admin",
    element: <AdminList />
  },
  {
    path: "/admin/add",
    element: <AddAdmin />
  },
  {
    path: "/admin/edit/:id",
    element: <EditAdmin />
  },
  {
    path: "/admin/view/:id",
    element: <MarchantView />
  },

 
  {
    path: "/hub",
    element: <HubList />
  },

  {
    path: "/hub/add",
    element: <AddHub />
  },

  {
    path: "/hub/edit/:id",
    element: <EditHub />
  },

  {
    path: "/hub-admin/",
    element: <HubAdminList />
  },

  {
    path: "/hub-admin/add",
    element: <HubAdminCreate />
  },

  {
    path: "/hub-admin/edit/:id",
    element: <HubAdminEdit />
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
    path: "/agent-type",
    element: <AgentTypeList />
  },
  {
    path: "/agent-type/add",
    element: <AddAgentType />
  },
  {
    path: "/agent-type/edit/:id",
    element: <AgentTypeEdit />
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
    path: "/route",
    element: <RouteList />
  },
  {
    path: "/route/add",
    element: <AddRoute />
  },
  {
    path: "/route/edit/:id",
    element: <EditRoute />
  },

  {
    path: "/route/area",
    element: <RouteAreaList />
  },
  
  {
    path: "/route/set-area",
    element: <SetAreaToRoute />
  },
  {
    path: "/set-route-rider",
    element: <SetRiderInRoute />
  },
  {
    path: "/rider-route",
    element: <RiderRouteList/>
  },
  {
    path: "/distance/rider",
    element: <MarchantAndRiderDistance />
  },
  

  {
    path: "/setting/",
    element: <SettingComponent/>
  },

  {
    path: "/setting/application/create/",
    element: <CreateApplicationSetting />
  },

  {
    path: "/setting/password",
    element: <UserChangePassword/>
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
    path: "/hold-order",
    element: <HoldOrderList />
  },

  {
    path: "/return-order/warehouse",
    element: <ReturnWarehouseOrderList />
  },

  {
    path: "/return-order/",
    element: <ReturnOrderList />
  },
  {
    path: "/return-to/marchant",
    element: <ReturnOrderToMarcahntLits />
  },

  {
    path: "/pickup/failed/",
    element: <PickupFailedList />
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




const HubRoute = [
  {
    path: "/hub/admin-dashboard",
    element: <HubAdminDashboard />
  },

  {
    path: "/merchants/add",
    element: <HubAdminCreateMerchant />
  },

]

export default [...DashboardRoutes, ...RiderRoutes, ...AgentRoutes, ...HubRoute]
