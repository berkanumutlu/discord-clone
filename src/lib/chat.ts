import { format } from "date-fns"
import { MessageWithMemberWithProfile } from "@/hooks/use-chat-socket"

export type GroupedMessageType = {
    date: string
    messages: MessageWithMemberWithProfile[]
}

export function groupMessagesByDate(messages: MessageWithMemberWithProfile[]): GroupedMessageType[] {
    const groupedMessages = messages.reduce<Record<string, MessageWithMemberWithProfile[]>>(
        (acc, message) => {
            const dateKey = format(new Date(message.createdAt), "yyyy-MM-dd")
            if (!acc[dateKey]) {
                acc[dateKey] = []
            }
            acc[dateKey].push(message)
            return acc
        }, {})

    return Object.entries(groupedMessages)
        .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
        .map(([date, messages]) => ({ date, messages }))
}

export function mergeGroupedMessages(
    existing: GroupedMessageType[],
    incoming: GroupedMessageType[]
): GroupedMessageType[] {
    const map = new Map<string, MessageWithMemberWithProfile[]>()

    for (const group of existing) {
        map.set(group.date, group.messages)
    }

    for (const group of incoming) {
        const existingMessages = map.get(group.date) || []
        const merged = [...existingMessages, ...group.messages].sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        map.set(group.date, merged)
    }

    return Array.from(map.entries())
        .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
        .map(([date, messages]) => ({ date, messages }))
}