"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export type Weapon = {
  id: number;
  name: string;
  heat: number;
  damage: number;
  range: string;
};

export const columns: ColumnDef<Weapon>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "heat",
    header: "Heat",
  },
  {
    accessorKey: "damage",
    header: "Damage",
  },
  {
    accessorKey: "range",
    header: "Range",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const weapon = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("Edit", weapon.name)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Delete", weapon.name)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
