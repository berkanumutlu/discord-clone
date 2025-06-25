import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { ChannelType, MemberRole } from "@prisma/client"
import { CalendarFold, ChevronRight, Gem } from "lucide-react"
import { db } from "@/lib/db"
import { currentProfile } from "@/lib/current-profile"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ServerSidebarHeader } from "@/components/server/sidebar/server-sidebar-header"
import ServerSidebarMenuDividerItem from "@/components/server/sidebar/server-sidebar-menu-divider-item"
import { ServerChannelItem } from "@/components/server/channel/server-channel-item"
import { ServerChannelGroupItem } from "@/components/server/channel/server-channel-group-item"
import { ServerSidebarItem } from "@/components/server/sidebar/server-sidebar-item"
import { ActionTooltip } from "@/components/action-tooltip"

interface ServerSidebarMenuProps {
    serverId: string
}

export const ServerSidebarMenu = async ({
    serverId
}: ServerSidebarMenuProps) => {
    const userProfile = await currentProfile()
    if (!userProfile) return auth().redirectToSignIn()

    const server = await db.server.findUnique({
        where: { id: serverId },
        include: {
            channels: { orderBy: { createdAt: "asc" } },
            members: { include: { profile: true }, orderBy: { role: "asc" } }
        }
    })
    if (!server) return redirect("/")
    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
    const userServerRole = server?.members.find((member) => member.profileId === userProfile.id)?.role
    const isAdmin = userServerRole === MemberRole.ADMIN
    const isModerator = isAdmin || userServerRole === MemberRole.MODERATOR

    return (
        <nav className="serverSidebarListContainer" aria-label={`${server.name} (server)`}>
            <ServerSidebarHeader server={server} userRole={userServerRole} />
            <div className="relative">
                <div className="unreadTopContainer">
                    <div className="unreadBar unread hiddenBar">
                        <span>New Unreads</span>
                    </div>
                </div>
            </div>
            <ScrollArea id="channels" className="serverSidebarScroller hoverSidebar" tabIndex={0}>
                <ul className="serverSidebarChannelList" aria-label="Channels">
                    {isModerator && (<ServerSidebarItem label="Events" icon={CalendarFold} server={server} focusTarget="upcoming-events" />)}
                    {isModerator ? (
                        <>
                            <ServerSidebarItem label="Server Boosts" icon={Gem} server={server} focusTarget="skill-trees" href={`/servers/${server.id}/boosts`} />
                            <ServerSidebarMenuDividerItem />
                        </>
                    ) : (
                        <li className="serverSidebarItem">
                            <div className="serverSidebarItemWrapper serverSidebarItemProgressBarWrapper" role="button" tabIndex={-1}>
                                <ActionTooltip label="Buy Boosts to help unlock Level 1 perks!" labelStyle="small" side="top">
                                    <div className="textArea">
                                        <div className="goalTextContainer">
                                            <div className="goalText">goal: lvl 1</div>
                                        </div>
                                        <div className="progressFraction">
                                            <div className="progressFractionText"><strong>0/2</strong> Boosts</div>
                                            <ChevronRight width={16} height={16} className="progressFractionIcon" />
                                        </div>
                                    </div>
                                    <div className="progressBarContainer">
                                        <div className="progressBar"></div>
                                    </div>
                                </ActionTooltip>
                            </div>
                        </li>
                    )}
                    {!!textChannels?.length && (
                        <>
                            <ServerChannelGroupItem label="Text Channel Group List" userRole={userServerRole} />
                            {textChannels?.map((channel) => (
                                <ServerChannelItem key={channel.id} channel={channel} server={server} userRole={userServerRole} />
                            ))}
                        </>
                    )}
                    {!!audioChannels?.length && (
                        <>
                            <ServerChannelGroupItem label="Voice Channel Group List" userRole={userServerRole} />
                            {audioChannels?.map((channel) => (
                                <ServerChannelItem key={channel.id} channel={channel} server={server} userRole={userServerRole} />
                            ))}
                        </>
                    )}
                </ul>
            </ScrollArea>
            <div className="unreadBottomContainer">
                <div className="unreadBar unread hiddenBar">
                    <span>New Mentions</span>
                </div>
            </div>
        </nav>
    )
}