import MarchantDashboard from "../../views/dashboard/marchant"
import MerchantAddOrder from "../../views/merchant_views/order/add-order"
import MerchantOrdersList from "../../views/merchant_views/order/list"

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
  
]

export default [...MarchantRoutes]