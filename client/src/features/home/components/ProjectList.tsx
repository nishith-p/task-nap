import { DataTable } from "@/features/home/components/ProjectTable/data-table";

import { columns } from "./ProjectTable/constants/columns";
import { ProjectsData } from "./ProjectTable/constants/projects";

export const ProjectList = () => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here's a list of available projects.
          </p>
        </div>
      </div>
      <DataTable data={ProjectsData} columns={columns} />
    </div>
  );
};
