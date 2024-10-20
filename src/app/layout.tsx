import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import ClientLayout from "./client-layout";

const font = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Discord Clone By Berkan Ümütlü",
  description: "Built with Next.js 14, React, Socket.io, Prisma, Tailwind, MySQL"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body className={cn(
          font.className,
          'antialiased',
          'bg-[#e9ecef] dark:bg-[#313338]'
        )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            /* forcedTheme="dark" */
            enableSystem={true}
            storageKey="discord-theme"
          >
            <header>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <ModeToggle />
            </header>
            <main className="main"><ClientLayout>{children}</ClientLayout></main>
            <footer>
              Footer Section
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
