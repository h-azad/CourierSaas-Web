
import OrderCreatedByAgent from "../../views/agent_app/create_order/add"
import OrderEditByAgent from "../../views/agent_app/create_order/edit"
import AgentCreateOrderList from "../../views/agent_app/create_order/list"
import AgentDashboard from "../../views/dashboard/agent"

const AgentRoutes = [
    {
        path: "/agent-dashboard",
        element: <AgentDashboard />
    },

    {
        path: "/agent/order",
        element: <AgentCreateOrderList />
    },

      {
        path: "/agent/add-order",
        element: <OrderCreatedByAgent />
      },
      {
        path: "/agent/create_order/edit/:id",
        element: <OrderEditByAgent/>
      },
      

      
    //   {
    //     path: "/create_order/view/:id",
    //     element: <CreateOrderView />
    //   },

]

export default [...AgentRoutes]