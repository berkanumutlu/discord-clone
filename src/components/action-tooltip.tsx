"use client"

import { ReactNode } from "react"
import { capitalizeText, cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ActionTooltipProps {
    label?: string
    labelStyle?: "normal" | "small"
    children: ReactNode
    side?: "top" | "right" | "bottom" | "left"
    sideOffset?: number
    align?: "start" | "center" | "end"
    open?: boolean
    delayDuration?: number
    disabled?: boolean
    showOnlyWhenDisabled?: boolean
    contentClassName?: string
    contentTextClassName?: string
}

const labelStyleClassName = {
    "normal": "font-semibold text-[16px] leading-5",
    "small": "font-medium text-[14px] leading-4"
}

export const ActionTooltip = ({
    label,
    labelStyle = "normal",
    children,
    side,
    sideOffset,
    align,
    open,
    delayDuration = 50,
    disabled = false,
    showOnlyWhenDisabled = false,
    contentClassName,
    contentTextClassName,
}: ActionTooltipProps) => {
    const shouldShowTooltip = label && (!showOnlyWhenDisabled || disabled)
    const tooltipFromSideClassName = "from" + capitalizeText(side)
    const labelClassName = labelStyleClassName[labelStyle]

    if (!shouldShowTooltip) {
        return <>{children}</>
    }

    return (
        <TooltipProvider>
            <Tooltip open={open} delayDuration={delayDuration}>
                <TooltipTrigger asChild>
                    <span tabIndex={0}>{children}</span>
                </TooltipTrigger>
                <TooltipContent
                    role="tooltip"
                    side={side}
                    align={align}
                    sideOffset={sideOffset}
                    className={cn(
                        "p-0 max-w-48 relative bg-app-bg-floating-2 text-app-text-normal-4 border border-solid border-app-border-subtle-2 rounded-lg origin-[0_50%] !shadow-app-high-2 break-words pointer-events-none will-change-[opacity,transform] z-[1002] overflow-visible",
                        labelClassName,
                        contentClassName
                    )}
                >
                    <div className={cn("tooltipPointer tooltipPointerBg", tooltipFromSideClassName)}></div>
                    <div className={cn("tooltipPointer", tooltipFromSideClassName)}></div>
                    <div className={cn("py-2 px-3 font-[inherit] text-inherit overflow-hidden", contentTextClassName)}>{label}</div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}