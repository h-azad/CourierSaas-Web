import MarchantDashboard from "../../views/dashboard/marchant"
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
  
]

export default [...MarchantRoutes]