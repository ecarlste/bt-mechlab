"use client";

import { ColumnDef } from "@tanstack/react-table";

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
];
