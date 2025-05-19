import Image from "next/image"
import Link from "next/link"
import { signUpUrl } from "@/data"

const ServerBannerBottom = () => {
    return (
        <div className="py-12 lg:py-[120px] lg:w-full flex flex-col lg:flex-row lg:justify-center bg-app-off-white dark:bg-app-dark-off-white">
            <div className="px-6 md:px-10 w-full max-w-[1260px] grid grid-cols-[repeat(4,1fr)] md:grid-cols-[repeat(8,1fr)] lg:grid-cols-[repeat(12,1fr)] gap-x-5">
                <div className="flex lg:hidden justify-center col-span-12 lg:col-span-7">
                    <Image
                        src={"/images/servers/3c7040a5863c9c1d22a74089216c50dc.webp"}
                        alt={""}
                        width={678}
                        height={440}
                        loading="lazy"
                        className="w-full max-w-[678px] max-h-[440px]"
                    />
                </div>
                <div className="mx-12 mb-4 flex flex-col items-center lg:justify-center col-span-12 lg:col-span-5">
                    <div className="mb-4 lg:mb-6 self-start text-app-header-primary font-display font-bold text-[24px] lg:text-[32px] leading-[30px] lg:leading-[40px]">
                        Find a place where you belong
                    </div>
                    <div className="mb-4 lg:mb-6 self-start text-app-text-normal-2 font-primary text-[16px] lg:text-[20px] leading-5 lg:leading-6">
                        Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.
                    </div>
                    <Link href={signUpUrl} className="p-[16px_32px] w-[327px] h-[53px] inline-flex justify-center items-center bg-app-not-quite-black dark:bg-app-black hover:bg-app-bg-button-hover hover:dark:bg-plum-22 text-app-white font-[350] text-[20px] leading-6 no-underline rounded-[28px] hover:shadow-[0_8px_15px_rgba(0,0,0,.2)] transition-all duration-200 ease-in-out">Join Discord</Link>
                </div>
                <div className="hidden lg:flex justify-center col-span-12 lg:col-span-7 z-[1]">
                    <Image
                        src={"/images/servers/3c7040a5863c9c1d22a74089216c50dc.webp"}
                        alt={""}
                        width={678}
                        height={440}
                        loading="lazy"
                        className="w-full max-w-[678px] max-h-[440px] select-none"
                    />
                </div>
            </div>
        </div>
    )
}

export default ServerBannerBottom