import qs from "query-string"
import { useInfiniteQuery } from "@tanstack/react-query"
import { GroupedMessageType, groupMessagesByDate, mergeGroupedMessages } from "@/lib/chat"
import { useSocket } from "@/components/providers/socket-provider"

interface ChatQueryProps {
    queryKey: string
    apiUrl: string
    paramKey: "channelId" | "conversationId"
    paramValue: string
}

interface MessageData {
    items: [] | null
    nextCursor: string | null
}

export const useChatQuery = ({
    queryKey,
    apiUrl,
    paramKey,
    paramValue
}: ChatQueryProps) => {
    const { isConnected } = useSocket()

    const fetchMessages = async ({ pageParam = null }: { pageParam: string | null }): Promise<MessageData> => {
        const url = qs.stringifyUrl(
            {
                url: apiUrl,
                query: {
                    cursor: pageParam,
                    [paramKey]: paramValue
                }
            },
            { skipNull: true }
        )
        const res = await fetch(url)
        return res.json()
    }
    const query = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        initialPageParam: null,
        refetchInterval: isConnected ? false : 1000
    })

    let groupedMessages: GroupedMessageType[] = []
    if (query.data?.pages) {
        groupedMessages = query.data.pages.reduce((acc, page) => {
            const grouped = groupMessagesByDate(page.items ?? [])
            return mergeGroupedMessages(acc, grouped)
        }, [] as GroupedMessageType[])
    }

    return {
        ...query,
        messages: groupedMessages
    }
}