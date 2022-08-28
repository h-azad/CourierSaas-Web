import { Mail, Home, User } from "react-feather"

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
    icon: <Mail size={20} />,
    navLink: "/second-page"
  },
  {
    id: "merchants",
    title: "Merchants",
    icon: <User size={20} />,
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
  }
]
