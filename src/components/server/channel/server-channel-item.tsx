"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client"
import { capitalizeText, cn } from "@/lib/utils"
import { ServerChannelItemActions } from "@/components/server/channel/server-channel-item-actions"

interface ServerChannelItemProps {
    channel: Channel
    server: Server
    userRole?: MemberRole
}

export const ServerChannelItem = ({
    channel,
    server,
    userRole,
}: ServerChannelItemProps) => {
    const params = useParams()
    const isChannelSelected = params?.channelId === channel.id
    const isAdmin = userRole === MemberRole.ADMIN
    const isModerator = isAdmin || userRole === MemberRole.MODERATOR

    return (
        <li className="serverChannelItem">
            <div className={cn(
                "serverChannelItemWrapper",
                isChannelSelected && "modeSelected"
            )}>
                <Link
                    href={`/servers/${params?.serverId}/channels/${channel.id}`}
                    role="link"
                    aria-label={`${channel.name} (${capitalizeText(channel.type)} channel), 0 user`}
                    tabIndex={0}
                    className="serverChannelItemLink"
                >
                    <div className="serverChannelItemLinkTop">
                        <div className="serverChannelItemIconContainer" aria-label={`${capitalizeText(channel.type)} icon`} role="img">
                            {channel.type === ChannelType.TEXT && (
                                <svg className="serverChannelItemIcon" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path fill="currentColor" fillRule="evenodd" d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z" clipRule="evenodd"></path>
                                </svg>
                            )}
                            {channel.type === ChannelType.AUDIO && (
                                <svg className="serverChannelItemIcon" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z"></path>
                                    <path fill="currentColor" d="M15.16 16.51c-.57.28-1.16-.2-1.16-.83v-.14c0-.43.28-.8.63-1.02a3 3 0 0 0 0-5.04c-.35-.23-.63-.6-.63-1.02v-.14c0-.63.59-1.1 1.16-.83a5 5 0 0 1 0 9.02Z"></path>
                                </svg>
                            )}
                        </div>
                        <div className="serverChannelItemName">{channel.name}</div>
                        <ServerChannelItemActions channel={channel} server={server} canOpenChat={true} canInvitePeople={isModerator} canEditChannel={isModerator} />
                    </div>
                </Link>
            </div>
        </li>
    )
}