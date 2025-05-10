"use client"

import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"
import NavigationMenuItemCustom, { NavigationMenuItemContentProps } from "./navigation-menu-item-custom"

export interface NavigationMenuCustomProps {
    variant?: "transparent" | "solid" | "light"
}

export function NavigationMenuCustom({
    variant = "transparent",
}: NavigationMenuCustomProps) {
    return (
        <div className="mx-auto relative hidden lg:block xl:static">
            <NavigationMenu className="navigation-menu">
                <NavigationMenuList className="space-x-0 flex justify-start xl:justify-center items-start xl:items-center flex-row flex-1 flex-wrap xl:flex-nowrap xl:gap-x-0 bg-transparent overflow-visible">
                    {navigationMenuItems.map((item, index) => {
                        return (<NavigationMenuItemCustom key={index} href={item?.href} label={item?.label} variant={variant} dropdownContent={item?.dropdownContent} />)
                    })}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export interface NavigationMenuItemProps {
    label: string
    href: string
    variant?: NavigationMenuCustomProps["variant"]
    dropdownContent?: NavigationMenuItemContentProps
}

/* Navigation Menu Items */
export const navigationMenuItems: NavigationMenuItemProps[] = [
    {
        label: "Download",
        href: "/download",
    },
    {
        label: "Nitro",
        href: "/nitro",
    },
    {
        label: "Discover",
        href: "/servers",
    },
    {
        label: "Safety",
        href: "/safety",
        dropdownContent: {
            decorImage: "/egg.webp",
            decorImageClass: "is-safety",
            links: [
                {
                    title: "Resources",
                    subMenu: [
                        { title: "Safety News", href: "/safety-news" },
                        { title: "Safety Library", href: "/safety-library" },
                    ],
                },
                {
                    title: "",
                    subMenu: [
                        { title: "Community Guidelines", href: "/guidelines" },
                        {
                            title: "Resources",
                            subMenu: [
                                { title: "Privacy Hub", href: "/safety-privacy" },
                                { title: "Policy Hub", href: "/safety-policies" },
                                { title: "Transparency Hub", href: "/safety-transparency" },
                            ],
                        },
                        {
                            title: "Documentation",
                            subMenu: [
                                { title: "Transparency Reports", href: "/safety-transparency-reports/2024-h1" },
                            ],
                        },
                    ],
                },
                {
                    title: "",
                    subMenu: [
                        { title: "Family Center", href: "/safety-family-center" },
                        {
                            title: "Resources",
                            subMenu: [
                                { title: "Parent Hub", href: "/safety-parents" },
                                { title: "Teen Charter", href: "/safety-teen-charter" },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    {
        label: "Quests",
        href: "/quests",
        dropdownContent: {
            decorImage: "/trophy.webp",
            links: [
                {
                    title: "Resources",
                    subMenu: [
                        { title: "Advertising", href: "/ads/quests" },
                        { title: "Success Stories", href: "/ads/quests-success-stories" },
                        { title: "Quests FAQ", href: "/ads/quests-faq" },
                    ],
                },
            ],
        },
    },
    {
        label: "Support",
        href: "/support",
        dropdownContent: {
            decorImage: "/discord_nelly_pose2_flying_1.webp",
            decorImageClass: "is-support",
            links: [
                {
                    title: "Resources",
                    subMenu: [
                        { title: "Help Center", href: "https://support.discord.com/hc" },
                        { title: "Feedback", href: "https://support.discord.com/hc/en-us/community/topics" },
                        { title: "Submit a Request", href: "https://support.discord.com/hc/en-us/requests/new" },
                    ],
                },
            ],
        },
    },
    {
        label: "Blog",
        href: "/blog",
        dropdownContent: {
            decorImage: "/clyde_cube.webp",
            decorImageClass: "is-blog",
            links: [
                {
                    title: "Collections",
                    subMenu: [
                        { title: "Featured", href: "/blog" },
                        { title: "Community", href: "/category/community" },
                        { title: "Discord HQ", href: "/category/company" },
                        { title: "Engineering & Developers", href: "/category/engineering" },
                        { title: "How to Discord", href: "/category/how-to-discord" },
                        { title: "Policy & Safety", href: "/category/safety" },
                        { title: "Product & Features", href: "/category/product" },
                    ],
                },
            ],
        },
    },
    {
        label: "Developers",
        href: "/developers",
        dropdownContent: {
            decorImage: "/clyde_1.webp",
            decorImageClass: "is-build",
            links: [
                {
                    title: "",
                    subMenu: [
                        {
                            title: "Featured",
                            subMenu: [
                                { title: "Discord Social SDK", href: "/developers/social-sdk" },
                                { title: "Apps and Activities", href: "/developers/build" },
                            ],
                        },
                        {
                            title: "Documentation",
                            subMenu: [
                                { title: "Developer Home", href: "/developers" },
                                { title: "Developer Documentation", href: "/developers/docs/intro", isExternal: true },
                                { title: "Developer Applications", href: "/developers/applications", isExternal: true },
                                { title: "Developer Help Center", href: "https://support-dev.discord.com/hc/en-us", isExternal: true },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    {
        label: "Careers",
        href: "/careers",
    },
]