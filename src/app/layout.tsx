import "./globals.css"
import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { ClerkProvider } from "@clerk/nextjs"
import { MediaQueryProvider } from "@/context/media-query-context"
import { ThemeProvider } from "@/components/providers/theme-provider"
import GSAPProvider from "@/components/providers/gsap-provider"
import RootLayoutClient from "@/app/layout-client"

const DynamicModalProvider = dynamic(() => import('@/components/providers/modal-provider').then(mod => mod.ModalProvider), { ssr: false })
const DynamicSocketProvider = dynamic(() => import('@/components/providers/socket-provider').then(mod => mod.SocketProvider), { ssr: false })
const DynamicQueryProvider = dynamic(() => import('@/components/providers/query-provider').then(mod => mod.QueryProvider), { ssr: false })

export const metadata: Metadata = {
  title: "Discord Clone By Berkan Ümütlü",
  description: "Built with Next.js 14, React, Socket.io, Prisma, Tailwind, PostgreSQL",
  icons: {
    apple: "/images/logo/apple-touch-icon.ico"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={false}
            storageKey="discord-theme"
          >
            <div className="page-wrapper">
              <DynamicSocketProvider>
                <RootLayoutClient>
                  <DynamicModalProvider />
                  <DynamicQueryProvider>
                    <GSAPProvider>
                      <MediaQueryProvider>
                        {children}
                      </MediaQueryProvider>
                    </GSAPProvider>
                  </DynamicQueryProvider>
                </RootLayoutClient>
              </DynamicSocketProvider>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}