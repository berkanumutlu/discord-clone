import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Header, type HeaderProps } from "./header"
import { Footer, type FooterProps } from "./footer"

interface PageLayoutProps {
    children: ReactNode
    header?: HeaderProps | false | null
    footer?: FooterProps | false | null
    className?: string
}

export function PageLayout({ children, header = {}, footer = {}, className = "" }: PageLayoutProps) {
    return (
        <div className={cn("main-wrapper", className)}>
            {header !== false && <Header {...header} />}

            <main>{children}</main>

            {footer !== false && <Footer {...footer} />}
        </div>
    )
}
