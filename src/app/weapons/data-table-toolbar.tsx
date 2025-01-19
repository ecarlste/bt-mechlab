"use client";

import { Table } from "@tanstack/react-table";

import { Input } from "~/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <Input
        placeholder="Filter weapons..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
        className="h-8 w-[150px] lg:w-[250px]"
      />
      <DataTableViewOptions table={table} />
    </div>
  );
}
