"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Check, Plus, X } from "lucide-react"
import sanitizeHtml from "sanitize-html"
import { cn } from "@/lib/utils"
import { placeholderImageUrl } from "@/data/globalData"
import { nitroBannerList, nitroFAQCategoryList, nitroFAQList, nitroMainPerkList, nitroPlanFeatureList, nitroPlanList, nitroSubPerkList } from "@/data/nitroPageData"
import { PageLayout } from "@/components/main/page-layout"
import CustomVideo from "@/components/main/custom-video"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const NitroPage = () => {
    const { theme } = useTheme()
    const [isSubPerkListExpanded, setIsSubPerkListExpanded] = useState(false)
    const subPerkListRef = useRef<HTMLDivElement>(null)

    const setPerkListDivHeight = () => {
        if (subPerkListRef.current) {
            document.documentElement.style.setProperty("--expand-height", `${subPerkListRef.current.scrollHeight}px`)
        }
    }

    useEffect(() => {
        const appLogoImage = document.querySelector(".appLogoImageDiv")
        const authButton = document.querySelector(".headerAuthButton")

        const changeLogoColor = () => {
            if (!appLogoImage || !authButton) return

            if (theme === "light") {
                appLogoImage.classList.add("invert")
                authButton.classList.add("invert")
            } else {
                appLogoImage.classList.remove("invert")
                authButton.classList.remove("invert")
            }
        }

        const handleScroll = () => {
            const nitroMainSectionElement = document.querySelector(".nitroMainSection")
            let scrollYPosition = 430
            if (nitroMainSectionElement) {
                scrollYPosition = (nitroMainSectionElement as HTMLElement)?.offsetTop - 75
            }

            if (window.innerWidth >= 1024 && window.scrollY > scrollYPosition) {
                changeLogoColor()
            } else {
                appLogoImage?.classList.remove("invert")
                authButton?.classList.remove("invert")
            }
        }

        const handleResize = () => {
            handleScroll()
            setIsSubPerkListExpanded(false)
        }

        setPerkListDivHeight()
        handleScroll()

        window.addEventListener("resize", handleResize)
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("scroll", handleScroll)
        }
    }, [theme])

    const toggleSubPerkList = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setPerkListDivHeight()
        setIsSubPerkListExpanded(!isSubPerkListExpanded)
    }

    return (
        <PageLayout>
            <section className="mt-[-82px] pt-[160px] sm:pt-[200px] lg:pt-0 pb-[1000px] sm:pb-[1049px] md:pb-[1060px] lg:pb-0 w-full h-auto lg:h-[740px] 3xl:h-[38vw] relative flex flex-col justify-center items-center bg-nitro-bg-image [background-position:0_0,50%] bg-cover bg-no-repeat overflow-hidden">
                <div className="mx-auto mt-[60px] md:mt-[70px] lg:mt-[80px] w-[90%] max-w-[1120px] h-auto relative flex flex-col lg:flex-row justify-start items-center self-start overflow-visible">
                    <div className="w-full sm:w-[unset] max-w-[350px] sm:max-w-[420px] relative flex flex-col justify-start lg:justify-center items-center lg:items-start self-center text-center z-[9]">
                        <h1 className="mb-6 font-abcgintonordextrabold font-bold text-app-white text-[32px] sm:text-[36px] md:text-[50px] leading-[.9] sm:leading-[.96] text-center lg:text-left normal-case">Unlock a World of Perks with Nitro</h1>
                        <div className="mb-4 pr-0 md:pr-6 text-app-white font-ggsans text-[16px] sm:text-[20px] leading-6 sm:leading-7 no-underline text-center lg:text-left">
                            Subscribe to Nitro to upgrade your emoji, personalise your profile, share bigger files and so much more.
                        </div>
                        <Image
                            src={"/images/nitro/nitro_wumpus.webp"}
                            alt={""}
                            width={320}
                            height={264}
                            sizes={"(max-width: 479px) 100vw, 320px"}
                            loading="lazy"
                            className="max-w-[400px] lg:max-w-[unset] absolute lg:[position:unset] inset-[auto_auto_-246px] block lg:hidden order-1 lg:order-[unset]"
                        />
                    </div>
                </div>
                <div className="w-full h-full absolute overflow-hidden">
                    <CustomVideo
                        backgroundImage="/images/nitro/nitro_wumpus.webp"
                        sources={[
                            {
                                src: "/video/nitro/nitro_wumpus.mp4",
                                type: "video/mp4",
                            },
                            {
                                src: "/video/nitro/nitro_wumpus.webm",
                                type: "video/webm",
                            },
                        ]}
                        divClassName="w-full 3xl:w-[90%] absolute top-[-4%] xl:top-[-7%] 2xl:top-[-15%] 3xl:top-[-4vw] left-[-25%] 2xl:left-[-9%] 3xl:left-[0%] hidden lg:block"
                        className="lg:w-[140%] 2xl:w-[122%] 3xl:w-[112%] max-w-[unset] inline-block bg-[68%] lg:[background-position:71%_40%,0_0] 2xl:[background-position:72%_50%,0_0] lg:bg-31p 2xl:bg-33p bg-no-repeat"
                        width="112%"
                        height="120%"
                    />
                </div>
            </section>
            <section className="nitroMainSection mt-20 sm:mt-0 pt-[30px] sm:pt-[100px] pb-[60px] sm:pb-20 lg:pb-5 relative overflow-visible">
                <div className="mx-auto w-[90%] max-w-[1180px] relative font-ggsans xl:text-left z-10">
                    <div className="max-auto mt-[-810px] sm:mt-[-850px] md:mt-[-860px] lg:mt-[-230px] mb-20 3xl:mb-[90px] w-full relative flex flex-col lg:flex-row flex-wrap lg:flex-nowrap justify-between items-stretch gap-4 md:gap-0 no-underline">
                        {nitroBannerList?.map((item, index) => (
                            <div key={index} className={cn(
                                "md:mb-4 lg:mb-0 p-6 px-5 sm:px-6 w-full max-w-none lg:max-w-[49%] min-h-[360px] lg:min-h-[unset] flex flex-col justify-start items-start bg-app-white bg-[linear-gradient(225deg,#007cc2_20%,#5865f2)] rounded-2xl",
                                item?.className
                            )}>
                                <Image
                                    src={item?.image || placeholderImageUrl}
                                    alt={""}
                                    width={196}
                                    height={24}
                                    loading="lazy"
                                    className={cn(
                                        "mb-6 w-auto h-6 inline-block select-none",
                                        item?.imageClassName
                                    )}
                                />
                                {item?.featureList?.map((subItem, subIndex) => (
                                    <div key={subIndex} className="mb-4 relative flex flex-row flex-wrap justify-start sm:justify-center items-center lg:items-start">
                                        <Image
                                            src={subItem.image || placeholderImageUrl}
                                            alt={""}
                                            width={20}
                                            height={20}
                                            loading="lazy"
                                            className="mt-1 mr-2.5 max-w-5 inline-block select-none"
                                        />
                                        <div className="pr-6 text-app-white font-ggsans text-[16px] md:text-[20px] leading-6 md:leading-7 no-underline text-left">
                                            {subItem.label}
                                        </div>
                                    </div>
                                ))}
                                {item?.buttonText && item?.buttonHref && (
                                    <Link
                                        href={item.buttonHref}
                                        className="mt-auto mr-0 ml-auto lg:ml-0 p-[14px_16px] w-full relative inline-block bg-app-white hover:bg-app-white text-app-black hover:text-app-button-hover font-ggsans font-bold text-[20px] leading-6 no-underline text-center border-none rounded-[40px] hover:shadow-[0_8px_15px_#0003] transition-all duration-200 z-[1]"
                                    >{item.buttonText}</Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mx-auto w-[90%] max-w-[1180px] relative font-ggsans xl:text-left z-10">
                    <h2 className="text-app-black dark:text-app-white font-abcgintonormalbold font-normal text-[32px] md:text-[48px] leading-[42px] sm:leading-[140%] md:leading-[56px] lg:leading-[58px] text-center"><strong>Popular </strong>Nitro Perks</h2>
                    <div className="mx-auto mt-[30px] lg:mt-[60px] mb-0 max-w-[1180px] grid grid-cols-[1fr] lg:grid-cols-[1fr_1fr] grid-rows-[auto_auto] auto-cols-[1fr] gap-5">
                        {nitroMainPerkList?.map((item, index) => (
                            <div key={index} className="p-6 lg:p-10 max-w-none min-h-[300px] lg:min-h-[unset] h-auto lg:h-full flex flex-col justify-center items-center col-span-1 row-span-1 gap-x-3 gap-y-4 md:gap-y-8 bg-app-off-white rounded-lg transition-all duration-200 transition-none">
                                <div className={cn(
                                    "mx-auto max-w-[380px] text-app-not-quite-black font-abcgintonormalbold font-bold text-[20px] md:text-[24px] leading-8 text-center",
                                    item?.titleClassName
                                )}>
                                    {item.title}
                                </div>
                                {item?.image?.url && (
                                    <Image
                                        src={item.image.url || placeholderImageUrl}
                                        alt={item.image?.alt || ""}
                                        fill
                                        loading="lazy"
                                        className="max-w-[400px] max-h-[200px] !relative inline-block select-none"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div
                        ref={subPerkListRef}
                        className={cn(
                            "-mx-4 sm:-mx-5 py-5 px-4 sm:px-5 grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr] grid-rows-[auto] auto-cols-[1fr] gap-5 overflow-hidden h-0 opacity-0",
                            isSubPerkListExpanded ? "animate-expand-down" : "animate-expand-up"
                        )}
                    >
                        {nitroSubPerkList?.map((item, index) => (
                            <div
                                key={index}
                                className="p-6 lg:p-[40px_24px] max-w-none min-h-[300px] lg:min-h-[unset] h-auto lg:h-full flex flex-col justify-center sm:justify-start items-center col-span-1 row-span-1 gap-x-3 gap-y-4 bg-app-off-white rounded-lg transition-all duration-200"
                            >
                                <div className="min-h-[110px] md:min-h-[134px] md:h-[140px] inline-grid items-center">
                                    {item?.image?.url && (
                                        <Image
                                            src={item.image.url || placeholderImageUrl}
                                            alt={item.image?.alt || ""}
                                            width={222}
                                            height={134}
                                            loading="lazy"
                                            className="w-auto h-auto select-none"
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col items-center gap-y-2">
                                    <div className="min-h-5 text-app-not-quite-black font-abcgintonormalbold font-normal text-[20px] leading-[30px] md:leading-6 text-center">
                                        {item.title}
                                    </div>
                                    <div className="pl-[9px] max-w-[230px] text-[#4f5660] font-ggsans text-[14px] leading-5 text-center">
                                        {item?.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="min-h-[52px] relative flex flex-col justify-center items-center z-[1]">
                        <Link
                            href={"#"}
                            onClick={toggleSubPerkList}
                            className="p-[12px_32px_15px] py-3.5 w-full sm:w-[unset] absolute flex justify-center items-center bg-app-not-quite-black hover:bg-app-dark-button-hover dark:bg-plum-4 dark:hover:bg-plum-2 text-app-white dark:text-app-black font-ggsans font-bold text-[20px] sm:text-[16px] leading-6 no-underline text-center border-none rounded-[94px] sm:rounded-[28px] hover:shadow-[0_2px_9px_#060a0b6b] dark:hover:shadow-[0_2px_9px_#d9dada6b] transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
                        >
                            {isSubPerkListExpanded ? "Show less perks" : "Show all perks"}
                        </Link>
                    </div>
                    <div className="m-[50px_-16px] sm:m-[80px_-30px] lg:m-[100px_auto_120px] p-[40px_24px_80px] lg:p-[70px_80px_100px_100px] pb-[60px] sm:pb-20 max-w-[1180px] bg-app-off-white rounded-lg shadow-[-20px_0_var(--app-off-white),20px_0_var(--app-off-white)] lg:shadow-none">
                        <h2 className="mx-auto mb-12 lg:mb-20 max-w-[580px] text-app-not-quite-black font-abcgintonormalbold font-normal text-[32px] md:text-[48px] leading-[42px] sm:leading-[140%] md:leading-[56px] lg:leading-[58px] text-center">Pick the plan that works best for you</h2>
                        <div className="w-full h-[108%] sm:h-[80%] lg:h-[unset] relative">
                            <div className="pb-4 grid grid-rows-[auto] grid-cols-[2fr_1fr_1fr] md:grid-cols-[1.5fr_minmax(200px,200px)_minmax(186px,186px)] auto-cols-[1fr] gap-x-4 lg:gap-x-0 gap-y-0 border-b-[1px] border-solid border-[#c7ccd1]">
                                <div className="max-w-[170px] hidden md:block row-span-1 col-span-1 text-app-not-quite-black font-abcgintonormalbold font-bold text-[20px] leading-[140%] opacity-100">Features</div>
                                {nitroPlanList?.map((item, index) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            "mx-auto pt-2.5 min-h-[auto] lg:min-h-[52px] flex md:row-span-1 md:col-span-1 row-start-1 col-start-2 row-end-2 col-end-3 flex-col justify-center items-center select-none z-[1]",
                                            item?.divClassName,
                                        )}
                                    >
                                        {item?.images && item?.images?.length > 0 ? (
                                            item.images.map((imageItem, imageIndex) => (
                                                <Image
                                                    key={imageIndex}
                                                    src={imageItem?.src || placeholderImageUrl}
                                                    alt={imageItem?.alt || ""}
                                                    width={imageItem?.width || 0}
                                                    height={imageItem?.height || 0}
                                                    loading="lazy"
                                                    className={imageItem?.className}
                                                />
                                            ))
                                        ) : (
                                            <div className="max-w-[170px] hidden md:block row-span-1 col-span-1 font-abcgintonormalbold font-bold text-[20px] leading-[140%] opacity-100">{item.name}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {nitroPlanFeatureList?.map((item, index) => (
                                <div key={index} className="py-2.5 sm:py-0 min-h-[68px] grid grid-cols-[2fr_1fr_1fr] md:grid-cols-[1.5fr_minmax(180px,180px)_minmax(186px,186px)] grid-rows-[auto] auto-cols-[1fr] grid-flow-row gap-x-2.5 sm:gap-x-[30px] gap-y-0 border-b-[1px] border-solid border-[#c7ccd1]">
                                    <div className="relative flex row-span-1 col-span-1 items-center text-[#060607] md:text-[#2e3338] font-ggsans font-normal text-[16px] md:text-[14px] lg:text-[18px] leading-5 md:leading-6 cursor-pointer lg:cursor-default">
                                        {item?.name}
                                    </div>
                                    {nitroPlanList?.map((planItem, planItemIndex) => {
                                        switch (item?.planValues?.[planItem.id]) {
                                            case true: {
                                                return (
                                                    <div key={planItemIndex} className="min-h-[52px] relative flex row-span-1 col-span-1 flex-col justify-center items-center z-[1]">
                                                        <Check className="max-w-[21px] sm:max-w-full sm:size-[36px] inline-block text-app-not-quite-black" />
                                                    </div>
                                                )
                                            }
                                            case false: {
                                                return (
                                                    <div key={planItemIndex} className="min-h-[52px] relative flex row-span-1 col-span-1 flex-col justify-center items-center z-[1]">
                                                        <X className="max-w-[21px] sm:max-w-full sm:size-[36px] inline-block text-app-text-muted" />
                                                    </div>
                                                )
                                            }
                                            default: {
                                                if (item?.planValues?.[planItem.id]) {
                                                    return (
                                                        <div key={planItemIndex} className="mx-auto pt-2.5 min-h-[auto] md:min-h-[52px] relative flex row-span-1 col-span-1 flex-col justify-center items-center z-[1]">
                                                            <div className="mt-2 mb-[18px] text-[#060607] font-normal md:font-bold text-[14px] sm:text-[16px] leading-5 md:leading-[26px] text-center md:text-left">
                                                                {item?.planValues?.[planItem.id] as string}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                return (
                                                    <div key={planItemIndex} className="min-h-[52px] relative flex row-span-1 col-span-1 flex-col justify-center items-center z-[1]">
                                                        <X className="max-w-[21px] sm:max-w-full sm:size-[36px] inline-block text-app-text-muted" />
                                                    </div>
                                                )
                                            }
                                        }
                                    })}
                                </div>
                            ))}
                            <div className="pt-6 pb-2.5 sm:pb-0 min-h-[68px] relative top-[30px] md:top-0 grid grid-rows-[auto] grid-cols-[.5fr_1fr] md:grid-cols-[1.5fr_minmax(180px,180px)_minmax(186px,186px)] lg:grid-cols-[2fr_minmax(180px,180px)_minmax(180px,180px)] auto-cols-[1fr] grid-flow-row items-start gap-x-2.5 sm:gap-x-[30px] gap-y-6 md:gap-y-0">
                                {nitroPlanList?.map((item, index) => (
                                    <Fragment key={index}>
                                        <Image
                                            src={item?.images?.[0]?.src || placeholderImageUrl}
                                            alt={item?.images?.[0]?.alt || ""}
                                            width={item?.images?.[0]?.width || 0}
                                            height={item?.images?.[0]?.height || 0}
                                            loading="lazy"
                                            className="max-w-none block md:hidden row-span-1 col-span-1 select-none"
                                        />
                                        <div className={item?.button?.className}>
                                            <Link
                                                href={item?.button?.url || "#"}
                                                className="mr-0 mb-auto ml-auto lg:ml-0 p-[7px_16px] w-full inline-block flex-[none] bg-app-blurple hover:bg-app-blurple-hover text-app-white font-bold text-[14px] leading-6 no-underline text-center rounded-[40px] transition-all duration-200 hover:shadow-[0_8px_15px_#0003]"
                                            >{item?.button?.text}</Link>
                                        </div>
                                    </Fragment>
                                ))}
                            </div>
                            {nitroPlanList?.filter(item => item.highlight)?.map((item, index) => (
                                <div key={index} className={cn(
                                    "mt-[-3%] -mr-3 lg:-mr-4 w-[25vw] md:w-[30vw] lg:w-full max-w-[210px] h-[90%] md:h-[103%] lg:h-[104%] absolute inset-[0%_0%_0%_auto] flex flex-col justify-start items-start border-2 border-solid border-[#b845c1] rounded-2xl select-none z-0",
                                    item?.highlight?.className
                                )}>
                                    {item?.highlight?.image && (
                                        <Image
                                            src={item.highlight.image?.src || placeholderImageUrl}
                                            alt={item.highlight.image?.alt || ""}
                                            width={item.highlight.image?.width || 0}
                                            height={item.highlight.image?.height || 0}
                                            loading="lazy"
                                            className={cn(
                                                "mx-auto mt-[-13px] md:absolute inset-[0%_0%_auto] hidden md:inline-block",
                                                item?.highlight?.image?.className
                                            )}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <h2 id="faq" className="text-app-black dark:text-app-white font-abcgintonormalbold font-normal text-[32px] md:text-[48px] leading-[42px] sm:leading-[140%] md:leading-[56px] lg:leading-[58px] text-center">Frequently Asked Questions</h2>
                    <Tabs defaultValue="gifting_and_promotions" className="mt-4 md:mt-10 relative">
                        <TabsList className="mb-8 p-0 h-auto relative flex flex-wrap justify-center items-center bg-transparent">
                            {nitroFAQCategoryList?.map((item, index) => (
                                <TabsTrigger
                                    key={index + "-category-" + item?.id}
                                    value={item.value}
                                    className={cn(
                                        "mx-4 py-[9px] px-0 max-w-full relative block sm:inline-block bg-[#ddd0] text-[#72767d] dark:text-app-off-white font-ggsans font-normal text-[16px] text-left no-underline align-top focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-offset-0 focus-visible:!shadow-none data-[state=active]:bg-[#ddd0] data-[state=active]:!text-app-blurple data-[state=active]:font-semibold data-[state=active]:border-b-[1.5px] data-[state=active]:border-app-blurple data-[state=active]:rounded-b-none data-[state=active]:shadow-none duration-75",
                                        item?.className
                                    )}
                                >{item.title}</TabsTrigger>
                            ))}
                        </TabsList>
                        <div className="h-full min-h-[auto] lg:min-h-[550px] lg:h-[575px] relative block overflow-hidden">
                            {nitroFAQCategoryList?.map((item, index) => (
                                <TabsContent
                                    key={index + "-category-content-" + item?.id}
                                    value={item.value}
                                    className="mt-0 relative dark:text-app-white data-[state=inactive]:animate-opacity-out data-[state=active]:animate-opacity-in"
                                >
                                    <Accordion type="single" collapsible>
                                        {nitroFAQList?.map((subItem, subIndex) => {
                                            if (item.id === subItem.categoryId) {
                                                return (
                                                    <AccordionItem
                                                        key={"category-question-" + subIndex}
                                                        value={"category-" + subItem.categoryId + "-question-" + subIndex}
                                                        className={cn(
                                                            "mx-auto mb-1.5 sm:mb-4 w-full relative inline-block bg-app-off-white data-[state=open]:bg-app-blurple text-center border-b-0 rounded-lg z-[1]",
                                                            subItem?.className
                                                        )}
                                                    >
                                                        <AccordionTrigger
                                                            hideIcon={true}
                                                            className="group mx-auto p-[24px_60px_24px_24px] data-[state=open]:pb-3 w-full relative flex justify-between items-center text-[#1b1c23] data-[state=open]:text-app-white font-ggsans font-semibold text-[20px] leading-8 !no-underline text-left align-top whitespace-pre-wrap select-none"
                                                        >{subItem.question}<Plus width={24} height={24} className="absolute inset-[auto_24px_auto_auto] inline-block transform-3d transition-all duration-300 group-data-[state=open]:rotate-45" /></AccordionTrigger>
                                                        <AccordionContent className="py-0 px-6 min-w-full static block bg-[#ddd0]">
                                                            <div
                                                                className="mb-6 pr-10 text-app-white font-ggsans text-[16px] leading-6 no-underline text-left"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: sanitizeHtml(subItem.answer, {
                                                                        allowedTags: ['a', 'span'],
                                                                        allowedAttributes: {
                                                                            a: ['href', 'tabindex', 'class'],
                                                                            span: ['class'],
                                                                        },
                                                                        allowedClasses: {
                                                                            a: ['link-16px', 'link-407'],
                                                                            span: ['text-span'],
                                                                        },
                                                                        allowedSchemes: ['http', 'https'],
                                                                        allowedSchemesByTag: {
                                                                            a: ['http', 'https'],
                                                                        },
                                                                    })
                                                                }}
                                                            ></div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                )
                                            }
                                        })}
                                    </Accordion>
                                </TabsContent>
                            ))}
                        </div>
                    </Tabs>
                </div>
                <Image
                    src={"/images/nitro/Group_482477.svg"}
                    alt={""}
                    width={59}
                    height={74}
                    loading="lazy"
                    className="xl:max-w-[45px] 2xl:max-w-none absolute inset-[auto_auto_170px_-27px] xl:left-[5px] 2xl:left-[2vw] hidden lg:inline-block select-none"
                />
                <Image
                    src={"/images/nitro/Group_482467.svg"}
                    alt={""}
                    width={205}
                    height={317}
                    loading="lazy"
                    className="absolute inset-[auto_0%_519px_auto] hidden lg:inline-block select-none"
                />
            </section >
            <section className="py-20 md:py-[92px] min-h-[auto] lg:min-h-[406px] relative flex bg-nitro-banner-bg-image lg:bg-[linear-gradient(135deg,#8547c6_10%,#b845c1_50%,#ab5d8a)] [background-position:50%_5%,0_0] lg:[background-position:unset] bg-90p-auto lg:[background-size:unset] [background-repeat:no-repeat,repeat] lg:[background-repeat:unset] overflow-hidden">
                <div className="mx-auto w-[90%] max-w-[612px] relative flex flex-col justify-center items-center font-ggsans xl:text-left z-10">
                    <h2 className="mb-6 md:mb-8 text-app-white font-abcgintonormalbold font-normal text-[24px] sm:text-[32px] md:text-[42px] leading-8 sm:leading-10 md:leading-[50px] text-center">Unleash the fun with Nitro</h2>
                    <div className="w-full relative flex flex-col sm:flex-row flex-wrap justify-center items-stretch sm:items-center no-underline">
                        <Link
                            href={"/settings/premium"}
                            className="m-0 p-[16px_32px] w-full sm:w-[unset] min-w-[193px] max-w-full max-h-14 flex justify-center items-center gap-2 bg-app-white hover:bg-app-white text-app-black hover:text-app-button-hover font-medium text-[20px] leading-6 no-underline rounded-[28px] hover:shadow-[0_8px_15px_#0003] transition-all duration-200"
                        >Subscribe</Link>
                    </div>
                </div>
                <Image
                    src={"/images/nitro/Nitro-unleash.svg"}
                    alt={""}
                    width={324}
                    height={406}
                    loading="lazy"
                    className="my-auto max-w-[25%] absolute inset-[0%_auto_0%_0%] hidden lg:inline-block select-none"
                />
                <Image
                    src={"/images/nitro/Nitro-bg.svg"}
                    alt={""}
                    width={257}
                    height={406}
                    loading="lazy"
                    className="my-auto max-w-[22%] absolute inset-[0%_0%_0%_auto] hidden lg:inline-block select-none"
                />
            </section>
        </PageLayout >
    )
}

export default NitroPage