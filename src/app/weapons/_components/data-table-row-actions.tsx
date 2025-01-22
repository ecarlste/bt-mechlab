"use client";

import { Row } from "@tanstack/react-table";
import { Copy, Edit, SquareX } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { weaponSelectSchema } from "~/server/db/schema";
import { handleDeleteWeapon, handleSaveCopyOfWeapon } from "../actions";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const weapon = weaponSelectSchema.parse(row.original);

  const handleSaveCopyOf = async () => {
    const response = await handleSaveCopyOfWeapon(weapon);

    if (response.success) {
      router.refresh();
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this weapon?");
    if (confirmed) {
      const response = await handleDeleteWeapon(weapon.id);

      if (response.success) {
        router.refresh();
      }
    }
  };

  return (
    <div className="flex justify-end">
      <Tooltip>
        <TooltipTrigger>
          <Button size="sm" variant="ghost" className="h-8 px-2" onClick={handleSaveCopyOf}>
            <Copy />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Create Copy of {weapon.name}</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Button size="sm" variant="ghost" className="h-8 px-2" onClick={() => console.log("Edit", weapon.name)}>
            <Edit />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit {weapon.name}</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Button size="sm" variant="ghost" className="h-8 px-2" onClick={handleDelete}>
            <SquareX />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete {weapon.name}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
