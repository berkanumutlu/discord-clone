"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { LanguageDropdown } from "@/components/language-dropdown"
import { Logo } from "./logo"

interface FooterProps {
    className?: string
}

export function Footer({ className = "" }: FooterProps) {
    return (
        <footer className={cn(
            "pt-5 pb-0 relative flex flex-col flex-nowrap justify-start items-center bg-app-black bg-footer-bg-image bg-cover bg-no-repeat font-abcgintodiscord select-none overflow-clip z-[99]",
            className
        )}>
            <div className="mt-20 mx-auto max-w-full">
                {/* Main Footer Grid */}
                <div className="px-6 md:px-10 2xl:px-0 grid grid-cols-1 md:grid-cols-footer-grid-cols lg:grid-cols-footer-grid-cols-lg 2xl:grid-cols-footer-grid-cols-2xl gap-6 md:gap-x-[116px] md:gap-y-[62px] lg:gap-x-5 lg:gap-y-12 xl:gap-5">
                    {/* Logo, Language and Social Column */}
                    <div className="relative flex flex-col items-start col-span-1 row-span-1 md:col-span-3 md:row-span-6 lg:col-span-4 lg:row-span-1">
                        {/* Logo */}
                        <Logo type="icon" width={59} height={44} linkClassName="mb-10 inline-block" />

                        {/* Language Selector */}
                        <LanguageDropdown />

                        {/* Social Media - Desktop */}
                        <div className="mt-12 hidden lg:block">
                            <p className="mb-4 text-app-white/50 font-normal text-base leading-5">Social</p>
                            <div className="mt-4 flex items-center">
                                <SocialIcon href="https://twitter.com/discord" icon="/images/social/x.svg" alt="X/Twitter" />
                                <SocialIcon href="https://www.instagram.com/discord/" icon="/images/social/instagram.svg" alt="Instagram" />
                                <SocialIcon href="https://www.facebook.com/discord/" icon="/images/social/facebook.svg" alt="Facebook" />
                                <SocialIcon href="https://www.youtube.com/discord" icon="/images/social/youtube.svg" alt="YouTube" />
                                <SocialIcon href="https://www.tiktok.com/@discord" icon="/images/social/tiktok.svg" alt="TikTok" />
                            </div>
                        </div>
                    </div>

                    {/* Navigation Columns - Desktop */}
                    <div className="hidden md:inline-block lg:block col-span-1 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-3">
                        <h3 className="mb-4 text-app-white/50 font-abcgintodiscord font-normal text-base leading-5">Product</h3>
                        <nav className="space-y-3">
                            <FooterLink href="/download">Download</FooterLink>
                            <FooterLink href="/nitro">Nitro</FooterLink>
                            <FooterLink href="https://discordstatus.com/">Status</FooterLink>
                            <FooterLink href="/application-directory">App Directory</FooterLink>
                            <FooterLink href="/mobile">Mobile Experience</FooterLink>
                        </nav>
                    </div>

                    <div className="hidden md:inline-block lg:block col-span-1 row-span-1 md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-3">
                        <h3 className="mb-4 text-app-white/50 font-abcgintodiscord font-normal text-base leading-5">Company</h3>
                        <nav className="space-y-3">
                            <FooterLink href="/company">About</FooterLink>
                            <FooterLink href="/careers">Jobs</FooterLink>
                            <FooterLink href="/branding">Brand</FooterLink>
                            <FooterLink href="/newsroom">Newsroom</FooterLink>
                        </nav>
                    </div>

                    <div className="hidden md:inline-block lg:block col-span-1 row-span-1 md:col-span-2 md:row-span-3 lg:col-span-2 lg:row-span-3">
                        <h3 className="mb-4 text-app-white/50 font-abcgintodiscord font-normal text-base leading-5">Resources</h3>
                        <nav className="space-y-3">
                            <FooterLink href="/college">College</FooterLink>
                            <FooterLink href="https://support.discord.com/hc">Support</FooterLink>
                            <FooterLink href="/safety">Safety</FooterLink>
                            <FooterLink href="/blog">Blog</FooterLink>
                            <FooterLink href="/streamkit">StreamKit</FooterLink>
                            <FooterLink href="/creators">Creators</FooterLink>
                            <FooterLink href="/community">Community</FooterLink>
                            <FooterLink href="/developers">Developers</FooterLink>
                            <FooterLink href="/gaming">Gaming</FooterLink>
                            <FooterLink href="/quests">Quests</FooterLink>
                            <FooterLink href="https://discordmerch.com/evergreenfooter">Official 3rd Party Merch</FooterLink>
                            <FooterLink href="https://support.discord.com/hc/en-us/community/topics">Feedback</FooterLink>
                        </nav>
                    </div>

                    <div className="hidden md:inline-block lg:block col-span-1 row-span-1 md:col-span-2 md:row-span-3 lg:col-span-2 lg:row-span-3">
                        <h3 className="mb-4 text-app-white/50 font-abcgintodiscord font-normal text-base leading-5">Policies</h3>
                        <nav className="space-y-3">
                            <FooterLink href="/terms">Terms</FooterLink>
                            <FooterLink href="/privacy">Privacy</FooterLink>
                            <FooterLink href="#" onClick={(e) => e.preventDefault()}>Cookie Settings</FooterLink>
                            <FooterLink href="/guidelines">Guidelines</FooterLink>
                            <FooterLink href="/acknowledgements">Acknowledgements</FooterLink>
                            <FooterLink href="/licenses">Licenses</FooterLink>
                            <FooterLink href="/company-information">Company Information</FooterLink>
                        </nav>
                    </div>

                    {/* Navigation Columns - Mobile */}
                    <div className="md:hidden col-span-1">
                        <div className="text-app-white/50 font-abcgintodiscord font-normal text-sm lg:text-base">Menu</div>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="product" className="block border-b-2 border-app-white/10 overflow-clip z-[1]">
                                <AccordionTrigger className="py-6 text-app-white font-abcgintodiscord text-lg leading-5 hover:no-underline">Product</AccordionTrigger>
                                <AccordionContent className="pt-0 pb-4 leading-[18px]">
                                    <FooterLink href="/download">Download</FooterLink>
                                    <FooterLink href="/nitro">Nitro</FooterLink>
                                    <FooterLink href="https://discordstatus.com/">Status</FooterLink>
                                    <FooterLink href="/application-directory">App Directory</FooterLink>
                                    <FooterLink href="/mobile">Mobile Experience</FooterLink>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="company" className="block border-b-2 border-app-white/10 overflow-clip z-[1]">
                                <AccordionTrigger className="py-6 text-app-white font-abcgintodiscord text-lg leading-5 hover:no-underline">Company</AccordionTrigger>
                                <AccordionContent className="pt-0 pb-4 leading-[18px]">
                                    <FooterLink href="/company">About</FooterLink>
                                    <FooterLink href="/careers">Jobs</FooterLink>
                                    <FooterLink href="/branding">Brand</FooterLink>
                                    <FooterLink href="/newsroom">Newsroom</FooterLink>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="resources" className="block border-b-2 border-app-white/10 overflow-clip z-[1]">
                                <AccordionTrigger className="py-6 text-app-white font-abcgintodiscord text-lg leading-5 hover:no-underline">Resources</AccordionTrigger>
                                <AccordionContent className="pt-0 pb-4 leading-[18px]">
                                    <FooterLink href="/college">College</FooterLink>
                                    <FooterLink href="https://support.discord.com/hc">Support</FooterLink>
                                    <FooterLink href="/safety">Safety</FooterLink>
                                    <FooterLink href="/blog">Blog</FooterLink>
                                    <FooterLink href="/streamkit">StreamKit</FooterLink>
                                    <FooterLink href="/creators">Creators</FooterLink>
                                    <FooterLink href="/community">Community</FooterLink>
                                    <FooterLink href="/developers">Developers</FooterLink>
                                    <FooterLink href="/gaming">Gaming</FooterLink>
                                    <FooterLink href="/quests">Quests</FooterLink>
                                    <FooterLink href="https://discordmerch.com/evergreenfooter">Official 3rd Party Merch</FooterLink>
                                    <FooterLink href="https://support.discord.com/hc/en-us/community/topics">Feedback</FooterLink>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="policies" className="block border-none overflow-clip z-[1]">
                                <AccordionTrigger className="py-6 text-app-white font-abcgintodiscord text-lg leading-5 hover:no-underline">Policies</AccordionTrigger>
                                <AccordionContent className="pt-0 pb-4 leading-[18px]">
                                    <FooterLink href="/terms">Terms</FooterLink>
                                    <FooterLink href="/privacy">Privacy</FooterLink>
                                    <FooterLink href="#" onClick={(e) => e.preventDefault()}>Cookie Settings</FooterLink>
                                    <FooterLink href="/guidelines">Guidelines</FooterLink>
                                    <FooterLink href="/acknowledgements">Acknowledgements</FooterLink>
                                    <FooterLink href="/licenses">Licenses</FooterLink>
                                    <FooterLink href="/company-information">Company Information</FooterLink>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Social Media - Mobile, Tablet */}
                    <div className="mt-14 md:mt-0 lg:mt-6 lg:hidden md:col-span-4 md:row-span-1">
                        <p className="mb-4 text-app-white/50 font-normal text-base leading-5">Social</p>
                        <div className="flex flex-wrap">
                            <SocialIcon href="https://twitter.com/discord" icon="/images/social/x.svg" alt="X/Twitter" />
                            <SocialIcon href="https://www.instagram.com/discord/" icon="/images/social/instagram.svg" alt="Instagram" />
                            <SocialIcon href="https://www.facebook.com/discord/" icon="/images/social/facebook.svg" alt="Facebook" />
                            <SocialIcon href="https://www.youtube.com/discord" icon="/images/social/youtube.svg" alt="YouTube" />
                            <SocialIcon href="https://www.tiktok.com/@discord" icon="/images/social/tiktok.svg" alt="TikTok" />
                        </div>
                    </div>
                </div>

                <Image
                    src="/images/logo/Wordmark.svg"
                    alt={"Discord Clone Footer Logo"}
                    className="mt-0 lg:mt-10 p-6 pt-20 md:p-5 lg:pt-[76px] lg:pb-10 lg:px-10 xl:px-0 !relative grid-cols-1"
                    fill
                />
            </div>
        </footer>
    )
}

// Helper Components
function FooterLink({ href, children, onClick, }: { href: string; children: React.ReactNode; onClick?: (e: React.MouseEvent) => void }) {
    return (
        <Link href={href} className="my-0 py-4 md:py-0 first:pt-0 block text-app-white font-normal text-sm leading-[18px] md:text-base no-underline hover:underline transition-all" onClick={onClick}>
            {children}
        </Link>
    )
}

function SocialIcon({ href, icon, alt }: { href: string; icon: string; alt: string }) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-8 mr-[29px]"
        >
            <Image src={icon || "/images/placeholder.svg"} alt={alt} width={24} height={25} />
        </Link>
    )
}

export type { FooterProps }
