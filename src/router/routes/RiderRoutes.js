import RiderDashboard from "../../views/dashboard/rider"
import RiderOrdersList from "../../views/dashboard/rider"
import PickupView from "../../components/rider_view/task/TaskVIew"
import DelivaryView from "../../components/rider_view/task/DelivaryView"

const RiderRoutes = [
    {
        path: "/rider-dashboard",
        element: <RiderDashboard />
    },
    {
        path: "/rider-orders",
        element: <PickupView />
    },
   
    {
        path: "/rider-orders/delivary",
        element: <DelivaryView />
    },
   

]

export default [...RiderRoutes]