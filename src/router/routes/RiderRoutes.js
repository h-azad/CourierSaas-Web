import RiderDashboard from "../../views/dashboard/rider"
import RiderOrdersList from "../../views/dashboard/rider"
import CurrentTaskList from "../../components/rider_view/task/listCurrentTask"
import PickupView from "../../components/rider_view/task/pickup/TaskVIew"
import DelivaryView from "../../components/rider_view/task/delivary/DelivaryView"
import OrderStatusTable from "../../components/rider_view/task/order_status/OrderStatus"
import TaskView from "../../components/rider_view/taskView"

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
    {
        path: "/rider-orders/task-view/:id",
        element: <TaskView/>
    },
   
   

]

export default [...RiderRoutes]