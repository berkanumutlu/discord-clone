"use client"

import { forwardRef } from "react"
import { MemberRole } from "@prisma/client"
import { Bell, CalendarPlus, ChevronDown, CirclePlus, FolderPlus, Gamepad2, Gem, LogOut, Pencil, Settings, Shield, UserPlus, X } from "lucide-react"
import { useModal } from "@/hooks/use-modal-store"
import { ServerWithMembersWithProfiles } from "@/types"
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ContextMenuGroup, ContextMenuItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger } from "@/components/ui/context-menu"
import { DropdownWithContextMenu } from "@/components/dropdown-with-context-menu"
import { CustomRadioButtonIndicatorIcon } from "@/components/icon/custom-radio-button-indicator-icon"

interface ServerSidebarHeaderProps {
    server: ServerWithMembersWithProfiles
    userRole?: MemberRole
}

export const ServerSidebarHeader = ({
    server,
    userRole,
}: ServerSidebarHeaderProps) => {
    return (
        <DropdownWithContextMenu
            dropdownMenuTrigger={<ServerSidebarHeaderTrigger server={server} />}
            dropdownMenuContent={<ServerSidebarHeaderDropdownMenuContent server={server} userRole={userRole} />}
            contextMenuContent={<ServerSidebarHeaderContextMenuContent server={server} userRole={userRole} />}
        />
    )
}

const ServerSidebarHeaderTrigger = forwardRef<HTMLDivElement, { server: ServerSidebarHeaderProps["server"] }>(
    ({ server }, ref) => {
        return (
            <div ref={ref} className="serverSidebarHeaderContainer">
                <header className="serverSidebarHeader">
                    <div className="serverSidebarHeaderContent">
                        <h2 className="serverSidebarHeaderContentTitle">{server.name}</h2>
                        <div className="serverSidebarHeaderButton" aria-label={`${server.name}, server actions`} role="button" tabIndex={0}></div>
                        <div className="headerChildren">
                            <ChevronDown className="inline group-data-[state=open]:hidden" />
                            <X className="hidden group-data-[state=open]:inline" />
                        </div>
                    </div>
                </header>
            </div>
        )
    }
)
ServerSidebarHeaderTrigger.displayName = "ServerSidebarHeaderTrigger"

const ServerSidebarHeaderDropdownMenuContent = forwardRef<HTMLDivElement, ServerSidebarHeaderProps>(
    ({ server, userRole }, ref) => {
        const { onOpen } = useModal()
        const isAdmin = userRole === MemberRole.ADMIN
        const isModerator = isAdmin || userRole === MemberRole.MODERATOR

        return (
            <div ref={ref} id="guild-header-popout" className="serverSidebarHeaderMenu fixedHeaderMenu" aria-label="Server Actions" role="menu" tabIndex={-1}>
                <div className="serverSidebarHeaderMenuScroller">
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            id="guild-header-popout-premium-subscribe"
                            className="serverSidebarHeaderMenuItem"
                        >
                            <div className="serverSidebarHeaderMenuItemLabel">Server Boost</div>
                            <div className="serverSidebarHeaderMenuItemIconContainer"><Gem /></div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        {isModerator && (
                            <DropdownMenuItem
                                id="guild-header-popout-invite-people"
                                className="serverSidebarHeaderMenuItem"
                                onClick={() => onOpen("invitePeople", { server })}
                            >
                                <div className="serverSidebarHeaderMenuItemLabel">Invite People</div>
                                <div className="serverSidebarHeaderMenuItemIconContainer"><UserPlus /></div>
                            </DropdownMenuItem>
                        )}
                        {isAdmin && (
                            <DropdownMenuItem
                                id="guild-header-popout-settings"
                                className="serverSidebarHeaderMenuItem"
                                onClick={() => onOpen("editServer", { server })}
                            >
                                <div className="serverSidebarHeaderMenuItemLabel">Server Settings</div>
                                <div className="serverSidebarHeaderMenuItemIconContainer"><Settings /></div>
                            </DropdownMenuItem>
                        )}
                        {isModerator && (
                            <DropdownMenuItem
                                id="guild-header-popout-create-channel"
                                className="serverSidebarHeaderMenuItem"
                                onClick={() => onOpen("createChannel")}
                            >
                                <div className="serverSidebarHeaderMenuItemLabel">Create Channel</div>
                                <div className="serverSidebarHeaderMenuItemIconContainer"><CirclePlus /></div>
                            </DropdownMenuItem>
                        )}
                        {isModerator && (
                            <DropdownMenuItem
                                id="guild-header-popout-create-category"
                                className="serverSidebarHeaderMenuItem"
                            >
                                <div className="serverSidebarHeaderMenuItemLabel">Create Category</div>
                                <div className="serverSidebarHeaderMenuItemIconContainer"><FolderPlus /></div>
                            </DropdownMenuItem>
                        )}
                        {isModerator && (
                            <DropdownMenuItem
                                id="guild-header-popout-create-event"
                                className="serverSidebarHeaderMenuItem"
                            >
                                <div className="serverSidebarHeaderMenuItemLabel">Create Event</div>
                                <div className="serverSidebarHeaderMenuItemIconContainer"><CalendarPlus /></div>
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                            id="guild-header-popout-application-directory"
                            className="serverSidebarHeaderMenuItem"
                        >
                            <div className="serverSidebarHeaderMenuItemLabel">App Directory</div>
                            <div className="serverSidebarHeaderMenuItemIconContainer"><Gamepad2 /></div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            id="guild-header-popout-notifications"
                            className="serverSidebarHeaderMenuItem"
                        >
                            <div className="serverSidebarHeaderMenuItemLabel">Notification Settings</div>
                            <div className="serverSidebarHeaderMenuItemIconContainer"><Bell /></div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            id="guild-header-popout-privacy"
                            className="serverSidebarHeaderMenuItem"
                        >
                            <div className="serverSidebarHeaderMenuItemLabel">Privacy Settings</div>
                            <div className="serverSidebarHeaderMenuItemIconContainer"><Shield /></div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            id="guild-header-popout-change-nickname"
                            className="serverSidebarHeaderMenuItem"
                        >
                            <div className="serverSidebarHeaderMenuItemLabel">Edit Per-server Profile</div>
                            <div className="serverSidebarHeaderMenuItemIconContainer"><Pencil /></div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            asChild
                            id="guild-header-popout-hide-muted-channels"
                            role="menuitemcheckbox"
                            className="serverSidebarHeaderMenuItem"
                            onSelect={(e) => e.preventDefault()}
                        >
                            <Label
                                htmlFor="hide-muted-channels"
                                onClick={(e) => { e.stopPropagation() }}
                            >
                                <div className="serverSidebarHeaderMenuItemLabel">Hide Muted Channels</div>
                                <div className="serverSidebarHeaderMenuItemIconContainer">
                                    <Checkbox id="hide-muted-channels" />
                                </div>
                            </Label>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            id="guild-header-popout-leave"
                            className="serverSidebarHeaderMenuItem serverSidebarHeaderMenuItemDanger"
                            onClick={() => onOpen(isAdmin ? "deleteServer" : "leaveServer", { server })}
                        >
                            <div className="serverSidebarHeaderMenuItemLabel">Leave Server</div>
                            <div className="serverSidebarHeaderMenuItemIconContainer"><LogOut /></div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </div>
            </div>
        )
    }
)
ServerSidebarHeaderDropdownMenuContent.displayName = "ServerSidebarHeaderDropdownMenuContent"

const ServerSidebarHeaderContextMenuContent = ({ server, userRole }: ServerSidebarHeaderProps) => {
    const { onOpen } = useModal()
    const isAdmin = userRole === MemberRole.ADMIN
    const isModerator = isAdmin || userRole === MemberRole.MODERATOR

    return (
        <div id="guild-context" className="serverSidebarHeaderMenu flexibleHeaderMenu" aria-label="Server Actions" role="menu" tabIndex={-1}>
            <div className="serverSidebarHeaderMenuScroller">
                <ContextMenuGroup>
                    <ContextMenuItem
                        id="guild-context-mark-guild-read"
                        className="serverSidebarHeaderMenuItem"
                    >
                        <div className="serverSidebarHeaderMenuItemLabel">Mark as Read</div>
                    </ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                {isModerator && (
                    <>
                        <ContextMenuItem
                            id="guild-context-invite-people"
                            className="serverSidebarHeaderMenuItem"
                            onClick={() => onOpen("invitePeople", { server })}
                        >
                            <div className="serverSidebarHeaderMenuItemLabel">Invite People</div>
                        </ContextMenuItem>
                        <ContextMenuSeparator />
                    </>
                )}
                <ContextMenuGroup>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger
                            inset
                            id="guild-context-mute-guild"
                            className="serverSidebarHeaderMenuItem"
                        >
                            <div className="serverSidebarHeaderMenuItemLabel">Mute Server</div>
                        </ContextMenuSubTrigger>
                        <ContextMenuSubContent className="serverSidebarHeaderSubMenuContainer">
                            <div className="serverSidebarHeaderMenu subHeaderMenu">
                                <div className="serverSidebarHeaderMenuScroller">
                                    <ContextMenuItem
                                        id="guild-context-mute-guild--900"
                                        className="serverSidebarHeaderMenuItem"
                                    >
                                        <div className="serverSidebarHeaderMenuItemLabel">For 15 Minutes</div>
                                    </ContextMenuItem>
                                    <ContextMenuItem
                                        id="guild-context-mute-guild--3600"
                                        className="serverSidebarHeaderMenuItem"
                                    >
                                        <div className="serverSidebarHeaderMenuItemLabel">For 1 Hour</div>
                                    </ContextMenuItem>
                                    <ContextMenuItem
                                        id="guild-context-mute-guild--10800"
                                        className="serverSidebarHeaderMenuItem"
                                    >
                                        <div className="serverSidebarHeaderMenuItemLabel">For 3 Hours</div>
                                    </ContextMenuItem>
                                    <ContextMenuItem
                                        id="guild-context-mute-guild--28800"
                                        className="serverSidebarHeaderMenuItem"
                                    >
                                        <div className="serverSidebarHeaderMenuItemLabel">For 8 Hours</div>
                                    </ContextMenuItem>
                                    <ContextMenuItem
                                        id="guild-context-mute-guild--86400"
                                        className="serverSidebarHeaderMenuItem"
                                    >
                                        <div className="serverSidebarHeaderMenuItemLabel">For 24 Hours</div>
                                    </ContextMenuItem>
                                    <ContextMenuItem
                                        id="guild-context-mute-guild---1"
                                        className="serverSidebarHeaderMenuItem"
                                    >
                                        <div className="serverSidebarHeaderMenuItemLabel">Until I turn it back on</div>
                                    </ContextMenuItem>
                                </div>
                            </div>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger
                            inset
                            id="guild-context-guild-notifications"
                            className="serverSidebarHeaderMenuItem"
                        >
                            <div className="serverSidebarHeaderMenuItemLabel">
                                Notification Settings
                                <div className="serverSidebarHeaderMenuItemLabelSubText">All Messages</div>
                            </div>
                        </ContextMenuSubTrigger>
                        <ContextMenuSubContent className="serverSidebarHeaderSubMenuContainer">
                            <div className="serverSidebarHeaderMenu subHeaderMenu">
                                <div className="serverSidebarHeaderMenuScroller">
                                    <ContextMenuRadioGroup value="0">
                                        <ContextMenuRadioItem
                                            value="0"
                                            id="guild-context-guild-notifications--0"
                                            className="serverSidebarHeaderMenuItem serverSidebarHeaderMenuRadioItem"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">All Messages</div>
                                            <div className="serverSidebarHeaderMenuItemIconContainer"><CustomRadioButtonIndicatorIcon checked={true} /></div>
                                        </ContextMenuRadioItem>
                                        <ContextMenuRadioItem
                                            value="1"
                                            id="guild-context-guild-notifications--1"
                                            className="serverSidebarHeaderMenuItem serverSidebarHeaderMenuRadioItem"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">Only <strong>@mentions</strong></div>
                                            <div className="serverSidebarHeaderMenuItemIconContainer"><CustomRadioButtonIndicatorIcon checked={false} /></div>
                                        </ContextMenuRadioItem>
                                        <ContextMenuRadioItem
                                            value="2"
                                            id="guild-context-guild-notifications--2"
                                            className="serverSidebarHeaderMenuItem serverSidebarHeaderMenuRadioItem"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">Nothing</div>
                                            <div className="serverSidebarHeaderMenuItemIconContainer"><CustomRadioButtonIndicatorIcon checked={false} /></div>
                                        </ContextMenuRadioItem>
                                    </ContextMenuRadioGroup>
                                    <ContextMenuSeparator />
                                    <ContextMenuGroup>
                                        <ContextMenuItem
                                            asChild
                                            id="guild-context-guild-notifications--suppress-everyone"
                                            role="menuitemcheckbox"
                                            className="serverSidebarHeaderMenuItem"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <Label
                                                htmlFor="context-guild-notifications--suppress-everyone"
                                                onClick={(e) => { e.stopPropagation() }}
                                            >
                                                <div className="serverSidebarHeaderMenuItemLabel">Suppress <strong>@everyone</strong> and <strong>@here</strong></div>
                                                <div className="serverSidebarHeaderMenuItemIconContainer">
                                                    <Checkbox id="context-guild-notifications--suppress-everyone" />
                                                </div>
                                            </Label>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            asChild
                                            id="guild-context-guild-notifications--suppress-roles"
                                            role="menuitemcheckbox"
                                            className="serverSidebarHeaderMenuItem"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <Label
                                                htmlFor="context-guild-notifications--suppress-roles"
                                                onClick={(e) => { e.stopPropagation() }}
                                            >
                                                <div className="serverSidebarHeaderMenuItemLabel">Suppress All Role <strong>@mentions</strong></div>
                                                <div className="serverSidebarHeaderMenuItemIconContainer">
                                                    <Checkbox id="context-guild-notifications--suppress-roles" />
                                                </div>
                                            </Label>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            asChild
                                            id="guild-context-guild-notifications--suppress-highlights"
                                            role="menuitemcheckbox"
                                            className="serverSidebarHeaderMenuItem"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <Label
                                                htmlFor="context-guild-notifications--suppress-highlights"
                                                onClick={(e) => { e.stopPropagation() }}
                                            >
                                                <div className="serverSidebarHeaderMenuItemLabel">Suppress Highlights</div>
                                                <div className="serverSidebarHeaderMenuItemIconContainer">
                                                    <Checkbox id="context-guild-notifications--suppress-highlights" />
                                                </div>
                                            </Label>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            asChild
                                            id="guild-context-guild-notifications--mute-events"
                                            role="menuitemcheckbox"
                                            className="serverSidebarHeaderMenuItem"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <Label
                                                htmlFor="context-guild-notifications--mute-events"
                                                onClick={(e) => { e.stopPropagation() }}
                                            >
                                                <div className="serverSidebarHeaderMenuItemLabel">Mute New Events</div>
                                                <div className="serverSidebarHeaderMenuItemIconContainer">
                                                    <Checkbox id="context-guild-notifications--mute-events" />
                                                </div>
                                            </Label>
                                        </ContextMenuItem>
                                    </ContextMenuGroup>
                                    <ContextMenuSeparator />
                                    <ContextMenuGroup>
                                        <ContextMenuItem
                                            asChild
                                            id="guild-context-guild-notifications--mobile-push"
                                            role="menuitemcheckbox"
                                            className="serverSidebarHeaderMenuItem"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <Label
                                                htmlFor="context-guild-notifications--mobile-push"
                                                onClick={(e) => { e.stopPropagation() }}
                                            >
                                                <div className="serverSidebarHeaderMenuItemLabel">Mobile Push Notifications</div>
                                                <div className="serverSidebarHeaderMenuItemIconContainer">
                                                    <Checkbox id="context-guild-notifications--mobile-push" />
                                                </div>
                                            </Label>
                                        </ContextMenuItem>
                                    </ContextMenuGroup>
                                </div>
                            </div>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuItem
                        asChild
                        id="guild-context-hide-muted-channels"
                        role="menuitemcheckbox"
                        className="serverSidebarHeaderMenuItem"
                        onSelect={(e) => e.preventDefault()}
                    >
                        <Label
                            htmlFor="context-hide-muted-channels"
                            onClick={(e) => { e.stopPropagation() }}
                        >
                            <div className="serverSidebarHeaderMenuItemLabel">Hide Muted Channels</div>
                            <div className="serverSidebarHeaderMenuItemIconContainer">
                                <Checkbox id="context-hide-muted-channels" />
                            </div>
                        </Label>
                    </ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuGroup>
                    {isAdmin && (
                        <ContextMenuSub>
                            <ContextMenuSubTrigger
                                inset
                                id="guild-context-guild-settings"
                                className="serverSidebarHeaderMenuItem"
                            >
                                <div className="serverSidebarHeaderMenuItemLabel">Server Settings</div>
                            </ContextMenuSubTrigger>
                            <ContextMenuSubContent className="serverSidebarHeaderSubMenuContainer">
                                <div className="serverSidebarHeaderMenu subHeaderMenu">
                                    <div className="serverSidebarHeaderMenuScroller">
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--PROFILE"
                                            className="serverSidebarHeaderMenuItem"
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">Server Profile</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--BOOST_PERKS"
                                            className="serverSidebarHeaderMenuItem"
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">Boost Perks</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--EMOJI"
                                            className="serverSidebarHeaderMenuItem"
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">Emoji</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--STICKERS"
                                            className="serverSidebarHeaderMenuItem"
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">Stickers</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--SOUNDBOARD"
                                            className="serverSidebarHeaderMenuItem"
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">Soundboard</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--MEMBERS"
                                            className="serverSidebarHeaderMenuItem"
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">Members</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--ROLES"
                                            className="serverSidebarHeaderMenuItem"
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">Roles</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--INVITES"
                                            className="serverSidebarHeaderMenuItem"
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">Invites</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--ACCESS"
                                            className="serverSidebarHeaderMenuItem"
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">Access</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--INTEGRATIONS"
                                            className="serverSidebarHeaderMenuItem"
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">Integrations</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--APP_DIRECTORY"
                                            className="serverSidebarHeaderMenuItem"
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">App Directory</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--MODERATION"
                                            className="serverSidebarHeaderMenuItem"
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">Safety Setup</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--AUDIT_LOG"
                                            className="serverSidebarHeaderMenuItem"
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">Audit Log</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--BANS"
                                            className="serverSidebarHeaderMenuItem"
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">Bans</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--GUILD_AUTOMOD"
                                            className="serverSidebarHeaderMenuItem"
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">AutoMod</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--COMMUNITY"
                                            className="serverSidebarHeaderMenuItem"
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">Community Settings</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--GUILD_PREMIUM"
                                            className="serverSidebarHeaderMenuItem"
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">Server Boost Status</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--GUILD_TEMPLATES"
                                            className="serverSidebarHeaderMenuItem"
                                        >
                                            <div className="serverSidebarHeaderMenuItemLabel">Server Template</div>
                                        </ContextMenuItem>
                                    </div>
                                </div>
                            </ContextMenuSubContent>
                        </ContextMenuSub>
                    )}
                    <ContextMenuItem
                        id="guild-context-privacy"
                        className="serverSidebarHeaderMenuItem"
                    >
                        <div className="serverSidebarHeaderMenuItemLabel">Privacy Settings</div>
                    </ContextMenuItem>
                    <ContextMenuItem
                        id="guild-context-change-nickname"
                        className="serverSidebarHeaderMenuItem"
                    >
                        <div className="serverSidebarHeaderMenuItemLabel">Edit Per-server Profile</div>
                    </ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                {isModerator && (
                    <>
                        <ContextMenuGroup>
                            <ContextMenuItem
                                id="guild-context-create-channel"
                                className="serverSidebarHeaderMenuItem"
                                onClick={() => onOpen("createChannel")}
                            >
                                <div className="serverSidebarHeaderMenuItemLabel">Create Channel</div>
                            </ContextMenuItem>
                            <ContextMenuItem
                                id="guild-context-create-category"
                                className="serverSidebarHeaderMenuItem"
                            >
                                <div className="serverSidebarHeaderMenuItemLabel">Create Category</div>
                            </ContextMenuItem>
                            <ContextMenuItem
                                id="guild-context-create-event"
                                className="serverSidebarHeaderMenuItem"
                            >
                                <div className="serverSidebarHeaderMenuItemLabel">Create Event</div>
                            </ContextMenuItem>
                        </ContextMenuGroup>
                        <ContextMenuSeparator />
                    </>
                )}
                <ContextMenuGroup>
                    <ContextMenuItem
                        id="guild-context-leave-guild"
                        className="serverSidebarHeaderMenuItem serverSidebarHeaderMenuItemDanger"
                        onClick={() => onOpen(isAdmin ? "deleteServer" : "leaveServer", { server })}
                    >
                        <div className="serverSidebarHeaderMenuItemLabel">Leave Server</div>
                    </ContextMenuItem>
                </ContextMenuGroup>
            </div>
        </div>
    )
}