import { Mail, Home, User, Truck, ShoppingBag, Filter, Gift, Map, MapPin, Users, Sidebar, ShoppingCart, Shield, Circle, CreditCard, Send } from "react-feather"


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
    title: "Create Order",
    icon: <CreditCard size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN',
    navLink: "/create_order"
  },


  {
    header: 'Accounts',
    action: 'admin-pages',
    resource: 'ADMIN', 
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
    id: "agent",
    title: "Agent",
    icon: <User size={20} />,
    action: 'admin-pages',
    resource: 'ADMIN', 
    navLink: "/agent"
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
    header: 'Assigned Pickup',
    action: 'rider-pages',
    resource: 'RIDER',
  },
  {
    id: "pickup",
    title: "Pickup",
    icon: <CreditCard size={20} />,
    action: 'rider-pages',
    resource: 'RIDER',
    navLink: "/rider-orders"
  },
  {
    header: 'Assigned Delivary',
    action: 'rider-pages',
    resource: 'RIDER',
  },
  {
    id: "delivary",
    title: "Delivary",
    icon: <ShoppingBag size={20} />,
    action: 'rider-pages',
    resource: 'RIDER',
    navLink: "/rider-orders/delivary"
  },


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
