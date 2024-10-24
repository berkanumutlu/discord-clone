import { Hash, Menu } from "lucide-react";
import { MobileToggle } from "@/components/mobile-toggle";

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
            <p className="text-md font-semibold text-black dark:text-white">{name}</p>
        </div>
    )
}