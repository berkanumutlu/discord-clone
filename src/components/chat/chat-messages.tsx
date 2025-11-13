"use client"

import { ElementRef, Fragment, useRef, useState } from "react"
import { Member, Message, Profile } from "@prisma/client"
import { ChevronsUp, Loader2, ServerCrash } from "lucide-react"
import { formatDateCustom } from "@/lib/date"
import { useChatQuery } from "@/hooks/use-chat-query"
import { useChatSocket } from "@/hooks/use-chat-socket"
import { useChatScroll } from "@/hooks/use-chat-scroll"
import { ChatInfoMessage } from "@/components/chat/chat-info-message"
import { ChatItem } from "@/components/chat/chat-item"
import { ScrollArea } from "@/components/ui/scroll-area"
import ChatDividerItem from "@/components/chat/chat-divider-item"

type MessageWithMemberWithProfileType = Message & {
    member: Member & {
        profile: Profile
    }
}

interface ChatMessagesProps {
    chatId: string
    type: "channel" | "conversation"
    name: string
    member: Member
    otherMember?: Profile
    apiUrl: string
    socketUrl: string
    socketQuery: Record<string, string>
    paramKey: "channelId" | "conversationId"
    paramValue: string
}

export const ChatMessages = ({
    chatId,
    type,
    name,
    member,
    otherMember,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue
}: ChatMessagesProps) => {
    const queryKey = `chat:${chatId}`
    const addKey = `chat:${chatId}:messages`
    const updateKey = `chat:${chatId}:messages:update`
    const chatRef = useRef<ElementRef<"div">>(null)
    const bottomRef = useRef<ElementRef<"div">>(null)
    const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, status, messages } = useChatQuery({ queryKey, apiUrl, paramKey, paramValue })
    useChatSocket({ queryKey, addKey, updateKey })
    useChatScroll({ chatRef, bottomRef, shouldLoadMore: !isFetchingNextPage && !!hasNextPage, loadMore: fetchNextPage, count: data?.pages?.[0]?.items?.length ?? 0 })

    if (isLoading) {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="my-4 w-7 h-7 text-zinc-500 animate-spin" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading messages...</p>
            </div>
        )
    }
    if (status === "error") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrash className="my-4 w-7 h-7 text-zinc-500" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Something went wrong.</p>
            </div>
        )
    }

    return (
        <div ref={chatRef} className="messagesWrapper">
            <ScrollArea className="messagesScroller" role="group" tabIndex={-1}>
                <div className="messagesScrollerContent">
                    <ol className="messagesScrollerInner scrollAuto" aria-label={`Messages in ${name}`} role="list" data-list-id="chat-messages" tabIndex={0}>
                        {!hasNextPage && (
                            <ChatInfoMessage
                                title={name}
                                type={type}
                                username={otherMember?.username ?? undefined}
                                userAvatarUrl={otherMember?.imageUrl ?? undefined} />
                        )}
                        {hasNextPage && (
                            <div className="flex justify-center">
                                {isFetchingNextPage ? (
                                    <Loader2 className="my-4 size-6 text-zinc500 animate-spin" />
                                ) : (
                                    <button onClick={() => fetchNextPage()} className="my-4 flex items-center gap-x-1 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 text-xs transition">
                                        <ChevronsUp />Load previous messages<ChevronsUp />
                                    </button>
                                )}
                            </div>
                        )}
                        {messages.map((group, index) => (
                            <Fragment key={index}>
                                <ChatDividerItem content={formatDateCustom(group?.date)} />
                                {group?.messages?.map((message: MessageWithMemberWithProfileType) => (
                                    <ChatItem
                                        key={message.id}
                                        id={message.id}
                                        channelId={chatId}
                                        content={message.content}
                                        member={message.member}
                                        currentMember={member}
                                        fileUrl={message.fileUrl}
                                        fileType={message.fileType}
                                        createdAt={message.createdAt}
                                        updatedAt={message?.updatedAt}
                                        deletedAt={message?.deletedAt}
                                        isUpdated={message?.updatedAt !== null && message?.updatedAt !== message.createdAt}
                                        isDeleted={!!message.deletedAt}
                                        socketUrl={socketUrl}
                                        socketQuery={socketQuery}
                                        selectedMessageId={selectedMessageId}
                                        setSelectedMessageId={setSelectedMessageId}
                                    />
                                ))}
                            </Fragment>
                        ))}
                        <div ref={bottomRef} className="scrollerSpacer" />
                    </ol>
                </div>
            </ScrollArea>
        </div>
    )
}