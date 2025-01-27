import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "~/styles/globals.css";
import { SiteHeader } from "./_components/site-header";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "BattleTech Mech Lab",
  description: "A convenvient way to build your BattleTech mechs",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ClerkProvider>
        <html lang="en" className={`${GeistSans.variable}`}>
          <body className="dark min-h-svh bg-background font-sans">
            <div className="flex min-h-svh flex-col bg-background">
              <div className="border-grid flex flex-1 flex-col">
                <SiteHeader />
                <main className="flex flex-1 flex-col">{children}</main>
              </div>
            </div>
            <Toaster richColors />
            <SpeedInsights />
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
