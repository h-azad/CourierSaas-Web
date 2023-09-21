import RiderDashboard from "../../views/dashboard/rider"
import RiderOrdersList from "../../views/dashboard/rider"
import CurrentTaskList from "../../components/rider_view/task/listCurrentTask"
import PickupView from "../../components/rider_view/task/pickup/TaskVIew"
import DelivaryView from "../../components/rider_view/task/delivary/DelivaryView"
import OrderStatusTable from "../../components/rider_view/task/order_status/OrderStatus"
import TaskView from "../../components/rider_view/taskView"
import RiderPickupReport from "../../views/rider/report/pickupReport"
import DeliveryReport from "../../views/rider/report/deliveryReport"
import MarchantCollectionReport from "../../views/rider/report/collectionReport"
import MyWallet from "../../views/account_wallet/wallet/MyWallet"
import ReturnView from "../../components/rider_view/task/return/ReturnView"
import CurrentLocationSet from "@src/views/rider/currentLocation/currentLocationSet"

const RiderRoutes = [
    // {
    //     path: "/rider-dashboard",
    //     element: <RiderDashboard />
    // },

    {
        path: "/rider/current-location",
        element: <CurrentLocationSet />
    },
    
    {
        path: "/rider-wallet",
        element: <MyWallet/>
    },
    {
        path: "/rider-orders/current-task",
        element: <CurrentTaskList/>
    },
    {
        path: "/rider-orders/pickup",
        element: <PickupView />
    },
   
    {
        path: "/rider-orders/delivary",
        element: <DelivaryView />
    },
    {
        path: "/rider-orders/return",
        element: <ReturnView />
    },

    
    {
        path: "/rider-orders/status",
        element: <OrderStatusTable />
    },
    {
        path: "/rider-orders/task-view/:id",
        element: <TaskView/>
    },
    {
        path: "/rider-pickup-report",
        element: <RiderPickupReport/>
    },
    {
        path: "/rider-delivery-report",
        element: <DeliveryReport/>
    },
    {
        path: "/rider-delivery-collection-report",
        element: <MarchantCollectionReport/>
    },
   
   

]

export default [...RiderRoutes]