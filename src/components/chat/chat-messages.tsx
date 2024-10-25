"use client";

import { Fragment } from "react";
import { Member, Message, Profile } from "@prisma/client";
import { Loader2, ServerCrash } from "lucide-react";
import { useChatQuery } from "@/hooks/use-chat-query";
import { ChatWelcome } from "./chat-welcome";

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile
    }
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
        <div className="py-4 flex flex-col flex-1 overflow-y-auto">
            <div className="flex-1" />
            <ChatWelcome name={name} type={type} />
            <div className="mt-auto flex flex-col-reverse">
                {data?.pages?.map((group, index) => (
                    <Fragment key={index}>
                        {group?.items?.map((message: MessageWithMemberWithProfile) => (
                            <div key={message.id}>
                                {message.content}
                            </div>
                        ))}
                    </Fragment>
                ))}
            </div>
        </div>
    )
}