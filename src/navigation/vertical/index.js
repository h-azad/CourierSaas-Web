import { Mail, Home, User, Truck, ShoppingBag, Filter, Gift, Map, MapPin, Users, Sidebar, ShoppingCart, Shield, Circle, CreditCard, Send, home } from "react-feather"


const adminMenu = [
  {
    id: "home",
    title: "Dashboard",
    icon: <Home size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN', 
    navLink: "/home"
  },
  {
    id: "secondPage",
    title: "M Dash",
    icon: <Sidebar size={20} />,
    navLink: "/second-page",
  },
  {
    header: 'Login'
  },
  {
    id: "MarchantLogin",
    title: "Marchant Login",
    icon: <CreditCard size={20} />,
    navLink: "/marchantlogin"
  },
  {
    id: "RiderLogin",
    title: "Rider Login",
    icon: <CreditCard size={20} />,
    navLink: "/riderlogin"
  },
  {
    id: "AgentLogin",
    title: "Agent Login",
    icon: <CreditCard size={20} />,
    navLink: "/agentlogin"
  },

  {
    header: 'Orders',
    action: 'admin-pages',
    resource: 'ADMIN',
},
  {
    id: "create_order",
    title: "Order Manage",
    icon: <CreditCard size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN',
    navLink: "/create_order"
  },
  {
    id: "assignment",
    title: "Assignment",
    icon: <CreditCard size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN',
    navLink: "/assignment"
  },


  {
    header: 'Accounts',
    action: 'admin-pages',
    resource: 'ADMIN', 
  },

  {
    id: "admin",
    title: "Staff Users",
    icon: <Users size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN',
    navLink: "/admin"
  },
  {
    id: "merchants",
    title: "Merchants",
    icon: <Users size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN', 
    navLink: "/merchants"
  },
  {
    id: "rider",
    title: "Rider",
    icon: <User size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN', 
    navLink: "/rider"
  },

  {
    id: "agent-type",
    title: "Agent Type",
    icon: <User size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN', 
    navLink: "/agent-type"
  },

  {
    id: "agent",
    title: "Agent",
    icon: <User size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN', 
    navLink: "/agent"
  },

  {
    header: 'Accounts Wallet',
    action: 'admin-pages',
    resource: 'ADMIN', 
  },
  {
    id: "account_wallet",
    title: "Account Wallet",
    icon: <Home size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN', 
    navLink: "/account-wallet"
  },
  {
    id: "withdraw_request",
    title: "Withdraw Request",
    icon: <Home size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN', 
    navLink: "/withdraw-request"
  },

  {
    id: "transactions",
    title: "Transactions",
    icon: <Home size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN',
    navLink: "/transactions"
  },
  {
    id: "wallet_adjustment",
    title: "Wallet Adjustment",
    icon: <Home size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN',
    navLink: "/wallet-adjustment"
  },

  {
    header: 'Locations',
    action: 'admin-pages',
    resource: 'ADMIN', 
    },
  {
    id: "cities",
    title: "Cities",
    icon: <Map size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN', 
    navLink: "/cities"
  },
  {
    id: "areas",
    title: "Areas",
    icon: <MapPin size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN',
    navLink: "/areas"
  },
  {
    header: 'Settings',
    action: 'admin-pages',
    resource: 'ADMIN',
  },

  {
    id: "shipment_type",
    title: "Shipment Type",
    icon: <Truck size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN',
    navLink: "/shipment_type"
  },
  {
    id: "product_type",
    title: "Product Type",
    icon: <ShoppingCart size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN',
    navLink: "/product_type"
  },
  {
    id: "pricing_policy",
    title: "Pricing Policy",
    icon: <Filter size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN',
    navLink: "/pricing_policy"
  },
  {
    id: "payment_method",
    title: "Payment Method",
    icon: <Send size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN',
    navLink: "/payment_method"
  },
  {
    header: 'Reports',
    action: 'admin-pages',
    resource: 'ADMIN', 
    },
  {
    id: "order-reports",
    title: "Orders",
    icon: <Map size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN', 
    navLink: "/order/report"
  },
  {
    id: "admin-get-transactions-reports",
    title: "Transaction",
    icon: <Map size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN', 
    navLink: "/transactions-report"
  },
  {
    id: "admin-get-withdraw-request-reports",
    title: "Withdraw Request",
    icon: <Map size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN', 
    navLink: "/withdraw-request-report"
  },
  {
    id: "admin-get-pickup-reports",
    title: "Pickup",
    icon: <Map size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN', 
    navLink: "/pickup-report"
  },
  {
    id: "admin-get-delivery-reports",
    title: "Delivery",
    icon: <Map size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN', 
    navLink: "/delivery-report"
  },
  {
    id: "admin-get-delivery-collection-reports",
    title: "Collection",
    icon: <Map size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN', 
    navLink: "/delivery-collection-report"
  },

  {
    id: "admin-get-revenue-report",
    title: "Revenue",
    icon: <Map size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN',
    navLink: "/revenue-report"
  },

  // {
  //   id: "areas",
  //   title: "Areas",
  //   icon: <MapPin size={20} />,
  //   action: 'admin-pages',
  //   resource: 'ADMIN',
  //   navLink: "/areas"
  // },


    

]


const marchantMenu = [
  {
    id: "marchant-dashboard",
    title: "Dashboard",
    icon: <Home size={20} />,
    action: 'marchant-pages',
    resource: 'MARCHANT',
    navLink: "/marchant-dashboard"
  },
  {
    header: 'Orders',
    action: 'marchant-pages',
    resource: 'MARCHANT',
  },
  {
    id: "my_order",
    title: "My Orders",
    icon: <ShoppingCart size={20} />,
    action: 'marchant-pages',
    resource: 'MARCHANT',
    navLink: "/marchant-orders"
  },

  {
    header: 'Wallet',
    action: 'marchant-pages',
    resource: 'MARCHANT',
  },

  {
    id: "wallet",
    title: "My Wallet",
    icon: <ShoppingCart size={20} />,
    action: 'marchant-pages',
    resource: 'MARCHANT',
    navLink: "/marchant-wallet"
  },

  {
    id: "withdraw",
    title: "Withdraw Balance",
    icon: <ShoppingCart size={20} />,
    action: 'marchant-pages',
    resource: 'MARCHANT',
    navLink: "/marchant-withdraw-request"
  },


  {
    header: 'Pickup Address',
    action: 'marchant-pages',
    resource: 'MARCHANT',
  },

  {
    id: "pickup_address",
    title: "Add Pickup Address",
    icon: <ShoppingCart size={20} />,
    action: 'marchant-pages',
    resource: 'MARCHANT',
    navLink: "/marchant-pickup-address"
  },
  {
    header: 'Report',
    action: 'marchant-pages',
    resource: 'MARCHANT',
  },

  {
    id: "order_report",
    title: "Order Report",
    icon: <ShoppingCart size={20} />,
    action: 'marchant-pages',
    resource: 'MARCHANT',
    navLink: "/order-report"
  },
  {
    id: "transaction_report",
    title: "Transaction Report",
    icon: <ShoppingCart size={20} />,
    action: 'marchant-pages',
    resource: 'MARCHANT',
    navLink: "/transaction-report"
  },
  {
    id: "withdraw_balance_report",
    title: "Withdraw Balance",
    icon: <ShoppingCart size={20} />,
    action: 'marchant-pages',
    resource: 'MARCHANT',
    navLink: "/withdraw-balance-report"
  },

  

  // {
  //   id: "withdraw",
  //   title: "Withdraw Balance",
  //   icon: <ShoppingCart size={20} />,
  //   action: 'marchant-pages',
  //   resource: 'MARCHANT',
  //   navLink: "/marchant-withdraw-request"
  // },

  // {
  //   header: 'balance_withdraw',
  //   action: 'marchant-pages',
  //   resource: 'MARCHANT',
  // },
  // {
  //   id: "balance_withdraw",
  //   title: "Balance Withdraw",
  //   icon: <ShoppingCart size={20} />,
  //   action: 'marchant-pages',
  //   resource: 'MARCHANT',
  //   navLink: "/withdraw-request"
  // },
  
 
]
const riderMenu = [
  {
    id: "rider-dashboard",
    title: "Dashboard",
    icon: <Home size={20} />,
    action: 'rider-pages',
    resource: 'RIDER',
    navLink: "/rider-dashboard"
  },
  {
    header: 'Current Tasks',
    action: 'rider-pages',
    resource: 'RIDER',
  },
  {
    id: "pickup",
    title: "Pickup Tasks",
    icon: <CreditCard size={20} />,
    action: 'rider-pages',
    resource: 'RIDER',
    navLink: "/rider-orders/pickup"
  },
  {
    id: "delivary",
    title: "Delivary",
    icon: <ShoppingBag size={20} />,
    action: 'rider-pages',
    resource: 'RIDER',
    navLink: "/rider-orders/delivary"
  },
  {
    header: 'Rider Tasks',
    action: 'rider-pages',
    resource: 'RIDER',
  },
  {
    id: "current-task",
    title: "Tasks History",
    icon: <CreditCard size={20} />,
    action: 'rider-pages',
    resource: 'RIDER',
    navLink: "/rider-orders/current-task"
  },
  

  {
    header: 'Order Status',
    action: 'rider-pages',
    resource: 'RIDER',
  },
  {
    id: "order-status",
    title: "Order Status",
    icon: <CreditCard size={20} />,
    action: 'rider-pages',
    resource: 'RIDER',
    navLink: "/rider-orders/status"
  },


  {
    header: 'Report',
    action: 'rider-pages',
    resource: 'RIDER',
  },
  {
    id: "pickup-report",
    title: "Pickup Report",
    icon: <CreditCard size={20} />,
    action: 'rider-pages',
    resource: 'RIDER',
    navLink: "/rider-pickup-report"
  },
  {
    id: "delivery-report",
    title: "Delivery Report",
    icon: <CreditCard size={20} />,
    action: 'rider-pages',
    resource: 'RIDER',
    navLink: "/rider-delivery-report"
  },
  {
    id: "delivery-collection-report",
    title: "Collection Report",
    icon: <CreditCard size={20} />,
    action: 'rider-pages',
    resource: 'RIDER',
    navLink: "/rider-delivery-collection-report"
  },
 
  // {
  //   header: 'Assigned Pickup',
  //   action: 'rider-pages',
  //   resource: 'RIDER',
  // },
  // {
  //   id: "pickup",
  //   title: "Pickup",
  //   icon: <CreditCard size={20} />,
  //   action: 'rider-pages',
  //   resource: 'RIDER',
  //   navLink: "/rider-orders/pickup"
  // },
  // {
  //   header: 'Assigned Delivary',
  //   action: 'rider-pages',
  //   resource: 'RIDER',
  // },
  // {
  //   id: "delivary",
  //   title: "Delivary",
  //   icon: <ShoppingBag size={20} />,
  //   action: 'rider-pages',
  //   resource: 'RIDER',
  //   navLink: "/rider-orders/delivary"
  // },


]

const agentMenu = [
  {
    id: "agent-dashboard",
    title: "Dashboard",
    icon: <Home size={20} />,
    action: 'agent-pages',
    resource: 'AGENT',
    navLink: "/agent-dashboard"
  },

]



export default [...adminMenu, ...marchantMenu, ...riderMenu, ...agentMenu]
