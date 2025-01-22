"use client";

import { Table } from "@tanstack/react-table";
import { SquarePlus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "~/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";

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
            <Button
              variant="outline"
              size="sm"
              className={cn("ml-auto h-8", enableAdmin ? "flex" : "hidden")}
              onClick={() => router.push("/weapons/new")}
            >
              <SquarePlus />
              New
            </Button>
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
