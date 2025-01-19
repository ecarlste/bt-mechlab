"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

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
    enableHiding: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "heat",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Heat" />,
  },
  {
    accessorKey: "damage",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Damage" />,
  },
  {
    accessorKey: "range",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Range" />,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
