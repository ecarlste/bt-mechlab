"use client";

import { ColumnDef } from "@tanstack/react-table";

import { WeaponTypeEnum } from "~/lib/weapons/weapon-type";

import { TechnologyRatingEnum, Weapon } from "~/server/db/schema";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

// Utility function to get the key of TechnologyRatingEnum from its value
function getTechnologyRatingKeyByValue(value: string): string | undefined {
  return Object.keys(TechnologyRatingEnum).find(
    (key) => TechnologyRatingEnum[key as keyof typeof TechnologyRatingEnum] === value,
  );
}

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
    accessorKey: "weaponType",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const weaponTypeValue = row.getValue("weaponType") as WeaponTypeEnum;

      return <span className="capitalize">{weaponTypeValue}</span>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "techRating",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tech Rating" />,
    cell: ({ row }) => {
      const techRatingValue = row.getValue("techRating") as TechnologyRatingEnum;
      const techRatingKey = getTechnologyRatingKeyByValue(techRatingValue);

      return <span>{techRatingKey}</span>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    // enableHiding: false,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
