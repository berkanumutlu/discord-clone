"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client"
import { capitalizeText, cn } from "@/lib/utils"
import { ServerChannelItemActions } from "@/components/server/channel/server-channel-item-actions"
import TextChannelIcon from "@/components/icon/text-channel-icon"
import VoiceChannelIcon from "@/components/icon/voice-channel-icon"

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
                                <TextChannelIcon className="serverChannelItemIcon" />
                            )}
                            {channel.type === ChannelType.AUDIO && (
                                <VoiceChannelIcon className="serverChannelItemIcon" />
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