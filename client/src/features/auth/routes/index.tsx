import { Route, Routes } from "react-router-dom";

import { Login } from "./Login";
import { Register } from "./Register";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="sign-up" element={<Register />} />
      <Route path="sign-in" element={<Login />} />
    </Routes>
  );
};
