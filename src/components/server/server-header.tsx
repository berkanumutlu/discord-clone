"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles;
    role?: MemberRole;
}

export const ServerHeader = ({
    server,
    role
}: ServerHeaderProps) => {
    const { onOpen } = useModal();
    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="focus:outline-none">
                <button className="px-3 w-full h-12 flex items-center text-md font-semibold aria-expanded:bg-zinc-700/10 dark:aria-expanded:bg-zinc-700/50 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition border-b-2 border-neutral-200 dark:border-neutral-800">
                    {server.name}
                    <ChevronDown className="ml-auto w-5 h-5" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 space-y-[2px] font-medium text-xs text-black dark:text-neutral-400 bg-[#e0e1e2] dark:bg-[#191b1d] rounded-bl rounded-br z-[21]">
                {isModerator && (
                    <DropdownMenuItem
                        onClick={() => onOpen("invite", { server })}
                        className="px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400 cursor-pointer"
                    >
                        Invite People
                        <UserPlus className="ml-auto w-4 h-4" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen("editServer", { server })}
                        className="px-3 py-2 text-sm cursor-pointer"
                    >
                        Server Settings
                        <Settings className="ml-auto w-4 h-4" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen("members", { server })}
                        className="px-3 py-2 text-sm cursor-pointer"
                    >
                        Manage Members
                        <Users className="ml-auto w-4 h-4" />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuItem
                        onClick={() => onOpen("createChannel")}
                        className="px-3 py-2 text-sm cursor-pointer"
                    >
                        Create Channel
                        <PlusCircle className="ml-auto w-4 h-4" />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuSeparator />
                )}
                <DropdownMenuItem
                    onClick={() => onOpen(isAdmin ? "deleteServer" : "leaveServer", { server })}
                    className="px-3 py-2 text-sm text-rose-500 cursor-pointer"
                >
                    {isAdmin ? "Delete Server" : "Leave Server"}
                    {isAdmin ? <Trash className="ml-auto w-4 h-4" /> : <LogOut className="ml-auto w-4 h-4" />}
                    {/* {React.createElement(isAdmin ? Trash : LogOut, { className: "w-4 h-4 ml-auto" })} */}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}