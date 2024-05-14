import { AuthRoutes } from "@/features/auth";
import { HomeRoutes } from "@/features/home";
import { ProjectRoutes } from "@/features/project/routes";

export const publicRoutes = [
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
  {
    path: "/home/*",
    element: <HomeRoutes />,
  },
  {
    path: "/projects/*",
    element: <ProjectRoutes />,
  },
];
