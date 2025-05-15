"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { LogoColor, LogoFormat, LogoType } from "@/types"
import { placeholderImageUrl } from "@/data"

export interface LogoProps {
    type?: LogoType
    color?: LogoColor
    format?: LogoFormat
    width?: number
    height?: number
    showText?: boolean
    href?: string
    className?: string
    linkClassName?: string
}

export function Logo({
    type = "small",
    color = "white",
    format = "svg",
    width = 180,
    height = 38,
    showText = true,
    href = "/",
    className = "",
    linkClassName = "",
}: LogoProps) {
    // Determine the directory based on logo type
    const getLogoDirectory = () => {
        switch (type) {
            case "full":
                return "full-logo-lockup"
            case "small":
                return "full-logo-lockup-small"
            case "icon":
                return "icon-clyde"
            default:
                return "full-logo-lockup-small"
        }
    }

    const getLogoType = () => {
        switch (type) {
            case "full":
                return "full_logo"
            case "small":
                return "small_logo"
            case "icon":
                return "icon_clyde"
            default:
                return "small_logo"
        }
    }

    // Construct the logo path
    const logoPath = `/images/logo/${getLogoDirectory()}/${getLogoType()}_${color}_RGB.${format}`
    const logoUrl = logoPath || placeholderImageUrl

    const logoContent = showText && type !== "icon"
        ? (
            <div className={cn(
                "md:w-[9.125rem] lg:w-32 lg:h-6 flex items-center gap-x-3",
                className
            )}>
                <Image
                    src={logoUrl}
                    alt="Discord Clone logo"
                    width={width}
                    height={height}
                    priority
                />
                <span className={cn("hidden sm:block lg:hidden xl:block", "text-app-" + color)}>Clone</span>
            </div>
        ) : (
            <Image
                src={logoUrl}
                alt="Discord Clone logo"
                width={width}
                height={height}
                className={cn(className)}
                priority
            />
        )

    if (href) {
        return <Link href={href} className={linkClassName}>{logoContent}</Link>
    }

    return logoContent
}
