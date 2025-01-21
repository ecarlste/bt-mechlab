"use client";

import { Row } from "@tanstack/react-table";
import { Copy, Edit, SquareX } from "lucide-react";

import { Button } from "~/components/ui/button";
import { weaponSelectSchema } from "~/server/db/schema";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const weapon = weaponSelectSchema.parse(row.original);

  return (
    <div className="flex justify-end">
      <Button size="sm" variant="ghost" className="h-8 px-2" onClick={() => console.log("Copy", weapon.name)}>
        <Copy />
      </Button>
      <Button size="sm" variant="ghost" className="h-8 px-2" onClick={() => console.log("Edit", weapon.name)}>
        <Edit />
      </Button>
      <Button size="sm" variant="ghost" className="h-8 px-2" onClick={() => console.log("Copy", weapon.name)}>
        <SquareX />
      </Button>
    </div>
  );
}
