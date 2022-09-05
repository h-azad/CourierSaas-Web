import { Mail, Home, User, Truck, ShoppingBag,Filter, Gift, Map, MapPin, Users, Sidebar, ShoppingCart, Shield, Circle } from "react-feather"

export default [

  // {
  //   id: 'roles-permissions',
  //   title: 'Roles & Permissions',
  //   icon: <Shield size={20} />,
  //   children: [
  //     {
  //       id: 'roles',
  //       title: 'Roles',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/roles'
  //     },
  //     {
  //       id: 'permissions',
  //       title: 'Permissions',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/permissions'
  //     }
  //   ]
  // },
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
    header: 'Accounts'
  },
  {
    id: "merchants",
    title: "Merchants",
    icon: <Users size={20} />,
    navLink: "/merchants"
  },
  {
    id: "rider",
    title: "Rider",
    icon: <User size={20} />,
    navLink: "/rider"
  },
  {
    id: "agent",
    title: "Agent",
    icon: <User size={20} />,
    navLink: "/agent"
  },
  {
    header: 'Locations'
  },
  {
    id: "cities",
    title: "Cities",
    icon: <Map size={20} />,
    navLink: "/cities"
  },
  {
    id: "areas",
    title: "Areas",
    icon: <MapPin size={20} />,
    navLink: "/areas"
  },
  {
    header: 'Settings'
  },
  {
    id: "service_type",
    title: "Service Type",
    icon: <Gift size={20} />,
    navLink: "/service_type"
  },
  {
    id: "shipment_type",
    title: "Shipment Type",
    icon: <Truck size={20} />,
    navLink: "/shipment_type"
  },
  {
    id: "product_type",
    title: "Product Type",
    icon: <ShoppingCart size={20} />,
    navLink: "/product_type"
  },
  {
    id: "volumetric_policy",
    title: "Volumetric Policy",
    icon:  <Filter size={20} />,
    navLink: "/volumetric_policy"
  }
]
