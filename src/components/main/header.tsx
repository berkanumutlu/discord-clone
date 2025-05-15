"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { HeaderProps } from "@/types"
import { Logo } from "./logo"
import { NavigationMenuCustom } from "./navigation-menu/navigation-menu-custom"
import NavigationBurgerMenu from "./navigation-menu/navigation-burger-menu"

export function Header({
    variant = "transparent",
    container = "fluid",
    position = "fixed",
    logoType = "small",
    className = "",
    showNav = true,
    navStyle = "advanced",
}: HeaderProps) {
    const { isSignedIn } = useAuth()
    const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? "/sign-in"
    const signedInUrl = "/channels/@me"
    const authButtonUrl = isSignedIn ? signedInUrl : signInUrl
    const authButtonText = isSignedIn ? "Open Discord" : "Log In"

    // Determine background color based on variant
    const getBgColor = () => {
        if (variant === "transparent") {
            return "bg-transparent"
        } else if (variant === "solid") {
            return "bg-[#404EED]"
        } else {
            return "bg-app-white dark:bg-[#313338]"
        }
    }

    // Determine container class
    const containerClass = container === "fluid" ? "px-6 md:px-8 xl:px-10 w-full" : "mx-auto px-6 lg:px-8 max-w-7xl"

    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth < 1024) {
                setScrolled(window.scrollY > 10)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        window.addEventListener("resize", handleScroll)

        handleScroll()

        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", handleScroll)
        }
    }, [])

    return (
        <header className={cn(
            "nav-header fixed lg:absolute inset-0 bottom-auto block font-abcgintonormal transition-colors duration-300 z-[101] xl:z-[99]",
            scrolled ? "bg-app-blurple" : getBgColor(),
            className
        )}>
            <div className={cn(
                "relative z-[2]",
                containerClass,
            )}>
                <div className={cn(
                    "mx-auto flex justify-between justify-items-stretch items-center",
                    position === "fixed" && "h-[64px] md:h-[100px] lg:h-[70px] xl:h-20 lg:items-end",
                    position === "static" && "h-20",
                )}>
                    {/* Logo */}
                    <Logo
                        type={logoType}
                        width={logoType === "icon" ? 48 : logoType === "full" ? 240 : 146}
                        height={logoType === "icon" ? 48 : logoType === "full" ? 56 : 24}
                        linkClassName={cn(
                            "w-32 sm:w-36 xl:w-[9.125rem] 2xl:w-36 h-10 flex justify-start items-center text-app-black font-abcgintodiscord no-underline",
                            position === "fixed" && "fixed left-auto",
                            position === "static" && "static",
                            container === "fluid" && "left-auto lg:left-8 xl:left-10",
                        )}
                    />

                    {/* Navigation Menu */}
                    {showNav && (<NavigationMenuCustom variant={variant} navStyle={navStyle} />)}

                    {/* Auth Button */}
                    <div className={cn(
                        "ml-auto mr-3 sm:mr-6 lg:mr-0 relative block",
                        position === "fixed" && "lg:fixed",
                        position === "static" && "xl:w-[124px] static flex flex-[0_0_auto] flex-row-reverse text-end",
                        container === "fluid" && "right-auto lg:right-8 xl:right-10",
                        container === "normal" && "right-auto lg:right-8 xl:right-[5%] 2xl:right-[12%] 3xl:right-[26.1%]"
                    )}>
                        <Link
                            href={authButtonUrl}
                            className={cn(
                                "items-center bg-app-white font-medium no-underline border-none",
                                position === "fixed" && "mb-0 xl:my-0 px-4 py-[9px] xl:py-[10px] flex xl:block justify-start hover:bg-[#c7c8ce] text-app-black font-abcgintodiscord text-[16px] leading-[130%] xl:leading-[1.2] text-center tracking-normal xl:tracking-[0.25px] rounded-2xl transition-colors duration-300 xl:duration-250",
                                position === "static" && "p-[7px_16px] inline-flex text-app-not-quite-black hover:text-app-blurple font-primary text-[14px] leading-6 hover:no-underline text-end rounded-[40px] hover:shadow-[0_8px_15px_rgba(0,0,0,.2)] transition-colors duration-200 ease-in-out",
                            )}
                        >
                            {authButtonText}
                        </Link>
                    </div>

                    {/* Burger Menu for Mobile and Tablet */}
                    <NavigationBurgerMenu authButtonText={authButtonText} authButtonLink={authButtonUrl} />
                </div>
            </div>
            <div className="nav-backdrop h-screen fixed inset-0 top-auto hidden xl:block bg-[#000c] invisible opacity-0 backdrop-blur-[20px] transition-[opacity,visibility] duration-400 z-[1]"></div>
        </header>
    )
}
