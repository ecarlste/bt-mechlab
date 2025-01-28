"use client";

import Link from "next/link";

import { cn } from "~/lib/utils";

export function MainNavLink({ name, pathname }: { name: string; pathname: string }) {
  const path = `/${name}`;

  return (
    <Link
      href={path}
      className={cn(
        "capitalize transition-colors hover:text-foreground/80",
        pathname === path ? "text-foreground" : "text-foreground/80",
      )}
    >
      {name}
    </Link>
  );
}
