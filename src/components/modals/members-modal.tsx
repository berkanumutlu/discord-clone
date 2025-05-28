"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import qs from "query-string";
import { MemberRole } from "@prisma/client";
import { Check, Gavel, Loader2, MoreVerticalIcon, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { ServerWithMembersWithProfiles } from "@/types";
import { Dialog, DialogTitle, DialogDescription, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuTrigger, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/user-avatar";
import { useModal } from "@/hooks/use-modal-store";

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="w-4 h-4 text-indigo-500" />,
    "ADMIN": <ShieldAlert className="w-4 h-4 text-rose-500" />
};

export const MembersModal = () => {
    const router = useRouter();
    const { isOpen, onOpen, onClose, type, data } = useModal();
    const [loadingId, setLoadingId] = useState("");

    const isModalOpen = isOpen && type === 'members';
    const { server } = data as { server: ServerWithMembersWithProfiles };

    const onKick = async (memberId: string) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: { serverId: server?.id }
            });
            const response = await axios.delete(url);
            router.refresh();
            onOpen("members", { server: response.data });
        } catch (error) {
            console.error("[MEMBERS_MODAL_ONKICK]", error);
        } finally {
            setLoadingId("");
        }
    };
    const onRoleChange = async (memberId: string, role: MemberRole) => {
        try {
            setLoadingId(memberId);
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: { serverId: server?.id }
            });
            const response = await axios.patch(url, { role });
            router.refresh();
            onOpen("members", { server: response.data });
        } catch (error) {
            console.error("[MEMBERS_MODAL_ONROLECHANGE]", error);
        } finally {
            setLoadingId("");
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl font-bold text-center">Manage Members</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        {server?.members?.length > 0 ? `${server.members.length} Members` : "There are no members"}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 pr-6 max-h-[420px]">
                    {server?.members?.map((member) => (
                        <div key={member.id} className="mb-6 flex items-center gap-x-2">
                            <UserAvatar src={member.profile.imageUrl} />
                            <div className="flex flex-col gap-y-1">
                                <div className="flex items-center gap-x-1 text-xs font-semibold">
                                    {member.profile.name}{roleIconMap[member.role]}
                                </div>
                                <p className="text-xs text-zinc-500">
                                    {member.profile.email}
                                </p>
                            </div>
                            {server.profileId !== member.profileId && loadingId !== member.id && (
                                <div className="ml-auto">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreVerticalIcon className="w-4 h-4 text-zinc-500" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent side="left">
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger className="flex items-center">
                                                    <ShieldQuestion className="mr-2 w-4 h-4" />
                                                    <span>Role</span>
                                                </DropdownMenuSubTrigger>
                                                <DropdownMenuPortal>
                                                    <DropdownMenuSubContent>
                                                        <DropdownMenuItem onClick={() => onRoleChange(member.id, "GUEST")}>
                                                            <Shield className="mr-2 w-4 h-4" />
                                                            Guest{member.role === "GUEST" && (<Check className="ml-auto w-4 h-4" />)}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => onRoleChange(member.id, "MODERATOR")}>
                                                            <ShieldCheck className="mr-2 w-4 h-4" />
                                                            Moderator{member.role === "MODERATOR" && (<Check className="ml-auto w-4 h-4" />)}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuSubContent>
                                                </DropdownMenuPortal>
                                            </DropdownMenuSub>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => onKick(member.id)} className="text-rose-500 hover:!text-rose-700">
                                                <Gavel className="mr-2 w-4 h-4" />Kick
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            )}
                            {loadingId === member.id && (
                                <Loader2 className="ml-auto w-4 h-4 text-zinc-500 animate-spin" />
                            )}
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}