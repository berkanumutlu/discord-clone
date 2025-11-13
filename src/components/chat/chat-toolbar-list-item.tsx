import { FC, SVGProps } from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ActionTooltip } from "@/components/action-tooltip"

interface ChatToolbarListItemProps {
    label: string
    icon?: LucideIcon | FC<SVGProps<SVGSVGElement>>
    iconClassName?: string
}

export const ChatToolbarListItem = ({
    label,
    icon: Icon,
    iconClassName,
}: ChatToolbarListItemProps) => {
    return (
        <ActionTooltip label={label} labelStyle="small" side="bottom" sideOffset={7}>
            <div className="toolbarItem">
                {Icon ? (
                    <Icon width={20} height={20} className={cn(iconClassName)} />
                ) : (
                    label
                )}
            </div>
        </ActionTooltip>
    )
}