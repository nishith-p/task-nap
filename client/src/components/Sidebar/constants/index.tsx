import { Home, Settings, ClipboardCheck } from "lucide-react";

export const sideIcons = [
  {
    title: "Home",
    link: "/home",
    children: <Home className="h-5 w-5" />,
  },
  {
    title: "Tasks",
    link: "/home/tasks",
    children: <ClipboardCheck className="h-5 w-5" />,
  },
];

export const extraIcons = [
  {
    title: "Settings",
    link: "/projects/1",
    children: <Settings className="h-5 w-5" />,
  },
];
