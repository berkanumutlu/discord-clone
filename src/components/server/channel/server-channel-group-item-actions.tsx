"use client"

import { Plus } from "lucide-react"
import { ModalType, useModal } from "@/hooks/use-modal-store"
import { ActionTooltip } from "@/components/action-tooltip"

interface ServerChannelGroupItemActionsProps {
    canInvitePeople?: boolean
}

export const ServerChannelGroupItemActions = ({
    canInvitePeople = false,
}: ServerChannelGroupItemActionsProps) => {
    const { onOpen } = useModal()

    const onModalAction = (e: React.MouseEvent, modalAction: ModalType) => {
        e.stopPropagation()
        onOpen(modalAction)
    }

    return (
        <div className="serverChannelGroupItemActions">
            {canInvitePeople && (
                <ActionTooltip side="top" sideOffset={6} label="Create Channel" labelStyle="small">
                    <button
                        onClick={(e) => onModalAction(e, "createChannel")}
                        className="actionItem"
                    >
                        <Plus width={16} height={16} className="actionIcon" />
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
}