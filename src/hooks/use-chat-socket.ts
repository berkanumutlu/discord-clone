import { useEffect } from "react";
import { Member, Message, Profile } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useSocket } from "@/components/providers/socket-provider";

type ChatSocketProps = {
    addKey: string;
    updateKey: string;
    queryKey: string;
};

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile;
    };
};

type PaginatedData = {
    pages: Array<{
        items: MessageWithMemberWithProfile[];
    }>;
};

export const useChatSocket = ({
    addKey,
    updateKey,
    queryKey
}: ChatSocketProps) => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket) return;

        socket.on(updateKey, (message: MessageWithMemberWithProfile) => {
            queryClient.setQueryData<PaginatedData>([queryKey], (oldData) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) return oldData;
                const newData = oldData.pages.map((page) => {
                    return {
                        ...page,
                        items: page.items.map((item) => {
                            if (item.id === message.id) return message;
                            return item;
                        })
                    };
                });
                return {
                    ...oldData,
                    pages: newData
                };
            });
        });

        socket.on(addKey, (message: MessageWithMemberWithProfile) => {
            queryClient.setQueryData<PaginatedData>([queryKey], (oldData) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return {
                        pages: [{ items: [message] }]
                    };
                }
                const newData = [...oldData.pages];
                newData[0] = {
                    ...newData[0],
                    items: [message, ...newData[0].items]
                };
                return {
                    ...oldData,
                    pages: newData
                };
            });
        });

        return () => {
            socket.off(addKey);
            socket.off(updateKey);
        };
    }, [addKey, updateKey, queryKey, socket, queryClient]);
};
