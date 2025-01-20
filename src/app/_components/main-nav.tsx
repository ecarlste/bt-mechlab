"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MainNavLink } from "./main-nav-link";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <Image className="h-6 w-6" src="/battletech-logo.png" alt="BattleTech Logo" width={24} height={24} />
        <span className="hidden font-bold lg:inline-block">Mech Lab</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <MainNavLink name="mechs" pathname={pathname} />
        <MainNavLink name="weapons" pathname={pathname} />
        <MainNavLink name="equipment" pathname={pathname} />
      </nav>
    </div>
  );
}
