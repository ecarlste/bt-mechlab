"use client";

import { Row } from "@tanstack/react-table";
import { Copy, Edit, SquareX } from "lucide-react";
import { useRouter } from "next/navigation";

import { weaponSelectSchema } from "~/server/db/schema";
import { handleDeleteWeapon, handleSaveCopyOfWeapon } from "../actions";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { cn } from "~/lib/utils";

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
    const response = await handleDeleteWeapon(weapon.id);

    if (response.success) {
      router.refresh();
    }
  };

  return (
    <div className="flex justify-end">
      <Tooltip>
        <TooltipTrigger>
          <div
            className={cn(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
              "hover:bg-accent hover:text-accent-foreground",
              "h-8 rounded-md px-2 text-xs",
            )}
            onClick={handleSaveCopyOf}
          >
            <Copy />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Create Copy of {weapon.name}</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={cn(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
              "hover:bg-accent hover:text-accent-foreground",
              "h-8 rounded-md px-2 text-xs",
            )}
            onClick={() => console.log("Edit", weapon.name)}
          >
            <Edit />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit {weapon.name}</p>
        </TooltipContent>
      </Tooltip>
      <AlertDialog>
        <AlertDialogTrigger>
          <div
            className={cn(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
              "hover:bg-accent hover:text-accent-foreground",
              "h-8 rounded-md px-2 text-xs",
            )}
          >
            <SquareX />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete "{weapon.name}" and remove it from the
              database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete()}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
