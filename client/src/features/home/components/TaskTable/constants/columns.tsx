import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar } from "@radix-ui/react-avatar";

import { DataTableColumnHeader } from "../data-table-column-header";
import { taskCategories, taskPriorities, taskStatuses } from "./data";
import { Task } from "../../../../shared/schemas/taskSchema";

import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "taskTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const taskCategory = taskCategories.find(
        (taskCategory) => taskCategory.value === row.original.taskCategory
      );

      return (
        <div className="flex space-x-2">
          {taskCategory && (
            <Badge variant="outline">{taskCategory.label}</Badge>
          )}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("taskTitle")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "taskStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = taskStatuses.find(
        (status) => status.value === row.getValue("taskStatus")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[150px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "taskPriority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = taskPriorities.find(
        (priority) => priority.value === row.getValue("taskPriority")
      );

      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "taskCreatorId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created by" />
    ),
    cell: ({ row }) => {
      const projectOwnerName =
        row.getValue("taskCreatorId").firstName +
        " " +
        row.getValue("taskCreatorId").lastName;

      const fallBackInitials =
        row.getValue("taskCreatorId").firstName.charAt(0) +
        row.getValue("taskCreatorId").lastName.charAt(0);

      return (
        <div className="flex w-[200px] items-center">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-8 w-8 mr-2 rounded-full"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/03.png" alt="@shadcn" />
              <AvatarFallback className="text-muted-foreground">
                {fallBackInitials}
              </AvatarFallback>
            </Avatar>
          </Button>
          <span>{projectOwnerName}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => {
      const formattedDate = format(row.getValue("createdAt"), "MMMM dd, yyyy");

      return (
        <div className="flex w-[100px] items-center">
          <span>{formattedDate}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
