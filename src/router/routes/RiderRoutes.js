import RiderDashboard from "../../views/dashboard/rider"
import RiderOrdersList from "../../views/dashboard/rider"
import PickupView from "../../components/rider_view/task/TaskVIew"
import DelivaryView from "../../components/rider_view/task/DelivaryView"
import OrderStatusTable from "../../components/rider_view/task/OrderStatus"
import CurrentTaskList from "../../components/rider_view/task/listCurrentTask"


const RiderRoutes = [
    {
        path: "/rider-dashboard",
        element: <RiderDashboard />
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
        path: "/rider-orders/status",
        element: <OrderStatusTable />
    },
   
   

]

export default [...RiderRoutes]