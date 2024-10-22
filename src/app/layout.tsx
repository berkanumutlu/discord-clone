import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import ClientLayout from "./client-layout";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";

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
          "antialiased",
          "bg-[#e9ecef] dark:bg-[#313338]"
        )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            /* forcedTheme="dark" */
            enableSystem={false}
            storageKey="discord-theme"
          >
            <ClientLayout>
              <ModalProvider />
              {children}
            </ClientLayout>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
