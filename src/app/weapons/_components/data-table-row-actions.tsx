"use client";

import { Row } from "@tanstack/react-table";
import { weapons } from "bt-weapons-client-ts";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

import { handleDeleteWeapon, handleSaveCopyOfWeapon } from "~/app/weapons/actions";

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
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const weapon = row.original as weapons.WeaponDto;

  const handleSaveCopyOf = async () => {
    const response = await handleSaveCopyOfWeapon(weapon);

    if (response.success) {
      router.refresh();
    }
  };

  const handleEdit = () => {
    router.push(`/weapons/${weapon.id}/edit`);
  };

  const handleDelete = async () => {
    const response = await handleDeleteWeapon(weapon.id);

    if (response.success) {
      router.refresh();
    }
  };

  return (
    <div className="flex justify-end">
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex h-5 w-8 p-0">
              <MoreHorizontal />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSaveCopyOf}>Save a Copy</DropdownMenuItem>
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <AlertDialogTrigger>Delete</AlertDialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete &quot;{weapon.name}&quot; and remove it from
              the database.
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
