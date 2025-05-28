import Image from "next/image"
import Link from "next/link"
import { placeholderImageUrl } from "@/data"

const ServerInfoCard = () => {
    return (
        <div className="mb-4 lg:mb-5 p-2 w-full h-auto inline-block hover:bg-[rgba(106,116,128,.16)] rounded-lg transition-colors duration-300 ease">
            <Link
                href={"/servers/detail/123"}
                className="flex flex-row text-app-text-link font-primary no-underline"
            >
                <Image
                    src={placeholderImageUrl}
                    alt={"Discovery splash banner for Server Name Discord server"}
                    width={1500}
                    height={500}
                    loading="lazy"
                    className="mr-4 w-full max-w-64 h-36 hidden lg:block rounded-lg object-cover z-[1] bg-gray-700"
                />
                <Image
                    src={placeholderImageUrl}
                    alt={"Discovery icon for Server Name Discord server"}
                    width={24}
                    height={24}
                    loading="lazy"
                    className="mr-4 lg:mr-2 size-10 lg:size-6 lg:hidden rounded-lg bg-gray-500"
                />
                <div className="flex flex-col">
                    <div className="lg:mb-2 flex flex-row lg:items-center">
                        <div className="lg:mr-2 lg:h-8 hidden lg:block z-[1]">
                            <Image
                                src={placeholderImageUrl}
                                alt={"Discovery icon for Server Name Discord server"}
                                width={24}
                                height={24}
                                loading="lazy"
                                className="lg:w-6 lg:h-6 rounded-lg bg-gray-500"
                            />
                        </div>
                        <div className="text-app-bg-primary font-bold text-[16px] leading-[18px]">Server Name</div>
                    </div>
                    <div className="mb-2 text-app-bg-primary font-medium text-[14px] leading-[18px]">The largest community-run Server Name server. Join for news, chat, LFG, events & more! For both Users and Creators.</div>
                    <div className="flex flex-row text-app-header-secondary font-medium text-[12px] leading-4">
                        <div className="flex items-center">
                            <div>233,086 Online</div>
                        </div>
                        <div className="m-[auto_8px] size-1 bg-app-bg-button-secondary rounded-[50%]"></div>
                        <div className="flex items-center">
                            <div>1,240,816 Members</div>
                        </div>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-2">
                        <div className="p-[4px_8px] w-fit hidden lg:flex flex-row bg-app-bg-input rounded">
                            <div className="mr-1">
                                <div className="items-center">
                                    <div className="size-4 relative flex justify-center items-center text-app-bg-brand-experiment">
                                        <svg className="size-full" aria-hidden="false" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="m16 7.6c0 .79-1.28 1.38-1.52 2.09s.44 2 0 2.59-1.84.35-2.46.8-.79 1.84-1.54 2.09-1.67-.8-2.47-.8-1.75 1-2.47.8-.92-1.64-1.54-2.09-2-.18-2.46-.8.23-1.84 0-2.59-1.54-1.3-1.54-2.09 1.28-1.38 1.52-2.09-.44-2 0-2.59 1.85-.35 2.48-.8.78-1.84 1.53-2.12 1.67.83 2.47.83 1.75-1 2.47-.8.91 1.64 1.53 2.09 2 .18 2.46.8-.23 1.84 0 2.59 1.54 1.3 1.54 2.09z"></path></svg>
                                        <div className="absolute inset-[-.05px,0,0.05px] flex justify-center items-center pointer-events-none">
                                            <svg className="size-full text-app-white" aria-hidden="false" width="16" height="16" viewBox="0 0 16 16"><path d="M10.5906 6.39993L9.19223 7.29993C8.99246 7.39993 8.89258 7.39993 8.69281 7.29993C8.59293 7.19993 8.39317 7.09993 8.29328 6.99993C7.89375 6.89993 7.5941 6.99993 7.29445 7.19993L6.79504 7.49993L4.29797 9.19993C3.69867 9.49993 2.99949 9.39993 2.69984 8.79993C2.30031 8.29993 2.50008 7.59993 2.99949 7.19993L5.99598 5.19993C6.79504 4.69993 7.79387 4.49993 8.69281 4.69993C9.49188 4.89993 10.0912 5.29993 10.5906 5.89993C10.7904 6.09993 10.6905 6.29993 10.5906 6.39993Z" fill="currentColor"></path><path d="M13.4871 7.79985C13.4871 8.19985 13.2874 8.59985 12.9877 8.79985L9.89135 10.7999C9.29206 11.1999 8.69276 11.3999 7.99358 11.3999C7.69393 11.3999 7.49417 11.3999 7.19452 11.2999C6.39545 11.0999 5.79616 10.6999 5.29674 10.0999C5.19686 9.89985 5.29674 9.69985 5.39663 9.59985L6.79499 8.69985C6.89487 8.59985 7.09463 8.59985 7.19452 8.69985C7.39428 8.79985 7.59405 8.89985 7.69393 8.99985C8.09346 8.99985 8.39311 8.99985 8.69276 8.79985L9.39194 8.39985L11.3896 6.99985L11.6892 6.79985C12.1887 6.49985 12.9877 6.59985 13.2874 7.09985C13.4871 7.39985 13.4871 7.59985 13.4871 7.79985Z" fill="currentColor"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-app-bg-primary  font-bold text-[12px] leading-4 uppercase">Partnered</div>
                        </div>
                        <div className="p-[4px_8px] w-fit hidden lg:flex flex-row bg-app-bg-input rounded">
                            <div className="mr-1">
                                <div className="items-center">
                                    <div className="size-4 relative flex justify-center items-center text-app-bg-brand-experiment">
                                        <svg className="size-full text-[#23A559]" aria-hidden="false" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="m16 7.6c0 .79-1.28 1.38-1.52 2.09s.44 2 0 2.59-1.84.35-2.46.8-.79 1.84-1.54 2.09-1.67-.8-2.47-.8-1.75 1-2.47.8-.92-1.64-1.54-2.09-2-.18-2.46-.8.23-1.84 0-2.59-1.54-1.3-1.54-2.09 1.28-1.38 1.52-2.09-.44-2 0-2.59 1.85-.35 2.48-.8.78-1.84 1.53-2.12 1.67.83 2.47.83 1.75-1 2.47-.8.91 1.64 1.53 2.09 2 .18 2.46.8-.23 1.84 0 2.59 1.54 1.3 1.54 2.09z"></path></svg>
                                        <div className="absolute inset-[-.05px,0,0.05px] flex justify-center items-center pointer-events-none">
                                            <svg className="size-full text-app-white" aria-hidden="false" width="16" height="16" viewBox="0 0 16 16"><path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-app-bg-primary  font-bold text-[12px] leading-4 uppercase">Verified</div>
                        </div>
                        <div className="p-[4px_8px] w-fit hidden lg:flex flex-row bg-app-bg-input rounded">
                            <div className="mr-1">
                                <div className="items-center">
                                    <div className="size-4 relative flex justify-center items-center text-app-bg-brand-experiment">
                                        <svg className="size-full text-[#23A559]" aria-hidden="false" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="m16 7.6c0 .79-1.28 1.38-1.52 2.09s.44 2 0 2.59-1.84.35-2.46.8-.79 1.84-1.54 2.09-1.67-.8-2.47-.8-1.75 1-2.47.8-.92-1.64-1.54-2.09-2-.18-2.46-.8.23-1.84 0-2.59-1.54-1.3-1.54-2.09 1.28-1.38 1.52-2.09-.44-2 0-2.59 1.85-.35 2.48-.8.78-1.84 1.53-2.12 1.67.83 2.47.83 1.75-1 2.47-.8.91 1.64 1.53 2.09 2 .18 2.46.8-.23 1.84 0 2.59 1.54 1.3 1.54 2.09z"></path></svg>
                                        <div className="absolute inset-[-.05px,0,0.05px] flex justify-center items-center pointer-events-none">
                                            <svg className="size-full text-app-white" aria-hidden="false" width="16" height="16" viewBox="0 0 16 16"><path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-app-bg-primary  font-bold text-[12px] leading-4 uppercase">Verified & Partnered</div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ServerInfoCard