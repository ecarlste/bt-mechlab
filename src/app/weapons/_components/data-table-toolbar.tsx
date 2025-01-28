"use client";

import { Table } from "@tanstack/react-table";
import { SquarePlus } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "~/lib/utils";

import { Input } from "~/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";

import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  enableAdmin?: boolean;
}

export function DataTableToolbar<TData>({ table, enableAdmin = false }: DataTableToolbarProps<TData>) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <Input
        placeholder="Filter weapons..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
        className="h-8 w-[150px] lg:w-[250px]"
      />
      <div className="flex items-center space-x-2">
        <Tooltip>
          <TooltipTrigger>
            <div
              className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                "h-8 rounded-md px-3 text-xs",
                enableAdmin ? "flex" : "hidden",
              )}
              onClick={() => router.push("/weapons/new")}
            >
              <SquarePlus />
              New
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create New Weapon</p>
          </TooltipContent>
        </Tooltip>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
