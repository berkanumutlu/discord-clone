"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { LogoProps } from "@/types"
import { placeholderImageUrl } from "@/data"

export function AppLogo({
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
    const logoAlt = "Discord Clone logo"

    const logoContent = showText && type !== "icon"
        ? (
            <div className={cn(
                "appLogoImageDiv md:w-[9.125rem] lg:w-32 lg:h-6 flex items-center gap-x-3",
                className
            )}>
                <Image
                    src={logoUrl}
                    alt={logoAlt}
                    width={width}
                    height={height}
                    priority
                    className="appLogoImage"
                />
                <span className={cn("appLogoImageText hidden sm:block lg:hidden xl:block", "text-app-" + color)}>Clone</span>
            </div>
        ) : (
            <Image
                src={logoUrl}
                alt={logoAlt}
                width={width}
                height={height}
                className={cn("appLogoImage", className)}
                priority
            />
        )

    if (href) {
        return <Link href={href} className={cn("appLogoImageLink", linkClassName)}>{logoContent}</Link>
    }

    return logoContent
}
