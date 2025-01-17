import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b-2 p-4 text-xl font-semibold">
      <div>
        <Link href={"/"}>Mech Lab</Link>
      </div>
      <div>
        <Link href={"/weapons"}>Weapons</Link>
      </div>

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
