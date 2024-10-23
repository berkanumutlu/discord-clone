"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
}

export const NavigationItem = ({
    id,
    imageUrl,
    name
}: NavigationItemProps) => {
    const params = useParams();
    const router = useRouter();
    const onClick = () => {
        router.push(`/servers/${id}`);
    }

    return (
        <ActionTooltip side="right" align="center" label={name}>
            <button className="group relative flex items-center" onClick={onClick}>
                <div className={cn(
                    "invisible group-hover:visible absolute left-0 w-[4px] bg-primary rounded-r-full transation-all",
                    params?.serverId !== id && "group-hover:h-[20px] duration-200",
                    params?.serverId === id ? "visible h-[36px] duration-200" : "h-[8px] duration-200"
                )} />
                <div className={cn(
                    "group mx-3 w-[48px] h-[48px] relative flex rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                    params?.serverId === id && "bg-primary/10 text-primary rounded-[16px] group-hover:rounded-[8px] duration-200"
                )}>
                    <Image src={imageUrl} alt={name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                </div>
            </button>
        </ActionTooltip>
    )
}