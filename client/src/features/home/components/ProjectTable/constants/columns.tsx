import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";

import { projectCategories, projectStatus } from "./data";
import { Project } from "../../../../shared/schemas/projectSchema";
import { DataTableColumnHeader } from "../data-table-column-header";
import { Button } from "@/components/ui/button";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "projectName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("projectName")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "projectCategory",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = projectCategories.find(
        (category) => category.value === row.getValue("projectCategory")
      );

      return (
        <div className="flex w-[100px] items-center">
          <span>{category?.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "projectStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = projectStatus.find(
        (status) => status.value === row.getValue("projectStatus")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
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
    accessorKey: "projectCreator",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Owner" />
    ),
    cell: ({ row }) => {
      const projectOwnerName =
        row.getValue("projectCreator").firstName +
        " " +
        row.getValue("projectCreator").lastName;

      const fallBackInitials =
        row.getValue("projectCreator").firstName.charAt(0) +
        row.getValue("projectCreator").lastName.charAt(0);

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
