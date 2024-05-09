import {
  Home,
  ShoppingCart,
  Package,
  Users2,
  LineChart,
  Settings,
} from "lucide-react";

export const sideIcons = [
  {
    title: "Dashboard",
    link: "/auth/register",
    children: <Home className="h-5 w-5" />,
  },
  {
    title: "Orders",
    link: "/auth/register",
    children: <ShoppingCart className="h-5 w-5" />,
  },
  {
    title: "Products",
    link: "/auth/register",
    children: <Package className="h-5 w-5" />,
  },
  {
    title: "Customers",
    link: "/auth/register",
    children: <Users2 className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    link: "/auth/register",
    children: <LineChart className="h-5 w-5" />,
  },
];

export const extraIcons = [
  {
    title: "Settings",
    link: "#",
    children: <Settings className="h-5 w-5" />,
  },
];
