import { useRoutes } from "react-router-dom";

import { publicRoutes } from "./public";

export const AppRoutes = () => {
  //   const auth = useAuth();
  //   const commonRoutes = [{ path: '/', element: <Landing /> }];
  //   const routes = auth.user ? protectedRoutes : publicRoutes;
  //   const element = useRoutes([...routes, ...commonRoutes]);

  const routes = publicRoutes;
  const element = useRoutes([...routes]);

  return <>{element}</>;
};
