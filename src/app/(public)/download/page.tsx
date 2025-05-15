"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Download } from "lucide-react"
import { createDownloadCoinImageAnimation, createDownloadRadishImageAnimation, createDownloadTrophyImageAnimation } from "@/lib/animations"
import { useMedia } from "@/context/media-query-context"
import { PageLayout } from "@/components/main/page-layout"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const DownloadPage = () => {
    const downloadCoinImageRef = useRef<HTMLImageElement>(null)
    const downloadRadishImageRef = useRef<HTMLImageElement>(null)
    const downloadTrophyImageRef = useRef<HTMLImageElement>(null)

    const { isDesktop } = useMedia()

    useEffect(() => {
        if (!isDesktop) return

        const downloadCoinImageAnimation: ReturnType<typeof createDownloadCoinImageAnimation> | null = downloadCoinImageRef?.current ? createDownloadCoinImageAnimation(downloadCoinImageRef.current) : null
        const downloadRadishImageAnimation: ReturnType<typeof createDownloadRadishImageAnimation> | null = downloadRadishImageRef?.current ? createDownloadRadishImageAnimation(downloadRadishImageRef.current) : null
        const downloadTrophyImageAnimation: ReturnType<typeof createDownloadTrophyImageAnimation> | null = downloadTrophyImageRef?.current ? createDownloadTrophyImageAnimation(downloadTrophyImageRef.current) : null

        return () => {
            if (downloadCoinImageAnimation) downloadCoinImageAnimation.kill()
            if (downloadRadishImageAnimation) downloadRadishImageAnimation.kill()
            if (downloadTrophyImageAnimation) downloadTrophyImageAnimation.kill()
        }
    }, [isDesktop])

    return (
        <PageLayout className="download">
            <section className="pt-36 md:pt-48 xl:pt-60 flex justify-center items-start bg-download-bg-image bg-[50%_0] bg-auto-100p md:bg-auto-90p lg:bg-cover bg-no-repeat text-center">
                <div className="m-0 px-6 md:px-10 w-full 3xl:w-[unset] max-w-[1540px] 2xl:relative">
                    <Image
                        ref={downloadCoinImageRef}
                        src={"/images/download/download_Coin.webp"}
                        alt={""}
                        width={190}
                        height={190}
                        loading="lazy"
                        className="w-24 md:w-[152px] 2xl:w-[200px] 3xl:w-[190px] hidden sm:inline-block absolute top-auto md:top-[86px] xl:top-[91px] 3xl:top-[-89px] left-[-35px] sm:left-[-37px] md:left-[-51px] 3xl:left-[-199px] bottom-[333px] sm:bottom-[299px] select-none"
                    />
                    <div className="mt-0 sticky top-0 flex flex-col flex-nowrap justify-start items-center">
                        <div className="max-w-[920px] xl:max-w-[1220px]">
                            <h1 className="heading--h1--download is-capitalize new">Download Discord wherever you hang out</h1>
                        </div>
                        <div className="mx-auto mb-10 xl:mb-12 relative max-w-[580px] xl:max-w-[940px]">
                            <p className="body-text--xll new">Talk, play, and hang out with friends around the world over voice, video, or text. Available on Windows, macOS, Linux, iOS, Android, and consoles. </p>
                        </div>
                        <div className="p-0.5 relative flex justify-center items-center bg-[#5865f200] text-app-white font-abcgintonormal font-medium text-[.875rem] md:text-[1rem] leading-[1.3] rounded-xl transition-colors duration-400 text-center whitespace-nowrap sm:whitespace-[unset] overflow-hidden">
                            <Link
                                href={"/api/downloads/distributions/app/installers/latest?channel=stable&platform=win&arch=x64"}
                                className="button-with-after-effect p-[.875rem_1.5rem] pt-[.9375rem] h-12 relative flex justify-center items-center bg-app-blurple text-app-white font-abcgintonormal font-medium text-[.875rem] md:text-[1rem] leading-[1.3] rounded-xl transition-colors xl:transition-all duration-400 xl:duration-300  text-center whitespace-nowrap sm:whitespace-[unset] z-[2]"
                            >
                                <div className="mr-[7px] md:mr-[8.5px] 2xl:mr-[13.5px] size-[18px] md:size-5 block text-base leading-5 whitespace-normal">
                                    <Download width={20} height={20} />
                                </div>
                                <div className="relative z-[3]">Download for Windows</div>
                            </Link>
                        </div>
                        <div className="mt-20 md:mt-[120px] xl:mt-[70px] 3xl:mt-[75px] px-6 w-full 3xl:w-[unset] relative">
                            <Image
                                src={"/images/download/download_clyde_pose_02 1.webp"}
                                alt={""}
                                width={266}
                                height={266}
                                loading="lazy"
                                className="w-full max-w-[19%] lg:max-w-[20%] 3xl:max-w-[16.625rem] inline-block absolute inset-[-14%_21%_auto_auto] sm:top-[-23%] md:top-[-26%] lg:top-[-22.5%] xl:right-[5%] 3xl:top-[-25%] 3xl:right-0 md:animate-transform-y-pulse md:!duration-7s md:transform-3d md:will-change-transform select-none"
                            />
                            <Image
                                src={"/images/download/download_Multiple Devices.webp"}
                                alt={"Screenshot of Discord on Desktop and mobile, showing friends playing a game together while staying connected through voice and video chat. A player is streaming their game to their friends, with the players' characters running across a desert landscape. The video feeds show them laughing and chatting - capturing that feeling of hanging out in the same room even when playing online."}
                                width={1154}
                                height={827}
                                sizes={"(max-width: 2366px) 100vw, 2366px"}
                                loading="lazy"
                                className="mt-5 sm:mt-0 md:-mt-5 lg:mt-0 3xl:max-w-[1154px] inline-block !relative select-none"
                            />
                            <div className="mb-2 sm:mb-[21px] 3xl:mb-[-38px] ml-[25px] sm:ml-[-13px] 3xl:ml-[-108px] max-w-[22%] sm:max-w-[20%] 3xl:max-w-[378px] absolute inset-[auto_auto_0%_0%] text-left">
                                <Image
                                    src={"/images/download/download_Wumpus_Pose_02 4.webp"}
                                    alt={""}
                                    width={140}
                                    height={102}
                                    loading="lazy"
                                    className="mr-auto max-w-[35%] md:max-w-[41%] 3xl:max-w-[140px] inline-block relative top-2.5 3xl:top-[46px] md:top-[19px] left-[11px] md:animate-rotate-20 md:!duration-7s md:transform-3d md:will-change-transform select-none"
                                />
                                <Image
                                    src={"/images/download/download_Mask_group_(6).webp"}
                                    alt={""}
                                    width={378}
                                    height={414}
                                    sizes={"(max-width: 806px) 100vw, 806px"}
                                    loading="lazy"
                                    className="w-full inline-block select-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-[140px] md:pt-[132px] xl:pt-[360px] pb-[100px] md:pb-0">
                <div className="mx-auto px-6 md:px-10 3xl:px-0 w-full max-w-[1538px] relative">
                    <div className="flex lg:block flex-col flex-nowrap">
                        <div className="mb-[120px] md:mb-[168px] xl:mb-[360px] flex md:grid lg:flex flex-col lg:flex-row flex-nowrap grid-cols-[1fr_1fr] grid-rows-[auto_auto] auto-cols-[1fr] justify-between justify-items-center md:justify-items-start items-center gap-12 md:gap-11 lg:gap-20 3xl:gap-[244px] order-1 lg:order-[unset]">
                            <div className="mx-0 w-full lg:w-1/2 xl:w-full max-w-none lg:max-w-[520px] xl:max-w-[620px] 2xl:max-w-[670px] 3xl:max-w-[700px] flex lg:block flex-col flex-nowrap justify-start items-center text-center md:text-left">
                                <h2 className="mx-auto md:mx-0 mb-4 md:mb-6 xl:mb-8 max-w-none md:max-w-[450px] xl:max-w-[500px] text-app-white font-abcgintodiscordnord font-bold text-[36px] md:text-[40px] lg:text-[48px] xl:text-[56px] leading-[.916667] sm:leading-[.96] tracking-[-.01em] uppercase">Download for desktop</h2>
                                <p className="body-text--xll new mb-8 sm:mb-10 lg:mb-12">Use Discord to easily talk while playing your favorite PC games, show what you’re playing as your status, and stream your games to your friends.</p>
                                <div className="flex flex-row flex-wrap justify-center md:justify-start items-start gap-2">
                                    <Link
                                        href={"/api/download?platform=osx"}
                                        className="p-[13px_24px] max-w-full max-h-12 flex justify-center items-center gap-2 bg-app-white hover:bg-[#c7c8ce] text-app-black font-abcgintodiscord font-medium rounded-lg transition-all duration-300"
                                    >
                                        <div className="flex flex-col flex-nowrap justify-start items-center">
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.6239 8.31868C19.5079 8.40869 17.4597 9.56281 17.4597 12.1291C17.4597 15.0974 20.066 16.1475 20.144 16.1735C20.132 16.2375 19.7299 17.6116 18.7698 19.0118C17.9138 20.2439 17.0197 21.474 15.6595 21.474C14.2994 21.474 13.9494 20.6839 12.3792 20.6839C10.849 20.6839 10.305 21.5 9.06087 21.5C7.81675 21.5 6.94866 20.3599 5.95056 18.9597C4.79444 17.3156 3.86035 14.7613 3.86035 12.3371C3.86035 8.44869 6.3886 6.38649 8.87685 6.38649C10.199 6.38649 11.3011 7.25458 12.1312 7.25458C12.9213 7.25458 14.1534 6.33448 15.6575 6.33448C16.2276 6.33448 18.2758 6.38649 19.6239 8.31868ZM14.9435 4.68832C15.5655 3.95024 16.0056 2.92614 16.0056 1.90204C16.0056 1.76003 15.9936 1.61601 15.9676 1.5C14.9555 1.538 13.7513 2.17407 13.0253 3.01615C12.4552 3.66422 11.9232 4.68832 11.9232 5.72642C11.9232 5.88244 11.9492 6.03845 11.9612 6.08846C12.0252 6.10046 12.1292 6.11446 12.2332 6.11446C13.1413 6.11446 14.2834 5.5064 14.9435 4.68832Z" fill="black"></path>
                                            </svg>
                                        </div>
                                        <div>macOS</div>
                                    </Link>
                                    <Link
                                        href={"/api/downloads/distributions/app/installers/latest?channel=stable&platform=win&arch=x64"}
                                        className="p-[13px_24px] max-w-full max-h-12 flex justify-center items-center gap-2 bg-app-white hover:bg-[#c7c8ce] text-app-black font-abcgintodiscord font-medium rounded-lg transition-all duration-300"
                                    >
                                        <div className="flex flex-col flex-nowrap justify-start items-center">
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 4.5H11.5848V12.0815H4V4.5ZM12.4152 4.5H20V12.0815H12.4152V4.5ZM4 12.9152H11.5848V20.5H4V12.9152ZM12.4152 12.9152H20V20.5H12.4152" fill="black"></path>
                                            </svg>
                                        </div>
                                        <div>Windows</div>
                                    </Link>
                                    <div className="mx-auto md:ml-0 relative inline-block text-left select-none z-[900]">
                                        <Popover>
                                            <PopoverTrigger asChild className="group">
                                                <div className="p-[13px_24px] max-w-full max-h-12 flex justify-center items-center gap-2 bg-app-white hover:bg-[#c7c8ce] text-app-black font-abcgintodiscord font-medium hover:border-[#fff0] rounded-lg transition-all duration-300 cursor-pointer">
                                                    <div className="flex flex-col flex-nowrap justify-start items-center">
                                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6.09159 20.5316C7.0409 20.645 8.10753 21.2599 9.00016 21.3685C9.89759 21.4818 10.1753 20.7574 10.1753 20.7574C10.1753 20.7574 11.1852 20.5316 12.2469 20.5056C13.3096 20.4758 14.3156 20.7266 14.3156 20.7266C14.3156 20.7266 14.5107 21.1734 14.8749 21.3685C15.2391 21.5674 16.0231 21.5943 16.5256 21.0648C17.0291 20.5316 18.3724 19.8599 19.1267 19.44C19.8858 19.0191 19.7465 18.3773 19.2699 18.1822C18.7934 17.9872 18.4032 17.6797 18.433 17.0897C18.459 16.5046 18.0122 16.1145 18.0122 16.1145C18.0122 16.1145 18.4032 14.8269 18.0391 13.7603C17.6749 12.6986 16.4738 10.9911 15.5504 9.70743C14.6271 8.41988 15.4111 6.93343 14.5704 5.03377C13.7296 3.13126 11.5494 3.24371 10.3743 4.05463C9.19913 4.8656 9.55942 6.87668 9.6161 7.83085C9.67279 8.78017 9.64204 9.45948 9.53347 9.7036C9.4249 9.95148 8.66679 10.8518 8.1633 11.6061C7.66079 12.3642 7.29656 13.9295 6.92856 14.5752C6.56822 15.2171 6.81999 15.8022 6.81999 15.8022C6.81999 15.8022 6.56827 15.8887 6.36936 16.3096C6.17427 16.7256 5.78416 16.9245 5.08176 17.0601C4.38416 17.2032 4.38416 17.6529 4.55233 18.1564C4.72142 18.6589 4.55233 18.9404 4.35725 19.5823C4.16222 20.2241 5.13845 20.4191 6.09159 20.5316ZM15.9597 17.6038C16.4584 17.8219 17.1752 17.5182 17.3933 17.3001C17.6105 17.083 17.7642 16.7601 17.7642 16.7601C17.7642 16.7601 17.9823 16.8687 17.9602 17.2136C17.9371 17.5634 18.1101 18.062 18.4368 18.235C18.7635 18.407 19.2622 18.6472 19.0037 18.8874C18.7404 19.1276 17.2838 19.7138 16.8485 20.1711C16.4171 20.6256 15.8502 20.9975 15.5052 20.8879C15.1564 20.7794 14.8518 20.3028 15.0018 19.6052C15.1564 18.9105 15.2871 18.1485 15.265 17.7132C15.242 17.278 15.1564 16.6919 15.265 16.6054C15.3736 16.5198 15.5466 16.5611 15.5466 16.5611C15.5466 16.5611 15.46 17.3867 15.9597 17.6038ZM12.7235 5.84474C13.2039 5.84474 13.5912 6.32131 13.5912 6.90743C13.5912 7.32348 13.3961 7.68383 13.1107 7.8568C13.0387 7.82703 12.9637 7.79337 12.8811 7.75874C13.054 7.67325 13.1741 7.45514 13.1741 7.20337C13.1741 6.87383 12.9714 6.60286 12.7167 6.60286C12.4688 6.60286 12.2622 6.87377 12.2622 7.20337C12.2622 7.32354 12.292 7.4436 12.341 7.53777C12.1911 7.4772 12.0556 7.42537 11.9471 7.38405C11.8904 7.24085 11.8567 7.07943 11.8567 6.90748C11.8568 6.32137 12.243 5.84474 12.7235 5.84474ZM11.5339 7.67617C11.7703 7.71748 12.4198 7.99903 12.6601 8.08548C12.9003 8.16811 13.1664 8.32183 13.1405 8.4756C13.1107 8.63411 12.9868 8.63411 12.6601 8.83303C12.3372 9.02811 11.632 9.46337 11.4062 9.49314C11.1813 9.52291 11.0535 9.39605 10.8132 9.24137C10.573 9.08377 10.1224 8.71577 10.2358 8.52074C10.2358 8.52074 10.5884 8.25074 10.7422 8.1124C10.8959 7.9692 11.2937 7.63194 11.5339 7.67617ZM10.4981 6.01388C10.8767 6.01388 11.1851 6.46451 11.1851 7.01988C11.1851 7.1208 11.1736 7.21491 11.1554 7.30908C11.0612 7.33886 10.9671 7.38788 10.8767 7.46668C10.8325 7.50417 10.7911 7.53777 10.7537 7.57526C10.8132 7.46286 10.8363 7.30143 10.8094 7.13228C10.7575 6.83251 10.5548 6.61057 10.3559 6.64034C10.156 6.674 10.0368 6.9488 10.0849 7.25246C10.1378 7.55994 10.3366 7.78183 10.5394 7.74823C10.5509 7.7444 10.5615 7.74057 10.573 7.73668C10.476 7.83085 10.3856 7.91348 10.2915 7.98074C10.0176 7.85291 9.8149 7.47051 9.8149 7.01988C9.81496 6.46068 10.1186 6.01388 10.4981 6.01388ZM8.38902 13.2838C8.77913 12.6689 9.03084 11.3246 9.42096 10.8778C9.81496 10.4319 10.1186 9.48165 9.98021 9.06177C9.98021 9.06177 10.821 10.0678 11.4062 9.90251C11.9923 9.73337 13.3096 8.75428 13.5047 8.92245C13.6998 9.09154 15.3774 12.7813 15.5465 13.9564C15.7156 15.1306 15.4341 16.0281 15.4341 16.0281C15.4341 16.0281 14.7923 15.8589 14.7096 16.249C14.627 16.643 14.627 18.0699 14.627 18.0699C14.627 18.0699 13.7593 19.271 12.416 19.4698C11.0727 19.6649 10.4 19.5227 10.4 19.5227L9.64576 18.6588C9.64576 18.6588 10.2319 18.5724 10.1492 17.9834C10.0666 17.3982 8.35816 16.5872 8.05067 15.8589C7.7433 15.1305 7.9941 13.8997 8.38902 13.2838ZM5.0673 17.6903C5.13456 17.402 6.00507 17.4021 6.33947 17.1993C6.67387 16.9966 6.74107 16.4143 7.01113 16.2606C7.27724 16.103 7.76924 16.6622 7.97199 16.9773C8.1709 17.2848 8.9329 18.6291 9.24422 18.9634C9.55936 19.3007 9.84862 19.7475 9.75827 20.1491C9.67279 20.5507 9.19907 20.8438 9.19907 20.8438C8.77536 20.9745 7.59347 20.4643 7.05639 20.2394C6.5193 20.0136 5.1529 19.9463 4.97707 19.7475C4.79645 19.5447 5.06353 19.0979 5.13462 18.6742C5.19799 18.2456 4.99913 17.9795 5.0673 17.6903Z" fill="black"></path>
                                                        </svg>
                                                    </div>
                                                    <div>Linux</div>
                                                    <ChevronDown width={20} height={20} className="transition duration-200 group-data-[state=open]:rotate-180" />
                                                </div>
                                            </PopoverTrigger>
                                            <PopoverContent className="mt-1.5 p-2 min-w-full max-w-[var(--radix-popover-trigger-width)] bg-app-white border-none rounded-lg">
                                                {[
                                                    { label: "deb", href: "/api/download?platform=linux&format=deb" },
                                                    { label: "tar.gz", href: "/api/download?platform=linux&format=tar.gz" },
                                                ].map((item, index) => (
                                                    <Link key={index} href={item.href} className="mx-auto p-[13px_16px] relative block hover:bg-app-black/10 text-app-black font-abcgintodiscord text-left align-top no-underline whitespace-nowrap rounded-lg">{item.label}</Link>
                                                ))}
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-[60px] md:pt-20 xl:pt-[100px] pl-[60px] md:pl-20 xl:pl-[100px] w-full lg:w-1/2 xl:w-2/5 max-w-[27rem] xl:max-w-[40.5rem] flex-[none] bg-[linear-gradient(#35ed7e,#c8ffef)] rounded-[72px] md:rounded-[88px] xl:rounded-[112px] overflow-hidden order-first lg:order-[unset]">
                                <Image
                                    src={"/images/download/download_Desktop_Video_Channel.webp"}
                                    alt={"Discord for Desktop"}
                                    width={515}
                                    height={725}
                                    sizes={"(max-width: 1096px) 100vw, 1096px"}
                                    loading="lazy"
                                    className="w-full inline-block select-none"
                                />
                            </div>
                        </div>
                        <div className="mb-[120px] md:mb-[168px] xl:mb-[360px] grid lg:flex grid-cols-[1fr] md:grid-cols-[1fr_1fr] grid-rows-[auto] auto-cols-[1fr] justify-between justify-items-center items-start md:items-center gap-12 md:gap-20 xl:gap-[120px] 2xl:gap-[240px] -order-1 lg:order-[unset]">
                            <div className="pt-[60px] xl:pt-[120px] pr-[50px] md:pr-[60px] xl:pr-[115px] pl-[50px] md:pl-[60px] xl:pl-[115px] w-full lg:w-1/2 xl:w-2/5 max-w-[27rem] xl:max-w-[40.5rem] lg:flex-[none] bg-[linear-gradient(#5865f2,#e0e3ff)] rounded-[72px] md:rounded-[88px] xl:rounded-[112px] overflow-hidden order-first md:order-last lg:order-[unset]">
                                <Image
                                    src={"/images/download/download_Chat.webp"}
                                    alt={"Discord for Mobile"}
                                    width={385}
                                    height={693}
                                    sizes={"(max-width: 836px) 100vw, 836px"}
                                    loading="lazy"
                                    className="w-full inline-block select-none"
                                />
                            </div>
                            <div className="mx-0 w-full lg:w-1/2 xl:w-full max-w-none md:max-w-[520px] xl:max-w-[620px] 2xl:max-w-[670px] 3xl:max-w-[700px] flex md:block flex-col flex-nowrap justify-start items-center text-center md:text-left">
                                <h2 className="mx-auto md:mx-0 mb-4 md:mb-6 xl:mb-8 max-w-none md:max-w-[450px] xl:max-w-[500px] text-app-white font-abcgintodiscordnord font-bold text-[36px] md:text-[40px] lg:text-[48px] xl:text-[56px] leading-[.916667] sm:leading-[.96] tracking-[-.01em] uppercase">Download for mobile</h2>
                                <p className="body-text--xll new mb-8 sm:mb-10 lg:mb-12">Out and about? Sunk in a massive beanbag? Bring Discord with you and chat whenever, have fun with friends, or just see what’s up.</p>
                                <div className="flex flex-row flex-wrap justify-center md:justify-start items-start gap-2">
                                    <Link
                                        href={"https://apps.apple.com/us/app/discord-talk-play-hang-out/id985746746"}
                                        className="p-[13px_24px] max-w-full max-h-12 flex justify-center items-center gap-2 bg-app-white hover:bg-[#c7c8ce] text-app-black font-abcgintodiscord font-medium rounded-lg transition-all duration-300"
                                    >
                                        <div className="flex flex-col flex-nowrap justify-start items-center">
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19.6239 8.31868C19.5079 8.40869 17.4597 9.56281 17.4597 12.1291C17.4597 15.0974 20.066 16.1475 20.144 16.1735C20.132 16.2375 19.7299 17.6116 18.7698 19.0118C17.9138 20.2439 17.0197 21.474 15.6595 21.474C14.2994 21.474 13.9494 20.6839 12.3792 20.6839C10.849 20.6839 10.305 21.5 9.06087 21.5C7.81675 21.5 6.94866 20.3599 5.95056 18.9597C4.79444 17.3156 3.86035 14.7613 3.86035 12.3371C3.86035 8.44869 6.3886 6.38649 8.87685 6.38649C10.199 6.38649 11.3011 7.25458 12.1312 7.25458C12.9213 7.25458 14.1534 6.33448 15.6575 6.33448C16.2276 6.33448 18.2758 6.38649 19.6239 8.31868ZM14.9435 4.68832C15.5655 3.95024 16.0056 2.92614 16.0056 1.90204C16.0056 1.76003 15.9936 1.61601 15.9676 1.5C14.9555 1.538 13.7513 2.17407 13.0253 3.01615C12.4552 3.66422 11.9232 4.68832 11.9232 5.72642C11.9232 5.88244 11.9492 6.03845 11.9612 6.08846C12.0252 6.10046 12.1292 6.11446 12.2332 6.11446C13.1413 6.11446 14.2834 5.5064 14.9435 4.68832Z" fill="black"></path>
                                            </svg>
                                        </div>
                                        <div>App Store</div>
                                    </Link>
                                    <Link
                                        href={"https://play.google.com/store/apps/details?id=com.discord"}
                                        className="p-[13px_24px] max-w-full max-h-12 flex justify-center items-center gap-2 bg-app-white hover:bg-[#c7c8ce] text-app-black font-abcgintodiscord font-medium rounded-lg transition-all duration-300"
                                    >
                                        <div className="flex flex-col flex-nowrap justify-start items-center">
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12.411 13.3719L4.51124 21.248L4.65636 21.3458C5.01074 21.5483 5.44836 21.5517 5.80498 21.3537L15.1942 16.1484L12.411 13.3719ZM4.08374 20.0858L11.6145 12.5776L4.08374 5.0694V20.0858ZM19.9979 11.5145L16.3192 9.47488L13.2075 12.5776L16.218 15.5802L19.9979 13.4855C20.3602 13.2841 20.5841 12.9084 20.5841 12.5C20.5841 12.0916 20.3602 11.7159 19.9979 11.5145ZM4.65636 3.65415L4.42799 3.82515L12.411 11.7834L15.2955 8.90789L5.80498 3.64628C5.44836 3.44828 5.01074 3.45165 4.65636 3.65415Z" fill="black"></path>
                                            </svg>
                                        </div>
                                        <div>Google Play</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-[120px] md:mb-[168px] xl:mb-[240px] 2xl:mb-[320px] grid lg:flex grid-cols-[1fr] md:grid-cols-[1fr_1fr] grid-rows-[auto] auto-cols-[1fr] justify-between justify-items-center items-start md:items-center gap-12 md:gap-20 2xl:gap-[140px] 3xl:gap-[240px]">
                        <div className="mx-0 w-full lg:w-1/2 xl:w-full max-w-none md:max-w-[520px] xl:max-w-[620px] 2xl:max-w-[680px] 3xl:max-w-[700px] flex md:block flex-col flex-nowrap justify-start items-center text-center md:text-left">
                            <h2 className="mb-4 md:mb-6 xl:mb-8 text-app-white font-abcgintodiscordnord font-bold text-[36px] md:text-[40px] lg:text-[48px] xl:text-[56px] leading-[.916667] sm:leading-[.96] tracking-[-.01em] uppercase">Link your console</h2>
                            <p className="body-text--xll new mb-8 sm:mb-10 lg:mb-12">Coordinate from the couch and talk with your Discord friends across PC, mobile, and your fellow console users — supported platforms even let you stream your game directly from your console.</p>
                            <div className="flex flex-row flex-wrap justify-center md:justify-start items-start gap-2">
                                <Link
                                    href={"/blog/playstation-5-voice-integration-announcement"}
                                    className="p-[13px_24px] max-w-full max-h-12 flex justify-center items-center gap-2 bg-app-white hover:bg-[#c7c8ce] text-app-black font-abcgintodiscord font-medium rounded-lg transition-all duration-300"
                                >
                                    <div className="flex flex-col flex-nowrap justify-start items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M14.6814 7.63604V12.9786C16.9395 14.0641 18.7164 12.9772 18.7164 10.1098C18.7164 7.16804 17.6761 5.86227 14.6087 4.81347C13.4028 4.40838 10.8827 3.73515 9.29913 3.4502V19.402L13.2409 20.5474V7.16849C13.2409 6.54142 13.5219 6.12277 13.9748 6.26736C14.5659 6.43137 14.6814 7.00852 14.6814 7.63604ZM19.7146 14.4624C18.5436 13.9992 17.0516 13.8401 15.8335 13.9805C14.6148 14.1212 13.7487 14.4408 13.7487 14.4408L13.5759 14.5016V16.2555L16.5739 15.1539C17.0853 14.9626 17.8355 14.9216 18.25 15.0634C18.6644 15.2052 18.5865 15.4749 18.0758 15.6658L13.5759 17.3387V19.0285L19.6907 16.737C19.6907 16.737 20.5126 16.4222 20.8483 15.9806C21.1835 15.5387 21.0345 14.8977 19.7146 14.4624ZM3.33921 15.4713C2.69265 15.9491 2.94775 16.7166 4.34774 17.1764C5.86965 17.6763 7.32914 17.9804 8.71894 17.7357C8.80911 17.7197 8.9078 17.7026 8.99585 17.6859V16.1144L7.70419 16.4963C7.16946 16.6879 6.38308 16.7279 5.94907 16.5864C5.51511 16.4446 5.5968 16.1749 6.13157 15.984L8.99585 15.0096V13.2532L4.95387 14.6976C4.95387 14.6976 3.93724 15.0297 3.33921 15.4713Z" fill="black"></path>
                                        </svg>
                                    </div>
                                    <div>Playstation</div>
                                </Link>
                                <Link
                                    href={"/blog/xbox-voice-integration-announcement"}
                                    className="p-[13px_24px] max-w-full max-h-12 flex justify-center items-center gap-2 bg-app-white hover:bg-[#c7c8ce] text-app-black font-abcgintodiscord font-medium rounded-lg transition-all duration-300"
                                >
                                    <div className="flex flex-col flex-nowrap justify-start items-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.9824 4C10.4899 4 9.06724 4.41739 7.88739 5.14783C7.81087 5.17357 7.67938 5.27374 7.55973 5.37983C8.61888 4.53809 11.0683 6.22365 11.7835 6.72557C11.9038 6.81009 12.0617 6.81009 12.1821 6.72557C12.8972 6.22365 15.3467 4.53774 16.4058 5.37948C16.2862 5.27374 16.154 5.17357 16.0782 5.14817C14.898 4.41739 13.475 4 11.9824 4ZM7.11276 6.08696C6.55727 6.08696 6.15135 6.53913 6.15135 6.53913C4.83237 7.96522 4 9.87826 4 12C3.99965 16.4174 7.57469 20 11.9824 20C14.3077 20 16.425 18.9913 17.8827 17.3913C17.8827 17.3913 17.7092 16.3478 16.6333 14.8174C15.4302 13.0028 12.9929 10.7172 12.2127 10.0157C12.0809 9.8959 11.8794 9.89681 11.7487 10.0177C11.1609 10.5558 9.6443 12.0619 9.30968 12.4525C8.5114 13.2873 6.29048 15.9304 6.15135 17.4261C6.15135 17.4261 5.66543 16.2435 6.74128 13.5304C7.41086 11.9005 9.49021 9.47757 10.4986 8.42052C10.5633 8.3538 10.5986 8.26396 10.5966 8.17104C10.5947 8.07812 10.5556 7.98985 10.4881 7.92591C10.1542 7.61322 9.37542 7.06539 8.67384 6.64348C8.18826 6.33043 7.63347 6.12174 7.11276 6.08696ZM16.7443 6.08696C16.5168 6.08696 15.0413 6.55409 13.4886 7.93009C13.4186 7.9929 13.3773 8.08152 13.3742 8.17547C13.3712 8.26942 13.4065 8.36056 13.4722 8.42783C14.0347 9.00904 15.5731 10.4977 16.4949 11.9652C17.6403 13.8435 18.3342 15.3391 17.9175 17.3913C19.2014 15.9652 20 14.087 20 12C19.9652 9.91304 19.1666 8 17.8476 6.57391L17.7436 6.46957C17.4664 6.15652 17.0563 6.08696 16.7443 6.08696Z" fill="black"></path>
                                        </svg>
                                    </div>
                                    <div>Xbox</div>
                                </Link>
                            </div>
                        </div>
                        <div className="p-[74px_0px_74px_60px] md:p-[68px_0px_68px_80px] xl:p-[115px_0px_115px_100px] w-full lg:w-1/2 xl:w-2/5 max-w-[27rem] xl:max-w-[40.5rem] lg:flex-[none] row-start-1 md:row-start-[unset] col-start-1 md:col-start-[unset] bg-[linear-gradient(#ff4cd2,#f5c9ff)] rounded-[72px] md:rounded-[88px] xl:rounded-[112px] overflow-hidden">
                            <Image
                                src={"/images/download/download_XBoxUI_Option1.webp"}
                                alt={"Discord for Consoles"}
                                width={515}
                                height={636}
                                loading="lazy"
                                className="w-full inline-block select-none"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="2xl:py-[360px] pt-[220px] xl:pt-[360px] pb-[230px] xl:pb-[280px] relative bg-download-banner-bg-image bg-[50%_0] bg-cover bg-repeat text-center xl:overflow-clip z-[98] xl:z-auto">
                <div className="mx-auto px-6 md:px-10 3xl:px-0 w-full max-w-[1538px] relative">
                    <div className="mx-auto max-w-[46.875rem] lg:max-w-[720px] xl:max-w-[900px] relative">
                        <h2 className="mr-0 mb-6 md:mb-8 text-app-white font-abcgintodiscordnord font-bold text-[8.3vw] sm:text-[36px] md:text-[48px] xl:text-[80px] leading-[1.125] md:leading-[.958333] text-center uppercase tracking-[-.01em] sm:tracking-[-.02em]">Feeling experimental?</h2>
                        <div className="mx-auto w-auto md:w-full max-w-none lg:max-w-[660px]">
                            <p className="body-text--xll new">Try out the newest features before they launch by using our Public Test Build. </p>
                        </div>
                        <div className="mx-auto mt-8 md:mt-10 lg:mt-12 w-auto relative left-auto right-auto inline-flex flex-col justify-start items-center self-center text-left select-none z-[2]">
                            <Popover>
                                <PopoverTrigger asChild className="group">
                                    <div className="button-with-after-effect hover:after:z-[1] p-[11px_16px] md:p-[13.5px_24px] md:px-5 lg:px-6 w-auto max-w-full max-h-10 md:max-h-12 relative flex flex-row flex-nowrap justify-center items-center gap-2 bg-app-blurple text-app-white font-abcgintodiscord font-medium text-[14px] md:text-[16px] leading-[18px] md:leading-6 text-center sm:text-left no-underline rounded-lg transition-all duration-300 hover:transform-none whitespace-normal sm:whitespace-nowrap select-none cursor-pointer overflow-clip">
                                        <div className="relative z-[3]">Download Test Build</div>
                                        <ChevronDown width={20} height={20} className="transition duration-200 group-data-[state=open]:rotate-180 z-[3]" />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="mt-1 p-2 min-w-full max-w-[var(--radix-popover-trigger-width)] block bg-app-white/10 border-none shadow-[0_6px_10px_#00000014] rounded-lg z-[98]">
                                    {[
                                        { label: "Mac", href: "/api/download/ptb?platform=osx" },
                                        { label: "Windows 64-bit", href: "/api/downloads/distributions/app/installers/latest?channel=ptb&platform=win&arch=x64" },
                                        { label: "Linux deb", href: "/api/download/ptb?platform=linux&format=deb" },
                                        { label: "Linux tar.gz", href: "/api/download/ptb?platform=linux&format=tar.gz" },
                                    ].map((item, index) => (
                                        <Link key={index} href={item.href} className="mx-auto p-[13px_16px] relative block hover:bg-app-white/10 text-app-white font-abcgintodiscord text-left align-top no-underline whitespace-nowrap rounded-xl">{item.label}</Link>
                                    ))}
                                </PopoverContent>
                            </Popover>
                        </div>
                        <Image
                            ref={downloadRadishImageRef}
                            src={"/images/download/download_Radish.webp"}
                            alt={""}
                            width={320}
                            height={320}
                            sizes={"(max-width: 784px) 100vw, 784px"}
                            loading="lazy"
                            className="mt-[-220px] md:mt-[-275px] xl:mt-[-240px] ml-[-23vw] sm:ml-[-5vw] md:ml-[-16vw] lg:ml-[-17vw] w-[50vw] sm:w-[40vw] md:w-[30vw] xl:w-[24vw] 2xl:w-[17vw] max-w-[190px] md:max-w-[300px] xl:max-w-[320px] inline-block absolute inset-[0%_auto_auto_0%] md:left-[9%] xl:left-0 [transform:rotateX(0)_rotateY(180deg)_rotate(0)_rotate(15deg)] sm:[transform:rotateX(0)_rotateY(180deg)_rotate(0)_rotate(10deg)] md:[transform:rotate(12deg)] lg:[transform:translate3d(0px,0px,0px)_scale3d(1,1,1)_rotateX(0deg)_rotateY(0deg)_rotateZ(0deg)_skew(0deg,0deg)] transform-3d lg:will-change-transform select-none"
                        />
                        <Image
                            ref={downloadTrophyImageRef}
                            src={"/images/download/download_Trophy.webp"}
                            alt={""}
                            width={320}
                            height={320}
                            sizes={"(max-width: 800px) 100vw, 800px"}
                            loading="lazy"
                            className="m-[-275px_-18vw_-217px_-220px] mt-[-280px] md:mt-[-275px] mr-[-32vw] sm:mr-[-5vw] md:mr-[-15vw] lg:mr-[-18vw] mb-[-240px] md:mb-[-271px] lg:mb-[-217px] xl:mb-[-246px] 3xl:mb-[-284px] w-[60vw] sm:w-[40vw] md:w-[30vw] xl:w-[25vw] 2xl:w-[22vw] 3xl:w-[17vw] max-w-[220px] md:max-w-[250px] xl:max-w-[320px] absolute inset-[auto_7%_0%_auto] right-[3%] sm:right-0 md:right-[7%] xl:right-0 inline-block transform-3d lg:will-change-transform select-none"
                        />
                    </div>
                </div>
            </section>
        </PageLayout>
    )
}

export default DownloadPage