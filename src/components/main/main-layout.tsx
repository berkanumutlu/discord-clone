import "../../../public/styles/main.css"
import { ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { CircleHelp, Headphones, Inbox, Mic, Settings, Users } from "lucide-react"
import { currentProfile } from "@/lib/current-profile"
import { placeholderImageUrl } from "@/data/globalData"
import { NavigationSidebarMenu } from "@/components/navigation/navigation-sidebar-menu"
import { Button } from "@/components/ui/button"
import { ActionTooltip } from "@/components/action-tooltip"

export default async function MainLayoutComponent({
    children,
    PageSidebarMenu,
}: {
    children: ReactNode
    PageSidebarMenu?: ReactNode
}) {
    const userProfile = await currentProfile()

    return (
        <div className="min-h-0 flex flex-[1_1_auto] flex-row">
            <div className="min-w-0 flex-[1]">
                <div className="h-full static z-auto">
                    <div className="absolute inset-0 flex flex-col bg-app-bg-tertiary-3">
                        <div className="min-w-0 min-h-0 relative flex flex-[1_1_auto] flex-col overflow-hidden">
                            <div className="absolute inset-0 flex flex-col bg-transparent overflow-hidden">
                                <div className="size-full relative flex overflow-hidden">
                                    <div className="baseLayout">
                                        <div className="bar">
                                            <div className="titleSection">
                                                <div className="titleContent">
                                                    <Users width={16} height={16} fill="none" role="img" />
                                                    <div className="titleText">Friends</div>
                                                </div>
                                            </div>
                                            <div className="leadingSection"></div>
                                            <div className="trailingSection">
                                                <div className="recentsIcon">
                                                    <ActionTooltip side="bottom" sideOffset={8} label="Inbox" contentClassName="font-medium text-[14px] leading-4">
                                                        <div className="buttonDiv" aria-label="Inbox" role="button">
                                                            <Inbox width={20} height={20} fill="none" role="img" />
                                                        </div>
                                                    </ActionTooltip>
                                                </div>
                                                <ActionTooltip side="bottom" sideOffset={8} label="Help" contentClassName="font-medium text-[14px] leading-4">
                                                    <Link
                                                        href={"https://support.discord.com"}
                                                        className="anchorLink"
                                                        target="_blank"
                                                        rel="noreferrer noopener"
                                                    >
                                                        <div className="buttonDiv">
                                                            <CircleHelp width={24} height={24} fill="none" role="img" />
                                                        </div>
                                                    </Link>
                                                </ActionTooltip>
                                            </div>
                                        </div>
                                        <div className="content">
                                            <div className="sidebar">
                                                <NavigationSidebarMenu />
                                                <div className="sidebarList">{PageSidebarMenu}</div>
                                                <div className="sidebarResizeHandle" aria-label="Resize Sidebar" role="button" tabIndex={0}></div>
                                            </div>
                                            <div className="page">
                                                {children}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}