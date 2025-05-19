"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

interface CustomFormLinkProps {
    label: string
    href?: string
    variant?: ButtonProps["variant"]
    size?: ButtonProps["size"]
    type?: ButtonProps["type"]
    icon?: React.ReactNode
    linkClassName?: string
    buttonClassName?: string
    isExternal?: boolean
}

export const CustomFormLink = ({
    label,
    href,
    variant = "link",
    size = "default",
    type = "button",
    icon,
    linkClassName,
    buttonClassName,
    isExternal = false,
}: CustomFormLinkProps) => {
    return (
        <Button
            variant={variant}
            size={size}
            type={type}
            className={cn(
                "p-0 size-auto relative block justify-center items-center bg-none text-app-brand-360 font-primary font-medium text-[14px] leading-4 border-none border-app-brand-360 rounded-lg duration-200 select-none",
                buttonClassName
            )}
        >
            {href ? (
                <Link
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={cn(
                        "my-0 mx-auto !p-0 bg-transparent text-inherit font-[inherit] font-medium text-[14px] leading-[inherit] text-ellipsis outline-0 whitespace-nowrap overflow-hidden",
                        icon ? "inline-flex items-center" : "!inline",
                        linkClassName
                    )}
                >
                    {icon && <span className="mr-2">{icon}</span>}
                    {label}
                </Link>
            ) : (
                <a
                    target={isExternal ? "_blank" : undefined}
                    rel={"noopener noreferrer"}
                    className={cn(
                        "my-0 mx-auto !p-0 bg-transparent text-inherit font-[inherit] font-medium text-[14px] leading-[inherit] text-ellipsis outline-0 whitespace-nowrap overflow-hidden",
                        icon ? "inline-flex items-center" : "!inline",
                        linkClassName
                    )}
                >
                    {icon && <span className="mr-2">{icon}</span>}
                    {label}
                </a>
            )}
        </Button>
    )
}
