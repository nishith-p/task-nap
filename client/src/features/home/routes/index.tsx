import { Route, Routes } from "react-router-dom";

import { Projects } from "./Projects";
import { Tasks } from "./Tasks";

export const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Projects />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  );
};
