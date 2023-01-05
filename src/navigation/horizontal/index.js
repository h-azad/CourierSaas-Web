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
    navLink: "/second-page"
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
