"use client"

import Image from "next/image"
import { useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { useRouterCustom } from "@/hooks/use-router-custom"
import { ActionTooltip } from "@/components/action-tooltip"

interface NavigationServerItemProps {
    id: string
    name: string
    imageUrl?: string
}

export const NavigationServerItem = ({
    id,
    name,
    imageUrl = "",
}: NavigationServerItemProps) => {
    const params = useParams()
    const { goTo } = useRouterCustom()

    return (
        <div className="listItem">
            <ActionTooltip side="right" align="center" label={name} sideOffset={12}>
                <div className="listItemWrapper" role="treeitem" aria-selected={params?.serverId === id}>
                    <button onClick={() => goTo(`/servers/${id}`)}>
                        <div className={cn(
                            "childWrapper",
                            !imageUrl && "!justify-start"
                        )}>
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="hasImageUrl"
                                />
                            ) : (
                                name
                            )}
                        </div>
                    </button>
                </div>
                <div className="listItemPill">
                    <span className={cn("listItemPillItem", params?.serverId === id && "selected")}></span>
                </div>
            </ActionTooltip>
        </div>
    )
}