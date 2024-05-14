import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";

import { taskPriorities, taskStatuses } from "./constants/data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={
            (table.getColumn("taskTitle")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("taskTitle")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("taskStatus") && (
          <DataTableFacetedFilter
            column={table.getColumn("taskStatus")}
            title="Status"
            options={taskStatuses}
          />
        )}
        {table.getColumn("taskPriority") && (
          <DataTableFacetedFilter
            column={table.getColumn("taskPriority")}
            title="Priority"
            options={taskPriorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
