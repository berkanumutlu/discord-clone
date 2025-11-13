"use client"

import { MemberRole } from "@prisma/client"
import { ChevronDown } from "lucide-react"
import { ServerChannelGroupItemActions } from "@/components/server/channel/server-channel-group-item-actions"

interface ServerChannelGroupItemProps {
    label: string
    userRole?: MemberRole
}

export const ServerChannelGroupItem = ({
    label,
    userRole,
}: ServerChannelGroupItemProps) => {
    const isAdmin = userRole === MemberRole.ADMIN
    const isModerator = isAdmin || userRole === MemberRole.MODERATOR

    return (
        <li className="serverChannelGroupItem">
            <div className="serverChannelGroupItemWrapper">
                <div className="serverChannelGroupItemContent">
                    <h3 className="serverChannelGroupItemName">
                        <div className="serverChannelGroupItemNameText">{label}</div>
                    </h3>
                    <ChevronDown className="serverChannelGroupItemIcon" />
                </div>
                <ServerChannelGroupItemActions canInvitePeople={isModerator} />
            </div>
        </li>
    )
}