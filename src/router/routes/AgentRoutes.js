
// import OrderCreatedByAgent from "../../views/agent_app/create_order/add"
// import AgentOrderList from "../../views/agent_app/create_order/list"
import OrderCreatedByAgent from "../../views/agent_app/create_order/add"
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
    //   {
    //     path: "/create_order/edit/:id",
    //     element: <EditCreateOrder/>
    //   },
    //   {
    //     path: "/create_order/view/:id",
    //     element: <CreateOrderView />
    //   },

]

export default [...AgentRoutes]