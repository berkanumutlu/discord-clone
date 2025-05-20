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
}: ActionTooltipProps) => {
    return (
        <TooltipProvider>
            <Tooltip open={open} delayDuration={delayDuration}>
                {showOnlyWhenDisabled ? (
                    <>
                        <TooltipTrigger asChild>
                            <span tabIndex={0}>{children}</span>
                        </TooltipTrigger>
                        {disabled && label && (
                            <TooltipContent side={side} align={align} className={cn("z-[51]", contentClassName)}>
                                {label}
                            </TooltipContent>
                        )}
                    </>
                ) : (
                    <>
                        <TooltipTrigger asChild>{children}</TooltipTrigger>
                        {label && (
                            <TooltipContent side={side} align={align} className={cn("z-[51]", contentClassName)}>
                                <p className="text-sm font-semibold capitalize">
                                    {label.toLocaleLowerCase()}
                                </p>
                            </TooltipContent>
                        )}
                    </>
                )}
            </Tooltip>
        </TooltipProvider>
    )
}