import { cn } from "@/lib/utils"

interface ChatDividerItemProps {
    content?: string
    isUnread?: boolean
}

export default function ChatDividerItem({
    content,
    isUnread,
}: ChatDividerItemProps) {
    return (
        <div
            role="separator"
            aria-label={content ?? undefined}
            className={cn(
                "chatDividerItem",
                content && "hasContent"
            )}
        >
            {content && (
                <span className="chatDividerItemContent">{content}</span>
            )}
            {isUnread && (
                <span className="unreadPill">
                    <svg className="unreadPillCap" aria-hidden="true" role="img" width="8" height="13" viewBox="0 0 8 13">
                        <path className="unreadPillCapStroke" stroke="currentColor" fill="transparent" d="M8.16639 0.5H9C10.933 0.5 12.5 2.067 12.5 4V9C12.5 10.933 10.933 12.5 9 12.5H8.16639C7.23921 12.5 6.34992 12.1321 5.69373 11.4771L0.707739 6.5L5.69373 1.52292C6.34992 0.86789 7.23921 0.5 8.16639 0.5Z"></path>
                    </svg>
                    new
                </span>
            )}
        </div>
    )
}