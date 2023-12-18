import { Book, Type, CornerUpRight, Archive, Home, User, Truck, DollarSign, Navigation, Filter, Gift, Map, MapPin, Users, Sidebar, ShoppingCart, Shield, Circle, CreditCard, Send, Meh, Plus, ArrowDownRight, TrendingDown, Unlock } from "react-feather"


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
    resource: 'Order-read',
  },

  {
    id: "create_order",
    title: "Order Manage",
    icon: <Gift size={20} />,

    children: [
      {
        id: 'order-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Order-write',
        navLink: "/create_order/add-order",
      },
      {
        id: 'order-index',
        title: 'Orders',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Order-read',
        navLink: "/create_order/",
      },
      {
        id: 'pickup-failed',
        title: 'Pickup Failed',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Order-write',
        navLink: "/pickup/failed/",
      },
      

      {
        id: "return-order-nav",
        title: "Return",
        icon: <Circle size={20} />,

        children: [

          {
            id: 'return-order-warehouse',
            title: 'Warehouse',
            icon: <Circle size={12} />,
            action: 'admin-pages',
            resource: 'Order-write',
            navLink: "/return-order/warehouse/",
          },

          {
            id: 'hold-order',
            title: 'Hold',
            icon: <Circle size={12} />,
            action: 'admin-pages',
            resource: 'Order-write',
            navLink: "/hold-order",
          },

          {
            id: 'return-order',
            title: 'Returns',
            icon: <Circle size={12} />,
            action: 'admin-pages',
            resource: 'Order-write',
            navLink: "/return-order/",
          },

          {
            id: 'return-order-marchant',
            title: 'To Marchant',
            icon: <Circle size={12} />,
            action: 'admin-pages',
            resource: 'Order-write',
            navLink: "/return-to/marchant",
          },
        ]
      },

    ]
  },
  

  // {
  //   id: "assignment",
  //   title: "Assignment",
  //   icon: <CornerUpRight size={20} />,
  //   action: 'admin-pages',
  //   resource: 'Assignment-read',
  //   navLink: "/assignment"
  // },

  {
    id: "assignment",
    title: "Rider",
    icon: <Users size={20} />,
    action: 'admin-pages',
    resource: 'Assignment-read',
    navLink: "/assignment"
  },

  // {
  //   id: "cod-collection",
  //   title: "COD Amount",
  //   icon: <DollarSign size={20} />,
  //   action: 'admin-pages',
  //   resource: 'Assignment-read',
  //   navLink: "/cod-amount"
  // },

  // {
  //   id: "agent-assignment",
  //   title: "Agent Assignment",
  //   icon: <CornerUpRight size={20} />,
  //   action: 'admin-pages',
  //   resource: 'Assignment-read',
  //   navLink: "/agent-assignment"
  // },



  {
    header: 'Hub',
    action: 'admin-pages',
    resource: 'Staff-read',
  },


  {
    id: "hub",
    title: "Hub",
    icon: <Users size={20} />,

    children: [
      {
        id: 'Hub-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Hub-read',
        navLink: "/hub/",
      },
      {
        id: 'Hub-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Hub-write',
        navLink: "/hub/add/",
      }
    ]
  },

  {
    id: "hub-admin",
    title: "Hub Admin",
    icon: <Users size={20} />,

    children: [
      {
        id: 'hub-admin-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'HubAdmin-read',
        navLink: "/hub/admin/",
      },
      {
        id: 'hub-admin-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'HubAdmin-write',
        navLink: "/hub/admin/add/",
      }
    ]
  },


  

  {
    header: 'Accounts',
    action: 'admin-pages',
    resource: 'Staff-read',
  },

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
        resource: 'Staff-read',
        navLink: "/admin/",
      },
      {
        id: 'staff-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Staff-write',
        navLink: "/admin/add",
      }
    ]
  },

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
        resource: 'Marchant-read',
        navLink: "/merchants/",
      },
      {
        id: 'marchant-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Marchant-write',
        navLink: "/merchants/add",
      }
    ]
  },

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
        resource: 'Rider-read',
        navLink: "/rider/",
      },
      {
        id: 'rider-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Rider-write',
        navLink: "/rider/add",
      },
      // {
      //   id: 'rider-location',
      //   title: 'Current Locations',
      //   icon: <Circle size={12} />,
      //   action: 'admin-pages',
      //   resource: 'Rider-write',
      //   navLink: "/user/current-locations",
      // },
      {
        id: 'rider-get-location',
        title: 'Current Locations',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Rider Location-read',
        navLink: "/rider/locations-list",
      }
    ]
  },

  // {
  //   id: "agent-typ",
  //   title: "Agent Type",
  //   icon: <Type size={20} />,

  //   children: [
  //     {
  //       id: 'agent-type-index',
  //       title: 'Index',
  //       icon: <Circle size={12} />,
  //       action: 'admin-pages',
  //       resource: 'Agent Type-read',
  //       navLink: "/agent-type/",
  //     },
  //     {
  //       id: 'agent-type-add',
  //       title: 'Add',
  //       icon: <Circle size={12} />,
  //       action: 'admin-pages',
  //       resource: 'Agent Type-read',
  //       navLink: "/agent-type/add",
  //     }
  //   ]
  // },

  // {
  //   id: "agent",
  //   title: "Agent",
  //   icon: <User size={20} />,

  //   children: [
  //     {
  //       id: 'agent-index',
  //       title: 'Index',
  //       icon: <Circle size={12} />,
  //       action: 'admin-pages',
  //       resource: 'Agent-read',
  //       navLink: "/agent/",
  //     },
  //     {
  //       id: 'agent-add',
  //       title: 'Add',
  //       icon: <Circle size={12} />,
  //       action: 'admin-pages',
  //       resource: 'Agent-write',
  //       navLink: "/agent/add",
  //     }
  //   ]
  // },


  {
    header: 'Accounts Wallet',
    action: 'admin-pages',
    resource: 'Account Wallet-read',
  },
  {
    id: "account_wallet",
    title: "Account Wallet",
    icon: <CreditCard size={20} />,
    action: 'admin-pages',
    resource: 'Account Wallet-read',
    navLink: "/account-wallet"
  },

  {
    id: "withdraw_request",
    title: "Withdraw Request",
    icon: <Navigation size={20} />,

    children: [
      {
        id: 'withdraw-request-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Withdraw Request-read',
        navLink: "/withdraw-request/",
      },
      {
        id: 'withdraw-request-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Withdraw Request-write',
        navLink: "/withdraw-request/add",
      }
    ]
  },


  {
    id: "transactions",
    title: "Transactions",
    icon: <Send size={20} />,
    action: 'admin-pages',
    resource: 'Transactions-read',
    navLink: "/transactions"
  },

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
        resource: 'Wallet Adjustment-read',
        navLink: "/wallet-adjustment/",
      },
      {
        id: 'wallet-adjustment-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Wallet Adjustment-write',
        navLink: "/wallet-adjustment/add",
      }
    ]
  },

  {
    header: 'Locations',
    action: 'admin-pages',
    resource: 'Cities-read',
  },

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
        resource: 'Cities-read',
        navLink: "/cities/",
      },
      {
        id: 'cities-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Cities-write',
        navLink: "/cities/add",
      }
    ]
  },

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
        resource: 'Areas-read',
        navLink: "/areas/",
      },
      {
        id: 'areas-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Areas-write',
        navLink: "/areas/add",
      }
    ]
  },

  {
    id: "route",
    title: "Route",
    icon: <MapPin size={20} />,

    children: [

      {
        id: "_route",
        title: "Routes",
        children:[
          {
            id: 'route-index',
            title: 'Index',
            icon: <Circle size={12} />,
            action: 'admin-pages',
            resource: 'Route-read',
            navLink: "/route/",
          },
          {
            id: 'route-add',
            title: 'Add',
            icon: <Circle size={12} />,
            action: 'admin-pages',
            resource: 'Route-write',
            navLink: "/route/add/",
          },
        ]
      },

      {
        id: "rider-route",
        title: "Rider Routes",
        children: [
          {
            id: 'rider-route-index',
            title: 'Rider Route',
            icon: <Circle size={12} />,
            action: 'admin-pages',
            resource: 'Route-write',
            navLink: "/rider-route",
          },

          {
            id: 'set-rider',
            title: 'Set Rider',
            icon: <Circle size={12} />,
            action: 'admin-pages',
            resource: 'Route-write',
            navLink: "/set-route-rider",
          },
        ]
      },


      // {
      //   id: "_route-area",
      //   title: "Route Area",
      //   children: [
      //     {
      //       id: 'route-area',
      //       title: 'Route Area',
      //       icon: <Circle size={12} />,
      //       action: 'admin-pages',
      //       resource: 'Route-write',
      //       navLink: "/route/area/",
      //     },

      //     {
      //       id: 'set-route-area',
      //       title: 'Set Route Area',
      //       icon: <Circle size={12} />,
      //       action: 'admin-pages',
      //       resource: 'Route-write',
      //       navLink: "/route/set-area/",
      //     },
      //   ]
      // },
      
      

      
    ]
  },

  // {
  //   header: 'Settings',
  //   action: 'admin-pages',
  //   resource: 'setting',
  // },

  {
    id: "Setting",
    title: "Setting",
    action: 'admin-pages',
    resource: 'setting',
    icon: <Archive size={20} />,

    children: [

      {
        id: "application-setting",
        title: "Application Setting",
        children: [
          // {
          //   id: 'application-setting-index',
          //   title: 'Index',
          //   icon: <Circle size={12} />,
          //   action: 'admin-pages',
          //   resource: 'setting',
          //   navLink: "/setting/application/",
          // },
          {
            id: "application-setting-create",
            title: "Application Setting",
            icon: <Circle size={20} />,
            action: 'admin-pages',
            resource: 'company-setting',
            navLink: "/setting/application/create/"
          },
        ]
      },

      {
        id: "company-setting",
        title: "Company Setting",
        children: [
          {
            id: "company-setting",
            title: "Company Setting",
            icon: <Circle size={20} />,
            action: 'admin-pages',
            resource: 'company-setting',
            navLink: "/setting/"
          },
        ]
      },

    ]
  },

  

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
        resource: 'Shipment Type-read',
        navLink: "/shipment_type/",
      },
      {
        id: 'shipment-type-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Shipment Type-write',
        navLink: "/shipment_type/add",
      }
    ]
  },

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
        resource: 'Product Type-read',
        navLink: "/product_type/",
      },
      {
        id: 'product-type-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Product Type-write',
        navLink: "/product_type/add",
      }
    ]
  },

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
        resource: 'Pricing Policy-read',
        navLink: "/pricing_policy/",
      },
      {
        id: 'pricing-policy-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Pricing Policy-write',
        navLink: "/pricing_policy/add",
      }
    ]
  },

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
        resource: 'Payment Method-read',
        navLink: "/payment_method/",
      },
      {
        id: 'payment-method-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Payment Method-write',
        navLink: "/payment_method/add",
      }
    ]
  },

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
        resource: 'Admin Role-read',
        navLink: "/admin-role/",
      },
      {
        id: 'admin-role-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Admin Role-write',
        navLink: "/admin-role/add",
      }
    ]
  },

  {
    id: "permissions",
    title: "Permission",
    icon: <Unlock size={20} />,
    action: 'admin-pages',
    resource: 'Permission-read',
    navLink: "/permission"
  },

  {
    header: 'Reports',
    action: 'admin-pages',
    resource: 'report',
  },

  {
    id: "reports",
    title: "Reports",
    icon: <User size={20} />,

    children: [
      {
        id: "order-reports",
        title: "Orders",
        // icon: <Gift size={20} />,
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Order Report-read',
        navLink: "/order/report"
      },
      {
        id: "admin-get-transactions-reports",
        title: "Transaction",
        // icon: <Send size={20} />,
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Transaction Report-read',
        navLink: "/transactions-report"
      },
      {
        id: "admin-get-withdraw-request-reports",
        title: "Withdraw Request",
        // icon: <Meh size={20} />,
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Withdraw Request Report-read',
        navLink: "/withdraw-request-report"
      },
      {
        id: "admin-get-pickup-reports",
        title: "Pickup",
        // icon: <Truck size={20} />,
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Pickup Report-read',
        navLink: "/pickup-report"
      },
      {
        id: "admin-get-cancel-issue-reports",
        title: "Cancel Issue",
        // icon: <Truck size={20} />,
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Cancel-Issue Report-read',
        navLink: "/cancel-issue/report"
      },

      {
        id: "admin-get-delivery-reports",
        title: "Delivery",
        // icon: <Truck size={20} />,
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Delivery Report-read',
        navLink: "/delivery-report"
      },
      {
        id: "admin-get-delivery-collection-reports",
        title: "Collection",
        // icon: <ArrowDownRight size={20} />,
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Collection Report-read',
        navLink: "/delivery-collection-report"
      },

      {
        id: "admin-get-revenue-report",
        title: "Revenue",
        // icon: <TrendingDown size={20} />,
        icon: <Circle size={12} />,
        action: 'admin-pages',
        resource: 'Revenue Report-read',
        navLink: "/revenue-report"
      },
    ]
  },
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
    id: "marchant_order",
    title: "Order",
    icon: <Gift size={20} />,

    children: [
      {
        id: "my_order",
        title: "My Orders",
        icon: <Circle size={20} />,
        action: 'marchant-pages',
        resource: 'MARCHANT',
        navLink: "/marchant-orders/"
      },
      // {
      //   id: "my_order_create",
      //   title: "Add New Orders",
      //   icon: <Circle size={20} />,
      //   action: 'marchant-pages',
      //   resource: 'MARCHANT',
      //   navLink: "/marchant-orders/create"
      // },

      {
        id: "my_order_create_marchant",
        title: "Add New Order",
        icon: <Circle size={20} />,
        action: 'marchant-pages',
        resource: 'MARCHANT',
        navLink: "/marchant-orders/add"
      },

    ]
  },


  {
    header: 'Wallet',
    action: 'marchant-pages',
    resource: 'MARCHANT',
  },

  {
    id: "wallet",
    title: "My Wallet",
    icon: <CreditCard size={20} />,
    action: 'marchant-pages',
    resource: 'MARCHANT',
    navLink: "/marchant-wallet"
  },


  {
    id: "marchant_withdraw",
    title: "Withdraw Balance",
    icon: <Navigation size={20} />,

    children: [
      {
        id: "withdraw_requests",
        title: "Requests",
        icon: <Circle size={20} />,
        action: 'marchant-pages',
        resource: 'MARCHANT',
        navLink: "/marchant-withdraw-request/"
      },

      {
        id: "withdraw_add",
        title: "Add New Request",
        icon: <Circle size={20} />,
        action: 'marchant-pages',
        resource: 'MARCHANT',
        navLink: "/marchant-withdraw-request/add"
      },

    ]
  },


  {
    header: 'Current Location',
    action: 'marchant-pages',
    resource: 'MARCHANT',
  },

  {
    id: 'marchant-current-location',
    title: 'Current Locations',
    icon: <MapPin size={12} />,
    action: 'marchant-pages',
    resource: 'MARCHANT',
    navLink: "/marchant/current-location",
  },



  {
    header: 'Pickup Address',
    action: 'marchant-pages',
    resource: 'MARCHANT',
  },


  {
    id: "marchant_pickup_address",
    title: "Pickup Address",
    icon: <MapPin size={20} />,

    children: [
      {
        id: "pickup_address",
        title: "Address",
        icon: <Circle size={20} />,
        action: 'marchant-pages',
        resource: 'MARCHANT',
        navLink: "/marchant-pickup-address/"
      },

      {
        id: "pickup_address",
        title: "Add New Address",
        icon: <Circle size={20} />,
        action: 'marchant-pages',
        resource: 'MARCHANT',
        navLink: "/marchant-pickup-address/add"
      },

    ]
  },

  {
    header: 'Report',
    action: 'marchant-pages',
    resource: 'MARCHANT',
  },
  {
    id: "marchant_reports",
    title: "Reports",
    icon: <Book size={20} />,

    children: [
      {
        id: "order_report",
        title: "Order",
        icon: <Circle size={20} />,
        action: 'marchant-pages',
        resource: 'MARCHANT',
        navLink: "/order-report/"
      },

      {
        id: "transaction_report",
        title: "Transaction",
        icon: <Circle size={20} />,
        action: 'marchant-pages',
        resource: 'MARCHANT',
        navLink: "/transaction-report"
      },
      {
        id: "withdraw_balance_report",
        title: "Withdraw Balance",
        icon: <Circle size={20} />,
        action: 'marchant-pages',
        resource: 'MARCHANT',
        navLink: "/withdraw-balance-report"
      },

    ]
  },

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
    id: "rider_current_tasks",
    title: "Current Tasks",
    icon: <Truck size={20} />,

    children: [
      {
        id: "pickup",
        title: "Pickup",
        icon: <Circle size={20} />,
        action: 'rider-pages',
        resource: 'RIDER',
        navLink: "/rider-orders/pickup"
      },
      {
        id: "delivary",
        title: "Delivary",
        icon: <Circle size={20} />,
        action: 'rider-pages',
        resource: 'RIDER',
        navLink: "/rider-orders/delivary"
      },
    
      {
        id: "return",
        title: "Return",
        icon: <Circle size={20} />,
        action: 'rider-pages',
        resource: 'RIDER',
        navLink: "/rider-orders/return"
      },

    ]
  },

  // {
  //   header: 'Current Tasks',
  //   action: 'rider-pages',
  //   resource: 'RIDER',
  // },
  // {
  //   id: "pickup",
  //   title: "Pickup Tasks",
  //   icon: <Truck size={20} />,
  //   action: 'rider-pages',
  //   resource: 'RIDER',
  //   navLink: "/rider-orders/pickup"
  // },
  // {
  //   id: "delivary",
  //   title: "Delivary",
  //   icon: <Truck size={20} />,
  //   action: 'rider-pages',
  //   resource: 'RIDER',
  //   navLink: "/rider-orders/delivary"
  // },

  // {
  //   id: "return",
  //   title: "Return",
  //   icon: <Truck size={20} />,
  //   action: 'rider-pages',
  //   resource: 'RIDER',
  //   navLink: "/rider-orders/return"
  // },

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
    icon: <CreditCard size={20} />,
    action: 'rider-pages',
    resource: 'RIDER',
    navLink: "/rider-wallet"
  },

  {
    header: 'Current Location',
    action: 'rider-pages',
    resource: 'RIDER',
  },

  {
    id: 'rider-current-location',
    title: 'Current Locations',
    icon: <MapPin size={12} />,
    action: 'rider-pages',
    resource: 'RIDER',
    navLink: "/rider/current-location",
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
    id: "rider_reports",
    title: "Reports",
    icon: <Truck size={20} />,

    children: [
      {
        id: "pickup-report",
        title: "Pickup",
        icon: <Circle size={20} />,
        action: 'rider-pages',
        resource: 'RIDER',
        navLink: "/rider-pickup-report"
      },
      {
        id: "delivery-report",
        title: "Delivery",
        icon: <Circle size={20} />,
        action: 'rider-pages',
        resource: 'RIDER',
        navLink: "/rider-delivery-report"
      },
      {
        id: "delivery-collection-report",
        title: "Collection",
        icon: <Circle size={20} />,
        action: 'rider-pages',
        resource: 'RIDER',
        navLink: "/rider-delivery-collection-report"
      },

    ]
  },


  // {
  //   header: 'Report',
  //   action: 'rider-pages',
  //   resource: 'RIDER',
  // },
  // {
  //   id: "pickup-report",
  //   title: "Pickup Report",
  //   icon: <Truck size={20} />,
  //   action: 'rider-pages',
  //   resource: 'RIDER',
  //   navLink: "/rider-pickup-report"
  // },
  // {
  //   id: "delivery-report",
  //   title: "Delivery Report",
  //   icon: <Truck size={20} />,
  //   action: 'rider-pages',
  //   resource: 'RIDER',
  //   navLink: "/rider-delivery-report"
  // },
  // {
  //   id: "delivery-collection-report",
  //   title: "Collection Report",
  //   icon: <Truck size={20} />,
  //   action: 'rider-pages',
  //   resource: 'RIDER',
  //   navLink: "/rider-delivery-collection-report"
  // },

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




// const hubMenu = [
//   {
//     id: "hub-dashboard",
//     title: "Dashboard",
//     icon: <Home size={20} />,
//     action: 'hub-pages',
//     resource: 'hub-dashboard',
//     navLink: "/hub/admin-dashboard"
//   },

//   {
//     header: 'Orders',
//     action: 'hub-pages',
//     resource: 'Order-read',
//   },

//   {
//     id: "create_order",
//     title: "Order Manage",
//     icon: <Gift size={20} />,

//     children: [
//       {
//         id: 'order-add',
//         title: 'Add',
//         icon: <Circle size={12} />,
//         action: 'hub-pages',
//         resource: 'Order-write',
//         navLink: "/create_order/add-order",
//       },
//       {
//         id: 'order-index',
//         title: 'Orders',
//         icon: <Circle size={12} />,
//         action: 'hub-pages',
//         resource: 'Order-read',
//         navLink: "/create_order/",
//       },
//       {
//         id: 'pickup-failed',
//         title: 'Pickup Failed',
//         icon: <Circle size={12} />,
//         action: 'hub-pages',
//         resource: 'Order-write',
//         navLink: "/pickup/failed/",
//       },


//       {
//         id: "return-order-nav",
//         title: "Return",
//         icon: <Circle size={20} />,

//         children: [

//           {
//             id: 'return-order-warehouse',
//             title: 'Warehouse',
//             icon: <Circle size={12} />,
//             action: 'hub-pages',
//             resource: 'Order-write',
//             navLink: "/return-order/warehouse/",
//           },

//           {
//             id: 'hold-order',
//             title: 'Hold',
//             icon: <Circle size={12} />,
//             action: 'hub-pages',
//             resource: 'Order-write',
//             navLink: "/hold-order",
//           },

//           {
//             id: 'return-order',
//             title: 'Returns',
//             icon: <Circle size={12} />,
//             action: 'hub-pages',
//             resource: 'Order-write',
//             navLink: "/return-order/",
//           },

//           {
//             id: 'return-order-marchant',
//             title: 'To Marchant',
//             icon: <Circle size={12} />,
//             action: 'hub-pages',
//             resource: 'Order-write',
//             navLink: "/return-to/marchant",
//           },
//         ]
//       },

//     ]
//   },

// ]




const hubMenu = [
  {
    id: "home",
    title: "Dashboard",
    icon: <Home size={20} />,
    action: 'hub-pages',
    resource: 'hub-dashboard',
    navLink: "/hub/admin-dashboard"
  },


  {
    header: 'Orders',
    action: 'hub-pages',
    resource: 'Order-read',
  },

  {
    id: "create_order",
    title: "Order Manage",
    icon: <Gift size={20} />,

    children: [
      {
        id: 'order-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'hub-pages',
        resource: 'Order-write',
        navLink: "/create_order/add-order",
      },
      {
        id: 'order-index',
        title: 'Orders',
        icon: <Circle size={12} />,
        action: 'hub-pages',
        resource: 'Order-read',
        navLink: "/create_order/",
      },
      {
        id: 'pickup-failed',
        title: 'Pickup Failed',
        icon: <Circle size={12} />,
        action: 'hub-pages',
        resource: 'Order-write',
        navLink: "/pickup/failed/",
      },


      {
        id: "return-order-nav",
        title: "Return",
        icon: <Circle size={20} />,

        children: [

          {
            id: 'return-order-warehouse',
            title: 'Warehouse',
            icon: <Circle size={12} />,
            action: 'hub-pages',
            resource: 'Order-write',
            navLink: "/return-order/warehouse/",
          },

          {
            id: 'hold-order',
            title: 'Hold',
            icon: <Circle size={12} />,
            action: 'hub-pages',
            resource: 'Order-write',
            navLink: "/hold-order",
          },

          {
            id: 'return-order',
            title: 'Returns',
            icon: <Circle size={12} />,
            action: 'hub-pages',
            resource: 'Order-write',
            navLink: "/return-order/",
          },

          {
            id: 'return-order-marchant',
            title: 'To Marchant',
            icon: <Circle size={12} />,
            action: 'hub-pages',
            resource: 'Order-write',
            navLink: "/return-to/marchant",
          },
        ]
      },

    ]
  },

  {
    id: "assignment",
    title: "Rider Assignment",
    icon: <CornerUpRight size={20} />,
    action: 'hub-pages',
    resource: 'Assignment-read',
    navLink: "/assignment"
  },


  {
    header: 'Accounts',
    action: 'hub-pages',
    resource: 'Staff-read',
  },

  // {
  //   id: "admin",
  //   title: "Staff Users",
  //   icon: <Users size={20} />,

  //   children: [
  //     {
  //       id: 'staff-index',
  //       title: 'Index',
  //       icon: <Circle size={12} />,
  //       action: 'hub-pages',
  //       resource: 'Staff-read',
  //       navLink: "/admin/",
  //     },
  //     {
  //       id: 'staff-add',
  //       title: 'Add',
  //       icon: <Circle size={12} />,
  //       action: 'hub-pages',
  //       resource: 'Staff-write',
  //       navLink: "/admin/add",
  //     }
  //   ]
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
        action: 'hub-pages',
        resource: 'Marchant-read',
        navLink: "/merchants/",
      },
      {
        id: 'marchant-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'hub-pages',
        resource: 'Marchant-write',
        navLink: "merchants/add",
      }
    ]
  },

  {
    id: "rider",
    title: "Rider",
    icon: <User size={20} />,

    children: [
      {
        id: 'rider-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'hub-pages',
        resource: 'Rider-read',
        navLink: "/rider/",
      },
      // {
      //   id: 'rider-add',
      //   title: 'Add',
      //   icon: <Circle size={12} />,
      //   action: 'hub-pages',
      //   resource: 'Rider-write',
      //   navLink: "/rider/add",
      // },

      {
        id: 'rider-get-location',
        title: 'Current Locations',
        icon: <Circle size={12} />,
        action: 'hub-pages',
        resource: 'Rider-write',
        navLink: "/rider/locations-list",
      }
    ]
  },


  {
    header: 'Accounts Wallet',
    action: 'hub-pages',
    resource: 'Account Wallet-read',
  },
  {
    id: "account_wallet",
    title: "Account Wallet",
    icon: <CreditCard size={20} />,
    action: 'hub-pages',
    resource: 'Account Wallet-read',
    navLink: "/account-wallet"
  },

  {
    id: "withdraw_request",
    title: "Withdraw Request",
    icon: <Navigation size={20} />,

    children: [
      {
        id: 'withdraw-request-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'hub-pages',
        resource: 'Withdraw Request-read',
        navLink: "/withdraw-request/",
      },
      {
        id: 'withdraw-request-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'hub-pages',
        resource: 'Withdraw Request-write',
        navLink: "/withdraw-request/add",
      }
    ]
  },


  {
    id: "transactions",
    title: "Transactions",
    icon: <Send size={20} />,
    action: 'hub-pages',
    resource: 'Transactions-read',
    navLink: "/transactions"
  },

  {
    id: "wallet_adjustment",
    title: "Wallet Adjustment",
    icon: <Plus size={20} />,

    children: [
      {
        id: 'wallet-adjustment-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'hub-pages',
        resource: 'Wallet Adjustment-read',
        navLink: "/wallet-adjustment/",
      },
      {
        id: 'wallet-adjustment-add',
        title: 'Add',
        icon: <Circle size={12} />,
        action: 'hub-pages',
        resource: 'Account Wallet-write',
        navLink: "/wallet-adjustment/add",
      }
    ]
  },

  {
    header: 'Locations',
    action: 'hub-pages',
    resource: 'Cities-read',
  },

  {
    id: "cities",
    title: "Cities",
    icon: <Map size={20} />,

    children: [
      {
        id: 'cities-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'hub-pages',
        resource: 'Cities-read',
        navLink: "/cities/",
      },
      // {
      //   id: 'cities-add',
      //   title: 'Add',
      //   icon: <Circle size={12} />,
      //   action: 'hub-pages',
      //   resource: 'Cities-write',
      //   navLink: "/cities/add",
      // }
    ]
  },

  {
    id: "areas",
    title: "Areas",
    icon: <MapPin size={20} />,

    children: [
      {
        id: 'areas-index',
        title: 'Index',
        icon: <Circle size={12} />,
        action: 'hub-pages',
        resource: 'Areas-read',
        navLink: "/areas/",
      },
      // {
      //   id: 'areas-add',
      //   title: 'Add',
      //   icon: <Circle size={12} />,
      //   action: 'hub-pages',
      //   resource: 'Areas-write',
      //   navLink: "/areas/add",
      // }
    ]
  },

  {
    id: "route",
    title: "Route",
    icon: <MapPin size={20} />,

    children: [

      {
        id: "_route",
        title: "Routes",
        children: [
          {
            id: 'route-index',
            title: 'Index',
            icon: <Circle size={12} />,
            action: 'hub-pages',
            resource: 'Route-read',
            navLink: "/route/",
          },
          // {
          //   id: 'route-add',
          //   title: 'Add',
          //   icon: <Circle size={12} />,
          //   action: 'hub-pages',
          //   resource: 'Route-write',
          //   navLink: "/route/add/",
          // },
        ]
      },

      // {
      //   id: "rider-route",
      //   title: "Rider Routes",
      //   children: [
      //     {
      //       id: 'rider-route-index',
      //       title: 'Rider Route',
      //       icon: <Circle size={12} />,
      //       action: 'hub-pages',
      //       resource: 'Route-write',
      //       navLink: "/rider-route",
      //     },

      //     {
      //       id: 'set-rider',
      //       title: 'Set Rider',
      //       icon: <Circle size={12} />,
      //       action: 'hub-pages',
      //       resource: 'Route-write',
      //       navLink: "/set-route-rider",
      //     },
      //   ]
      // },

    ]
  },


  // {
  //   id: "Setting",
  //   title: "Setting",
  //   action: 'hub-pages',
  //   resource: 'setting',
  //   icon: <Archive size={20} />,

  //   children: [

  //     {
  //       id: "application-setting",
  //       title: "Application Setting",
  //       children: [

  //         {
  //           id: "application-setting-create",
  //           title: "Application Setting",
  //           icon: <Circle size={20} />,
  //           action: 'hub-pages',
  //           resource: 'company-setting',
  //           navLink: "/setting/application/create/"
  //         },
  //       ]
  //     },

  //     {
  //       id: "company-setting",
  //       title: "Company Setting",
  //       children: [
  //         {
  //           id: "company-setting",
  //           title: "Company Setting",
  //           icon: <Circle size={20} />,
  //           action: 'hub-pages',
  //           resource: 'company-setting',
  //           navLink: "/setting/"
  //         },
  //       ]
  //     },

  //   ]
  // },



  // {
  //   id: "shipment_type",
  //   title: "Shipment Type",
  //   icon: <Truck size={20} />,

  //   children: [
  //     {
  //       id: 'shipment-type-index',
  //       title: 'Index',
  //       icon: <Circle size={12} />,
  //       action: 'hub-pages',
  //       resource: 'Shipment Type-read',
  //       navLink: "/shipment_type/",
  //     },
  //     {
  //       id: 'shipment-type-add',
  //       title: 'Add',
  //       icon: <Circle size={12} />,
  //       action: 'hub-pages',
  //       resource: 'Shipment Type-write',
  //       navLink: "/shipment_type/add",
  //     }
  //   ]
  // },

  // {
  //   id: "product-type",
  //   title: "Product Type",
  //   icon: <ShoppingCart size={20} />,

  //   children: [
  //     {
  //       id: 'product-type-index',
  //       title: 'Index',
  //       icon: <Circle size={12} />,
  //       action: 'hub-pages',
  //       resource: 'Product Type-read',
  //       navLink: "/product_type/",
  //     },
  //     {
  //       id: 'product-type-add',
  //       title: 'Add',
  //       icon: <Circle size={12} />,
  //       action: 'hub-pages',
  //       resource: 'Product Type-write',
  //       navLink: "/product_type/add",
  //     }
  //   ]
  // },

  // {
  //   id: "pricing-policy",
  //   title: "Pricing Policy",
  //   icon: <Filter size={20} />,

  //   children: [
  //     {
  //       id: 'pricing-policy-index',
  //       title: 'Index',
  //       icon: <Circle size={12} />,
  //       action: 'hub-pages',
  //       resource: 'Pricing Policy-read',
  //       navLink: "/pricing_policy/",
  //     },
  //     {
  //       id: 'pricing-policy-add',
  //       title: 'Add',
  //       icon: <Circle size={12} />,
  //       action: 'hub-pages',
  //       resource: 'Pricing Policy-write',
  //       navLink: "/pricing_policy/add",
  //     }
  //   ]
  // },

  // {
  //   id: "payment-method",
  //   title: "Payment Method",
  //   icon: <Send size={20} />,

  //   children: [
  //     {
  //       id: 'payment-method-index',
  //       title: 'Index',
  //       icon: <Circle size={12} />,
  //       action: 'hub-pages',
  //       resource: 'Payment Method-read',
  //       navLink: "/payment_method/",
  //     },
  //     {
  //       id: 'payment-method-add',
  //       title: 'Add',
  //       icon: <Circle size={12} />,
  //       action: 'hub-pages',
  //       resource: 'Payment Method-write',
  //       navLink: "/payment_method/add",
  //     }
  //   ]
  // },

  // {
  //   id: "admin-role",
  //   title: "Admin Role",
  //   icon: <User size={20} />,

  //   children: [
  //     {
  //       id: 'admin-role-index',
  //       title: 'Index',
  //       icon: <Circle size={12} />,
  //       action: 'hub-pages',
  //       resource: 'Admin Role-read',
  //       navLink: "/admin-role/",
  //     },
  //     {
  //       id: 'admin-role-add',
  //       title: 'Add',
  //       icon: <Circle size={12} />,
  //       action: 'hub-pages',
  //       resource: 'Admin Role-write',
  //       navLink: "/admin-role/add",
  //     }
  //   ]
  // },

  // {
  //   id: "permissions",
  //   title: "Permission",
  //   icon: <Unlock size={20} />,
  //   action: 'hub-pages',
  //   resource: 'Permission-read',
  //   navLink: "/permission"
  // },

  {
    header: 'Reports',
    action: 'hub-pages',
    resource: 'report',
  },

  {
    id: "reports",
    title: "Reports",
    icon: <User size={20} />,

    children: [
      {
        id: "order-reports",
        title: "Orders",
        // icon: <Gift size={20} />,
        icon: <Circle size={12} />,
        action: 'hub-pages',
        resource: 'Order Report-read',
        navLink: "/order/report"
      },
      {
        id: "admin-get-transactions-reports",
        title: "Transaction",
        // icon: <Send size={20} />,
        icon: <Circle size={12} />,
        action: 'hub-pages',
        resource: 'Transaction Report-read',
        navLink: "/transactions-report"
      },
      {
        id: "admin-get-withdraw-request-reports",
        title: "Withdraw Request",
        // icon: <Meh size={20} />,
        icon: <Circle size={12} />,
        action: 'hub-pages',
        resource: 'Withdraw Request Report-read',
        navLink: "/withdraw-request-report"
      },
      {
        id: "admin-get-pickup-reports",
        title: "Pickup",
        // icon: <Truck size={20} />,
        icon: <Circle size={12} />,
        action: 'hub-pages',
        resource: 'Pickup Report-read',
        navLink: "/pickup-report"
      },
      {
        id: "admin-get-cancel-issue-reports",
        title: "Cancel Issue",
        // icon: <Truck size={20} />,
        icon: <Circle size={12} />,
        action: 'hub-pages',
        resource: 'Pickup Report-read',
        navLink: "/cancel-issue/report"
      },

      {
        id: "admin-get-delivery-reports",
        title: "Delivery",
        // icon: <Truck size={20} />,
        icon: <Circle size={12} />,
        action: 'hub-pages',
        resource: 'Delivery Report-read',
        navLink: "/delivery-report"
      },
      {
        id: "admin-get-delivery-collection-reports",
        title: "Collection",
        // icon: <ArrowDownRight size={20} />,
        icon: <Circle size={12} />,
        action: 'hub-pages',
        resource: 'Collection Report-read',
        navLink: "/delivery-collection-report"
      },

      {
        id: "admin-get-revenue-report",
        title: "Revenue",
        // icon: <TrendingDown size={20} />,
        icon: <Circle size={12} />,
        action: 'hub-pages',
        resource: 'Revenue Report-read',
        navLink: "/revenue-report"
      },
    ]
  },
]


export default [...adminMenu, ...marchantMenu, ...riderMenu, ...agentMenu, ...hubMenu]
