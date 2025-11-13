import { Bell, UsersRound } from "lucide-react"
import { ChatToolbarListItem } from "@/components/chat/chat-toolbar-list-item"
import ThreadIcon from "@/components/icon/thread-icon"
import { ServerSearch } from "@/components/server/server-search"
import PinIcon from "@/components/icon/pin-icon"

export const ChatToolbarList = () => {
    return (
        <div className="toolbar">
            <ChatToolbarListItem label="Threads" icon={ThreadIcon} />
            <ChatToolbarListItem label="Notification Settings" icon={Bell} />
            <ChatToolbarListItem label="Pinned Messages" icon={PinIcon} />
            <ChatToolbarListItem label="Show Member List" icon={UsersRound} />
            <ServerSearch />
        </div>
    )
}