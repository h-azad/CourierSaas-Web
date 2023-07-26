import { Book, Type, CornerUpRight, Archive, Home, User, Truck, ShoppingBag, Filter, Gift, Map, MapPin, Users, Sidebar, ShoppingCart, Shield, Circle, CreditCard, Send, Meh, Plus, ArrowDownRight, TrendingDown, Unlock } from "react-feather"


const adminMenu = [
  {
    id: "home",
    title: "Dashboard",
    icon: <Home size={20} />,
    action: 'admin-pages',
    resource: 'admin-dashboard',
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
    resource: 'order-list',
  },
  // {
  //   id: "create_order",
  //   title: "Order Manage",
  //   icon: <Gift size={20} />,
  //   action: 'admin-pages',
  //   resource: 'ADMIN',
  //   navLink: "/create_order",
  // },

  {
    id: "create_order",
    title: "Order Manage",
    icon: <Gift size={20} />,

    children: [
      {
        id: 'order-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'order-list',
        navLink: "/create_order/",
      },
      {
        id: 'order-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'order-create',
        navLink: "/create_order/add",
      }
    ]
  },

  {
    id: "assignment",
    title: "Assignment",
    icon: <CornerUpRight size={20} />,
    action: 'admin-pages',
    resource: 'assignment-assign',
    navLink: "/assignment"
  },

  {
    id: "agent-assignment",
    title: "Agent Assignment",
    icon: <CornerUpRight size={20} />,
    action: 'admin-pages',
    resource: 'assignment-assign',
    navLink: "/agent-assignment"
  },


  {
    header: 'Accounts',
    action: 'admin-pages',
    // resource: 'ADMIN',
    resource: 'staff-list',
  },

  // {
  //   id: "admin",
  //   title: "Staff Users",
  //   icon: <Users size={20} />,
  //   action: 'admin-pages',
  //   resource: 'ADMIN',
  //   navLink: "/admin"
  // },

  {
    id: "admin",
    title: "Staff Users",
    icon: <Users size={20} />,

    children: [
      {
        id: 'staff-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'staff-list',
        navLink: "/admin/",
      },
      {
        id: 'staff-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'staff-create',
        navLink: "/admin/add",
      }
    ]
  },


  // {
  //   id: "merchants",
  //   title: "Merchants",
  //   icon: <Users size={20} />,
  //   action: 'admin-pages',
  //   resource: 'ADMIN',
  //   navLink: "/merchants"
  // },


  {
    id: "merchants",
    title: "Merchants",
    icon: <Users size={20} />,

    children: [
      {
        id: 'marchant-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'marchant-list',
        navLink: "/merchants/",
      },
      {
        id: 'marchant-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'marchant-create',
        navLink: "/merchants/add",
      }
    ]
  },


  // {
  //   id: "rider",
  //   title: "Rider",
  //   icon: <User size={20} />,
  //   action: 'admin-pages',
  //   resource: 'ADMIN',
  //   navLink: "/rider"
  // },


  {
    id: "rider",
    title: "Rider",
    icon: <User size={20} />,

    children: [
      {
        id: 'rider-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'rider-list',
        navLink: "/rider/",
      },
      {
        id: 'rider-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'rider-create',
        navLink: "/rider/add",
      }
    ]
  },


  // {
  //   id: "agent-type",
  //   title: "Agent Type",
  //   icon: <Type size={20} />,
  //   action: 'admin-pages',
  //   resource: 'ADMIN',
  //   navLink: "/agent-type"
  // },


  {
    id: "agent-typ",
    title: "Agent Type",
    icon: <Type size={20} />,

    children: [
      {
        id: 'agent-type-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'agent-type-list',
        navLink: "/agent-type/",
      },
      {
        id: 'agent-type-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'agent-type-create',
        navLink: "/agent-type/add",
      }
    ]
  },


  // {
  //   id: "agent",
  //   title: "Agent",
  //   icon: <User size={20} />,
  //   action: 'admin-pages',
  //   resource: 'ADMIN',
  //   navLink: "/agent"
  // },


  {
    id: "agent",
    title: "Agent",
    icon: <User size={20} />,

    children: [
      {
        id: 'agent-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'agent-list',
        navLink: "/agent/",
      },
      {
        id: 'agent-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'agent-create',
        navLink: "/agent/add",
      }
    ]
  },


  {
    header: 'Accounts Wallet',
    action: 'admin-pages',
    resource: 'account-wallet-list',
  },
  {
    id: "account_wallet",
    title: "Account Wallet",
    icon: <Book size={20} />,
    action: 'admin-pages',
    resource: 'account-wallet-list',
    navLink: "/account-wallet"
  },
  // {
  //   id: "withdraw_request",
  //   title: "Withdraw Request",
  //   icon: <Meh size={20} />,
  //   action: 'admin-pages',
  //   resource: 'ADMIN',
  //   navLink: "/withdraw-request"
  // },

  {
    id: "withdraw_request",
    title: "Withdraw Request",
    icon: <Meh size={20} />,

    children: [
      {
        id: 'withdraw-request-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'withdraw-request-list',
        navLink: "/withdraw-request/",
      },
      {
        id: 'withdraw-request-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'withdraw-request-create',
        navLink: "/withdraw-request/add",
      }
    ]
  },


  {
    id: "transactions",
    title: "Transactions",
    icon: <Send size={20} />,
    action: 'admin-pages',
    resource: 'transactions-list',
    navLink: "/transactions"
  },
  // {
  //   id: "wallet_adjustment",
  //   title: "Wallet Adjustment",
  //   icon: <Plus size={20} />,
  //   action: 'admin-pages',
  //   resource: 'ADMIN',
  //   navLink: "/wallet-adjustment"
  // },

  {
    id: "wallet_adjustment",
    title: "Wallet Adjustment",
    icon: <Plus size={20} />,

    children: [
      {
        id: 'wallet-adjustment-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'wallet-adjustment-list',
        navLink: "/wallet-adjustment/",
      },
      {
        id: 'wallet-adjustment-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'wallet-adjustment-create',
        navLink: "/wallet-adjustment/add",
      }
    ]
  },

  {
    header: 'Locations',
    action: 'admin-pages',
    resource: 'cities-list',
    // resource: 'ADMIN',
  },
  // {
  //   id: "cities",
  //   title: "Cities",
  //   icon: <Map size={20} />,
  //   action: 'admin-pages',
  //   resource: 'ADMIN',
  //   navLink: "/cities"
  // },


  {
    id: "cities",
    title: "Cities",
    icon: <Map size={20} />,

    children: [
      {
        id: 'cities-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'cities-list',
        navLink: "/cities/",
      },
      {
        id: 'cities-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'cities-create',
        navLink: "/cities/add",
      }
    ]
  },

  // {
  //   id: "areas",
  //   title: "Areas",
  //   icon: <MapPin size={20} />,
  //   action: 'admin-pages',
  //   resource: 'ADMIN',
  //   navLink: "/areas"
  // },

  {
    id: "areas",
    title: "Areas",
    icon: <MapPin size={20} />,

    children: [
      {
        id: 'areas-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'areas-list',
        navLink: "/areas/",
      },
      {
        id: 'areas-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'areas-create',
        navLink: "/areas/add",
      }
    ]
  },

  {
    header: 'Settings',
    action: 'admin-pages',
    // resource: 'ADMIN',
    resource: 'shipment-type-list',
  },

  {
    id: "company-setting",
    title: "Company Setting",
    icon: <Archive size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN',
    navLink: "/setting"
  },
  

  // {
  //   id: "shipment_type",
  //   title: "Shipment Type",
  //   icon: <Truck size={20} />,
  //   action: 'admin-pages',
  //   resource: 'ADMIN',
  //   navLink: "/shipment_type"
  // },


  {
    id: "shipment_type",
    title: "Shipment Type",
    icon: <Truck size={20} />,

    children: [
      {
        id: 'shipment-type-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'shipment-type-list',
        navLink: "/shipment_type/",
      },
      {
        id: 'shipment-type-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'product-type-create',
        navLink: "/shipment_type/add",
      }
    ]
  },


  // {
  //   id: "product_type",
  //   title: "Product Type",
  //   icon: <ShoppingCart size={20} />,
  //   action: 'admin-pages',
  //   resource: 'ADMIN',
  //   navLink: "/product_type"
  // },

  {
    id: "product-type",
    title: "Product Type",
    icon: <ShoppingCart size={20} />,

    children: [
      {
        id: 'product-type-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'product-type-list',
        navLink: "/product_type/",
      },
      {
        id: 'product-type-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'product-type-create',
        navLink: "/product_type/add",
      }
    ]
  },

  // {
  //   id: "pricing_policy",
  //   title: "Pricing Policy",
  //   icon: <Filter size={20} />,
  //   action: 'admin-pages',
  //   resource: 'ADMIN',
  //   navLink: "/pricing_policy"
  // },

  {
    id: "pricing-policy",
    title: "Pricing Policy",
    icon: <Filter size={20} />,

    children: [
      {
        id: 'pricing-policy-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'pricing-policy-list',
        navLink: "/pricing_policy/",
      },
      {
        id: 'pricing-policy-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'pricing-policy-create',
        navLink: "/pricing_policy/add",
      }
    ]
  },

  // {
  //   id: "payment_method",
  //   title: "Payment Method",
  //   icon: <Send size={20} />,
  //   action: 'admin-pages',
  //   resource: 'ADMIN',
  //   navLink: "/payment_method"
  // },

  {
    id: "payment-method",
    title: "Payment Method",
    icon: <Send size={20} />,

    children: [
      {
        id: 'payment-method-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'payment-method-list',
        navLink: "/payment_method/",
      },
      {
        id: 'payment-method-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'payment-method-create',
        navLink: "/payment_method/add",
      }
    ]
  },

  // {
  //   id: "admin_role",
  //   title: "Admin Role",
  //   icon: <User size={20} />,
  //   action: 'admin-pages',
  //   resource: 'ADMIN',
  //   navLink: "/admin-role"
  // },

  {
    id: "admin-role",
    title: "Admin Role",
    icon: <User size={20} />,

    children: [
      {
        id: 'admin-role-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'admin-role-list',
        navLink: "/admin-role/",
      },
      {
        id: 'admin-role-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'admin-role-create',
        navLink: "/admin-role/add",
      }
    ]
  },

  {
    id: "permissions",
    title: "Permission",
    icon: <Unlock size={20} />,
    action: 'admin-pages',
    resource: 'permission-list',
    navLink: "/permission"
  },

  {
    header: 'Reports',
    action: 'admin-pages',
    resource: 'order-report',
    // resource: 'ADMIN',
  },

  {
    id: "reports",
    title: "Reports",
    icon: <User size={20} />,

    children: [
      {
        id: "order-reports",
        title: "Orders",
        icon: <Gift size={20} />,
        action: 'admin-pages',
        resource: 'order-report',
        navLink: "/order/report"
      },
      {
        id: "admin-get-transactions-reports",
        title: "Transaction",
        icon: <Send size={20} />,
        action: 'admin-pages',
        resource: 'transaction-report',
        navLink: "/transactions-report"
      },
      {
        id: "admin-get-withdraw-request-reports",
        title: "Withdraw Request",
        icon: <Meh size={20} />,
        action: 'admin-pages',
        resource: 'withdraw-request-report',
        navLink: "/withdraw-request-report"
      },
      {
        id: "admin-get-pickup-reports",
        title: "Pickup",
        icon: <Truck size={20} />,
        action: 'admin-pages',
        resource: 'pickup-report',
        navLink: "/pickup-report"
      },
      {
        id: "admin-get-delivery-reports",
        title: "Delivery",
        icon: <Truck size={20} />,
        action: 'admin-pages',
        resource: 'delivery-report',
        navLink: "/delivery-report"
      },
      {
        id: "admin-get-delivery-collection-reports",
        title: "Collection",
        icon: <ArrowDownRight size={20} />,
        action: 'admin-pages',
        resource: 'collection-report',
        navLink: "/delivery-collection-report"
      },
    
      {
        id: "admin-get-revenue-report",
        title: "Revenue",
        icon: <TrendingDown size={20} />,
        action: 'admin-pages',
        resource: 'revenue-report',
        navLink: "/revenue-report"
      },
    ]
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
    icon: <Gift size={20} />,
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
    icon: <Book size={20} />,
    action: 'marchant-pages',
    resource: 'MARCHANT',
    navLink: "/marchant-wallet"
  },

  {
    id: "withdraw",
    title: "Withdraw Balance",
    icon: <TrendingDown size={20} />,
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
    icon: <MapPin size={20} />,
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
    icon: <Gift size={20} />,
    action: 'marchant-pages',
    resource: 'MARCHANT',
    navLink: "/order-report"
  },
  {
    id: "transaction_report",
    title: "Transaction Report",
    icon: <Send size={20} />,
    action: 'marchant-pages',
    resource: 'MARCHANT',
    navLink: "/transaction-report"
  },
  {
    id: "withdraw_balance_report",
    title: "Withdraw Balance",
    icon: <TrendingDown size={20} />,
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
    icon: <Truck size={20} />,
    action: 'rider-pages',
    resource: 'RIDER',
    navLink: "/rider-orders/pickup"
  },
  {
    id: "delivary",
    title: "Delivary",
    icon: <Truck size={20} />,
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
    header: 'Wallet',
    action: 'rider-pages',
    resource: 'RIDER',
  },
  {
    id: "rider-wallet",
    title: "My Wallet",
    icon: <Gift size={20} />,
    action: 'rider-pages',
    resource: 'RIDER',
    navLink: "/rider-wallet"
  },


  {
    header: 'Order Status',
    action: 'rider-pages',
    resource: 'RIDER',
  },
  {
    id: "order-status",
    title: "Order Status",
    icon: <Gift size={20} />,
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
    icon: <Truck size={20} />,
    action: 'rider-pages',
    resource: 'RIDER',
    navLink: "/rider-pickup-report"
  },
  {
    id: "delivery-report",
    title: "Delivery Report",
    icon: <Truck size={20} />,
    action: 'rider-pages',
    resource: 'RIDER',
    navLink: "/rider-delivery-report"
  },
  {
    id: "delivery-collection-report",
    title: "Collection Report",
    icon: <Truck size={20} />,
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
  {
    header: 'Orders',
    action: 'agent-pages',
    resource: 'AGENT',
  },
  {
    id: "agent-order",
    title: "Order Manage",
    icon: <CreditCard size={20} />,
    action: 'agent-pages',
    resource: 'AGENT',
    navLink: "/agent/order"
  },
  {
    id: "agent-assign-order",
    title: "Delivery Assign",
    icon: <CreditCard size={20} />,
    action: 'agent-pages',
    resource: 'AGENT',
    navLink: "/agent/assign-order"
  },

]



export default [...adminMenu, ...marchantMenu, ...riderMenu, ...agentMenu]
