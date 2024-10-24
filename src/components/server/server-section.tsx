"use client";

import { Plus, Settings } from "lucide-react";
import { ServerWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps {
    label: string;
    role?: MemberRole;
    sectionType: "channels" | "members";
    channelType?: ChannelType;
    server?: ServerWithMembersWithProfiles;
}

export const ServerSection = ({
    label,
    role,
    sectionType,
    channelType,
    server
}: ServerSectionProps) => {
    const { onOpen } = useModal();

    return (
        <div className="py-2 flex items-center justify-between">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase">{label}</p>
            {role !== MemberRole.GUEST && sectionType === "channels" && (
                <ActionTooltip side="top" label="Create">
                    <button onClick={() => onOpen("createChannel", { channelType })} className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                        <Plus className="w-4 h-4" />
                    </button>
                </ActionTooltip>
            )}
            {role === MemberRole.ADMIN && sectionType === "members" && (
                <ActionTooltip side="top" label="Manage Members">
                    <button onClick={() => onOpen("members", { server })} className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                        <Settings className="w-4 h-4" />
                    </button>
                </ActionTooltip>
            )}
        </div>
    )
}