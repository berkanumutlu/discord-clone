import Image from "next/image"
import { cn } from "@/lib/utils"
import { placeholderImageUrl } from "@/data/globalData"
import TextChannelIcon from "@/components//icon/text-channel-icon"

interface ChatInfoMessageProps {
    title: string
    username?: string
    userAvatarUrl?: string
    type: "channel" | "conversation"
}

export const ChatInfoMessage = ({
    title,
    username,
    userAvatarUrl,
    type,
}: ChatInfoMessageProps) => {
    const isChannel = type === "channel"

    return (
        <div id="chat-messages-info" className="chatInfoMessageContainer">
            {isChannel
                ? (
                    <div className="chatInfoMessageIcon">
                        <TextChannelIcon width={42} height={42} />
                    </div>
                ) : (
                    <div className="chatInfoMessageUserAvatarWrapper" role="img" aria-label={title} aria-hidden="false">
                        <svg width="80" height="80" viewBox="0 0 80 80" className="svgAvatar" aria-hidden="true">
                            <foreignObject x="0" y="0" width="80" height="80" mask="url(#svg-mask-avatar-default)">
                                <div className="avatarStack">
                                    <Image
                                        src={userAvatarUrl ?? placeholderImageUrl}
                                        alt={title}
                                        fill
                                        className="avatar"
                                        aria-hidden="true"
                                    />
                                </div>
                            </foreignObject>
                        </svg>
                    </div>
                )}
            <h3 className="chatInfoMessageTitle">
                {isChannel ? `Welcome to #${title}` : title}
            </h3>
            <div className={cn(
                "chatInfoMessageDescription",
                isChannel && "markup"
            )}>
                {isChannel
                    ? `This is the start of the #${title} channel.`
                    : (
                        <>
                            <h3 className="chatInfoMessageUsername">{username}</h3>
                            This is the beginning of your direct message history with <strong>{title}</strong>.
                        </>
                    )
                }
            </div>
        </div>
    )
}