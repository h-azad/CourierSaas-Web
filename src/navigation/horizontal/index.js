import { Mail, Home, Truck,ShoppingBag, Filter, Gift, Map, MapPin, Users, Sidebar, ShoppingCart, Copy, Shield, Circle, CreditCard, Send } from "react-feather"

export default [
  
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home"
  },
  {
    id: "secondPage",
    title: "Second Page",
    icon: <Sidebar size={20} />,
    action: 'agent-pages',
    subject: 'AGENT',
    navLink: "/second-page"
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
    header: 'Orders'
  },
  {
    id: "create_order",
    title: "Create Order",
    icon:  <CreditCard size={20} />,
    navLink: "/second-page"
  },
  {
    header: 'Accounts'
  },
  {
    id: "merchants",
    title: "Merchants",
    icon: <Users size={20} />,
    navLink: "/second-page"
  },
  {
    id: "rider",
    title: "Rider",
    icon: <Mail size={20} />,
    navLink: "/second-page"
  },
  {
    id: "agent",
    title: "Agent",
    icon: <Mail size={20} />,
    navLink: "/second-page"
  },
  {
    header: 'Locations'
  },
{
  id: "cities",
  title: "Cities",
  icon: <Map size={20} />,
  navLink: "/second-page"
},
{
  id: "areas",
  title: "Areas",
  icon: <MapPin size={20} />,
  navLink: "/second-page"
},
{
  header: 'Settings'
},

{
  id: "shipment_type",
  title: "Shipment type",
  icon: <Truck size={20} />,
  navLink: "/second-page"
},
{
  id: "product_type",
  title: "Product type",
  icon: <ShoppingCart size={20} />,
  navLink: "/second-page"
},
{
  id: "pricing_policy",
  title: "Pricing Policy",
  icon: <Filter size={20} />,
  navLink: "/second-page"
},
{
  id: "payment_method",
  title: "Payment Method",
  icon:  <Send size={20} />,
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
    icon: <CreditCard size={20} />,
    action: 'marchant-pages',
    resource: 'MARCHANT',
    navLink: "/marchant-orders"
  },
  {
    id: "my_order",
    title: "My Orders",
    icon: <CreditCard size={20} />,
    action: 'marchant-pages',
    resource: 'MARCHANT',
    navLink: "/marchant-orders/view"
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