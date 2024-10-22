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
                <button className="w-full h-12 px-3 flex items-center text-md font-semibold aria-expanded:bg-zinc-700/10 dark:aria-expanded:bg-zinc-700/50 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition border-b-2 border-neutral-200 dark:border-neutral-800">
                    {server.name}
                    <ChevronDown className="w-5 h-5 ml-auto" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 space-y-[2px] font-medium text-xs text-black dark:text-neutral-400 bg-[#e0e1e2] dark:bg-[#191b1d] rounded-bl rounded-br">
                {isModerator && (
                    <DropdownMenuItem
                        onClick={() => onOpen("invite", { server })}
                        className="px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400 cursor-pointer">
                        Invite People
                        <UserPlus className="w-4 h-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen("editServer", { server })}
                        className="px-3 py-2 text-sm cursor-pointer">
                        Server Settings
                        <Settings className="w-4 h-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isAdmin && (
                    <DropdownMenuItem
                        onClick={() => onOpen("members", { server })}
                        className="px-3 py-2 text-sm cursor-pointer">
                        Manage Members
                        <Users className="w-4 h-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer">
                        Create Channel
                        <PlusCircle className="w-4 h-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuSeparator />
                )}
                {isAdmin ? (
                    <DropdownMenuItem className="px-3 py-2 text-sm text-rose-500 cursor-pointer">
                        Delete Server
                        <Trash className="w-4 h-4 ml-auto" />
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem className="px-3 py-2 text-sm text-rose-500 cursor-pointer">
                        Leave Server
                        <LogOut className="w-4 h-4 ml-auto" />
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}