import MarchantDashboard from "../../views/dashboard/marchant"
import MerchantAddOrder from "../../views/merchant_views/order/add-order"
import MerchantOrdersList from "../../views/merchant_views/order/list"
import MarchantOrderView from "../../views/merchant_views/order/view"


const MarchantRoutes = [
    {
        path: "/marchant-dashboard",
        element: <MarchantDashboard />
    },
    {
        path: "/marchant-orders",
        element: <MerchantOrdersList />
    },
    {
        path: "/marchant-orders/create",
        element: <MerchantAddOrder />
    },
    {
        path: "/marchant-orders/view",
        element: <MarchantOrderView />
    },
  
]

export default [...MarchantRoutes]