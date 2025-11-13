"use client"

import { ReactNode, MouseEvent } from "react"
import { useRouterCustom } from "@/hooks/use-router-custom"

interface ServerSidebarItemWrapperProps {
    href?: string
    children: ReactNode
    serverId?: string
    focusTarget?: string
    onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

export const ServerSidebarItemWrapper = ({
    href,
    children,
    serverId,
    focusTarget,
    onClick,
}: ServerSidebarItemWrapperProps) => {
    const { goTo } = useRouterCustom()

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        if (onClick) {
            onClick(e)
        } else if (href) {
            goTo(href)
        }
    }

    return (
        <div
            className="serverSidebarItemWrapper"
            onClick={handleClick}
            role={href || onClick ? "button" : undefined}
            tabIndex={href || onClick ? 0 : undefined}
            aria-label={focusTarget}
            id={focusTarget ? `${focusTarget}-${serverId}` : undefined}
        >
            {children}
        </div>
    )
}