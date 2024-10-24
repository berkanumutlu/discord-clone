import { Hash } from "lucide-react";
import { MobileToggle } from "@/components/mobile-toggle";
import { UserAvatar } from "@/components/user-avatar";
import { SocketIndicator } from "@/components/socket-indicator";

interface ChatHeaderProps {
    serverId: string;
    name: string;
    type: "channel" | "conversation";
    imageUrl?: string;
}

export const ChatHeader = ({
    serverId,
    name,
    type,
    imageUrl
}: ChatHeaderProps) => {
    return (
        <div className="px-3 w-full h-12 flex items-center text-md font-semibold border-b-neutral-200 dark:border-neutral-800 border-b-2">
            <MobileToggle serverId={serverId} />
            {type === "channel" && (
                <Hash className="mr-2 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            )}
            {type === "conversation" && (
                <UserAvatar src={imageUrl} className="mr-2 w-8 h-8 md:w-8 md:h-8" />
            )}
            <p className="text-md font-semibold text-black dark:text-white">{name}</p>
            <div className="ml-auto flex items-center"><SocketIndicator /></div>
        </div>
    )
}