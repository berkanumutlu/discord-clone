"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ActionTooltipProps {
    label?: string
    children: ReactNode
    side?: "top" | "right" | "bottom" | "left"
    align?: "start" | "center" | "end"
    open?: boolean
    delayDuration?: number
    disabled?: boolean
    showOnlyWhenDisabled?: boolean
    contentClassName?: string
    contentTextClassName?: string
}

export const ActionTooltip = ({
    label,
    children,
    side,
    align,
    open,
    delayDuration = 50,
    disabled = false,
    showOnlyWhenDisabled = false,
    contentClassName,
    contentTextClassName,
}: ActionTooltipProps) => {
    const shouldShowTooltip = label && (!showOnlyWhenDisabled || disabled)

    if (!shouldShowTooltip) {
        return <>{children}</>
    }

    return (
        <TooltipProvider>
            <Tooltip open={open} delayDuration={delayDuration}>
                <TooltipTrigger asChild>
                    <span tabIndex={0}>{children}</span>
                </TooltipTrigger>
                <TooltipContent role="tooltip" side={side} align={align} className={cn("z-[51]", contentClassName)}>
                    <p className={cn("text-sm font-semibold", contentTextClassName)}>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}