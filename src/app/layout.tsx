import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import ClientLayout from "./client-layout";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provier";

const font = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Discord Clone By Berkan Ümütlü",
  description: "Built with Next.js 14, React, Socket.io, Prisma, Tailwind, PostgreSQL"
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
          "antialiased dark:bg-[#313338]"
        )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            /* forcedTheme="dark" */
            enableSystem={false}
            storageKey="discord-theme"
          >
            <main className="main">
              <SocketProvider>
                <ClientLayout>
                  <ModalProvider />
                  {children}
                </ClientLayout>
              </SocketProvider>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
