"use client";

import { useParams, useRouter } from "next/navigation";
import { Edit, Hash, Lock, Volume2, Trash } from "lucide-react";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

interface ServerChannelProps {
    channel: Channel;
    server: Server;
    role?: MemberRole;
}

const iconMap = {
    [ChannelType.TEXT]: Hash,
    [ChannelType.AUDIO]: Volume2
};

export const ServerChannel = ({
    channel,
    server,
    role
}: ServerChannelProps) => {
    const router = useRouter();
    const params = useParams();

    const Icon = iconMap[channel.type];

    return (
        <button onClick={() => { }} className={cn(
            "group px-2 py-2 w-full flex items-center gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 rounded-md transition",
            params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
        )}>
            <Icon className="w-5 h-5 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
            <p className={cn(
                "text-sm font-semibold text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition line-clamp-1",
                params?.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
            )}>{channel.name}</p>
            {channel.name.toLocaleLowerCase() !== "general" && role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <ActionTooltip label="Edit">
                        <Edit className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
                    </ActionTooltip>
                    <ActionTooltip label="Delete">
                        <Trash className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-rose-600 dark:text-zinc-400 dark:hover:text-rose-400 transition" />
                    </ActionTooltip>
                </div>
            )}
            {/* TODO: Look like not necessary */}
            {channel.name.toLocaleLowerCase() === "general" && (
                <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            )}
        </button>
    )
}