import { NavigationMenuItemProps, socialLinkType, FooterMenuSectionType } from "@/types"

export const placeholderImageUrl = "/images/placeholder.svg"
export const languages = [
    "Čeština",
    "Dansk",
    "Deutsch",
    "English",
    "English (UK)",
    "Español",
    "Español (América Latina)",
    "Français",
    "Hrvatski",
    "Italiano",
    "lietuvių kalba",
    "Magyar",
    "Nederlands",
    "Norsk",
    "Polski",
    "Português (Brasil)",
    "Română",
    "Suomi",
    "Svenska",
    "Tiếng Việt",
    "Türkçe",
    "Ελληνικά",
    "български",
    "Русский",
    "Українська",
    "हिंदी",
    "ไทย",
    "한국어",
    "中文",
    "中文(繁體)",
    "日本語",
]
export const socialLinks: socialLinkType[] = [
    { label: "X/Twitter", href: "https://twitter.com/discord", icon: "/images/social/x.svg" },
    { label: "Instagram", href: "https://www.instagram.com/discord/", icon: "/images/social/instagram.svg" },
    { label: "Facebook", href: "https://www.facebook.com/discord/", icon: "/images/social/facebook.svg" },
    { label: "YouTube", href: "https://www.youtube.com/discord", icon: "/images/social/youtube.svg" },
    { label: "TikTok", href: "https://www.tiktok.com/@discord", icon: "/images/social/tiktok.svg" },
]
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
export const footerMenuItems: FooterMenuSectionType[] = [
    {
        title: "Product",
        links: [
            { label: "Download", href: "/download" },
            { label: "Nitro", href: "/nitro" },
            { label: "Status", href: "https://discordstatus.com", isExternal: true },
            { label: "App Directory", href: "/application-directory" },
            { label: "Mobile Experience", href: "/mobile" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "/company" },
            { label: "Jobs", href: "/careers" },
            { label: "Brand", href: "/branding" },
            { label: "Newsroom", href: "/newsroom" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "College", href: "/college" },
            { label: "Support", href: "https://support.discord.com/hc", isExternal: true },
            { label: "Safety", href: "/safety" },
            { label: "Blog", href: "/blog" },
            { label: "StreamKit", href: "/streamkit" },
            { label: "Creators", href: "/creators" },
            { label: "Community", href: "/community" },
            { label: "Developers", href: "/developers" },
            { label: "Gaming", href: "/gaming" },
            { label: "Quests", href: "/quests" },
            { label: "Official 3rd Party Merch", href: "https://discordmerch.com/evergreenfooter", isExternal: true },
            { label: "Feedback", href: "https://support.discord.com/hc/en-us/community/topics", isExternal: true },
        ],
    },
    {
        title: "Policies",
        links: [
            { label: "Terms", href: "/terms" },
            { label: "Privacy", href: "/privacy" },
            { label: "Cookie Settings", href: "#", isExternal: false },
            { label: "Guidelines", href: "/guidelines" },
            { label: "Acknowledgements", href: "/acknowledgements" },
            { label: "Licenses", href: "/licenses" },
            { label: "Company Information", href: "/company-information" },
        ],
    },
]
