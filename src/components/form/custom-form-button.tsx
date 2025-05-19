"use client"

import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { Button, type ButtonProps } from "@/components/ui/button"

interface CustomFormButtonProps {
    label: string
    href?: string
    variant?: ButtonProps["variant"]
    size?: ButtonProps["size"]
    type?: ButtonProps["type"]
    icon?: React.ReactNode
    className?: string
    isExternal?: boolean
    isLoading?: boolean
    loadingText?: string
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
    isExternal = false,
    isLoading = false,
    loadingText,
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
        <Button
            type={type}
            variant={variant}
            size={size}
            className={cn(
                "p-[2px_16px] relative flex justify-center items-center font-medium text-[14px] leading-4 border border-solid rounded-lg transition-colors duration-200 ease select-none",
                size === "full-lg" && "text-[16px] leading-6",
                className
            )}
            onClick={handleClick}
            disabled={isLoading}
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
    )
}
