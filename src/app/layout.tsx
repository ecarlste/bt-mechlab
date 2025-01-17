import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "~/styles/globals.css";
import { TopNav } from "./_components/topnav";

export const metadata: Metadata = {
  title: "BattleTech Mech Lab",
  description: "A convenvient way to build your BattleTech mechs",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className="dark flex h-screen flex-col">
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
