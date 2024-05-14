import { Route, Routes } from "react-router-dom";

import { Project } from "./Project";

export const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="/:projectId" element={<Project />} />
    </Routes>
  );
};
