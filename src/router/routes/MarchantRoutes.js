import MarchantDashboard from "../../views/dashboard/marchant"
import MerchantAddOrder from "../../views/merchant_views/order/add-order"
import EditMarchantOrder from "../../views/merchant_views/order/edit"
import MerchantOrdersList from "../../views/merchant_views/order/list"
import MarchantOrderView from "../../views/merchant_views/order/view"
import MarchantWallet from "../../views/merchant_views/wallet"
import MarchantBalanceWithrawRequestAdd from "../../views/merchant_views/withdraw_balance/add"
import MarchantBalanceWithrawRequestList from "../../views/merchant_views/withdraw_balance/partials/list-table"




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
        path: "/marchant-orders/view/:id",
        element: <MarchantOrderView />
    },
    {
        path: "/marchant_order/edit/:id",
        element: <EditMarchantOrder />
    },

    {
        path: "/marchant-wallet/",
        element: <MarchantWallet />
    },

    {
        path: "/marchant-withdraw-request/",
        element: <MarchantBalanceWithrawRequestList />
    },
    {
        path: "/marchant-withdraw-request/add",
        element: <MarchantBalanceWithrawRequestAdd/>
    }

  
]

export default [...MarchantRoutes]