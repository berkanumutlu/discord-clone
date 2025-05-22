"use client"

import { Fragment, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Atom, ChevronDown, CircleXIcon, Compass, Gamepad2, GraduationCap, Music4, Search, Tv } from "lucide-react"
import { PageLayout } from "@/components/main/page-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CustomPagination } from "@/components/main/custom-pagination"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ServerBannerBottom from "@/components/servers/servers-banner-bottom"
import ServerInfoCardItem from "@/components/servers/server-info-card-item"

const ServersPage = () => {
    const [searchValue, setSearchValue] = useState("")
    const [isSearchInputFocused, setIsSearchInputFocused] = useState(false)

    const handleSearchInputClear = () => {
        setSearchValue("")
    }

    const handleSearchInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            // TODO: Search actions
        }
    }

    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = 3788

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <PageLayout
            header={{
                container: "normal",
                position: "static",
                navStyle: "basic",
            }}
            footer={{
                footerStyle: "basic"
            }}
        >
            <div className="mb-[15px] lg:mb-12 relative overflow-x-hidden">
                <Image
                    src={"/images/servers/9c65f9d27736d97cc7c7eb8f26d3e1c1.svg"}
                    alt={""}
                    width={405}
                    height={400}
                    priority
                    className="h-[400px] absolute left-[-1px] hidden lg:block select-none z-[1]"
                />
                <Image
                    src={"/images/servers/d678ad252b16006ca7056b4884866714.svg"}
                    alt={""}
                    width={405}
                    height={400}
                    loading="lazy"
                    className="h-[400px] absolute right-[-1px] hidden lg:block select-none z-[1]"
                />
                <div className="w-full h-full relative bg-[linear-gradient(#4E1BF5,#6668EB)]">
                    <Image
                        src={"/images/servers/1897ff969a451c312dec38ab32c66060.svg"}
                        alt={""}
                        width={5000}
                        height={400}
                        loading="lazy"
                        className="ml-[50%] max-w-none relative translate-x-[-50%] select-none"
                    />
                    <div className="w-full h-full absolute top-0 flex justify-center items-center z-[1]">
                        <div className="m-[0_40px] lg:mt-10 lg:mx-[330px] w-full text-left lg:text-center">
                            <h1 className="font-abcgintonordextrabold font-extrabold text-app-white text-[28px] lg:text-[44px] leading-[95%] uppercase">Find your community on discord</h1>
                            <div className="mt-4 text-app-white font-medium text-[16px] leading-[18px]">From gaming, to music, to learning, there’s a place for you.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col items-center">
                <div className="px-6 md:px-10 w-full max-w-[1260px] grid grid-cols-[repeat(4,1fr)] md:grid-cols-[repeat(8,1fr)] lg:grid-cols-[repeat(12,1fr)] gap-x-5">
                    <div className="mb-3 lg:mb-10 h-[40px] lg:h-[52px] flex col-span-12 lg:col-span-10 lg:col-start-2">
                        <div className="mr-3 lg:mr-4 pr-3 lg:pr-4 h-auto flex flex-[1] items-center bg-app-bg-input text-[14px] lg:text-[16px] rounded-lg focus-within:shadow-[0_0_0_1px_#5b43f0,0_0_0_2px_#bdb3f9,0_0_0_3px_#bdb3f9]">
                            <div className="flex flex-[1] flex-col">
                                <Input
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    onKeyDown={handleSearchInputKeyDown}
                                    onFocus={() => setIsSearchInputFocused(true)}
                                    onBlur={() => setIsSearchInputFocused(false)}
                                    type="text"
                                    placeholder="Explore communities"
                                    maxLength={100}
                                    aria-label="Explore popular communities"
                                    autoComplete="off"
                                    className="p-3 lg:p-4 w-full h-[26px] bg-transparent font-medium !text-[16px] !leading-4 border-none focus:border-app-text-link rounded-[3px] transition-colors duration-200 ease-in-out select-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-offset-0 focus-visible:!shadow-none"
                                />
                            </div>
                            {searchValue.length > 1 && isSearchInputFocused && (
                                <div className="mt-1 mr-2 text-[12px] leading-[1.625] select-none peer-focus:bg-red-600">&quot;ENTER&quot; to Search</div>
                            )}
                            {searchValue.length > 0 && (
                                <div className="leading-[0]">
                                    <CircleXIcon onClick={handleSearchInputClear} className="!size-[1.4rem] text-app-interactive-normal hover:text-primary/70 hover:dark:text-primary/90 transition-colors duration-200 rotate-90 cursor-pointer" />
                                </div>
                            )}
                        </div>
                        <Button className="p-0 w-[40px] lg:w-[52px] min-w-[unset] h-auto min-h-[unset] relative flex justify-center items-center bg-none bg-app-bg-button-2 hover:bg-app-bg-button-2-hover text-[14px] leading-4 border-none rounded-lg transition-colors duration-170 ease select-none">
                            <div className="my-0 mx-auto text-ellipsis whitespace-nowrap overflow-hidden">
                                <Search className="!size-5 dark:invert" />
                            </div>
                        </Button>
                    </div>
                </div>
                <div className="px-6 md:px-10 w-full max-w-[1260px] grid grid-cols-[repeat(4,1fr)] md:grid-cols-[repeat(8,1fr)] lg:grid-cols-[repeat(12,1fr)] gap-x-5">
                    <div className="mb-[38px] lg:mb-0 h-10 lg:h-auto col-span-12 lg:col-span-3 lg:col-start-2 z-[1]">
                        <div className="hidden lg:block z-[1]">
                            <div className="mr-2 mb-3 p-[10px_12px] lg:p-[11px_14px] flex flex-row items-center bg-app-dim-grey/15 rounded-lg lg:rounded transition-colors duration-300 ease cursor-pointer">
                                <div className="mr-[14px] h-full flex items-center">
                                    <Compass className="size-5" />
                                </div>
                                <div className="w-full flex flex-row justify-between text-[16px] leading-5
                                font-semibold">
                                    <span>All</span>
                                    <span className="pl-2">31352</span>
                                </div>
                            </div>
                            <div className="mr-2 mb-3 p-[10px_12px] lg:p-[11px_14px] flex flex-row items-center bg-app-bg-secondary lg:bg-transparent hover:bg-app-dim-grey/15 rounded-lg lg:rounded transition-colors duration-300 ease cursor-pointer">
                                <div className="mr-[14px] h-full flex items-center">
                                    <Gamepad2 className="size-5" />
                                </div>
                                <div className="w-full flex flex-row justify-between text-[16px] leading-5">
                                    <span>Gaming</span>
                                    <span className="pl-2">23562</span>
                                </div>
                            </div>
                            <div className="mr-2 mb-3 p-[10px_12px] lg:p-[11px_14px] flex flex-row items-center bg-app-bg-secondary lg:bg-transparent hover:bg-app-dim-grey/15 rounded-lg lg:rounded transition-colors duration-300 ease cursor-pointer">
                                <div className="mr-[14px] h-full flex items-center">
                                    <Tv className="size-5" />
                                </div>
                                <div className="w-full flex flex-row justify-between text-[16px] leading-5">
                                    <span>Entertainment</span>
                                    <span className="pl-2">13148</span>
                                </div>
                            </div>
                            <div className="mr-2 mb-3 p-[10px_12px] lg:p-[11px_14px] flex flex-row items-center bg-app-bg-secondary lg:bg-transparent hover:bg-app-dim-grey/15 rounded-lg lg:rounded transition-colors duration-300 ease cursor-pointer">
                                <div className="mr-[14px] h-full flex items-center">
                                    <GraduationCap className="size-5" />
                                </div>
                                <div className="w-full flex flex-row justify-between text-[16px] leading-5">
                                    <span>Education</span>
                                    <span className="pl-2">2489</span>
                                </div>
                            </div>
                            <div className="mr-2 mb-3 p-[10px_12px] lg:p-[11px_14px] flex flex-row items-center bg-app-bg-secondary lg:bg-transparent hover:bg-app-dim-grey/15 rounded-lg lg:rounded transition-colors duration-300 ease cursor-pointer">
                                <div className="mr-[14px] h-full flex items-center">
                                    <Atom className="size-5" />
                                </div>
                                <div className="w-full flex flex-row justify-between text-[16px] leading-5">
                                    <span>Science & Tech</span>
                                    <span className="pl-2">2398</span>
                                </div>
                            </div>
                            <div className="mr-2 mb-3 p-[10px_12px] lg:p-[11px_14px] flex flex-row items-center bg-app-bg-secondary lg:bg-transparent hover:bg-app-dim-grey/15 rounded-lg lg:rounded transition-colors duration-300 ease cursor-pointer">
                                <div className="mr-[14px] h-full flex items-center">
                                    <Music4 className="size-5" />
                                </div>
                                <div className="w-full flex flex-row justify-between text-[16px] leading-5">
                                    <span>Music</span>
                                    <span className="pl-2">2255</span>
                                </div>
                            </div>
                        </div>
                        <div className="block lg:hidden">
                            <DropdownMenu>
                                <DropdownMenuTrigger className="group p-[11px_12px] w-full flex justify-between items-center border border-solid border-[rgba(79,84,92,.6)] rounded">
                                    <div className="text-[14px] leading-[18px]">Categories</div>
                                    <ChevronDown className="!size-6 transition duration-200 group-data-[state=open]:rotate-180" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-full"
                                    style={{ minWidth: 'var(--radix-dropdown-menu-trigger-width)' }}
                                >
                                    <DropdownMenuItem className="bg-app-dim-grey/15">
                                        <div className="mr-[14px] h-full flex items-center">
                                            <Compass className="size-5" />
                                        </div>
                                        <div className="w-full flex flex-row justify-between text-[16px] leading-5
                                font-semibold">
                                            <span>All</span>
                                            <span className="pl-2">(31352)</span>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <div className="mr-[14px] h-full flex items-center">
                                            <Gamepad2 className="size-5" />
                                        </div>
                                        <div className="w-full flex flex-row justify-between text-[16px] leading-5">
                                            <span>Gaming</span>
                                            <span className="pl-2">(23562)</span>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <div className="mr-[14px] h-full flex items-center">
                                            <Tv className="size-5" />
                                        </div>
                                        <div className="w-full flex flex-row justify-between text-[16px] leading-5">
                                            <span>Entertainment</span>
                                            <span className="pl-2">(13148)</span>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <div className="mr-[14px] h-full flex items-center">
                                            <GraduationCap className="size-5" />
                                        </div>
                                        <div className="w-full flex flex-row justify-between text-[16px] leading-5">
                                            <span>Education</span>
                                            <span className="pl-2">(2489)</span>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <div className="mr-[14px] h-full flex items-center">
                                            <Atom className="size-5" />
                                        </div>
                                        <div className="w-full flex flex-row justify-between text-[16px] leading-5">
                                            <span>Science & Tech</span>
                                            <span className="pl-2">(2398)</span>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <div className="mr-[14px] h-full flex items-center">
                                            <Music4 className="size-5" />
                                        </div>
                                        <div className="w-full flex flex-row justify-between text-[16px] leading-5">
                                            <span>Music</span>
                                            <span className="pl-2">(2255)</span>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-7">
                        <div className="lg:mb-4 hidden lg:block">
                            <div className="text-primary/85 font-bold text-[20px] leading-6">44772 Results Found</div>
                        </div>
                        <div>
                            {[...Array(12)].map((item, index) => (
                                <Fragment key={index}>
                                    <ServerInfoCardItem />
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="px-6 md:px-10 w-full max-w-[1260px] grid grid-cols-[repeat(4,1fr)] md:grid-cols-[repeat(8,1fr)] lg:grid-cols-[repeat(12,1fr)] gap-x-5">
                    <div className="mt-[22px] w-full col-start-1 col-span-12">
                        <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </div>
                </div>
            </div >
            <div className="mt-[120px] pt-12 lg:pt-24 pb-6 lg:pb-[72px] w-full bg-app-blurple text-app-white text-center">
                <h4 className="mx-6 font-display font-bold text-[24px] lg:text-[32px] leading-[120%]">Have a server you want to add to Discovery?</h4>
                <Link
                    href={"https://support.discord.com/hc/en-us/articles/4673515000983-Discord-Server-Web-Pages"}
                    className="my-6 p-[14.5px_38.5px] inline-flex items-center bg-app-not-quite-black hover:bg-app-bg-button-hover text-app-white font-medium text-[20px] leading-6 no-underline rounded-[28px] hover:shadow-[0_8px_15px_rgba(0,0,0,.2)] transition-all duration-200 ease-in-out"
                >Make Your Community Public</Link>
            </div>
            <ServerBannerBottom />
        </PageLayout >
    )
}

export default ServersPage