import { nitroBannerType, nitroFAQCategoryType, nitroFAQType, nitroPlanFeatureProps, nitroPerkType, nitroPlanProps, NavigationMenuItemProps } from "@/types"

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

export const nitroBannerList: nitroBannerType[] = [
    {
        image: "/images/nitro/Nitro_Basic_full_logo_horizontal_black_RGB_1_(1).svg",
        buttonText: "Subscribe",
        buttonHref: "/settings/premium",
        featureList: [
            { image: "/icons/Vector_(14).svg", label: "50MB uploads" },
            { image: "/icons/Vector_(15).svg", label: "Custom emoji anywhere" },
            { image: "/icons/super-reaction-white.svg", label: "Unlimited Super Reactions" },
            { image: "/icons/Vector_(16).svg", label: "Special Nitro badge on your profile" },
        ]
    },
    {
        image: "/images/nitro/Stacked.svg",
        imageClassName: "mb-7",
        buttonText: "Subscribe",
        buttonHref: "/settings/premium",
        className: "relative bg-[linear-gradient(135deg,#8547c6_25%,#b845c1_62%,#ab5d8a_95%)]",
        featureList: [
            { image: "/icons/Vector_(14).svg", label: "500MB uploads" },
            { image: "/icons/Vector_(15).svg", label: "Custom emoji anywhere" },
            { image: "/icons/super-reaction-white.svg", label: "Unlimited Super Reactions" },
            { image: "/icons/Stream_Quality_white.svg", label: "HD video streaming" },
            { image: "/icons/Large.svg", label: "2 Server Boosts" },
            { image: "/icons/Filled_Icons.svg", label: "Custom profiles and more!" },
        ]
    },
]

export const nitroMainPerkList: nitroPerkType[] = [
    { image: { url: "/images/nitro/Clips_to_pics.svg", alt: "From clips to pics, share away with bigger file uploads" }, title: "From clips to pics, share away with bigger file uploads" },
    { image: { url: "/images/nitro/Stream_apps.svg", alt: "Stream apps and games in sweet, sweet HD" }, title: "Stream apps and games in sweet, sweet HD" },
    { image: { url: "/images/nitro/Project-Speedy-Emoji-Static.svg", alt: "Hype and meme with custom emoji anywhere" }, title: "Hype and meme with custom emoji anywhere" },
    { image: { url: "/images/nitro/Frame_881.svg" }, title: "Unlock perks for your communities with 2 Server Boosts", titleClassName: "max-w-[405px]" },
]

export const nitroSubPerkList: nitroPerkType[] = [
    { image: { url: "/images/nitro/PM_NitroAprilDrop_PerkCard_Illustration_1.svg" }, title: "Color Themes", description: "Add your vibe to Discord with unique theme colors." },
    { image: { url: "/images/nitro/Nitro-Shop-Perk-Card-Asset.svg" }, title: "Special Shop Perks", description: "Enjoy member pricing plus Nitro exclusive items in the Shop." },
    { image: { url: "/images/nitro/Group_239.svg" }, title: "Custom Per-Server Profiles", description: "Use a different avatar, per-server profile theme, banner, and bio in each of your servers." },
    { image: { url: "/images/nitro/Illustration.svg" }, title: "Custom Sounds Everywhere", description: "Use custom sounds and personalized entrance sounds across voice channels." },
    { image: { url: "/images/nitro/Group.svg" }, title: "Unlimited Super Reactions", description: "Hype up the chat with action-packed, animated reactions." },
    { image: { url: "/images/nitro/More_Backgrounds.svg" }, title: "More Backgrounds", description: "Customize video calls with your own video backgrounds." },
]

export const nitroPlanList: nitroPlanProps[] = [
    {
        id: "basic",
        name: "Basic",
        images: [
            { src: "/images/nitro/Layer_1.svg", width: 104, height: 39, className: "hidden md:inline-block" },
            { src: "/images/nitro/Basic.svg", width: 53, height: 13, className: "max-w-[51px] block md:hidden" },
        ],
        button: { url: "/app", text: "Subscribe Basic", className: "min-h-[52px] relative flex row-start-1 row-end-2 col-start-2 col-end-3 flex-col justify-center items-center z-[1]" },
    },
    {
        id: "nitro",
        name: "Nitro",
        images: [
            { src: "/images/nitro/Centered.svg", width: 100, height: 24, className: "max-w-[51px] md:max-w-none relative inline-block" }
        ],
        button: { url: "/app", text: "Subscribe Nitro", className: "min-h-[52px] relative flex row-span-1 col-span-1 md:row-start-1 md:row-end-2 md:col-start-3 md:col-end-4 flex-col justify-center items-center z-[1]" },
        divClassName: "row-start-1 row-end-2 col-start-3 col-end-4",
        highlight: { image: { src: "/images/nitro/Tag.svg", width: 112, height: 25 } },
    },
]

export const nitroPlanFeatureList: nitroPlanFeatureProps[] = [
    {
        id: "super-reactions",
        name: "Unlimited Super Reactions",
        planValues: {
            basic: true,
            nitro: true,
        },
    },
    {
        id: "custom-emoji",
        name: "Custom emoji anywhere and make them animated",
        planValues: {
            basic: true,
            nitro: true,
        },
    },
    {
        id: "custom-stickers",
        name: "Custom stickers anywhere",
        planValues: {
            basic: true,
            nitro: true,
        },
    },
    {
        id: "custom-app-icons",
        name: "Custom App Icons",
        planValues: {
            basic: true,
            nitro: true,
        },
    },
    {
        id: "file-sharing",
        name: "Bigger file sharing",
        planValues: {
            basic: "50MB",
            nitro: "500MB",
        },
    },
    {
        id: "hd-streaming",
        name: "HD streaming",
        planValues: {
            basic: false,
            nitro: "Up to 4K and 60fps",
        },
    },
    {
        id: "boosts",
        name: "2 Free Boosts + 30% off extra Boosts",
        planValues: {
            basic: false,
            nitro: true,
        },
    },
    {
        id: "animated-avatar",
        name: "Animated avatar, banner, and profile theme",
        planValues: {
            basic: false,
            nitro: true,
        },
    },
    {
        id: "clips",
        name: "Early access to Clips",
        planValues: {
            basic: false,
            nitro: true,
        },
    },
    {
        id: "custom-profiles",
        name: "Custom per-server profiles",
        planValues: {
            basic: false,
            nitro: true,
        },
    },
    {
        id: "nitro-badge",
        name: "Nitro badge on your profile",
        planValues: {
            basic: true,
            nitro: true,
        },
    },
    {
        id: "video-backgrounds",
        name: "Custom video backgrounds",
        planValues: {
            basic: true,
            nitro: true,
        },
    },
    {
        id: "servers",
        name: "Join up to 200 servers",
        planValues: {
            basic: false,
            nitro: true,
        },
    },
    {
        id: "longer-messages",
        name: "Longer messages up to 4,000 characters",
        planValues: {
            basic: false,
            nitro: true,
        },
    },
    {
        id: "theme-colors",
        name: "Colors for your Discord Theme",
        planValues: {
            basic: false,
            nitro: true,
        },
    },
    {
        id: "custom-sounds",
        name: "Custom sounds anywhere",
        planValues: {
            basic: false,
            nitro: true,
        },
    },
    {
        id: "entrance-sounds",
        name: "Personalized entrance sounds",
        planValues: {
            basic: false,
            nitro: true,
        },
    },
    {
        id: "shop-pricing",
        name: "Shop member pricing and exclusive items",
        planValues: {
            basic: false,
            nitro: true,
        },
    },
    {
        id: "friend-passes",
        name: "3 Nitro friend passes",
        planValues: {
            basic: false,
            nitro: true,
        },
    },
    {
        id: "avatar-decorations",
        name: "Keep Quest avatar decorations rewards longer",
        planValues: {
            basic: false,
            nitro: true,
        },
    },
]

export const nitroFAQCategoryList: nitroFAQCategoryType[] = [
    { id: 1, title: "General", value: "general" },
    { id: 2, title: "Payments", value: "payments" },
    { id: 3, title: "Gifting and Promotions", value: "gifting_and_promotions" },
    { id: 4, title: "Other", value: "other" },
]

export const nitroFAQList: nitroFAQType[] = [
    { categoryId: 1, question: "What’s Nitro?", answer: "Nitro is a subscription service that unlocks features and perks across Discord, giving you more ways to have fun and express yourself." },
    { categoryId: 1, question: "How does Nitro work?", answer: "When you subscribe to Nitro, you get access to features that were previously locked for you - like using custom emoji anywhere, uploading bigger files, setting a custom video background, and more. When the subscription ends, you’ll lose access to the perks." },
    { categoryId: 1, question: "What’s the difference between Nitro and Nitro Basic?", answer: "Nitro is our most popular plan that unlocks access to all available Nitro perks, and Nitro Basic includes a selection of the most-loved Nitro perks that help you better express yourself. See the comparison chart above for a full breakdown!" },
    { categoryId: 1, question: "How much does Nitro cost?", answer: "Cost varies depending on your country and plan. You can check Nitro prices under User Settings &gt; Nitro in either the desktop or mobile apps." },
    { categoryId: 1, question: "Where can I buy Nitro?", answer: "You can purchase Nitro by visiting the Nitro tab in User Settings, or in the Nitro page under Home on desktop. On mobile, visit User Settings by tapping your user icon in the bottom bar, then select Get Nitro." },
    { categoryId: 2, question: "What payment methods do you accept?", answer: "We accept a variety of payment methods, which you can learn more info on <a href=\"https://support.discord.com/hc/articles/360017693772\" class=\"link-16px\" tabindex=\"0\">here</a>!" },
    { categoryId: 2, question: "Do you offer Nitro and Nitro Basic in localized pricing?", answer: "We are constantly working to expand the availability of localized pricing for Nitro and Nitro Basic. Check <a href=\"https://support.discord.com/hc/articles/4407269525911\" class=\"link-16px\" tabindex=\"0\">this article</a> for information on where localized pricing is currently available." },
    { categoryId: 3, question: "Are Nitro gifts real?", answer: "Yes! You can purchase a Nitro gift through the Nitro page on desktop or the Nitro Gifting tab within mobile under User Settings. Additionally, you can send a quick gift in a channel by selecting the gift icon on desktop or mobile. If someone sends you a gift, you can see what it looks like <a href=\"https://support.discord.com/hc/articles/360020877112\" class=\"link-16px\" tabindex=\"0\">here</a>.&nbsp;You can also buy Discord Nitro directly on Amazon.com (United States only)." },
    { categoryId: 3, question: "How can I buy a Discord Nitro gift card on Amazon.com?", answer: "Nitro gift cards on Amazon are a great way to gift Nitro to a friend, or have someone gift Nitro to you. Just click <a href=\"https://www.amazon.com/dp/B0CF4J58QK?maas=maas_adg_DE3B8B6262C4DC306922DC26C0CE6A2D_afap_abs&amp;ref_=aa_maas&amp;tag=maas&amp;th=1\" tabindex=\"0\"><span class=\"text-span\">this link</span></a> for a variety of Discord gift options, from 1 to 12-month Nitro subscriptions. Learn more about Discord gift cards on Amazon in this <a href=\"https://support.discord.com/hc/en-us/articles/360020877112\" class=\"link-407\" tabindex=\"0\">Help Center article</a>." },
    { categoryId: 3, question: "Where to redeem Nitro codes?", answer: "You can redeem your Nitro code on the desktop and web apps through the Gift Inventory page in User Settings." },
    { categoryId: 3, question: "Can I get free Nitro from a bot or a giveaway?", answer: "The only official way to receive Nitro is through a <a href=\"https://support.discord.com/hc/articles/360020877112\" class=\"link-16px\" tabindex=\"0\">gift</a> sent to you in chat, or by receiving a code that can be redeemed under Gift Inventory in User Settings on the desktop and web apps. We strongly encourage not clicking on any links from people you don’t know well. For more tips on staying safe on Discord, visit our <a href=\"https://discord.com/safetycenter\" class=\"link-16px\" tabindex=\"0\">Safety</a> page." },
    { categoryId: 3, question: "Does Discord offer Nitro Promotions?", answer: "We are always working on ways to give you more with Nitro! Keep an eye out in the app, on our <a href=\"https://twitter.com/discord\" class=\"link-16px\" tabindex=\"0\">Twitter</a> , <a href=\"https://www.instagram.com/discord\" class=\"link-16px\" tabindex=\"0\">Instagram</a>, or <a href=\"https://discord.com/blog\" class=\"link-16px\" tabindex=\"0\">blog</a> to see when new promotions go live. :)" },
    { categoryId: 4, question: "My Nitro subscription comes with Boosts. What are those?", answer: "Server Boosts are a way to show support for your favorite communities. Each Boost that you give to a server helps collectively unlock perks for everyone in the server to enjoy. Learn more about Server Boosting <a href=\"https://support.discord.com/hc/articles/360028038352\" class=\"link-16px\" tabindex=\"0\">here</a>!" },
    { categoryId: 4, question: "Are Boosts permanent?", answer: "A Nitro subscription only comes with 2 Boosts that you can share to any server you belong to. The Boosts do not stack over time, and they are not permanent. You’ll get to keep the Boosts for as long as your Nitro subscription is active." },
    { categoryId: 4, question: "Why is my Nitro not working?", answer: "If you’re having any trouble with your subscription, or have any questions, you can <a href=\"https://dis.gd/billing\" class=\"link-16px\" tabindex=\"0\">reach out</a> to our team and we’ll be happy to help!" },
]