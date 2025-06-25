"use client"

import { Channel, ChannelType, Server } from "@prisma/client"
import { MessageCircle, Settings, UserRoundPlus } from "lucide-react"
import { ModalType, useModal } from "@/hooks/use-modal-store"
import { ActionTooltip } from "@/components/action-tooltip"

interface ServerChannelItemActionsProps {
    channel: Channel
    server: Server
    canOpenChat?: boolean
    canInvitePeople?: boolean
    canEditChannel?: boolean
}

export const ServerChannelItemActions = ({
    channel,
    server,
    canOpenChat = false,
    canInvitePeople = false,
    canEditChannel = false,
}: ServerChannelItemActionsProps) => {
    const { onOpen } = useModal()

    const onModalAction = (e: React.MouseEvent, modalAction: ModalType) => {
        e.stopPropagation()
        onOpen(modalAction, { server, channel })
    }

    return (
        <div className="serverChannelItemActions">
            {canOpenChat && channel.type === ChannelType.AUDIO && (
                <ActionTooltip side="top" sideOffset={6} label="Open Chat" labelStyle="small">
                    <div
                        onClick={(e) => onModalAction(e, "invitePeople")}
                        className="actionItem"
                    >
                        <MessageCircle width={16} height={16} className="actionIcon" />
                    </div>
                </ActionTooltip>
            )}
            {canInvitePeople && (
                <ActionTooltip side="top" sideOffset={6} label="Create Invite" labelStyle="small">
                    <div
                        onClick={(e) => onModalAction(e, "invitePeople")}
                        className="actionItem"
                    >
                        <UserRoundPlus width={16} height={16} className="actionIcon" />
                    </div>
                </ActionTooltip>
            )}
            {canEditChannel && (
                <ActionTooltip side="top" sideOffset={6} label="Edit Channel" labelStyle="small">
                    <div
                        className="actionItem"
                        onClick={(e) => onModalAction(e, "editChannel")}
                    >
                        <Settings width={16} height={16} className="actionIcon" />
                    </div>
                </ActionTooltip>
            )}
        </div>
    )
}