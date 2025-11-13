import { ComponentType } from "react"
import { Copy, Flag, Forward, LinkIcon, MessageCircleReply, Pen, Reply, Smile, SmilePlus, Trash, Volume2 } from "lucide-react"
import { useModal } from "@/hooks/use-modal-store"
import ThreadIcon from "@/components/icon/thread-icon"
import PinIcon from "@/components/icon/pin-icon"

interface ChatItemMenuContentProps {
    elementId?: string
    messageId: string
    socketUrl: string
    socketQuery: Record<string, string>
    isMessageOwner?: boolean
    isModerator?: boolean
    canEditMessage?: boolean
    canDeleteMessage?: boolean
    canReplyMessage?: boolean
    canCreateThread?: boolean
    canReactionMessage?: boolean
    hasMessageReactions?: boolean
    ItemComponent: ComponentType<any>
    ItemComponentMenuGroup: ComponentType<any>
    ItemComponentSeparator: ComponentType<any>
    ItemComponentSub: ComponentType<any>
    ItemComponentSubTrigger: ComponentType<any>
    ItemComponentSubContent: ComponentType<any>
    ItemComponentPortal: ComponentType<any>
    onEditMessage?: () => void
}

export function ChatItemMenuContent({
    elementId,
    messageId,
    socketUrl,
    socketQuery,
    isMessageOwner,
    isModerator,
    canEditMessage = false,
    canDeleteMessage = false,
    canReplyMessage = false,
    canCreateThread = false,
    canReactionMessage = false,
    hasMessageReactions = false,
    ItemComponent,
    ItemComponentMenuGroup,
    ItemComponentSeparator,
    ItemComponentSub,
    ItemComponentSubTrigger,
    ItemComponentSubContent,
    ItemComponentPortal,
    onEditMessage,
}: ChatItemMenuContentProps) {
    const { onOpen } = useModal()

    return (
        <div id={elementId ?? undefined} className="dropdownMenu flexibleDropdownMenu" aria-label="Message Actions" role="menu" tabIndex={-1}>
            <div className="dropdownMenuScroller">
                {(canReactionMessage || hasMessageReactions) && (
                    <>
                        <ItemComponentMenuGroup>
                            {canReactionMessage && (
                                <ItemComponent
                                    id="message-add-reaction"
                                    className="dropdownMenuItem"
                                >
                                    <div className="dropdownMenuItemLabel">Add Reaction</div>
                                    <div className="dropdownMenuItemIconContainer"><SmilePlus /></div>
                                </ItemComponent>
                            )}
                            {hasMessageReactions && (
                                <ItemComponent
                                    id="message-reactions"
                                    className="dropdownMenuItem"
                                >
                                    <div className="dropdownMenuItemLabel">View Reactions</div>
                                    <div className="dropdownMenuItemIconContainer"><Smile /></div>
                                </ItemComponent>
                            )}
                        </ItemComponentMenuGroup>
                        <ItemComponentSeparator />
                    </>
                )}
                <ItemComponentMenuGroup>
                    {canEditMessage && (
                        <ItemComponent
                            id="message-edit"
                            className="dropdownMenuItem"
                            onClick={onEditMessage}
                        >
                            <div className="dropdownMenuItemLabel">Edit Message</div>
                            <div className="dropdownMenuItemIconContainer"><Pen /></div>
                        </ItemComponent>
                    )}
                    {canReplyMessage && (
                        <ItemComponent
                            id="message-reply"
                            className="dropdownMenuItem"
                        >
                            <div className="dropdownMenuItemLabel">Reply</div>
                            <div className="dropdownMenuItemIconContainer"><Reply /></div>
                        </ItemComponent>
                    )}
                    <ItemComponent
                        id="message-forward"
                        className="dropdownMenuItem"
                    >
                        <div className="dropdownMenuItemLabel">Forward</div>
                        <div className="dropdownMenuItemIconContainer"><Forward /></div>
                    </ItemComponent>
                    {canCreateThread && (
                        <ItemComponent
                            id="message-thread"
                            className="dropdownMenuItem"
                        >
                            <div className="dropdownMenuItemLabel">Create Thread</div>
                            <div className="dropdownMenuItemIconContainer"><ThreadIcon /></div>
                        </ItemComponent>
                    )}
                </ItemComponentMenuGroup>
                <ItemComponentSeparator />
                <ItemComponentMenuGroup>
                    <ItemComponent
                        id="message-copy-text"
                        className="dropdownMenuItem"
                    >
                        <div className="dropdownMenuItemLabel">Copy Text</div>
                        <div className="dropdownMenuItemIconContainer"><Copy /></div>
                    </ItemComponent>
                    {isModerator && (
                        <ItemComponent
                            id="message-pin"
                            className="dropdownMenuItem"
                        >
                            <div className="dropdownMenuItemLabel">Pin Message</div>
                            <div className="dropdownMenuItemIconContainer"><PinIcon /></div>
                        </ItemComponent>
                    )}
                    <ItemComponentSub>
                        <ItemComponentSubTrigger id="message-actions-apps" className="dropdownMenuItem">
                            <div className="dropdownMenuItemLabel">Apps</div>
                        </ItemComponentSubTrigger>
                        <ItemComponentPortal>
                            <ItemComponentSubContent className="subDropdownMenuContainer">
                                <div className="dropdownMenu subDropdownMenu">
                                    <div className="dropdownMenuScroller">
                                        <ItemComponent className="dropdownMenuItem" disabled>No Commands Available</ItemComponent>
                                    </div>
                                </div>
                            </ItemComponentSubContent>
                        </ItemComponentPortal>
                    </ItemComponentSub>
                    <ItemComponent
                        id="message-mark-unread"
                        className="dropdownMenuItem"
                    >
                        <div className="dropdownMenuItemLabel">Mark Unread</div>
                        <div className="dropdownMenuItemIconContainer"><MessageCircleReply /></div>
                    </ItemComponent>
                    <ItemComponent
                        id="message-copy-link"
                        className="dropdownMenuItem"
                    >
                        <div className="dropdownMenuItemLabel">Copy Message Link</div>
                        <div className="dropdownMenuItemIconContainer"><LinkIcon /></div>
                    </ItemComponent>
                    <ItemComponent
                        id="message-actions-tts"
                        className="dropdownMenuItem"
                    >
                        <div className="dropdownMenuItemLabel">Speak Message</div>
                        <div className="dropdownMenuItemIconContainer"><Volume2 /></div>
                    </ItemComponent>
                </ItemComponentMenuGroup>
                <ItemComponentSeparator />
                <ItemComponentMenuGroup>
                    {canDeleteMessage && (
                        <ItemComponent
                            id="message-delete"
                            className="dropdownMenuItem dropdownMenuItemDanger"
                            onClick={() => onOpen("deleteMessage", {
                                apiUrl: `${socketUrl}/${messageId}`,
                                query: socketQuery
                            })}
                        >
                            <div className="dropdownMenuItemLabel">Delete Message</div>
                            <div className="dropdownMenuItemIconContainer"><Trash /></div>
                        </ItemComponent>
                    )}
                    {!isMessageOwner && (
                        <ItemComponent
                            id="message-report"
                            className="dropdownMenuItem dropdownMenuItemDanger"
                        >
                            <div className="dropdownMenuItemLabel">Report Message</div>
                            <div className="dropdownMenuItemIconContainer"><Flag /></div>
                        </ItemComponent>
                    )}
                </ItemComponentMenuGroup>
            </div>
        </div>
    )
}