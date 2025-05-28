"use client"

import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { ActionTooltip } from "@/components/action-tooltip"

interface CustomFormButtonProps {
    label: string
    href?: string
    variant?: ButtonProps["variant"]
    size?: ButtonProps["size"]
    type?: ButtonProps["type"]
    icon?: React.ReactNode
    className?: string
    disabled?: ButtonProps["disabled"]
    isExternal?: boolean
    isLoading?: boolean
    loadingText?: string
    tabIndex?: number
    tooltipSide?: "top" | "right" | "bottom" | "left"
    tooltipMessage?: string
    onClick?: () => void
}

export const CustomFormButton = ({
    label,
    href,
    variant = "default",
    size = "default",
    type = "button",
    icon,
    className,
    disabled,
    isExternal = false,
    isLoading = false,
    loadingText,
    tabIndex,
    tooltipSide = "top",
    tooltipMessage,
    onClick,
}: CustomFormButtonProps) => {
    const router = useRouter()

    const handleClick = () => {
        if (onClick) {
            onClick()
        } else if (href) {
            if (isExternal) {
                window.open(href, "_blank", "noopener,noreferrer")
            } else {
                router.push(href)
            }
        }
    }

    return (
        <ActionTooltip
            label={tooltipMessage}
            side={tooltipSide}
            disabled={disabled}
            showOnlyWhenDisabled={true}
            contentClassName="py-2 px-3 max-w-[190px] relative justify-self-center bg-app-bg-floating text-app-text-normal-3 font-medium leading-4 border-app-border-subtle rounded-lg !shadow-app-high break-words overflow-hidden"
            contentTextClassName="font-medium text-[14px]"
        >
            <Button
                type={type}
                variant={variant}
                size={size}
                tabIndex={tabIndex}
                className={cn(
                    "p-[2px_16px] relative flex justify-center items-center font-medium text-[14px] leading-4 border border-solid rounded-lg transition-colors duration-200 ease select-none",
                    size === "full-lg" && "text-[16px] leading-6",
                    className
                )}
                onClick={handleClick}
                disabled={isLoading || disabled}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="size-4 animate-spin" />
                        {loadingText && (<span>{loadingText}</span>)}
                    </>
                ) : (
                    <>
                        {icon && <span className="mr-2">{icon}</span>}
                        <div className="my-0 mx-auto text-ellipsis whitespace-nowrap overflow-hidden">{label}</div>
                    </>
                )}
            </Button>
        </ActionTooltip>
    )
}
