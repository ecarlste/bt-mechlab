"use client";

import { Table } from "@tanstack/react-table";
import { SquarePlus, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "~/lib/utils";
import { WeaponTypeEnum } from "~/lib/weapons/weapon-type";

import { TechnologyRatingEnum } from "~/server/db/schema";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

const weaponTypes = Object.entries(WeaponTypeEnum).map(([key, value]) => ({ value, label: key }));
const techRatings = Object.entries(TechnologyRatingEnum).map(([key, value]) => ({ value, label: key }));

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  enableAdmin?: boolean;
}

export function DataTableToolbar<TData>({ table, enableAdmin = false }: DataTableToolbarProps<TData>) {
  const router = useRouter();

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter weapons..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("weaponType") && (
          <DataTableFacetedFilter column={table.getColumn("weaponType")} title="Type" options={weaponTypes} />
        )}
        {table.getColumn("techRating") && (
          <DataTableFacetedFilter column={table.getColumn("techRating")} title="Tech Rating" options={techRatings} />
        )}
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Tooltip>
          <TooltipTrigger>
            <div
              className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
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
