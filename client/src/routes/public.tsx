import { AuthRoutes } from "@/features/auth";
import { HomeRoutes } from "@/features/home";

export const publicRoutes = [
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
  {
    path: "/home/*",
    element: <HomeRoutes />,
  },
];
