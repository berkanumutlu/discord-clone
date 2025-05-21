"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@clerk/nextjs"
import { cn } from "@/lib/utils"
import { FooterProps } from "@/types"
import { footerMenuItems, placeholderImageUrl, afterSignInUrl, signUpUrl, socialLinks } from "@/data"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { LanguageDropdown } from "@/components/language-dropdown"
import { AppLogo } from "@/components/main/app-logo"

export function Footer({ footerStyle = "advanced", className = "" }: FooterProps) {
    const { isSignedIn } = useAuth()

    if (footerStyle === "basic") {
        const authButtonUrl = isSignedIn ? afterSignInUrl : signUpUrl
        const authButtonText = isSignedIn ? "Open Discord" : "Sign up"

        return (
            <footer className={cn(
                "py-20 lg:pb-16 w-full flex flex-col items-center bg-app-not-quite-black text-app-white font-primary",
                className
            )}>
                <div className="px-6 md:px-10 w-full max-w-[1260px] grid grid-cols-[repeat(4,1fr)] md:grid-cols-[repeat(8,1fr)] lg:grid-cols-[repeat(12,1fr)] gap-x-5">
                    <div className="mb-14 h-60 flex flex-col col-span-4 md:row-span-2">
                        <div className="mt-6 flex items-center"></div>
                        <div className="mt-6 flex flex-wrap items-center">
                            {socialLinks?.map((item, index) => (
                                <SocialIcon key={index} href={item.href} icon={item.icon} alt={item?.label} footerStyle={footerStyle} />
                            ))}
                        </div>
                    </div>
                    {footerMenuItems?.map((item, index) => (
                        <div key={index} className="mb-10 col-span-2">
                            <h3 className="pt-2 font-primary text-app-blurple text-[16px] leading-6 cursor-default">{item.title}</h3>
                            {item?.links && (
                                <nav className="mt-2 space-y-2">
                                    {item?.links.map((linkItem, linkIndex) => (
                                        <FooterLink key={linkIndex} href={linkItem.href} isExternal={linkItem?.isExternal} footerStyle={footerStyle}>{linkItem.label}</FooterLink>
                                    ))}
                                </nav>
                            )}
                        </div>
                    ))}
                </div>
                <div className="px-6 md:px-10 w-full max-w-[1260px] grid grid-cols-[repeat(4,1fr)] md:grid-cols-[repeat(8,1fr)] lg:grid-cols-[repeat(12,1fr)] gap-x-5">
                    <div className="col-span-4 md:col-span-8 lg:col-span-12">
                        <div className="mb-8 w-full h-px bg-app-blurple"></div>
                        <div className="flex justify-between items-center">
                            <AppLogo width={124} height={34} />
                            <Link href={authButtonUrl} className="p-[7px_16px] inline-flex items-center bg-app-blurple hover:bg-app-blurple-hover text-app-white font-medium text-[14px] leading-6 no-underline hover:underline rounded-[40px] hover:shadow-[0_8px_15px_rgba(0,0,0,.2)] transition-colors duration-200 ease-in-out">{authButtonText}</Link>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }

    return (
        <footer className={cn(
            "pt-5 pb-0 relative flex flex-col flex-nowrap justify-start items-center bg-app-black bg-footer-bg-image bg-cover bg-no-repeat font-abcgintodiscord select-none overflow-clip z-[99]",
            className
        )}>
            <div className="mt-20 mx-auto max-w-full">
                {/* Main Footer Grid */}
                <div className="px-6 md:px-10 3xl:px-0 grid grid-cols-1 md:grid-cols-footer-grid-cols lg:grid-cols-footer-grid-cols-lg 2xl:grid-cols-footer-grid-cols-2xl gap-6 md:gap-x-[116px] md:gap-y-[62px] lg:gap-x-5 lg:gap-y-12 xl:gap-5">
                    {/* Logo, Language and Social Column */}
                    <div className="relative flex flex-col items-start col-span-1 row-span-1 md:col-span-3 md:row-span-6 lg:col-span-4 lg:row-span-1">
                        {/* Logo */}
                        <AppLogo type="icon" width={59} height={44} linkClassName="mb-10 inline-block" />

                        {/* Language Selector */}
                        <LanguageDropdown />

                        {/* Social Media - Desktop */}
                        <div className="mt-12 hidden lg:block">
                            <p className="mb-4 text-app-white/50 font-normal text-base leading-5">Social</p>
                            <div className="mt-4 flex items-center">
                                {socialLinks?.map((item, index) => (
                                    <SocialIcon key={index} href={item.href} icon={item.icon} alt={item?.label} footerStyle={footerStyle} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Columns - Desktop */}
                    {footerMenuItems?.map((item, index) => (
                        <div key={index} className="hidden md:inline-block lg:block col-span-1 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-3">
                            <h3 className="mb-4 text-app-white/50 font-abcgintodiscord font-normal text-base leading-5">{item.title}</h3>
                            {item?.links && (
                                <nav className="space-y-3">
                                    {item?.links.map((linkItem, linkIndex) => (
                                        <FooterLink key={linkIndex} href={linkItem.href} isExternal={linkItem?.isExternal} footerStyle={footerStyle}>{linkItem.label}</FooterLink>
                                    ))}
                                </nav>
                            )}
                        </div>
                    ))}

                    {/* Navigation Columns - Mobile */}
                    {footerMenuItems && footerMenuItems?.length > 0 && (
                        <div className="md:hidden col-span-1">
                            <div className="text-app-white/50 font-abcgintodiscord font-normal text-sm lg:text-base">Menu</div>
                            <Accordion type="single" collapsible className="w-full 
                        [&>div.footer-menu-item-mobile]:border-b-2 [&>div.footer-menu-item-mobile:last-child]:border-none [&>div.footer-menu-item-mobile]:border-app-white/10">
                                {footerMenuItems?.map((item, index) => (
                                    <AccordionItem key={index} value={item.title} className="footer-menu-item-mobile block overflow-clip z-[1]">
                                        {item?.links && item?.links?.length > 0 && (
                                            <>
                                                <AccordionTrigger className="py-6 text-app-white font-abcgintodiscord text-lg leading-5 hover:no-underline">{item.title}</AccordionTrigger>
                                                <AccordionContent className="pt-0 pb-4 leading-[18px]">
                                                    {item.links.map((linkItem, linkIndex) => (
                                                        <FooterLink key={linkIndex} href={linkItem.href} isExternal={linkItem?.isExternal} footerStyle={footerStyle}>{linkItem.label}</FooterLink>
                                                    ))}
                                                </AccordionContent>
                                            </>
                                        )}
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    )}

                    {/* Social Media - Mobile, Tablet */}
                    <div className="mt-14 md:mt-0 lg:mt-6 lg:hidden md:col-span-4 md:row-span-1">
                        <p className="mb-4 text-app-white/50 font-normal text-base leading-5">Social</p>
                        <div className="flex flex-wrap">
                            {socialLinks?.map((item, index) => (
                                <SocialIcon key={index} href={item.href} icon={item.icon} alt={item?.label} footerStyle={footerStyle} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-0 lg:mt-10 p-6 pt-20 md:p-5 lg:pt-[76px] lg:pb-10 lg:px-10 3xl:px-0 relative grid-cols-1">
                    <Image
                        src={"/images/logo/Wordmark.svg"}
                        alt={"Discord Clone Footer Logo"}
                        className="!relative"
                        fill
                        loading="lazy"
                    />
                </div>
            </div>
        </footer>
    )
}

// Helper Components
function FooterLink({ href, className, children, onClick, isExternal = false, footerStyle }: { href: string; className?: string; children: React.ReactNode; onClick?: (e: React.MouseEvent) => void; isExternal?: boolean; footerStyle?: string }) {
    return (
        <Link
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            onClick={onClick}
            className={cn(
                "block text-app-white font-normal leading-6 no-underline hover:underline transition-all",
                footerStyle === "basic" && "font-primary text-[16px]",
                footerStyle === "advanced" && "my-0 py-4 md:py-0 first:pt-0 font-abcgintodiscord text-[14px] md:text-[16px]",
                className
            )}
        >
            {children}
        </Link>
    )
}

function SocialIcon({ href, icon, alt, footerStyle }: { href: string; icon: string; alt?: string; footerStyle?: string }) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                footerStyle === "basic" && "size-6 mr-6",
                footerStyle === "advanced" && "w-6 h-8 mr-[29px]",
            )}
        >
            <Image src={icon || placeholderImageUrl} alt={alt ?? ""} width={24} height={footerStyle === "basic" ? 24 : 25} loading="lazy" />
        </Link>
    )
}
