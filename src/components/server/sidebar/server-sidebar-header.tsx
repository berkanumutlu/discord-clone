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
            <div ref={ref} id="guild-header-popout" className="dropdownMenu fixedDropdownMenu" aria-label="Server Actions" role="menu" tabIndex={-1}>
                <div className="dropdownMenuScroller">
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            id="guild-header-popout-premium-subscribe"
                            className="dropdownMenuItem"
                        >
                            <div className="dropdownMenuItemLabel">Server Boost</div>
                            <div className="dropdownMenuItemIconContainer"><Gem /></div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        {isModerator && (
                            <DropdownMenuItem
                                id="guild-header-popout-invite-people"
                                className="dropdownMenuItem"
                                onClick={() => onOpen("invitePeople", { server })}
                            >
                                <div className="dropdownMenuItemLabel">Invite People</div>
                                <div className="dropdownMenuItemIconContainer"><UserPlus /></div>
                            </DropdownMenuItem>
                        )}
                        {isAdmin && (
                            <DropdownMenuItem
                                id="guild-header-popout-settings"
                                className="dropdownMenuItem"
                                onClick={() => onOpen("editServer", { server })}
                            >
                                <div className="dropdownMenuItemLabel">Server Settings</div>
                                <div className="dropdownMenuItemIconContainer"><Settings /></div>
                            </DropdownMenuItem>
                        )}
                        {isModerator && (
                            <DropdownMenuItem
                                id="guild-header-popout-create-channel"
                                className="dropdownMenuItem"
                                onClick={() => onOpen("createChannel")}
                            >
                                <div className="dropdownMenuItemLabel">Create Channel</div>
                                <div className="dropdownMenuItemIconContainer"><CirclePlus /></div>
                            </DropdownMenuItem>
                        )}
                        {isModerator && (
                            <DropdownMenuItem
                                id="guild-header-popout-create-category"
                                className="dropdownMenuItem"
                            >
                                <div className="dropdownMenuItemLabel">Create Category</div>
                                <div className="dropdownMenuItemIconContainer"><FolderPlus /></div>
                            </DropdownMenuItem>
                        )}
                        {isModerator && (
                            <DropdownMenuItem
                                id="guild-header-popout-create-event"
                                className="dropdownMenuItem"
                            >
                                <div className="dropdownMenuItemLabel">Create Event</div>
                                <div className="dropdownMenuItemIconContainer"><CalendarPlus /></div>
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                            id="guild-header-popout-application-directory"
                            className="dropdownMenuItem"
                        >
                            <div className="dropdownMenuItemLabel">App Directory</div>
                            <div className="dropdownMenuItemIconContainer"><Gamepad2 /></div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            id="guild-header-popout-notifications"
                            className="dropdownMenuItem"
                        >
                            <div className="dropdownMenuItemLabel">Notification Settings</div>
                            <div className="dropdownMenuItemIconContainer"><Bell /></div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            id="guild-header-popout-privacy"
                            className="dropdownMenuItem"
                        >
                            <div className="dropdownMenuItemLabel">Privacy Settings</div>
                            <div className="dropdownMenuItemIconContainer"><Shield /></div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            id="guild-header-popout-change-nickname"
                            className="dropdownMenuItem"
                        >
                            <div className="dropdownMenuItemLabel">Edit Per-server Profile</div>
                            <div className="dropdownMenuItemIconContainer"><Pencil /></div>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            asChild
                            id="guild-header-popout-hide-muted-channels"
                            role="menuitemcheckbox"
                            className="dropdownMenuItem"
                            onSelect={(e) => e.preventDefault()}
                        >
                            <Label
                                htmlFor="hide-muted-channels"
                                onClick={(e) => { e.stopPropagation() }}
                            >
                                <div className="dropdownMenuItemLabel">Hide Muted Channels</div>
                                <div className="dropdownMenuItemIconContainer">
                                    <Checkbox id="hide-muted-channels" />
                                </div>
                            </Label>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            id="guild-header-popout-leave"
                            className="dropdownMenuItem dropdownMenuItemDanger"
                            onClick={() => onOpen(isAdmin ? "deleteServer" : "leaveServer", { server })}
                        >
                            <div className="dropdownMenuItemLabel">Leave Server</div>
                            <div className="dropdownMenuItemIconContainer"><LogOut /></div>
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
        <div id="guild-context" className="dropdownMenu flexibleDropdownMenu" aria-label="Server Actions" role="menu" tabIndex={-1}>
            <div className="dropdownMenuScroller">
                <ContextMenuGroup>
                    <ContextMenuItem
                        id="guild-context-mark-guild-read"
                        className="dropdownMenuItem"
                    >
                        <div className="dropdownMenuItemLabel">Mark as Read</div>
                    </ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                {isModerator && (
                    <>
                        <ContextMenuItem
                            id="guild-context-invite-people"
                            className="dropdownMenuItem"
                            onClick={() => onOpen("invitePeople", { server })}
                        >
                            <div className="dropdownMenuItemLabel">Invite People</div>
                        </ContextMenuItem>
                        <ContextMenuSeparator />
                    </>
                )}
                <ContextMenuGroup>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger
                            inset
                            id="guild-context-mute-guild"
                            className="dropdownMenuItem"
                        >
                            <div className="dropdownMenuItemLabel">Mute Server</div>
                        </ContextMenuSubTrigger>
                        <ContextMenuSubContent className="subDropdownMenuContainer">
                            <div className="dropdownMenu subDropdownMenu">
                                <div className="dropdownMenuScroller">
                                    <ContextMenuItem
                                        id="guild-context-mute-guild--900"
                                        className="dropdownMenuItem"
                                    >
                                        <div className="dropdownMenuItemLabel">For 15 Minutes</div>
                                    </ContextMenuItem>
                                    <ContextMenuItem
                                        id="guild-context-mute-guild--3600"
                                        className="dropdownMenuItem"
                                    >
                                        <div className="dropdownMenuItemLabel">For 1 Hour</div>
                                    </ContextMenuItem>
                                    <ContextMenuItem
                                        id="guild-context-mute-guild--10800"
                                        className="dropdownMenuItem"
                                    >
                                        <div className="dropdownMenuItemLabel">For 3 Hours</div>
                                    </ContextMenuItem>
                                    <ContextMenuItem
                                        id="guild-context-mute-guild--28800"
                                        className="dropdownMenuItem"
                                    >
                                        <div className="dropdownMenuItemLabel">For 8 Hours</div>
                                    </ContextMenuItem>
                                    <ContextMenuItem
                                        id="guild-context-mute-guild--86400"
                                        className="dropdownMenuItem"
                                    >
                                        <div className="dropdownMenuItemLabel">For 24 Hours</div>
                                    </ContextMenuItem>
                                    <ContextMenuItem
                                        id="guild-context-mute-guild---1"
                                        className="dropdownMenuItem"
                                    >
                                        <div className="dropdownMenuItemLabel">Until I turn it back on</div>
                                    </ContextMenuItem>
                                </div>
                            </div>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger
                            inset
                            id="guild-context-guild-notifications"
                            className="dropdownMenuItem"
                        >
                            <div className="dropdownMenuItemLabel">
                                Notification Settings
                                <div className="dropdownMenuItemLabelSubText">All Messages</div>
                            </div>
                        </ContextMenuSubTrigger>
                        <ContextMenuSubContent className="subDropdownMenuContainer">
                            <div className="dropdownMenu subDropdownMenu">
                                <div className="dropdownMenuScroller">
                                    <ContextMenuRadioGroup value="0">
                                        <ContextMenuRadioItem
                                            value="0"
                                            id="guild-context-guild-notifications--0"
                                            className="dropdownMenuItem dropdownMenuRadioItem"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <div className="dropdownMenuItemLabel">All Messages</div>
                                            <div className="dropdownMenuItemIconContainer"><CustomRadioButtonIndicatorIcon checked={true} /></div>
                                        </ContextMenuRadioItem>
                                        <ContextMenuRadioItem
                                            value="1"
                                            id="guild-context-guild-notifications--1"
                                            className="dropdownMenuItem dropdownMenuRadioItem"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <div className="dropdownMenuItemLabel">Only <strong>@mentions</strong></div>
                                            <div className="dropdownMenuItemIconContainer"><CustomRadioButtonIndicatorIcon checked={false} /></div>
                                        </ContextMenuRadioItem>
                                        <ContextMenuRadioItem
                                            value="2"
                                            id="guild-context-guild-notifications--2"
                                            className="dropdownMenuItem dropdownMenuRadioItem"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <div className="dropdownMenuItemLabel">Nothing</div>
                                            <div className="dropdownMenuItemIconContainer"><CustomRadioButtonIndicatorIcon checked={false} /></div>
                                        </ContextMenuRadioItem>
                                    </ContextMenuRadioGroup>
                                    <ContextMenuSeparator />
                                    <ContextMenuGroup>
                                        <ContextMenuItem
                                            asChild
                                            id="guild-context-guild-notifications--suppress-everyone"
                                            role="menuitemcheckbox"
                                            className="dropdownMenuItem"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <Label
                                                htmlFor="context-guild-notifications--suppress-everyone"
                                                onClick={(e) => { e.stopPropagation() }}
                                            >
                                                <div className="dropdownMenuItemLabel">Suppress <strong>@everyone</strong> and <strong>@here</strong></div>
                                                <div className="dropdownMenuItemIconContainer">
                                                    <Checkbox id="context-guild-notifications--suppress-everyone" />
                                                </div>
                                            </Label>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            asChild
                                            id="guild-context-guild-notifications--suppress-roles"
                                            role="menuitemcheckbox"
                                            className="dropdownMenuItem"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <Label
                                                htmlFor="context-guild-notifications--suppress-roles"
                                                onClick={(e) => { e.stopPropagation() }}
                                            >
                                                <div className="dropdownMenuItemLabel">Suppress All Role <strong>@mentions</strong></div>
                                                <div className="dropdownMenuItemIconContainer">
                                                    <Checkbox id="context-guild-notifications--suppress-roles" />
                                                </div>
                                            </Label>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            asChild
                                            id="guild-context-guild-notifications--suppress-highlights"
                                            role="menuitemcheckbox"
                                            className="dropdownMenuItem"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <Label
                                                htmlFor="context-guild-notifications--suppress-highlights"
                                                onClick={(e) => { e.stopPropagation() }}
                                            >
                                                <div className="dropdownMenuItemLabel">Suppress Highlights</div>
                                                <div className="dropdownMenuItemIconContainer">
                                                    <Checkbox id="context-guild-notifications--suppress-highlights" />
                                                </div>
                                            </Label>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            asChild
                                            id="guild-context-guild-notifications--mute-events"
                                            role="menuitemcheckbox"
                                            className="dropdownMenuItem"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <Label
                                                htmlFor="context-guild-notifications--mute-events"
                                                onClick={(e) => { e.stopPropagation() }}
                                            >
                                                <div className="dropdownMenuItemLabel">Mute New Events</div>
                                                <div className="dropdownMenuItemIconContainer">
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
                                            className="dropdownMenuItem"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <Label
                                                htmlFor="context-guild-notifications--mobile-push"
                                                onClick={(e) => { e.stopPropagation() }}
                                            >
                                                <div className="dropdownMenuItemLabel">Mobile Push Notifications</div>
                                                <div className="dropdownMenuItemIconContainer">
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
                        className="dropdownMenuItem"
                        onSelect={(e) => e.preventDefault()}
                    >
                        <Label
                            htmlFor="context-hide-muted-channels"
                            onClick={(e) => { e.stopPropagation() }}
                        >
                            <div className="dropdownMenuItemLabel">Hide Muted Channels</div>
                            <div className="dropdownMenuItemIconContainer">
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
                                className="dropdownMenuItem"
                            >
                                <div className="dropdownMenuItemLabel">Server Settings</div>
                            </ContextMenuSubTrigger>
                            <ContextMenuSubContent className="subDropdownMenuContainer">
                                <div className="dropdownMenu subDropdownMenu">
                                    <div className="dropdownMenuScroller">
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--PROFILE"
                                            className="dropdownMenuItem"
                                        >
                                            <div className="dropdownMenuItemLabel">Server Profile</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--BOOST_PERKS"
                                            className="dropdownMenuItem"
                                        >
                                            <div className="dropdownMenuItemLabel">Boost Perks</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--EMOJI"
                                            className="dropdownMenuItem"
                                        >
                                            <div className="dropdownMenuItemLabel">Emoji</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--STICKERS"
                                            className="dropdownMenuItem"
                                        >
                                            <div className="dropdownMenuItemLabel">Stickers</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--SOUNDBOARD"
                                            className="dropdownMenuItem"
                                        >
                                            <div className="dropdownMenuItemLabel">Soundboard</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--MEMBERS"
                                            className="dropdownMenuItem"
                                        >
                                            <div className="dropdownMenuItemLabel">Members</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--ROLES"
                                            className="dropdownMenuItem"
                                        >
                                            <div className="dropdownMenuItemLabel">Roles</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--INVITES"
                                            className="dropdownMenuItem"
                                        >
                                            <div className="dropdownMenuItemLabel">Invites</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--ACCESS"
                                            className="dropdownMenuItem"
                                        >
                                            <div className="dropdownMenuItemLabel">Access</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--INTEGRATIONS"
                                            className="dropdownMenuItem"
                                        >
                                            <div className="dropdownMenuItemLabel">Integrations</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--APP_DIRECTORY"
                                            className="dropdownMenuItem"
                                        >
                                            <div className="dropdownMenuItemLabel">App Directory</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--MODERATION"
                                            className="dropdownMenuItem"
                                        >
                                            <div className="dropdownMenuItemLabel">Safety Setup</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--AUDIT_LOG"
                                            className="dropdownMenuItem"
                                        >
                                            <div className="dropdownMenuItemLabel">Audit Log</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--BANS"
                                            className="dropdownMenuItem"
                                        >
                                            <div className="dropdownMenuItemLabel">Bans</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--GUILD_AUTOMOD"
                                            className="dropdownMenuItem"
                                        >
                                            <div className="dropdownMenuItemLabel">AutoMod</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--COMMUNITY"
                                            className="dropdownMenuItem"
                                        >
                                            <div className="dropdownMenuItemLabel">Community Settings</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--GUILD_PREMIUM"
                                            className="dropdownMenuItem"
                                        >
                                            <div className="dropdownMenuItemLabel">Server Boost Status</div>
                                        </ContextMenuItem>
                                        <ContextMenuItem
                                            id="guild-context-guild-settings--GUILD_TEMPLATES"
                                            className="dropdownMenuItem"
                                        >
                                            <div className="dropdownMenuItemLabel">Server Template</div>
                                        </ContextMenuItem>
                                    </div>
                                </div>
                            </ContextMenuSubContent>
                        </ContextMenuSub>
                    )}
                    <ContextMenuItem
                        id="guild-context-privacy"
                        className="dropdownMenuItem"
                    >
                        <div className="dropdownMenuItemLabel">Privacy Settings</div>
                    </ContextMenuItem>
                    <ContextMenuItem
                        id="guild-context-change-nickname"
                        className="dropdownMenuItem"
                    >
                        <div className="dropdownMenuItemLabel">Edit Per-server Profile</div>
                    </ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                {isModerator && (
                    <>
                        <ContextMenuGroup>
                            <ContextMenuItem
                                id="guild-context-create-channel"
                                className="dropdownMenuItem"
                                onClick={() => onOpen("createChannel")}
                            >
                                <div className="dropdownMenuItemLabel">Create Channel</div>
                            </ContextMenuItem>
                            <ContextMenuItem
                                id="guild-context-create-category"
                                className="dropdownMenuItem"
                            >
                                <div className="dropdownMenuItemLabel">Create Category</div>
                            </ContextMenuItem>
                            <ContextMenuItem
                                id="guild-context-create-event"
                                className="dropdownMenuItem"
                            >
                                <div className="dropdownMenuItemLabel">Create Event</div>
                            </ContextMenuItem>
                        </ContextMenuGroup>
                        <ContextMenuSeparator />
                    </>
                )}
                <ContextMenuGroup>
                    <ContextMenuItem
                        id="guild-context-leave-guild"
                        className="dropdownMenuItem dropdownMenuItemDanger"
                        onClick={() => onOpen(isAdmin ? "deleteServer" : "leaveServer", { server })}
                    >
                        <div className="dropdownMenuItemLabel">Leave Server</div>
                    </ContextMenuItem>
                </ContextMenuGroup>
            </div>
        </div>
    )
}