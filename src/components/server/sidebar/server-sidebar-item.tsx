import { MouseEvent } from "react"
import { Server } from "@prisma/client"
import type { LucideIcon } from "lucide-react"
import { slugifyText } from "@/lib/utils"
import { ServerSidebarItemWrapper } from "@/components/server/sidebar/server-sidebar-item-wrapper"

interface ServerSidebarItemProps {
    label: string
    icon?: LucideIcon
    server?: Server
    focusTarget?: string
    href?: string
    onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

export const ServerSidebarItem = ({
    label,
    icon: Icon,
    server,
    focusTarget,
    href,
    onClick,
}: ServerSidebarItemProps) => {
    return (
        <li className="serverSidebarItem">
            <ServerSidebarItemWrapper
                focusTarget={focusTarget ? slugifyText(focusTarget) : undefined}
                serverId={server?.id}
                href={href}
                onClick={onClick}
            >
                <div className="serverSidebarItemLink">
                    <div className="serverSidebarItemContent">
                        {Icon && (
                            <div className="serverSidebarItemIconContainer">
                                <Icon className="serverSidebarItemIcon" />
                            </div>
                        )}
                        <div className="serverSidebarItemName">{label}</div>
                    </div>
                </div>
            </ServerSidebarItemWrapper>
        </li>
    )
}