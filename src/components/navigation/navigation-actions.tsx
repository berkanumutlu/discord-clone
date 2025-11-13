"use client"

import { ArrowDownToLine, CirclePlus, Compass } from "lucide-react"
import { useModal } from "@/hooks/use-modal-store"
import { useRouterCustom } from "@/hooks/use-router-custom"
import { NavigationActionItem } from "@/components/navigation/navigation-action-item"

export const NavigationActions = () => {
    const { onOpen } = useModal()
    const { goTo } = useRouterCustom()

    return (
        <>
            <NavigationActionItem
                label={"Add a Server"}
                onClick={() => onOpen("createServer")}
                showTutorialContainer={true}
                showPill={false}
            >
                <CirclePlus size={20} />
            </NavigationActionItem>
            <NavigationActionItem
                label="Discover"
                onClick={() => goTo("/discovery/servers")}
                showPill={false}
            >
                <Compass size={20} />
            </NavigationActionItem>
            <NavigationActionItem
                label="Download Apps"
                onClick={() => onOpen("downloadApps")}
                showPill={false}
            >
                <ArrowDownToLine size={20} />
            </NavigationActionItem>
        </>
    )
}