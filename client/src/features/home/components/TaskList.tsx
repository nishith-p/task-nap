import { DataTable } from "@/features/home/components/TaskTable/data-table";

import { columns } from "./TaskTable/constants/columns";
import { TasksData } from "./TaskTable/constants/tasks";

export const TaskList = () => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
          <p className="text-muted-foreground">
            Here's a list of tasks assigned to you.
          </p>
        </div>
      </div>
      <DataTable data={TasksData} columns={columns} />
    </div>
  );
};
