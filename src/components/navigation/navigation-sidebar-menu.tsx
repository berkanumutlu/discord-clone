import { db } from "@/lib/db"
import { currentProfile } from "@/lib/current-profile"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NavigationActions } from "@/components/navigation/navigation-actions"
import { NavigationActionItem } from "@/components/navigation/navigation-action-item"
import { NavigationServerItem } from "@/components/navigation/navigation-server-item"
import NavigationSeperatorItem from "@/components/navigation/navigation-seperator-item"
import { AppLogo } from "@/components/main/app-logo"
import { UserButton } from "@clerk/nextjs"

export const NavigationSidebarMenu = async () => {
    const userProfile = await currentProfile()
    let servers

    if (userProfile) {
        servers = await db.server.findMany({
            where: {
                members: {
                    some: {
                        profileId: userProfile.id
                    }
                }
            }
        })
    }

    return (
        <nav className="sidebarNavigation" aria-label="Servers sidebar">
            <div className="unreadMentionsIndicatorTop">
                <div className="unreadMentionsBar">
                    <span className="unreadMentionsBarText">new</span>
                </div>
            </div>
            <ul className="tree" role="tree">
                <div className="itemsContainer">
                    <ScrollArea className="scrollArea scrollNone">
                        <NavigationActionItem
                            label="Direct Messages"
                            href={"/channels/@me"}
                            showTutorialContainer={true}
                        >
                            <AppLogo href="" type="icon" color="black" width={22} height={17} />
                        </NavigationActionItem>
                        <NavigationSeperatorItem />
                        {servers?.map((server) => (
                            <NavigationServerItem key={server.id} id={server.id} name={server.name} imageUrl={server?.imageUrl} />
                        ))}
                        <NavigationActions />
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-[48px] h-[48px] hover:rounded-[16px] transition-all overflow-hidden"
                                }
                            }}
                        />
                    </ScrollArea>
                </div>
            </ul>
            <div className="unreadMentionsIndicatorBottom">
                <div className="unreadMentionsBar">
                    <span className="unreadMentionsBarText">new</span>
                </div>
            </div>
        </nav>
    )
}