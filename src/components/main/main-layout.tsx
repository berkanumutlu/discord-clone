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
                                                <section className="panels" aria-label="User area">
                                                    <div className="panelsWrapper"></div>
                                                    <div className="panelsContainer">
                                                        <div className="avatarWrapper" aria-label="Set Status" role="button" aria-expanded="false">
                                                            <div className="avatarContainer" aria-label="berkanumutlu, Online" role="img" aria-hidden="false">
                                                                <svg width="49" height="49" viewBox="0 0 49 49" className="avatarSVG" aria-hidden="true">
                                                                    <mask id=":r12:" width="40" height="40">
                                                                        <circle cx="20" cy="20" r="20" fill="white"></circle>
                                                                        <rect color="black" x="24" y="24" width="20" height="20" rx="10" ry="10"></rect>
                                                                    </mask>
                                                                    <foreignObject x="0" y="0" width="40" height="40" mask="url(#:r12:)">
                                                                        <div className="avatarStack">
                                                                            <Image
                                                                                src={userProfile?.imageUrl ?? placeholderImageUrl}
                                                                                alt={""}
                                                                                width={40}
                                                                                height={40}
                                                                                className="avatarImage"
                                                                            />
                                                                        </div>
                                                                    </foreignObject>
                                                                    <g transform="scale(1) translate(19, 22)">
                                                                        <svg width="30" height="18" viewBox="0 0 30 18">
                                                                            <mask id=":r13:">
                                                                                <rect x="9" y="6" width="12" height="12" rx="6" ry="6" fill="white"></rect>
                                                                                <rect x="15" y="12" width="0" height="0" rx="0" ry="0" fill="black"></rect>
                                                                                <polygon points="-2.598072,-3 2.598072,0 -2.598072,3" fill="black" transform="scale(0) translate(15.75 12)" style={{ transformOrigin: "15.75px 12px" }}></polygon>
                                                                                <circle fill="black" cx="15" cy="12" r="0"></circle>
                                                                            </mask>
                                                                            <rect fill="#43a25a" width="30" height="18" mask="url(#:r13:)"></rect>
                                                                        </svg>
                                                                        <rect x="28" y="28" width="12" height="12" fill="transparent" aria-hidden="true" className="pointer-events-auto"></rect>
                                                                    </g>
                                                                </svg>
                                                            </div>
                                                            <div className="nameTag">
                                                                <div className="panelTitleContainer">
                                                                    <div className="panelTitle">{userProfile?.name}</div>
                                                                </div>
                                                                <div className="panelSubtextContainer">
                                                                    <div className="subText">
                                                                        <div className="hoverRoll">
                                                                            <div className="hovered">berkanumutlu</div>
                                                                            <div className="hoveredDefault">
                                                                                <div className="hoveredDefaultContainer">
                                                                                    <div className="animatedText">Online</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="panelsButtons">
                                                            <Button className="panelsButtonsButton panelsMuteButton" aria-label="Mute" role="switch" aria-checked="false">
                                                                <div className="contents">
                                                                    <div className="lottieIcon">
                                                                        <Mic width={20} height={20} />
                                                                    </div>
                                                                </div>
                                                            </Button>
                                                            <Button className="panelsButtonsButton panelsDeafenButton" aria-label="Deafen" role="switch" aria-checked="false">
                                                                <div className="contents">
                                                                    <div className="lottieIcon">
                                                                        <Headphones width={20} height={20} />
                                                                    </div>
                                                                </div>
                                                            </Button>
                                                            <Button className="panelsButtonsButton panelsSettingsButton" aria-label="User Settings">
                                                                <div className="contents">
                                                                    <div className="lottieIcon">
                                                                        <Settings width={20} height={20} />
                                                                    </div>
                                                                </div>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </section>
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