import { MobileToggle } from "@/components/mobile-toggle"
import { UserAvatar } from "@/components/user-avatar"
import { ChatVideoButton } from "@/components/chat/chat-video-button"
import { ChatToolbarList } from "@/components/chat/chat-toolbar-list"
import TextChannelIcon from "@/components/icon/text-channel-icon"
import CustomDotIcon from "@/components/icon/custom-dot-icon"

interface ChatHeaderProps {
    serverId: string
    title: string
    description?: string
    type: "channel" | "conversation"
    userAvatarImageUrl?: string
}

export const ChatHeader = ({
    serverId,
    title,
    description,
    type,
    userAvatarImageUrl,
}: ChatHeaderProps) => {
    return (
        <div className="subtitleContainer">
            <section className="subtitleSection" aria-label="Channel header">
                <div className="upperContainer">
                    <div className="children">
                        <div className="iconWrapper">
                            {type === "channel" && (
                                <TextChannelIcon />
                            )}
                            {type === "conversation" && userAvatarImageUrl && (
                                <UserAvatar src={userAvatarImageUrl} avatarClassName="mr-2 size-8" />
                            )}
                        </div>
                        <div className="titleWrapper">
                            <h1 className="title">{title}</h1>
                        </div>
                        {description && (
                            <>
                                <CustomDotIcon />
                                <div className="topicContent">
                                    <span>{description}</span>
                                </div>
                            </>
                        )}
                    </div>
                    <ChatToolbarList />
                </div>
            </section>
            <MobileToggle serverId={serverId} />
            <div className="ml-auto flex items-center">
                {type === "conversation" && (
                    <ChatVideoButton />
                )}
            </div>
        </div>
    )
}