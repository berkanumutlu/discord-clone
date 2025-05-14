import Image from "next/image"
import Link from "next/link"
import { CalendarDays, FacebookIcon, InstagramIcon, LaptopMinimal, Laugh, MessageSquareMore, Newspaper, PartyPopper, TwitchIcon, TwitterIcon, YoutubeIcon } from "lucide-react"
import { PageLayout } from "@/components/main/page-layout"
import ServerBannerBottom from "@/components/servers/servers-banner-bottom"
import { Button } from "@/components/ui/button"

interface ServerDetailPageProps {
    params: {
        id: string
    }
}

const ServerDetailPage = ({
    params
}: ServerDetailPageProps) => {
    const placeholderImage = "/images/placeholder.svg"
    const serverInviteUrl = "/invite/server-invite-code"

    return (
        <PageLayout
            header={{
                variant: "transparent",
                container: "normal",
                showNav: true,
            }}
        >
            <div className="relative">
                <div className="flex flex-row whitespace-pre-line break-words">
                    <div className="w-full flex flex-col items-center font-primary">
                        <div className="w-full h-[178px] lg:h-[320px] max-h-[320px] absolute top-0 bg-[#404eed]"></div>
                        <div className="mt-24 lg:mt-[120px] px-6 md:px-10 w-full max-w-[1260px] grid grid-cols-[repeat(4,1fr)] lg:grid-cols-[repeat(12,1fr)] gap-x-5 z-0">
                            <Image
                                src={placeholderImage}
                                alt={"Discovery splash banner for Server Name Discord server"}
                                width={1180}
                                height={400}
                                loading="lazy"
                                className="w-full h-[218px] lg:h-[400px] col-span-12 rounded-2xl object-cover bg-gray-700"
                            />
                        </div>
                        <div className="z-[1]">
                            <div className="mt-[-52px] px-6 md:px-10 w-full max-w-[1260px] hidden lg:grid grid-cols-[repeat(4,1fr)] lg:grid-cols-[repeat(12,1fr)] gap-x-5">
                                <Image
                                    src={placeholderImage}
                                    alt={"Discovery icon for Server Name Discord server"}
                                    width={104}
                                    height={104}
                                    loading="lazy"
                                    className="ml-12 size-12 lg:size-[104px] max-w-none border-none lg:border-8 lg:border-solid lg:border-app-white rounded-lg lg:rounded-3xl object-cover bg-gray-500"
                                />
                            </div>
                            <div className="mt-[26px] lg:mt-[18px] mb-20 lg:mb-[120px] px-6 md:px-10 w-full max-w-[1260px] lg:grid lg:grid-cols-[repeat(12,1fr)] gap-x-5">
                                <div className="lg:ml-12 flex flex-col col-span-12 lg:col-span-9">
                                    <div className="flex flex-row">
                                        <Image
                                            src={placeholderImage}
                                            alt={"Discovery icon for Server Name Discord server"}
                                            width={48}
                                            height={48}
                                            loading="lazy"
                                            className="size-12 lg:hidden rounded-lg object-cover bg-gray-500"
                                        />
                                        <div className="ml-4 lg:ml-0 flex flex-col">
                                            <div className="flex flex-row items-center">
                                                <div className="mr-2 mb-1 lg:mb-2">
                                                    <div className="size-4 lg:size-6 relative flex justify-center items-center text-app-bg-brand-experiment">
                                                        <svg className="size-full" aria-hidden="false" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="m16 7.6c0 .79-1.28 1.38-1.52 2.09s.44 2 0 2.59-1.84.35-2.46.8-.79 1.84-1.54 2.09-1.67-.8-2.47-.8-1.75 1-2.47.8-.92-1.64-1.54-2.09-2-.18-2.46-.8.23-1.84 0-2.59-1.54-1.3-1.54-2.09 1.28-1.38 1.52-2.09-.44-2 0-2.59 1.85-.35 2.48-.8.78-1.84 1.53-2.12 1.67.83 2.47.83 1.75-1 2.47-.8.91 1.64 1.53 2.09 2 .18 2.46.8-.23 1.84 0 2.59 1.54 1.3 1.54 2.09z"></path></svg>
                                                        <div className="absolute inset-[-.05px,0,0.05px] flex justify-center items-center pointer-events-none">
                                                            <svg className="size-4 lg:size-6 text-app-white" aria-hidden="false" width="16" height="16" viewBox="0 0 16 16"><path d="M10.5906 6.39993L9.19223 7.29993C8.99246 7.39993 8.89258 7.39993 8.69281 7.29993C8.59293 7.19993 8.39317 7.09993 8.29328 6.99993C7.89375 6.89993 7.5941 6.99993 7.29445 7.19993L6.79504 7.49993L4.29797 9.19993C3.69867 9.49993 2.99949 9.39993 2.69984 8.79993C2.30031 8.29993 2.50008 7.59993 2.99949 7.19993L5.99598 5.19993C6.79504 4.69993 7.79387 4.49993 8.69281 4.69993C9.49188 4.89993 10.0912 5.29993 10.5906 5.89993C10.7904 6.09993 10.6905 6.29993 10.5906 6.39993Z" fill="currentColor"></path><path d="M13.4871 7.79985C13.4871 8.19985 13.2874 8.59985 12.9877 8.79985L9.89135 10.7999C9.29206 11.1999 8.69276 11.3999 7.99358 11.3999C7.69393 11.3999 7.49417 11.3999 7.19452 11.2999C6.39545 11.0999 5.79616 10.6999 5.29674 10.0999C5.19686 9.89985 5.29674 9.69985 5.39663 9.59985L6.79499 8.69985C6.89487 8.59985 7.09463 8.59985 7.19452 8.69985C7.39428 8.79985 7.59405 8.89985 7.69393 8.99985C8.09346 8.99985 8.39311 8.99985 8.69276 8.79985L9.39194 8.39985L11.3896 6.99985L11.6892 6.79985C12.1887 6.49985 12.9877 6.59985 13.2874 7.09985C13.4871 7.39985 13.4871 7.59985 13.4871 7.79985Z" fill="currentColor"></path></svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h1 className="mb-1 lg:mb-2 font-display font-bold text-[20px] lg:text-[34px] leading-6 lg:leading-10">Server Name</h1>
                                            </div>
                                            <p className="mb-3 lg:mb-6 text-app-header-secondary font-display text-[12px] lg:text-[20px] leading-[18px] lg:leading-7">The largest community-run Server Name server. Join for news, chat, LFG, events &amp; more! For both Users and Creators.</p>
                                            <div className="mb-6 flex flex-row">
                                                <div className="flex items-center text-[12px] lg:text-[16px] leading-4 lg:leading-5">
                                                    <div className="mr-2 size-2 flex-shrink-0 bg-[#23a559] rounded-[50%]"></div>
                                                    <div className="mr-4 text-app-header-secondary font-semibold">152,217 Online</div>
                                                </div>
                                                <div className="flex items-center text-[12px] lg:text-[16px] leading-4 lg:leading-5">
                                                    <div className="mr-2 size-2 flex-shrink-0 bg-[#c4c9ce] rounded-[50%]"></div>
                                                    <div className="mr-4 text-app-header-secondary font-semibold">1,245,296 Members</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-6 lg:mb-[25px] pt-6 lg:pt-[26px] flex flex-row border-t-[1px] border-solid border-[rgba(6,6,7,.08)]">
                                        <div className="w-full flex flex-col items-center">
                                            <div className="w-full max-w-[1260px] grid grid-cols-[repeat(4,1fr)] lg:grid-cols-[repeat(12,1fr)] gap-x-5">
                                                <div className="mb-6 flex items-center col-span-6">
                                                    <div className="p-2.5 size-10 flex justify-center items-center bg-[rgb(249,249,249)] text-app-not-quite-black rounded-[20px]">
                                                        <MessageSquareMore className="w-5" />
                                                    </div>
                                                    <div className="ml-4 flex flex-col justify-center">
                                                        <div className="text-app-text-muted-2 text-[12px] leading-4">How chatty?</div>
                                                        <div className="text-app-text-normal-2 text-[16px] leading-5">Like a busy coffee shop</div>
                                                    </div>
                                                </div>
                                                <div className="mb-6 flex items-center col-span-6">
                                                    <div className="p-2.5 size-10 flex justify-center items-center bg-[rgb(249,249,249)] text-app-not-quite-black rounded-[20px]">
                                                        <CalendarDays className="w-5" />
                                                    </div>
                                                    <div className="ml-4 flex flex-col justify-center">
                                                        <div className="text-app-text-muted-2 text-[12px] leading-4">Server created</div>
                                                        <div className="text-app-text-normal-2 text-[16px] leading-5">February 19th, 2016</div>
                                                    </div>
                                                </div>
                                                <div className="mb-6 flex items-center col-span-6">
                                                    <div className="p-2.5 size-10 flex justify-center items-center bg-[rgb(249,249,249)] text-app-not-quite-black rounded-[20px]">
                                                        <Laugh className="w-5" />
                                                    </div>
                                                    <div className="ml-4 flex flex-col justify-center">
                                                        <div className="text-app-text-normal-2 text-[16px] leading-5">Chat with other players or creators on Server Name!</div>
                                                    </div>
                                                </div>
                                                <div className="mb-6 flex items-center col-span-6">
                                                    <div className="p-2.5 size-10 flex justify-center items-center bg-[rgb(249,249,249)] text-app-not-quite-black rounded-[20px]">
                                                        <Newspaper className="w-5" />
                                                    </div>
                                                    <div className="ml-4 flex flex-col justify-center">
                                                        <div className="text-app-text-normal-2 text-[16px] leading-5">Get the latest in Server Name news!</div>
                                                    </div>
                                                </div>
                                                <div className="mb-6 flex items-center col-span-6">
                                                    <div className="p-2.5 size-10 flex justify-center items-center bg-[rgb(249,249,249)] text-app-not-quite-black rounded-[20px]">
                                                        <PartyPopper className="w-5" />
                                                    </div>
                                                    <div className="ml-4 flex flex-col justify-center">
                                                        <div className="text-app-text-normal-2 text-[16px] leading-5">Participate in fun events, such as game nights!</div>
                                                    </div>
                                                </div>
                                                <div className="mb-6 flex items-center col-span-6">
                                                    <div className="p-2.5 size-10 flex justify-center items-center bg-[rgb(249,249,249)] text-app-not-quite-black rounded-[20px]">
                                                        <LaptopMinimal className="w-5" />
                                                    </div>
                                                    <div className="ml-4 flex flex-col justify-center">
                                                        <div className="text-app-text-normal-2 text-[16px] leading-5">We have creator focused channels!</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-6 lg:mb-[25px] pt-6 lg:pt-[25px] flex flex-col border-t-[1px] border-solid border-[rgba(6,6,7,.08)] [&_div.server-text-section]:mt-6 [&_div.server-text-section:first-child]:mt-0">
                                        <div className="server-text-section">
                                            <h2 className="mb-2 text-app-header-primary font-display font-bold text-[20px] leading-6">About</h2>
                                            <div className="text-app-text-normal-2 text-[14px] lg:text-[16px] leading-[18px] lg:leading-5">
                                                <div className="font-primary text-inherit select-text [&_p]:mt-2 [&_p:first-child]:mt-0">
                                                    <p>We are the largest community-run Server Name Discord. Join for news, chat, LFG, events &amp; more! We have channels for both Players and Creators.</p>
                                                    <p>Our server features Server Name inspired emoji and stickers, which you can use in other servers if you have Discord nitro.</p>
                                                    <p>Be sure to read the rules before chatting in the server!</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="server-text-section">
                                            <h2 className="mb-2 text-app-header-primary font-display font-bold text-[20px] leading-6">Supported Languages</h2>
                                            <div className="text-app-text-normal-2 text-[14px] lg:text-[16px] leading-[18px] lg:leading-5">English, Turkish</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6 lg:pt-0 lg:mr-12 mb-6 lg:mb-0 col-span-12 lg:col-span-3 border-t-[1px] lg:border-none border-solid border-[rgba(6,6,7,.08)]">
                                    <Link
                                        href={serverInviteUrl}
                                        className="mb-3 p-[2px_16px] w-full min-w-24 h-[38px] min-h-[38px] relative hidden lg:flex justify-center items-center bg-app-bg-brand-experiment hover:bg-app-bg-brand-experiment-560 text-app-white text-[14px] leading-4 border-none rounded-[3px] no-underline transition-colors duration-170 ease select-none"
                                    >
                                        <span className="my-0 mx-auto text-ellipsis whitespace-nowrap overflow-hidden">Join Server</span>
                                    </Link>
                                    <div className="relative hidden lg:block">
                                        <Button
                                            className="mb-3 p-[2px_16px] w-full min-w-24 h-[38px] min-h-[38px] relative flex justify-center items-center bg-[rgb(128,132,142)] hover:bg-[rgb(148,155,164)] text-app-white text-[14px] leading-4 border-none rounded-[3px] transition-colors duration-170 ease select-none"
                                        >
                                            <div>Share Server</div>
                                        </Button>
                                    </div>
                                    <div className="lg:mt-6 flex flex-col">
                                        <h3 className="my-2 text-app-header-secondary font-display font-bold text-[12px] leading-4 uppercase">Categories</h3>
                                        <div className="-mr-2 -mb-2 flex flex-row flex-wrap">
                                            <div className="mr-2 mb-2 px-4 h-8 flex flex-row justify-center items-center bg-[rgb(249,249,249)] rounded capitalize">
                                                <div className="text-app-header-secondary text-[14px] leading-[18px]">Fandom</div>
                                            </div>
                                            <div className="mr-2 mb-2 px-4 h-8 flex flex-row justify-center items-center bg-[rgb(249,249,249)] rounded capitalize">
                                                <div className="text-app-header-secondary text-[14px] leading-[18px]">Mobile</div>
                                            </div>
                                            <div className="mr-2 mb-2 px-4 h-8 flex flex-row justify-center items-center bg-[rgb(249,249,249)] rounded capitalize">
                                                <div className="text-app-header-secondary text-[14px] leading-[18px]">Gaming</div>
                                            </div>
                                            <div className="mr-2 mb-2 px-4 h-8 flex flex-row justify-center items-center bg-[rgb(249,249,249)] rounded capitalize">
                                                <div className="text-app-header-secondary text-[14px] leading-[18px]">General Chatting</div>
                                            </div>
                                            <div className="mr-2 mb-2 px-4 h-8 flex flex-row justify-center items-center bg-[rgb(249,249,249)] rounded capitalize">
                                                <div className="text-app-header-secondary text-[14px] leading-[18px]">Console</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex flex-col">
                                        <h3 className="my-2 text-app-header-secondary font-display font-bold text-[12px] leading-4 uppercase">Social</h3>
                                        <div className="-mr-2 -mb-2 flex flex-row flex-wrap">
                                            <Link
                                                href={"youtube.com"}
                                                className="mr-2 mb-2 size-10 flex justify-center items-center bg-[rgb(249,249,249)] text-app-text-normal-2 no-underline rounded-[20px]"
                                            >
                                                <YoutubeIcon className="size-6" />
                                            </Link>
                                            <Link
                                                href={"twitter.com"}
                                                className="mr-2 mb-2 size-10 flex justify-center items-center bg-[rgb(249,249,249)] text-app-text-normal-2 no-underline rounded-[20px]"
                                            >
                                                <TwitterIcon className="size-6" />
                                            </Link>
                                            <Link
                                                href={"facebook.com"}
                                                className="mr-2 mb-2 size-10 flex justify-center items-center bg-[rgb(249,249,249)] text-app-text-normal-2 no-underline rounded-[20px]"
                                            >
                                                <FacebookIcon className="size-6" />
                                            </Link>
                                            <Link
                                                href={"instagram.com"}
                                                className="mr-2 mb-2 size-10 flex justify-center items-center bg-[rgb(249,249,249)] text-app-text-normal-2 no-underline rounded-[20px]"
                                            >
                                                <InstagramIcon className="size-6" />
                                            </Link>
                                            <Link
                                                href={"twitch.tv"}
                                                className="mr-2 mb-2 size-10 flex justify-center items-center bg-[rgb(249,249,249)] text-app-text-normal-2 no-underline rounded-[20px]"
                                            >
                                                <TwitchIcon className="size-6" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full fixed bottom-0 lg:hidden bg-app-white z-[100]">
                            <Link href={serverInviteUrl} className="m-[16px_24px] p-[2px_16px] w-auto min-w-24 h-10 min-h-[38px] relative flex justify-center items-center bg-app-bg-brand-experiment text-app-white text-[14px] leading-4 border-none rounded-[3px] transition-colors duration-170 ease select-none" >
                                <span className="my-0 mx-auto text-ellipsis whitespace-nowrap overflow-hidden">Join Server</span>
                            </Link>
                        </div>
                        <ServerBannerBottom />
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default ServerDetailPage