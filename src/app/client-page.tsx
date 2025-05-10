"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Download } from "lucide-react"
import { createHomeClydeImageAnimation, createHomeCoinImageAnimation, createHomeEggImageAnimation, createHomePanImageAnimation, createHomeRadishImageAnimation, createLineTextAnimation } from "@/lib/animations"
import { useMedia } from "@/context/media-query-context"
import { PageLayout } from "@/components/main/page-layout"
import CustomVideo from "@/components/main/custom-video"
import { Logo } from "@/components/main/logo"

export default function HomeClient() {
    // Refs for animated elements
    const homeEggImageRef = useRef<HTMLDivElement>(null)
    const homeCyldeImageRef = useRef<HTMLImageElement>(null)
    const homeLineTextRef = useRef<HTMLDivElement>(null)
    const homeCoinImageRef = useRef<HTMLImageElement>(null)
    const homeRadishImageRef = useRef<HTMLImageElement>(null)
    const homePanImageRef = useRef<HTMLImageElement>(null)

    const { isMaxWidth } = useMedia()

    useEffect(() => {
        if (isMaxWidth(767)) return

        const homeEggImageAnimation: ReturnType<typeof createHomeEggImageAnimation> | null = homeEggImageRef?.current ? createHomeEggImageAnimation(homeEggImageRef.current) : null
        const homeClydeImageAnimation: ReturnType<typeof createHomeClydeImageAnimation> | null = homeCyldeImageRef?.current ? createHomeClydeImageAnimation(homeCyldeImageRef.current) : null
        const homeLineTextAnimation: ReturnType<typeof createLineTextAnimation> | null = homeLineTextRef?.current ? createLineTextAnimation(homeLineTextRef.current, { duration: 250 }) : null
        const homeCoinImageAnimation: ReturnType<typeof createHomeCoinImageAnimation> | null = homeCoinImageRef?.current ? createHomeCoinImageAnimation(homeCoinImageRef.current) : null
        const homeRadishImageAnimation: ReturnType<typeof createHomeRadishImageAnimation> | null = homeRadishImageRef?.current ? createHomeRadishImageAnimation(homeRadishImageRef.current) : null
        const homePanImageAnimation: ReturnType<typeof createHomePanImageAnimation> | null = homePanImageRef?.current ? createHomePanImageAnimation(homePanImageRef.current) : null

        // Clear animations when component unmounts
        return () => {
            if (homeEggImageAnimation) homeEggImageAnimation.kill()
            if (homeClydeImageAnimation) homeClydeImageAnimation.kill()
            if (homeLineTextAnimation) homeLineTextAnimation.kill()
            if (homeCoinImageAnimation) homeCoinImageAnimation.kill()
            if (homeRadishImageAnimation) homeRadishImageAnimation.kill()
            if (homePanImageAnimation) homePanImageAnimation.kill()
        }
    }, [isMaxWidth])

    return (
        <PageLayout
            header={{
                variant: "transparent",
                container: "fluid",
                showNav: true,
            }}
            className="overflow-hidden _2025"
        >
            {/* Home Hero Section */}
            <section className="mt-0 pt-16 md:pt-32 xl:pt-32 2xl:pt-36 3xl:pt-32 pb-0 sm:pb-[2.4375rem] md:pb-[3.5rem] xl:pb-[7.8125rem] h-auto lg:h-screen 2xl:h-auto max-h-none lg:max-h-[700px] xl:max-h-[900px] 2xl:max-h-none 3xl:max-h-[1080px] relative bg-home-hero-bg-image bg-no-repeat bg-[50%_-80%] md:bg-[65%_-25%] xl:bg-[50%_-15%] 2xl:bg-[100%_-33%] 3xl:bg-[60%_-33%] bg-250p sm:bg-90p 2xl:bg-95.5p 3xl:bg-96p bg-scroll">
                <div className="px-6 md:px-10 2xl:px-0 w-full min-h-[148px] sm:min-h-[unset] 3xl:static">
                    <div className="mx-auto w-full sm:w-[90%] 2xl:w-full max-w-[1080px] 2xl:max-w-[1240px] 3xl:max-w-[1320px] relative z-[3]">
                        <div className="mx-auto mb-4 md:mb-8 lg:mb-4 xl:mx-0 xl:mb-6 2xl:mb-10 3xl:mb-16 px-[2%] sm:px-0 pb-0 w-full max-w-[840px] xl:max-w-none relative flex flex-col md:flex-col-reverse lg:flex-row flex-wrap lg:flex-nowrap justify-start items-start gap-0 lg:gap-[2.1625rem] 3xl:gap-[4.25rem] z-[1]">
                            <div className="mt-0 md:mt-12 lg:mt-16 xl:mt-16 2xl:mt-[5.5rem] 3xl:mt-40 mb-auto max-w-none lg:max-w-[21rem] xl:max-w-[28rem] 2xl:max-w-[30.7rem] static lg:relative 2xl:left-0 flex-1 lg:flex-none self-center text-app-white text-center lg:text-left z-[3]">
                                <div className="mt-[-2.7rem] sm:mt-[-4.4rem] md:-mt-28 lg:-mt-40 xl:-mt-36 2xl:-mt-40 3xl:-mt-52 ml-[10.4rem] sm:ml-[17.5rem] md:ml-[23.8rem] lg:ml-56 xl:ml-64 2xl:ml-[24.8rem] 3xl:ml-[10.9rem] w-full xl:w-40 2xl:w-48 3xl:w-56 max-w-[5.25rem] md:max-w-32 lg:max-w-40 2xl:max-w-48 3xl:max-w-56 h-[5.25rem] md:h-32 lg:h-40 2xl:h-48 3xl:h-56 absolute inset-[0%_auto_auto_0%] left-auto right-auto bg-home-crown-bg-image bg-no-repeat bg-cover bg-[50%] pointer-events-none md:animate-rotate-20-smooth md:transform-3d md:will-change-transform blur-[2px] z-[3]"></div>
                                <div className="mx-auto xl:mx-0 pb-1.5 pr-0 lg:pr-8 2xl:pr-0 max-w-[325px] md:max-w-[400px] lg:max-w-[unset] relative">
                                    <h1 className="heading--h1 is_2025">Group chat that’s all fun&nbsp;& games</h1>
                                </div>
                                <div className="mx-auto mt-0 lg:mt-1 2xl:mt-2 max-w-[325px] sm:max-w-[unset] overflow-hidden">
                                    <p className="pr-4 2xl:pr-0 w-full font-abcgintodiscord font-normal text-base md:text-[18px] xl:text-[20px] leading-[1.3] tracking-[.02rem] text-center lg:text-left">Discord is great for playing games and chilling&nbsp;with friends, or even building a worldwide community. Customize your own&nbsp;space to talk, play, and hang out.</p>
                                </div>
                            </div>
                            <div className="mx-auto lg:-ml-36 xl:ml-0 w-full max-w-[43rem] lg:max-w-none relative xl:right-[-3%] 2xl:right-[-6%] 3xl:right-[-11.5%] flex flex-[0_auto] justify-center items-center self-center -order-1 md:order-[unset]">
                                <div className="mt-[6.3rem] sm:mt-[8.9rem] md:mt-[10.3rem] lg:mt-20 xl:mt-28 2xl:mt-36 3xl:mt-[12.3rem] mr-[-27%] sm:mr-[-27%] md:mr-[-21%] lg:mr-[-13%] xl:mr-[15%] 2xl:mr-[2%] 3xl:mr-[21%] xl:pr-0 w-full h-32 2xl:h-40 3xl:h-44 max-w-28 lg:max-w-24 2xl:max-w-36 3xl:max-w-40 absolute inset-[0%_0%_auto_auto] bg-home-trophy-bg-image bg-[50%] bg-no-repeat bg-cover md:animate-rotate-20-smooth-reverse md:transform-3d md:will-change-transform z-0"></div>
                                <div className="mx-auto 2xl:mt-[-14px] lg:mr-0 xl:mr-auto mb-8 md:mb-4 lg:mb-0 lg:ml-auto xl:ml-auto w-full min-h-60 static md:relative 2xl:left-[17px] 3xl:left-[12px]">
                                    <div className="hero-wr-image desctop-show">
                                        <div className="mx-auto 2xl:mx-[-2vw] w-full min-w-[auto] md:min-w-[37.5rem] xl:min-w-[46rem] 2xl:min-w-[52rem] 3xl:min-w-[75rem] md:max-w-[22.1875rem] lg:max-w-[37.5rem] xl:max-w-none 3xl:max-w-[75rem] 3xl:h-[650px] min-h-[auto] md:min-h-[401px] xl:min-h-[480px] 2xl:min-h-[526px] 3xl:min-h-[650px] 3xl:max-h-[742px] relative left-0 lg:left-[12%] xl:left-[-14%] 3xl:left-[-25%] hidden md:block bg-home-image bg-[50%] bg-no-repeat bg-contain 3xl:aspect-[2.39] z-[1]"></div>
                                    </div>
                                    <Image
                                        src={"/images/home/home_hero_image_mobile.webp"}
                                        alt={"Group chat that’s all fun&nbsp;& games"}
                                        width={313}
                                        height={240}
                                        priority
                                        sizes={"(max-width: 846px) 100vw, 846px"}
                                        className="mx-auto 2xl:mx-[-2vw] w-full min-w-[auto] max-w-none sm:max-w-[454px] lg:max-w-[26.75rem] xl:max-w-[40.125rem] min-h-[auto] xl:min-h-[auto] relative block md:hidden aspect-auto overflow-visible z-[1]"
                                    />
                                    <div className="hidden md:block select-none">
                                        <Image
                                            src={"/images/home/home_hero_wumpus.webp"}
                                            alt={""}
                                            width={189}
                                            height={148}
                                            loading="lazy"
                                            className="3xl:mx-auto ml-56 lg:ml-[18.7rem] xl:ml-[12.1rem] 2xl:ml-44 w-full max-w-[7.5rem] lg:max-w-[7.875rem] xl:max-w-44 2xl:max-w-[10.5rem] 3xl:max-w-[13.5rem] absolute inset-[auto_auto_0%] 3xl:left-[13%] z-[1]"
                                        />
                                        <Image
                                            src={"/images/home/home_hero_wumpus_pl.webp"}
                                            alt={""}
                                            width={216}
                                            height={40}
                                            loading="lazy"
                                            className="3xl:mx-auto ml-56 lg:ml-[18.7rem] xl:ml-[12.1rem] 2xl:ml-44 mb-[5.8rem] lg:mb-[6.1rem] xl:mb-[8.5rem] 2xl:mb-32 3xl:mb-[10.5rem] w-full max-w-[7.5rem] lg:max-w-[7.875rem] xl:max-w-44 2xl:max-w-[10.5rem] 3xl:max-w-[13.5rem] absolute inset-[auto_auto_0%_0%] 3xl:left-[13%] lg:animate-rotate-20 lg:transform-3d lg:will-change-transform z-[1]"
                                        />
                                    </div>
                                    <div className="mx-auto w-full max-w-[2.5rem] md:max-w-[2.4rem] lg:max-w-[2.5rem] xl:max-w-[3.6rem] 3xl:max-w-[4.5rem] absolute inset-[auto_0%_0%_-44%] md:left-[-67%] lg:left-[-44%] xl:left-[-96%] 2xl:left-[-98%] 3xl:left-[-109%] xl:bottom-0 hidden md:flex flex-col flex-nowrap justify-start items-center gap-[5px] select-none z-[1]">
                                        <Image
                                            src={"/images/home/home_clyde.webp"}
                                            alt={""}
                                            width={72}
                                            height={80}
                                            loading="lazy"
                                            className="w-full lg:animate-transform-y-pulse lg:transform-3d lg:will-change-transform"
                                        />
                                        <Image
                                            src={"/images/home/home_clyde_shadow.webp"}
                                            alt={""}
                                            width={72}
                                            height={3}
                                            loading="lazy"
                                            className="xl:mx-auto w-full h-[2px] 2xl:h-[3px] lg:animate-width-pulse lg:will-change-[filter,width,height]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <aside id="landing-cta" className="block">
                            <div className="relative flex flex-col md:flex-row justify-center items-center flex-wrap">
                                <Link
                                    href={"/download"}
                                    className="mx-0 mt-6 md:mr-6 2xl:mr-[39px] px-6 py-[15px] min-w-[232px] 2xl:min-w-[262px] h-12 min-h-14 2xl:min-h-[65px] flex items-center bg-app-white hover:bg-plum-6 text-app-not-quite-black font-abcgintodiscord font-normal text-[18px] 2xl:text-xl leading-6 2xl:leading-[26px] tracking-[.25px] rounded-xl transition-all duration-300 box-border"
                                >
                                    <Download width={24} height={24} className="mr-2" />Download for Windows
                                </Link>
                                <Link
                                    href={"/app"}
                                    className="button-with-after-effect mt-6 px-6 py-[16.7px] 2xl:py-[19.5px] min-w-[299px] 2xl:min-w-80 h-12 min-h-14 2xl:min-h-[65px] inline-flex items-center relative bg-app-blurple text-app-white font-abcgintodiscord font-normal text-[18px] 2xl:text-xl leading-6 2xl:leading-[26px] tracking-[.25px] rounded-xl transition-none ease-in-out duration-200 overflow-hidden box-border z-[1]"
                                >
                                    Open Discord in your browser
                                </Link>
                            </div>
                        </aside>
                    </div>
                    {/* Background Stars */}
                    <div className="h-0 select-none">
                        <Image src={"/images/home/star_lg.svg"} width={20} height={20} loading="lazy" alt={""} className="star-hero-home star-lg" />
                        <Image src={"/images/home/star_lg.svg"} width={14} height={14} loading="lazy" alt={""} className="star-hero-home star-2 star-lg" />
                        <Image src={"/images/home/star_lg.svg"} width={14} height={14} loading="lazy" alt={""} className="star-hero-home star-7 star-lg" />
                        <Image src={"/images/home/star_lg.svg"} width={18} height={18} loading="lazy" alt={""} className="star-hero-home star-5 star-lg" />
                        <Image src={"/images/home/star_lg.svg"} width={14} height={14} loading="lazy" alt={""} className="star-hero-home star-7 star-lg" />
                        <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _14 star-m" />
                        <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _21 star-m" />
                        <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _10 star-m" />
                        <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _16 star-m" />
                        <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _22 star-m" />
                        <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _6 star-m" />
                        <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _7 star-m" />
                        <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _19 star-m" />
                        <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _20 star-m" />
                        <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _12 star-m" />
                        <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _12 _1 star-m" />
                        <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-hom _2 star-sm" />
                        <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-hom _17 star-sm" />
                        <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-hom _5 star-sm" />
                        <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-hom _3 star-sm" />
                    </div>
                </div>
            </section>

            <section className="mt-[-1px] pt-[6.125rem] xl:pt-[8.8125rem] pb-[6.45rem] md:pb-[7.1875rem] xl:pb-28 max-h-none lg:max-h-[1030px] 3xl:max-h-none relative bg-home-texture-2-bg-image bg-[50%_0] md:bg-[110%_0] lg:bg-[100%_100%] bg-1200px md:bg-1000px lg:bg-93p bg-no-repeat">
                <div className="px-6 sm:px-8 md:px-10 w-full min-h-[148px] sm:min-h-[unset] 3xl:static">
                    <div className="mx-auto w-full max-w-[55.125rem] xl:max-w-[81.25rem] 2xl:max-w-[77.5rem] 3xl:max-w-[93.75rem] relative z-[5]">
                        <div className="_3d-animation">
                            <Image
                                src={"/images/home/home_party_wumpus.gif"}
                                alt={""}
                                width={172}
                                height={109}
                                loading="lazy"
                                className="-mt-12 sm:mt-[-3.8rem] md:mt-[-3.75rem] lg:-mt-20 3xl:mt-[-6.2rem] mr-20 sm:mr-32 xl:mr-40 2xl:mr-44 3xl:mr-56 ml-[10.875rem] w-full max-w-[6.56rem] lg:max-w-[9.1875rem] 3xl:max-w-[10.75rem] absolute inset-[0%_0%_auto_auto] block select-none pointer-events-none z-0"
                            />
                            <div className="home--block-group block-1 _2025">
                                <div className="home--2col_layout is_2025">
                                    <div className="home--image-wr video is_2025">
                                        <div className="home--group-chat-img-wr">
                                            <CustomVideo
                                                backgroundImage="/images/video/Discord_Websote_Refresh_Emojis2_EN-poster-00001.jpg"
                                                sources={[
                                                    {
                                                        src: "/video/home/Discord_Websote_Refresh_Emojis2_EN-transcode.mp4",
                                                        type: "video/mp4",
                                                    },
                                                    {
                                                        src: "/video/home/Discord_Websote_Refresh_Emojis2_EN-transcode.webm",
                                                        type: "video/webm",
                                                    },
                                                ]}
                                                divClassName="home--group-chat-img video _2025 w-background-video w-background-video-atom"
                                            />
                                        </div>
                                    </div>
                                    <div className="home--text-wr is-mobile-first is_2025">
                                        <h2 className="heading--h2 is_2025">MAKE YOUR GROUP CHATS MORE FUN</h2>
                                        <p className="body-text--xl is_2025-n">Use custom emoji, stickers, soundboard effects and more to add&nbsp;your personality to your voice, video, or text chat. Set your avatar and a custom status, and write your own profile to show up&nbsp;in chat your way.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div ref={homeEggImageRef} className="-mb-56 md:-mb-56 xl:-mb-48 3xl:-mb-96 -ml-20 md:-ml-[7.75rem] 3xl:-ml-[15.5rem] w-96 md:w-[23rem] lg:w-[27rem] absolute inset-[auto_auto_0%_0%] transform-3d will-change-transform 3xl:filter-none select-none 3xl:pointer-events-auto z-[-1]">
                            <Image
                                src={"/images/home/home_egg_icon.webp"}
                                alt={""}
                                width={190}
                                height={208}
                                loading="lazy"
                                className="w-[272px] sm:w-[368px] md:w-[368px] lg:w-full max-w-[190px] md:max-w-[221.5px] 3xl:max-w-[320px] 3xl:relative"
                            />
                        </div>
                    </div>
                </div>
                {/* Background Stars */}
                <div className="select-none">
                    <Image src={"/images/home/star_lg.svg"} width={20} height={20} loading="lazy" alt={""} className="star-hero-home _2-1 star-lg" />
                    <Image src={"/images/home/star_lg.svg"} width={20} height={20} loading="lazy" alt={""} className="star-hero-home _2-8 star-lg" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-2 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _10 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-3 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-7 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-4 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-5 star-m" />
                    <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-home _2 star-sm" />
                    <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-home _3 star-sm" />
                    <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-home _2-6 star-sm" />
                </div>
            </section>

            <section className="mt-[-1px] 2xl:py-[5.9375rem] 3xl:py-[9.375rem] pt-[7.1875rem] xl:pt-28 pb-[6.875rem] md:pb-[8.125rem] xl:pb-[9.625rem] max-h-none lg:max-h-[991px] 3xl:max-h-none relative bg-home-texture-3-bg-image bg-[25%_0] xl:bg-[0_0] 2xl:bg-[50%] bg-auto-100p xl:bg-110p md:bg-1200px bg-no-repeat z-[5] lg:z-[4]">
                <div className="px-6 sm:px-8 md:px-10 w-full min-h-[148px] sm:min-h-[unset] 3xl:static">
                    <div className="mx-auto w-full max-w-[55.125rem] xl:max-w-[81.25rem] 2xl:max-w-[77.5rem] 3xl:max-w-[93.75rem] relative z-[2]">
                        <div className="_3d-animation">
                            <div className="home--block-group is-reverse home-new _2025">
                                <div className="home--2col_layout block-2">
                                    <div className="home--text-wr is-mobile-first is_2025">
                                        <h2 className="heading--h2 is_2025">stream like you’re in the same room</h2>
                                        <p className="body-text--xl new-home is_2025 stream">High quality and low latency streaming makes it&nbsp;feel like you’re hanging out on the couch with friends while playing a game, watching shows, looking at photos, or idk doing homework&nbsp;or something.</p>
                                    </div>
                                    <div className="home--image-wr is-reverse">
                                        <div className="home--image-wr video is_2025">
                                            <div className="home--group-chat-img-wr">
                                                <CustomVideo
                                                    backgroundImage="/images/video/Discord_Website_Refresh_EN-poster-00001.jpg"
                                                    sources={[
                                                        {
                                                            src: "/video/home/Discord_Website_Refresh_EN-transcode.mp4",
                                                            type: "video/mp4",
                                                        },
                                                        {
                                                            src: "/video/home/Discord_Website_Refresh_EN-transcode.webm",
                                                            type: "video/webm",
                                                        },
                                                    ]}
                                                    divClassName="home--group-chat-img video _2025 w-background-video w-background-video-atom"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Image
                            ref={homeCyldeImageRef}
                            src={"/images/home/home_clyde_cube.webp"}
                            alt={""}
                            width={300}
                            height={306}
                            loading="lazy"
                            className="mb-[-130px] md:-mb-40 ml-[5px] md:ml-16 2xl:ml-20 3xl:ml-[190px] w-full max-w-[172px] md:max-w-[218px] 2xl:max-w-[270px] 3xl:max-w-[300px] absolute inset-[auto_auto_0%_0%] select-none"
                        />
                    </div>
                </div>
                {/* Background Stars */}
                <div className="select-none">
                    <Image src={"/images/home/star_lg.svg"} width={20} height={20} loading="lazy" alt={""} className="star-hero-home _2-1 star-lg" />
                    <Image src={"/images/home/star_lg.svg"} width={20} height={20} loading="lazy" alt={""} className="star-hero-home _2-8 star-lg" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-2 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _10 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-3 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-4 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-5 star-m" />
                    <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-home _2-9 star-sm" />
                    <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-home _3 star-sm" />
                    <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-home _2-6 star-sm" />
                </div>
            </section>

            <section className="mt-[-1px] pt-[8.125rem] md:pt-[8.125rem] xl:pt-[9.625rem] 2xl:pt-[5.9375rem] 3xl:pt-[9.375rem] pb-20 md:pb-[11.25rem] xl:pb-[12.3125rem] 2xl:pb-[11.875rem] 3xl:pb-[15.625rem] max-h-[1030px] 3xl:max-h-none relative bg-home-texture-4-bg-image bg-[50%_2%] md:bg-[0_0] bg-1200px md:bg-cover bg-repeat sm:bg-no-repeat">
                <div className="px-6 sm:px-8 md:px-10 w-full min-h-[148px] sm:min-h-[unset] 3xl:static">
                    <div className="mx-auto w-full max-w-[55.125rem] xl:max-w-[81.25rem] 2xl:max-w-[77.5rem] 3xl:max-w-[93.75rem] relative z-[3]">
                        <div className="_3d-animation">
                            <Image
                                src={"/images/home/home_box_icon.webp"}
                                alt={""}
                                width={300}
                                height={287}
                                loading="lazy"
                                className="-mt-28 lg:mt-[-8.25rem] xl:mt-[-7.35rem] 3xl:mt-[-10.65rem] mr-[-6.6rem] md:-mr-16 lg:mr-[-2.5rem] xl:-mr-12 2xl:mr-[1.3rem] 3xl:mr-[.2rem] -mb-44 pr-0 w-full max-w-[163px] md:max-w-[180px] lg:max-w-[217px] 3xl:max-w-[300px] absolute inset-[auto_0%_0%_auto] md:inset-[0%_0%_auto_auto] rounded-[14px] md:rotate-0 rotate-[10deg] blur-[3px] md:blur-[unset] opacity-60 md:opacity-100 pointer-events-none select-none z-[1] md:z-[3]"
                            />
                            <div className="home--block-group block-2 _2025">
                                <div className="home--2col_layout">
                                    <div className="home--image-wr video is_2025">
                                        <div className="home--group-chat-img-wr">
                                            <CustomVideo
                                                backgroundImage="/images/video/Discord_Refresh_Hop-In_Fix_EN-poster-00001.jpg"
                                                sources={[
                                                    {
                                                        src: "/video/home/Discord_Refresh_Hop-In_Fix_EN-transcode.mp4",
                                                        type: "video/mp4",
                                                    },
                                                    {
                                                        src: "/video/home/Discord_Refresh_Hop-In_Fix_EN-transcode.webm",
                                                        type: "video/webm",
                                                    },
                                                ]}
                                                divClassName="home--group-chat-img video _2025 w-background-video w-background-video-atom"
                                            />
                                        </div>
                                    </div>
                                    <div className="home--text-wr is-mobile-first is_2025">
                                        <h2 className="heading--h2 is_2025">Hop in when you{'\''}re free, no&nbsp;need to call</h2>
                                        <p className="body-text--xl new-home is_2025">Easily hop in and out of voice or text chats without having to call or invite anyone, so your party chat lasts before, during, and after your game session.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Background Stars */}
                <div className="select-none">
                    <Image src={"/images/home/star_lg.svg"} width={20} height={20} loading="lazy" alt={""} className="star-hero-home _2-10 star-lg" />
                    <Image src={"/images/home/star_lg.svg"} width={20} height={20} loading="lazy" alt={""} className="star-hero-home _2-8 star-lg" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-2 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _10 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-3 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-4 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-5 star-m" />
                    <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-home _2-9 star-sm" />
                    <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-home _3 star-sm" />
                    <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-home _2-6 star-sm" />
                </div>
            </section>

            <section className="hidden md:block relative overflow-hidden z-[6]">
                <div className="py-0 h-[6.5625rem] lg:h-[8.75rem] 3xl:h-[11.56rem] relative hidden md:flex justify-start items-center md:gap-[2.25rem] bg-home-line-bg-image bg-[50%] bg-cover bg-no-repeat z-[3]">
                    <div ref={homeLineTextRef} className="flex justify-start items-center gap-[2.25rem] 3xl:gap-20 md:transform-3d md:will-change-transform select-none">
                        {[...Array(4)].map((item, index) => (
                            <div key={item + "-" + index} className="flex flex-[none] justify-start items-center gap-[3.5rem] 3xl:gap-20 font-abcgintonordextrabold">
                                <Logo type="icon" href="" className="max-w-[36px] 3xl:max-w-[50px]" />
                                <div className="text-app-white font-[inherit] font-bold text-[47px] lg:text-[47px] 3xl:text-[82px] leading-5 lg:leading-[25px] 3xl:leading-[34px] tracking-[-.01em] uppercase">talk</div>
                                <Logo type="icon" href="" className="max-w-[36px] 3xl:max-w-[50px]" />
                                <div className="text-app-white font-[inherit] font-bold text-[47px] lg:text-[47px] 3xl:text-[82px] leading-5 lg:leading-[25px] 3xl:leading-[34px] tracking-[-.01em] uppercase">play</div>
                                <Logo type="icon" href="" className="max-w-[36px] 3xl:max-w-[50px]" />
                                <div className="text-app-white font-[inherit] font-bold text-[47px] lg:text-[47px] 3xl:text-[82px] leading-5 lg:leading-[25px] 3xl:leading-[34px] tracking-[-.01em] uppercase">chat</div>
                                <Logo type="icon" href="" className="max-w-[36px] 3xl:max-w-[50px]" />
                                <div className="text-app-white font-[inherit] font-bold text-[47px] lg:text-[47px] 3xl:text-[82px] leading-5 lg:leading-[25px] 3xl:leading-[34px] tracking-[-.01em] uppercase">hang out</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mt-[-1px] pt-36 md:pt-[9.625rem] xl:pt-[14.6875rem] 2xl:pt-[11.875rem] 3xl:pt-[15.625rem] pb-[6.625rem] md:pb-[8.125rem] xl:pb-[10.3125rem] 2xl:pb-[8.5rem] 3xl:pb-[9.375rem] max-h-none relative bg-home-texture-5-bg-image bg-[50%_15%] sm:bg-[50%_0] md:bg-[0_0] 2xl:bg-[50%_0] bg-1200px md:bg-cover bg-repeat md:bg-no-repeat z-[5]">
                <div className="px-6 sm:px-8 md:px-10 w-full min-h-[148px] sm:min-h-[unset] 3xl:static">
                    <div className="mx-auto w-full max-w-[55.125rem] xl:max-w-[81.25rem] 2xl:max-w-[77.5rem] 3xl:max-w-[93.75rem] relative z-[3]">
                        <div className="_3d-animation">
                            <div className="home--block-group is-reverse _2025">
                                <div className="home--2col_layout block-2 is_2025">
                                    <div className="home--text-wr is-mobile-first is_2025">
                                        <div className="3xl:max-w-[400px]">
                                            <h2 className="heading--h2 m-90 is_2025">See who{'\''}s around to chill</h2>
                                        </div>
                                        <p className="body-text--xl new-home is_2025 stream">See who{'\''}s around, playing games, or&nbsp;just hanging out. For supported games, you can see what modes or characters your friends are playing and directly join up.</p>
                                    </div>
                                    <div className="home--image-wr is-reverse is_2025">
                                        <div className="home--group-chat-img-wr">
                                            <CustomVideo
                                                backgroundImage="/images/video/Discord_Refresh_StatusHover_EN-poster-00001.jpg"
                                                sources={[
                                                    {
                                                        src: "/video/home/Discord_Refresh_StatusHover_EN-transcode.mp4",
                                                        type: "video/mp4",
                                                    },
                                                    {
                                                        src: "/video/home/Discord_Refresh_StatusHover_EN-transcode.webm",
                                                        type: "video/webm",
                                                    },
                                                ]}
                                                divClassName="home--group-chat-img video _2025 w-background-video w-background-video-atom"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Background Stars */}
                <div className="select-none">
                    <Image src={"/images/home/star_lg.svg"} width={20} height={20} loading="lazy" alt={""} className="star-hero-home _2-1 star-lg" />
                    <Image src={"/images/home/star_lg.svg"} width={20} height={20} loading="lazy" alt={""} className="star-hero-home _2-8 star-lg" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-2 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _10 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-3 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-4 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-5 star-m" />
                    <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-home _2-9 star-sm" />
                    <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-home _3 star-sm" />
                    <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-home _2-6 star-sm" />
                </div>
            </section>

            <section className="mt-[-1px] 3xl:py-[9.375rem] pt-[8.125rem] xl:pt-[10.3125rem] 2xl:pt-[8.5rem] pb-[6.75rem] md:pb-20 xl:pb-[10.25rem] 2xl:pb-[9.4375rem] max-h-none lg:max-h-[1030px] 3xl:max-h-none relative bg-home-texture-6-bg-image bg-[0_0] 2xl:bg-[100%_-5%] 3xl:bg-[0_30%] bg-auto-100p sm:bg-1000px md:bg-95p 3xl:bg-91p bg-no-repeat z-[4]">
                <div className="px-6 sm:px-8 md:px-10 w-full min-h-[148px] sm:min-h-[unset] 3xl:static">
                    <div className="mx-auto w-full max-w-[55.125rem] xl:max-w-[81.25rem] 2xl:max-w-[77.5rem] 3xl:max-w-[93.75rem] relative z-[3]">
                        <Image
                            ref={homeCoinImageRef}
                            src={"/images/home/home_coin_icon.webp"}
                            alt={""}
                            width={282}
                            height={283}
                            loading="lazy"
                            className="mt-[-178px] md:mt-[-180px] 2xl:mt-[-240px] 3xl:mt-[-29rem] -mb-44 md:-mb-36 ml-[-4.75rem] md:-ml-24 3xl:ml-[-17.2rem] w-full max-w-[8.25rem] md:max-w-[8.875rem] 2xl:max-w-[13.125rem] 3xl:max-w-[17.625rem] absolute inset-[0%_auto_auto_0%] blur-[3px] sm:blur-[2px] md:blur-[unset] select-none z-[2]"
                        />
                        <Image
                            ref={homeRadishImageRef}
                            src={"/images/home/home_radish_icon.webp"}
                            alt={""}
                            width={244}
                            height={264}
                            loading="lazy"
                            className="-mb-24 md:mb-[-114px] 3xl:mb-[-108px] ml-[-41px] 3xl:ml-[-61px] w-full max-w-[6.75rem] md:max-w-[8.875rem] 2xl:max-w-[14.1875rem] 3xl:max-w-[15.25rem] absolute inset-[auto_auto_0%_0%] select-none z-[3] 3xl:z-[4]"
                        />
                        <div className="_3d-animation">
                            <div className="ml-auto max-w-[11.75rem] md:max-w-[13.375rem] xl:max-w-[25.125rem] 3xl:max-w-[33.5rem] relative 3xl:left-[-32px] justify-start items-start pointer-events-none select-none">
                                <div className="mt-[-3.5rem] md:mt-[-4.2rem] lg:mt-[-5.6rem] xl:mt-[-7.6rem] 3xl:mt-[-10.2rem] ml-[1.4rem] sm:ml-[-2.4rem] xl:ml-[-5.7em] max-w-[48%] md:max-w-[50%] absolute">
                                    <Image
                                        src={"/images/home/home_woman_top.webp"}
                                        alt={""}
                                        width={268}
                                        height={190}
                                        sizes={"(max-width: 816px) 100vw, 816px"}
                                        loading="lazy"
                                        className="relative z-[4]"
                                    />
                                    <Image
                                        src={"/images/home/home_woman_bottom.webp"}
                                        alt={""}
                                        width={268}
                                        height={268}
                                        sizes={"(max-width: 821px) 100vw, 821px"}
                                        loading="lazy"
                                        className="mt-[-14px] xl:-mt-5 -ml-2 xl:ml-[-11px] relative"
                                    />
                                </div>
                                <Image
                                    src={"/images/home/home_men.webp"}
                                    alt={""}
                                    width={294}
                                    height={454}
                                    loading="lazy"
                                    className="mt-[-4.2rem] md:mt-[-4.8rem] lg:mt-[-6.4625rem] xl:mt-[-9.3625rem] 3xl:-mt-48 mr-[2.437rem] sm:mr-[3.4375rem] md:mr-[3.4375rem] lg:mr-16 xl:mr-28 w-full max-w-[52%] xl:max-w-[55%] absolute inset-[0%_0%_auto_auto] transform-[translateZ(-5px)] transform-3d"
                                />
                            </div>
                            <div className="home--block-group block-4 is_2025">
                                <div className="home--2col_layout always">
                                    <div className="home--image-wr video is_2025">
                                        <div className="home--group-chat-img-wr">
                                            <CustomVideo
                                                backgroundImage="/images/video/Discord_Refresh_Activities_EN-poster-00001.jpg"
                                                sources={[
                                                    {
                                                        src: "/video/home/Discord_Refresh_Activities_EN-transcode.mp4",
                                                        type: "video/mp4",
                                                    },
                                                    {
                                                        src: "/video/home/Discord_Refresh_Activities_EN-transcode.webm",
                                                        type: "video/webm",
                                                    },
                                                ]}
                                                divClassName="home--group-chat-img video _2025 w-background-video w-background-video-atom"
                                            />
                                        </div>
                                    </div>
                                    <div className="home--text-wr is-mobile-first is_2025">
                                        <h2 className="heading--h2 is_2025">always have something to do together</h2>
                                        <p className="body-text--xl new-home is_2025">Watch videos, play built-in games, listen to music, or just scroll together and spam memes. Seamlessly text, call, video chat, and play games, all&nbsp;in&nbsp;one group chat.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Background Stars */}
                <div className="select-none">
                    <Image src={"/images/home/star_lg.svg"} width={20} height={20} loading="lazy" alt={""} className="star-hero-home _2-10 star-lg" />
                    <Image src={"/images/home/star_lg.svg"} width={20} height={20} loading="lazy" alt={""} className="star-hero-home _2-8 star-lg" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-2 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _10 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-3 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-4 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-5 star-m" />
                    <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-home _2-9 star-sm" />
                    <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-home _3 star-sm" />
                    <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-home _2-6 star-sm" />
                </div>
            </section>

            <section className="mt-[-1px] pt-[7.5rem] md:pt-20 xl:pt-[10.25rem] 2xl:pt-[9.4375rem] 3xl:pt-[9.375rem] pb-[16.4375rem] md:pb-[9.125rem] 2xl:pb-[11.875rem] 3xl:pb-[18.75rem] max-h-none lg:max-h-[1030px] 3xl:max-h-none relative bg-home-texture-7-bg-image bg-[0_0] bg-93p bg-no-repeat">
                <div className="px-6 sm:px-8 md:px-10 w-full min-h-[148px] sm:min-h-[unset] 3xl:static">
                    <div className="mx-auto w-full max-w-[55.125rem] xl:max-w-[81.25rem] 2xl:max-w-[77.5rem] 3xl:max-w-[93.75rem] relative z-[4]">
                        <div className="_3d-animation">
                            <div className="home--block-group is-reverse is_2025">
                                <div className="home--2col_layout mob-revers is_2025">
                                    <div className="home--text-wr is-mobile-first is_2025 is_wherever">
                                        <h2 className="heading--h2 is_2025">wherever YOU GAME, HANG OUT HERE</h2>
                                        <div className="3xl:pr-4">
                                            <p className="body-text--xl new-home is_2025 stream">On your PC, phone, or console, you can still hang out on Discord. Easily switch between devices and use tools to manage multiple group chats with&nbsp;friends.</p>
                                        </div>
                                    </div>
                                    <div className="home--image-wr is-reverse is_2025">
                                        <div className="home--group-chat-img-wr">
                                            <CustomVideo
                                                backgroundImage="/images/video/Discord_Refresh_Platforms-poster-00001.jpg"
                                                sources={[
                                                    {
                                                        src: "/video/home/Discord_Refresh_Platforms-transcode.mp4",
                                                        type: "video/mp4",
                                                    },
                                                    {
                                                        src: "/video/home/Discord_Refresh_Platforms-transcode.webm",
                                                        type: "video/webm",
                                                    },
                                                ]}
                                                divClassName="home--group-chat-img video _2025 w-background-video w-background-video-atom"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Image
                                ref={homePanImageRef}
                                src={"/images/home/home_pan_icon.webp"}
                                alt={""}
                                width={206}
                                height={206}
                                loading="lazy"
                                className="mt-[-126px] md:mt-[-150px] 2xl:mt-[-250px] 3xl:mt-[-190px] mr-[-50px] md:mr-[19px] 3xl:mr-[133px] w-full max-w-[8.375rem] md:max-w-[9.5625rem] 2xl:max-w-[18.3125rem] 3xl:max-w-[12.875rem] absolute inset-[0%_0%_auto_auto] 3xl:blur-[7px] select-none"
                            />
                        </div>
                    </div>
                </div>
                {/* Background Stars */}
                <div className="select-none">
                    <Image src={"/images/home/star_lg.svg"} width={20} height={20} loading="lazy" alt={""} className="star-hero-home _2-1 star-lg" />
                    <Image src={"/images/home/star_lg.svg"} width={20} height={20} loading="lazy" alt={""} className="star-hero-home _2-8 vis star-lg" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-2 vr star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _10 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-3 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-4 star-m" />
                    <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-5 star-m" />
                    <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-home _2-9 star-sm" />
                    <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-home _3 star-sm" />
                    <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-home _2-6 star-sm" />
                </div>
            </section>

            <section className="mt-[-1px] 3xl:max-w-full relative bg-home-texture-7-bg-image bg-[#20269a00] bg-[50%_-25%] xl:bg-[50%_-20%] 3xl:bg-[50%_-10%] bg-1200px md:bg-cover bg-no-repeat">
                <div className="px-6 sm:px-8 md:px-10 w-full min-h-[148px] sm:min-h-[unset] relative z-[2]">
                    <div className="mx-auto w-full max-w-[55.125rem] xl:max-w-[81.25rem] relative z-[3]">
                        <div className="home is_2025 mx-auto max-w-[480px] sm:max-w-none 2xl:max-w-[1200px] 3xl:max-w-[1600px] flex flex-col flex-nowrap justify-start items-center">
                            <div className="mb-4 lg:mb-6 pb-1.5 relative overflow-visible">
                                <h2 className="heading--h2-center is_2025">YOU CAN{'\''}T SCROLL<span className="px-0 sm:pl-[1px] md:px-[1px]"> </span>ANYMORE.<br />BETTER GO CHAT.</h2>
                            </div>
                            <div className="mt-4 md:mt-6 flex flex-col sm:flex-row flex-nowrap sm:flex-wrap justify-center items-center text-center">
                                <Link
                                    href={"/download"}
                                    className="mt-0 p-[10px_16px] md:p-[12px_24px] w-full min-w-[auto] md:min-w-[237px] 2xl:min-w-[262px] max-w-none min-h-[50px] 2xl:min-h-[65px] max-h-none flex flex-[none] justify-center items-center gap-0 bg-app-white hover:bg-plum-6 bg-[16px] md:bg-[25px] bg-24px 2xl:bg-32px bg-no-repeat text-app-black font-abcgintodiscord font-normal text-[16px] md:text-[18px] 2xl:text-[20px] leading-5 md:leading-6 2xl:leading-[26px] text-center rounded-xl transition-all duration-300"
                                >
                                    <Download width={24} height={24} className="mr-2 2xl:mr-0 3xl:mr-1" />Download for Windows
                                </Link>
                            </div>
                        </div>
                        {/* Background Stars */}
                        <div className="select-none">
                            <Image src={"/images/home/star_m.svg"} width={12} height={12} loading="lazy" alt={""} className="star-hero-home _9 star-m" />
                            <Image src={"/images/home/star_lg.svg"} width={20} height={20} loading="lazy" alt={""} className="star-hero-home _1--2 star-lg" />
                            <Image src={"/images/home/star_lg.svg"} width={20} height={20} loading="lazy" alt={""} className="star-hero-home _11 star-lg" />
                        </div>
                    </div>
                </div>
                <div className="mx-auto mb-[-12px] 3xl:mb-[-18px] max-w-[59rem] 2xl:max-w-[64rem] 3xl:max-w-[88.75rem] relative select-none z-[100]">
                    <Image
                        src={"/images/home/home_banner.webp"}
                        alt={"YOU CAN'T SCROLL ANYMORE.BETTER GO CHAT."}
                        width={1420}
                        height={750}
                        sizes={"(max-width: 1439px) 100vw, 1440px"}
                        loading="lazy"
                        className="mx-auto mt-[8.125rem] 3xl:mt-[2.375rem] mb-0 w-full h-auto min-h-[auto] max-w-[58.9375rem] 2xl:max-w-[64rem] 3xl:max-w-[88.75rem] relative inset-[auto_0%_-5px_0%] xl:-bottom-1.5 3xl:bottom-[-9px] hidden md:block align-baseline 2xl:box-border 3xl:object-fill 3xl:aspect-auto"
                    />
                    <div id="discord_robot" className="3xl:mt-[8.7%] mr-auto mb-[3.75rem] 2xl:mb-12 ml-20 3xl:ml-28 max-w-[10%] max-h-none absolute inset-[auto_auto_0%_0%] hidden md:block transform-[scale(1.65)rotateX(0)rotateY(180deg)rotate(0)] transform-3d cursor-pointer select-none overflow-visible z-10">
                        <div id="robot_head" className="mb-0 sm:mb-[-45%] md:mb-[-92%] lg:mb-[-87%] xl:mb-[-43%] 2xl:mb-[-57%] 3xl:mb-[-60%] pb-0 md:pb-[3px] relative top-0 transition-transform duration-500 z-[1]">
                            <div className="ml-[-20%] md:ml-[-65.7%] lg:ml-[-64%] xl:ml-[-63%] 2xl:ml-[-65%] w-full min-w-[140%] h-auto relative top-0 z-[7]">
                                <Image
                                    src={"/images/home/home_clyde.svg"}
                                    alt={""}
                                    width={328}
                                    height={360}
                                    loading="lazy"
                                    className="max-w-none md:max-w-[177px] lg:max-w-[218px] 2xl:max-w-[236px] 3xl:max-w-[328px] scale-x-[-1] overflow-hidden box-border"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto mt-36 w-full h-full static md:absolute inset-[auto_0%_0] flex flex-col flex-nowrap items-center justify-end select-none">
                        <Image
                            src={"/images/home/home_banner_wumpus.webp"}
                            alt={""}
                            width={513}
                            height={566}
                            sizes={"(max-width: 479px) 100vw, 174px"}
                            loading="lazy"
                            className="mx-auto mb-[-37.5vw] sm:mb-[-8.8rem] md:-mb-32 3xl:-mb-48 md:w-full max-w-full sm:max-w-[23.4375rem] md:max-w-[21.5rem] 3xl:max-w-[32.0625rem] static md:absolute inset-[auto_0%_0%_10px] pointer-events-none"
                        />
                        <div className="mx-auto mb-[75vw] sm:mb-[17rem] md:mb-64 3xl:mb-[23rem] w-full max-w-full sm:max-w-[23.4375rem] md:max-w-[21.5rem] 3xl:max-w-[32.0625rem] absolute inset-[auto_0%_0%_15px]">
                            <Image
                                src={"/images/home/home_banner_wumpus_pl.webp"}
                                alt={""}
                                width={513}
                                height={149}
                                sizes={"(max-width: 688px) 100vw, 688px"}
                                loading="lazy"
                                className="mt-0 w-full max-w-full sm:max-w-[23.4375rem] md:max-w-[21.5rem] 3xl:max-w-[32.0625rem] static inset-[0%_0%_auto] md:animate-rotate-20 !duration-7s md:transform-3d md:will-change-transform pointer-events-none"
                            />
                        </div>
                    </div>
                    {/* Background Stars */}
                    <div className="select-none">
                        <Image src={"/images/home/star_lg.svg"} width={20} height={20} loading="lazy" alt={""} className="star-hero-home _2-1 star-lg" />
                        <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _10 star-m" />
                        <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-4 star-m" />
                        <Image src={"/images/home/star_m.svg"} width={8} height={8} loading="lazy" alt={""} className="star-hero-home _2-5 star-m" />
                        <Image src={"/images/home/star_sm.svg"} width={6} height={6} loading="lazy" alt={""} className="star-hero-home _2-9 star-sm" />
                    </div>
                </div>
            </section>
        </PageLayout>
    )
}
