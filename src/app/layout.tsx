import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

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
      <html lang="en">
        <body className={`h-full ${font.className} antialiased`}>
          <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <main className="main">{children}</main>
          <footer>
            Footer Section
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
