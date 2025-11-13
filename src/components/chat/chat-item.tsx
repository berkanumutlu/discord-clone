"use client"

import { forwardRef, useCallback, useEffect, useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import axios from "axios"
import qs from "query-string"
import * as z from "zod"
import { type Member, MemberRole, type Profile } from "@prisma/client"
import { Ellipsis, FileIcon, Forward, Pen, Reply } from "lucide-react"
import { type Descendant } from "slate"
import { ReactEditor } from "slate-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SlateEditorType } from "@/types"
import { placeholderImageUrl } from "@/data/globalData"
import { cn } from "@/lib/utils"
import { getUserRoleIcon, getUserRoleTextColor } from "@/lib/auth"
import { formatDateCustomChatMessageTime, formatDateCustomChatMessageTimeTooltip, formatDateToISOString } from "@/lib/date"
import { Form, FormControl, FormItem } from "@/components/ui/form"
import { UserAvatar } from "@/components/user-avatar"
import { ActionTooltip } from "@/components/action-tooltip"
import { EmojiPicker } from "@/components/emoji-picker"
import { SlateEditor } from "@/components/slate-editor"
import { ChatItemMenuContent } from "@/components/chat/chat-item-menu-content"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuPortal, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from "@/components/ui/context-menu"

interface ChatItemProps {
    id: string
    channelId: string
    content: string
    member: Member & {
        profile: Profile
    }
    currentMember: Member
    fileUrl: string | null
    fileType: string | null
    createdAt: Date
    updatedAt?: Date | null
    deletedAt?: Date | null
    isUpdated: boolean
    isDeleted: boolean
    socketUrl: string
    socketQuery: Record<string, string>
    selectedMessageId: string | null
    setSelectedMessageId: (id: string | null) => void
}

const formSchema = z.object({
    content: z.string().min(1)
})

export const ChatItem = ({
    id,
    channelId,
    content,
    member,
    currentMember,
    fileUrl,
    fileType,
    createdAt,
    updatedAt,
    deletedAt,
    isUpdated,
    isDeleted,
    socketUrl,
    socketQuery,
    selectedMessageId,
    setSelectedMessageId,
}: ChatItemProps) => {
    const router = useRouter()
    const params = useParams()
    const editorRef = useRef<SlateEditorType>(null)

    const [isEditing, setIsEditing] = useState(false)
    const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false)
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false)
    const [slateEditorValue, setSlateEditorValue] = useState<Descendant[]>([{ children: [{ text: content }] }])

    const isMessageSelected = selectedMessageId === id
    const isMessageOwner = currentMember.id === member.id
    const isAdmin = currentMember.role === MemberRole.ADMIN
    const isModerator = currentMember.role === MemberRole.MODERATOR
    const isMessageActionsVisible = !(isEditing && isMessageSelected) && !isDeleted
    const canActionMessage = isMessageOwner || isAdmin || isModerator
    const canDeleteMessage = !isDeleted && canActionMessage
    const canEditMessage = !isDeleted && isMessageOwner
    const canReplyMessage = true
    const canCreateThread = true
    const canReactionMessage = true
    const hasMessageReactions = true
    const hasMessageImage = fileUrl && fileType?.startsWith("image")
    const hasMessageFile = fileUrl && !hasMessageImage

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: content
        }
    })
    const isLoading = form.formState.isSubmitting

    const resetMessageEvents = useCallback(() => {
        setIsEditing(false)
        setSelectedMessageId(null)
    }, [setSelectedMessageId])

    useEffect(() => {
        form.reset({
            content: content
        })
        setSlateEditorValue([{ children: [{ text: content }] }])
    }, [content, form])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key && e.key.toLowerCase() === "escape") {
                resetMessageEvents()
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [resetMessageEvents])

    const onClickUserProfile = () => {
        if (member.id === currentMember.id) return
        router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
    }

    /* const onSubmitMessage = async (values: z.infer<typeof formSchema>) => {
        if (values.content.trim() === content.trim()) {
            form.reset()
            resetMessageEvents()
            return
        }

        try {
            const url = qs.stringifyUrl({
                url: `${socketUrl}/${id}`,
                query: socketQuery
            })
            await axios.patch(url, values)
            form.reset()
            resetMessageEvents()
        } catch (error) {
            console.error("[CHAT_ITEM_ONSUBMIT]", error)
        }
    } */

    const onSlateEditorSubmit = async (text: string) => {
        if (text.trim() === content.trim()) {
            resetMessageEvents()
            return
        }

        try {
            const url = qs.stringifyUrl({
                url: `${socketUrl}/${id}`,
                query: socketQuery
            })
            await axios.patch(url, { content: text })
            resetMessageEvents()
        } catch (error) {
            console.error("[CHAT_ITEM_SLATE_EDITOR_SUBMIT]", error)
        }
    }

    const onClickEditMessage = () => {
        setIsEditing(true)
        setSelectedMessageId(id)
    }

    return (
        <ContextMenu onOpenChange={setIsContextMenuOpen}>
            <ContextMenuTrigger asChild>
                <li key={id} id={`chat-messages--${channelId}--${id}`} className={cn("messageListItem", (isMessageSelected || isContextMenuOpen) && "selected")}>
                    <div className="chatMessageWrapper" role="article" tabIndex={-1}>
                        <div className="contents">
                            <UserAvatar src={member?.profile?.imageUrl ?? placeholderImageUrl} label={member.profile.name} onClick={onClickUserProfile} />
                            <h3 className="chatMessageHeader">
                                <span className="chatMessageHeaderText">
                                    <span className={cn("chatMessageUsername", getUserRoleTextColor(member.role))}>{member.profile.name}</span>
                                </span>
                                <span className="chatMessageHeaderIcon">
                                    <ActionTooltip label={member.role} labelStyle="small" side="top">{getUserRoleIcon(member.role)}</ActionTooltip>
                                </span>
                                <span className="chatMessageTime">
                                    {(() => {
                                        const isoDate = formatDateToISOString(createdAt)

                                        return (
                                            <ActionTooltip
                                                label={formatDateCustomChatMessageTimeTooltip(createdAt)}
                                                labelStyle="small"
                                                side="top"
                                            >
                                                <time id={`message-timestamp--${id}`} className="timestamp" {...(isoDate && { dateTime: isoDate })}>
                                                    {formatDateCustomChatMessageTime(createdAt)}
                                                </time>
                                            </ActionTooltip>
                                        )
                                    })()}
                                </span>
                            </h3>
                            {(isEditing && isMessageSelected) ? (
                                <Form {...form}>
                                    <div className="channelTextArea">
                                        <div className="scrollableContainer">
                                            <div className="chatMessageEditForm">
                                                <FormItem className={cn("textArea space-y-0", isLoading && "disabled")} aria-disabled={isLoading ? "true" : "false"}>
                                                    <FormControl>
                                                        <SlateEditor
                                                            ref={editorRef}
                                                            editorKey={`chat-item-edit-${id}`}
                                                            value={slateEditorValue}
                                                            onChange={(value, plainText) => {
                                                                setSlateEditorValue(value)
                                                                form.setValue("content", plainText)
                                                            }}
                                                            onSubmit={onSlateEditorSubmit}
                                                            disabled={isLoading}
                                                            autoFocus={true}
                                                            className="slateTextArea border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                                            placeholder="Edit your message..."
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                                <div className="chatMessageEditButtons">
                                                    <div className="chatMessageEditButtonContainer">
                                                        <div className="buttonItem emojiButton">
                                                            <EmojiPicker
                                                                iconWidth={18}
                                                                iconHeight={18}
                                                                onSelect={(emoji: string) => {
                                                                    if (editorRef.current) {
                                                                        const editor = editorRef.current
                                                                        editor.insertText(emoji)

                                                                        const updatedValue = editor.children as Descendant[]
                                                                        const plainText = updatedValue
                                                                            .map((node) => {
                                                                                if ("children" in node) {
                                                                                    return (node.children as Array<{ text: string }>)
                                                                                        .map((child) => child.text)
                                                                                        .join("")
                                                                                }
                                                                                return ""
                                                                            })
                                                                            .join("\n")
                                                                        form.setValue("content", plainText)

                                                                        ReactEditor.focus(editor)
                                                                    }
                                                                }}
                                                                random={true}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cn("chatMessageEditInfo", isLoading && "disabled")} aria-disabled={isLoading ? "true" : "false"}>
                                        escape to <a className="anchor anchorUnderlineOnHover" role="button" onClick={resetMessageEvents} tabIndex={0}>cancel</a> • enter to <a className="anchor anchorUnderlineOnHover" role="button" onClick={() => onSlateEditorSubmit(form.getValues("content"))} tabIndex={0}>save</a>
                                    </div>
                                </Form>
                            ) : (
                                <div id={`message-content--${id}`} className="messageContent">
                                    <span className={cn(isDeleted && "chatMessageDeleted")}>
                                        {isDeleted
                                            ? `(This message has been deleted${canActionMessage ? ` at: ${formatDateCustomChatMessageTime(deletedAt)}` : '.'})`
                                            : content
                                        }
                                        {isUpdated && !isDeleted && (() => {
                                            const formatISODate = formatDateToISOString(updatedAt)

                                            return (
                                                <ActionTooltip
                                                    label={formatDateCustomChatMessageTimeTooltip(updatedAt)}
                                                    labelStyle="small"
                                                    side="top"
                                                >
                                                    <time className="timestamp mx-1" {...(formatISODate && { dateTime: formatISODate })}>
                                                        <span className="chatMessageEdited">(edited)</span>
                                                    </time>
                                                </ActionTooltip>
                                            )
                                        })()}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div id={`message-accessories--${id}`} className="messageAccessories">
                            {hasMessageImage && (
                                // TODO: Show in modal, add show original link below the modal
                                <div className="visualMediaItemContainer">
                                    <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="w-48 h-48 relative flex items-center bg-secondary aspect-square border rounded-md overflow-hidden">
                                        <Image src={fileUrl} alt={content} fill className="object-cover" />
                                    </a>
                                </div>
                            )}
                            {hasMessageFile && (
                                <div className="p-2 relative flex items-center bg-foreground/10 dark:bg-background/10 rounded-md">
                                    <FileIcon className="w-10 h-10 fill-indigo-200 stroke-indigo-400" />
                                    {/* TODO: Show file name, show in modal, are you sure redirect to other website */}
                                    <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="ml-2 max-w-[350px] text-sm text-indigo-500 dark:text-indigo-400 hover:underline overflow-hidden text-ellipsis whitespace-nowrap">
                                        File
                                    </a>
                                </div>
                            )}
                        </div>
                        {isMessageActionsVisible && (
                            <div className="buttonContainer">
                                <div className="buttonList">
                                    <div className="buttonsInner">
                                        {canReactionMessage && (
                                            <div className="buttonItem" role="button" tabIndex={0}>
                                                <ActionTooltip label="Add Reaction" labelStyle="small" side="top" sideOffset={8}>
                                                    <EmojiPicker
                                                        iconWidth={20}
                                                        iconHeight={20}
                                                        onOpen={() => {
                                                            resetMessageEvents()
                                                            setTimeout(() => {
                                                                setSelectedMessageId(id)
                                                            }, 0)
                                                        }}
                                                        onClose={() => {
                                                            if (!isDropdownMenuOpen && !isContextMenuOpen) {
                                                                setSelectedMessageId(null)
                                                            }
                                                        }}
                                                        onSelect={() => { }}
                                                    />
                                                </ActionTooltip>
                                            </div>
                                        )}
                                        {canEditMessage && (
                                            <div className="buttonItem" role="button" tabIndex={0}>
                                                <ActionTooltip label="Edit" labelStyle="small" side="top" sideOffset={8}>
                                                    <Pen onClick={onClickEditMessage} className="emojiListIcon" />
                                                </ActionTooltip>
                                            </div>
                                        )}
                                        {canReplyMessage && (
                                            <div className="buttonItem" role="button" tabIndex={0}>
                                                <ActionTooltip label="Reply" labelStyle="small" side="top" sideOffset={8}>
                                                    <Reply className="emojiListIcon" />
                                                </ActionTooltip>
                                            </div>
                                        )}
                                        <div className="buttonItem" role="button" tabIndex={0}>
                                            <ActionTooltip label="Forward" labelStyle="small" side="top" sideOffset={8}>
                                                <Forward className="emojiListIcon" />
                                            </ActionTooltip>
                                        </div>
                                        <div className="buttonItem" role="button" tabIndex={0}>
                                            <DropdownMenu
                                                onOpenChange={(open) => {
                                                    resetMessageEvents()
                                                    setTimeout(() => {
                                                        setIsDropdownMenuOpen(open)
                                                        setSelectedMessageId(open ? id : null)
                                                    }, 0)
                                                }}
                                            >
                                                <DropdownMenuTrigger>
                                                    <ActionTooltip label="More" labelStyle="small" side="top" sideOffset={8}>
                                                        <Ellipsis className="emojiListIcon" />
                                                    </ActionTooltip>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="dropdownMenuContainer" sideOffset={8}>
                                                    <ChatItemMenuContent
                                                        elementId="message-actions"
                                                        messageId={id}
                                                        socketUrl={socketUrl}
                                                        socketQuery={socketQuery}
                                                        isMessageOwner={isMessageOwner}
                                                        isModerator={isModerator}
                                                        canEditMessage={canEditMessage}
                                                        canDeleteMessage={canDeleteMessage}
                                                        canReplyMessage={canReplyMessage}
                                                        canCreateThread={canCreateThread}
                                                        canReactionMessage={canReactionMessage}
                                                        hasMessageReactions={hasMessageReactions}
                                                        ItemComponent={DropdownMenuItemWrapper}
                                                        ItemComponentMenuGroup={DropdownMenuGroupWrapper}
                                                        ItemComponentSeparator={DropdownMenuSeparatorWrapper}
                                                        ItemComponentSub={DropdownMenuSubWrapper}
                                                        ItemComponentSubTrigger={DropdownMenuSubTriggerWrapper}
                                                        ItemComponentSubContent={DropdownMenuSubContentWrapper}
                                                        ItemComponentPortal={DropdownMenuPortalWrapper}
                                                        onEditMessage={onClickEditMessage}
                                                    />
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </li>
            </ContextMenuTrigger>
            <ContextMenuContent className="dropdownMenuContainer">
                {isMessageActionsVisible && (
                    <ChatItemMenuContent
                        elementId="message"
                        messageId={id}
                        socketUrl={socketUrl}
                        socketQuery={socketQuery}
                        isMessageOwner={isMessageOwner}
                        isModerator={isModerator}
                        canEditMessage={canEditMessage}
                        canDeleteMessage={canDeleteMessage}
                        canReplyMessage={canReplyMessage}
                        canCreateThread={canCreateThread}
                        canReactionMessage={canReactionMessage}
                        hasMessageReactions={hasMessageReactions}
                        ItemComponent={ContextMenuItem}
                        ItemComponentMenuGroup={ContextMenuGroup}
                        ItemComponentSeparator={ContextMenuSeparator}
                        ItemComponentSub={ContextMenuSub}
                        ItemComponentSubTrigger={ContextMenuSubTrigger}
                        ItemComponentSubContent={ContextMenuSubContent}
                        ItemComponentPortal={ContextMenuPortal}
                        onEditMessage={onClickEditMessage}
                    />
                )}
            </ContextMenuContent>
        </ContextMenu>
    )
}

const DropdownMenuItemWrapper = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof DropdownMenuItem>>(
    (props, ref) => (
        <DropdownMenuItem ref={ref} {...props} />
    )
)
DropdownMenuItemWrapper.displayName = "DropdownMenuItemWrapper"

const DropdownMenuGroupWrapper = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof DropdownMenuGroup>>(
    (props, ref) => (
        <DropdownMenuGroup ref={ref} {...props} />
    )
)
DropdownMenuGroupWrapper.displayName = "DropdownMenuGroupWrapper"

const DropdownMenuSeparatorWrapper = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof DropdownMenuSeparator>>(
    (props, ref) => (
        <DropdownMenuSeparator ref={ref} {...props} />
    )
)
DropdownMenuSeparatorWrapper.displayName = "DropdownMenuSeparatorWrapper"

const DropdownMenuSubWrapper = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof DropdownMenuSub>>(
    (props, _ref) => (
        <DropdownMenuSub {...props} />
    )
)
DropdownMenuSubWrapper.displayName = "DropdownMenuSubWrapper"

const DropdownMenuSubTriggerWrapper = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof DropdownMenuSubTrigger>>(
    (props, ref) => (
        <DropdownMenuSubTrigger ref={ref} {...props} />
    )
)
DropdownMenuSubTriggerWrapper.displayName = "DropdownMenuSubTriggerWrapper"

const DropdownMenuSubContentWrapper = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof DropdownMenuSubContent>>(
    (props, ref) => (
        <DropdownMenuSubContent ref={ref} {...props} />
    )
)
DropdownMenuSubContentWrapper.displayName = "DropdownMenuSubContentWrapper"

const DropdownMenuPortalWrapper = (props: React.ComponentPropsWithoutRef<typeof DropdownMenuPortal>) => (
    <DropdownMenuPortal {...props} />
)
DropdownMenuPortalWrapper.displayName = "DropdownMenuPortalWrapper"