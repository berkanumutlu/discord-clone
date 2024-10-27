"use client";

import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Video, VideoOff } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";

export const ChatVideoButton = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const isVideo = searchParams?.get("video");
    const Icon = isVideo ? VideoOff : Video;
    const tooltipLabel = isVideo ? "End video call" : "Start video call";

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname || "",
            query: {
                video: isVideo ? undefined : true
            }
        }, { skipNull: true });
        router.push(url);
    };

    return (
        <ActionTooltip side="bottom" label={tooltipLabel}>
            <button onClick={onClick} className="mr-4 hover:opacity-75 transition">
                <Icon className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
            </button>
        </ActionTooltip>
    )
}