"use client"

import Link from "next/link"
import { AlignLeft, X } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetOverlay, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Logo } from "../logo"
import { navigationMenuItems } from "./navigation-menu-custom"
import NavigationBurgerMenuItem from "./navigation-burger-menu-item"

interface NavigationBurgerMenuProps {
    authButtonText: string
    authButtonLink: string
}

const NavigationBurgerMenu = ({
    authButtonText,
    authButtonLink,
}: NavigationBurgerMenuProps) => {
    return (
        <Sheet>
            <SheetTrigger asChild className="flex lg:hidden justify-center items-center">
                <Button variant="ghost" size="icon" className="w-10 h-10 relative flex flex-none justify-center items-center bg-app-white/10 hover:bg-app-white/30 text-app-white rounded-[.875rem] transition-colors duration-500 overflow-hidden cursor-pointer touch-manipulation">
                    <AlignLeft className="!w-6 !h-6 flex justify-center items-center" />
                </Button>
            </SheetTrigger>
            <SheetOverlay className="w-full h-screen bg-[#000c] absolute inset-[0 0% 0% auto] block backdrop-blur-[20px] z-[102]" />
            <SheetContent
                side="right"
                onPointerDownOutside={e => e.preventDefault()}
                onInteractOutside={e => e.preventDefault()} // For mobile long-press
                className="ml-auto p-6 md:p-8 w-full sm:w-1/2 h-full !max-w-[unset] flex flex-col justify-start items-stretch gap-y-4 bg-app-blurple border-l-0 rounded-none md:rounded-tl-[2.5rem] md:rounded-bl-[2.5rem] z-[102] [&>button:first-of-type]:hidden">
                <SheetHeader className="mb-12 space-y-0 flex flex-row justify-between items-center self-stretch">
                    <SheetTitle>
                        <Logo type="icon" width={32} height={23} />
                    </SheetTitle>
                    <SheetDescription>
                        <SheetClose asChild>
                            <button
                                className="relative size-10 flex justify-center items-center bg-app-white/10 text-app-white font-abcgintodiscord rounded-[.875rem] transition-colors duration-400"
                                aria-label="Close"
                            >
                                <X className="size-6 flex justify-center items-center" />
                            </button>
                        </SheetClose>
                    </SheetDescription>
                </SheetHeader>
                <Accordion type="single" collapsible className="hide-scrollbar mb-32 pl-0 w-full flex flex-1 flex-col justify-start items-stretch gap-x-2 bg-transparent overflow-auto">
                    {navigationMenuItems.map((item, index) => {
                        return (<NavigationBurgerMenuItem key={index} item={item} />)
                    })}
                </Accordion>
                <div className="mt-auto px-8 pb-8 absolute inset-[auto_0%_0%] flex flex-col flex-nowrap justify-between items-stretch self-stretch gap-x-3 gap-y-3">
                    <Link
                        href={authButtonLink}
                        className="my-0 p-[.75rem_1rem] relative float-left flex flex-1 justify-center items-center gap-x-3 gap-y-3 bg-transparent text-app-white font-abcgintodiscord font-medium text-sm leading-[1.3] no-underline tracking-[.25px] border-2 border-solid border-app-white/10 rounded-2xl text-center transition-colors duration-400"
                    >
                        {authButtonText}
                    </Link>
                    <Link
                        href="/download"
                        className="my-0 p-[.75rem_1rem] relative float-left flex flex-1 justify-center items-center gap-x-1 gap-y-1 bg-app-white text-app-black font-abcgintodiscord font-medium text-sm leading-[1.3] no-underline tracking-[.25px] rounded-2xl text-center transition-colors duration-400"
                    >
                        Download for Windows
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default NavigationBurgerMenu