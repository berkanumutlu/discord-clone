import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import ClientLayout from "./client-layout";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import dynamic from 'next/dynamic';

const font = Open_Sans({ subsets: ['latin'] });

const DynamicModalProvider = dynamic(() => import('@/components/providers/modal-provider').then(mod => mod.ModalProvider), { ssr: false });
const DynamicSocketProvider = dynamic(() => import('@/components/providers/socket-provider').then(mod => mod.SocketProvider), { ssr: false });
const DynamicQueryProvider = dynamic(() => import('@/components/providers/query-provider').then(mod => mod.QueryProvider), { ssr: false });

export const metadata: Metadata = {
  title: "Discord Clone By Berkan Ümütlü",
  description: "Built with Next.js 14, React, Socket.io, Prisma, Tailwind, PostgreSQL",
  icons: {
    apple: '/logo/apple-touch-icon.ico'
  }
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
            enableSystem={false}
            storageKey="discord-theme"
          >
            <main className="main">
              <DynamicSocketProvider>
                <ClientLayout>
                  <DynamicModalProvider />
                  <DynamicQueryProvider>
                    {children}
                  </DynamicQueryProvider>
                </ClientLayout>
              </DynamicSocketProvider>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}