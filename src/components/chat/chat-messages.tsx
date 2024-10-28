"use client";

import { ElementRef, Fragment, useRef } from "react";
import { format } from "date-fns";
import { Member, Message, Profile } from "@prisma/client";
import { ChevronsUp, Loader2, ServerCrash } from "lucide-react";
import { ChatWelcome } from "./chat-welcome";
import { ChatItem } from "./chat-item";
import { useChatQuery } from "@/hooks/use-chat-query";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { useChatScroll } from "@/hooks/use-chat-scroll";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile;
    };
};

interface ChatMessagesProps {
    name: string;
    member: Member;
    chatId: string;
    type: "channel" | "conversation";
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
}

export const ChatMessages = ({
    name,
    member,
    chatId,
    type,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue
}: ChatMessagesProps) => {
    const queryKey = `chat:${chatId}`;
    const addKey = `chat:${chatId}:messages`;
    const updateKey = `chat:${chatId}:messages:update`;
    const chatRef = useRef<ElementRef<"div">>(null);
    const bottomRef = useRef<ElementRef<"div">>(null);
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        status
    } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue
    });
    useChatSocket({ queryKey, addKey, updateKey });
    useChatScroll({
        chatRef,
        bottomRef,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        loadMore: fetchNextPage,
        count: data?.pages?.[0]?.items?.length ?? 0
    });

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
        <div ref={chatRef} className="pt-4 flex flex-col flex-1 overflow-y-auto">
            {!hasNextPage && <div className="flex-1" />}
            {!hasNextPage && (
                <ChatWelcome name={name} type={type} />
            )}
            {hasNextPage && (
                <div className="flex justify-center">
                    {isFetchingNextPage ? (
                        <Loader2 className="my-4 w-6 h-6 text-zinc500 animate-spin" />
                    ) : (
                        <button onClick={() => fetchNextPage()} className="my-4 flex items-center gap-x-1 text-xs text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                            <ChevronsUp />Load previous messages<ChevronsUp />
                        </button>
                    )}
                </div>
            )}
            <div className="mt-auto flex flex-col-reverse">
                {data?.pages?.map((group, index) => (
                    <Fragment key={index}>
                        {group?.items?.map((message: MessageWithMemberWithProfile) => (
                            <ChatItem
                                key={message.id}
                                id={message.id}
                                content={message.content}
                                member={message.member}
                                currentMember={member}
                                fileUrl={message.fileUrl}
                                fileType={message.fileType}
                                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                                isUpdated={message.updatedAt !== null && message.updatedAt !== message.createdAt}
                                isDeleted={!!message.deletedAt}
                                deletedAt={format(new Date(message?.deletedAt as Date), DATE_FORMAT)}
                                socketUrl={socketUrl}
                                socketQuery={socketQuery}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
            <div ref={bottomRef} />
        </div>
    )
}