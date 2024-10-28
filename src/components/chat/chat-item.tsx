"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import qs from "query-string";
import * as z from "zod";
import { Member, MemberRole, Profile } from "@prisma/client";
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { UserAvatar } from "@/components/user-avatar";
import { ActionTooltip } from "@/components/action-tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/hooks/use-modal-store";

interface ChatItemProps {
    id: string;
    content: string;
    member: Member & {
        profile: Profile;
    };
    currentMember: Member;
    fileUrl: string | null;
    fileType: string | null;
    timestamp: string;
    isUpdated: boolean;
    isDeleted: boolean;
    deletedAt?: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="ml-1 w-4 h-4 text-indigo-500" />,
    [MemberRole.ADMIN]: <ShieldAlert className="ml-1 w-4 h-4 text-rose-500" />
};

const formSchema = z.object({
    content: z.string().min(1)
});

export const ChatItem = ({
    id,
    content,
    member,
    currentMember,
    fileUrl,
    fileType,
    timestamp,
    isUpdated,
    isDeleted,
    deletedAt,
    socketUrl,
    socketQuery
}: ChatItemProps) => {
    const router = useRouter();
    const params = useParams();
    const { onOpen } = useModal();
    const [isEditing, setIsEditing] = useState(false);

    const isMessageOwner = currentMember.id === member.id;
    const isAdmin = currentMember.role === MemberRole.ADMIN;
    const isModerator = currentMember.role === MemberRole.MODERATOR;
    const canActionMessage = isMessageOwner || isAdmin || isModerator;
    const canDeleteMessage = !isDeleted && canActionMessage;
    const canEditMessage = !isDeleted && isMessageOwner && !fileUrl;
    const isImage = fileUrl && fileType?.startsWith("image");
    const isFile = fileUrl && !isImage;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: content
        }
    });
    const isLoading = form.formState.isSubmitting;

    useEffect(() => {
        form.reset({
            content: content
        });
    }, [content, form]);


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key && e.key.toLowerCase() === "escape") {
                setIsEditing(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const onMemberClick = () => {
        if (member.id === currentMember.id) return;
        router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
    };
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: `${socketUrl}/${id}`,
                query: socketQuery
            });
            await axios.patch(url, values);
            form.reset();
            setIsEditing(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="group w-full p-4 relative flex items-center hover:bg-black/5 transition">
            <div className="group w-full flex items-start gap-x-2">
                <div onClick={onMemberClick} className="hover:drop-shadow-md transition cursor-pointer">
                    <UserAvatar src={member.profile.imageUrl} />
                </div>
                <div className="w-full flex flex-col">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p
                                onClick={onMemberClick}
                                className={cn(
                                    "text-sm font-semibold hover:underline cursor-pointer",
                                    member.role === MemberRole.MODERATOR && "text-indigo-700 hover:text-indigo-700/75 dark:text-indigo-400/75 dark:hover:text-indigo-400",
                                    member.role === MemberRole.ADMIN && "text-rose-700 hover:text-rose-700/75 dark:text-rose-400/75 dark:hover:text-rose-400"
                                )}>
                                {member.profile.name}
                            </p>
                            <ActionTooltip label={member.role}>
                                {roleIconMap[member.role]}
                            </ActionTooltip>
                        </div>
                        <span className="text-xs text-[11px] text-zinc-500 dark:text-zinc-400">{timestamp}</span>
                    </div>
                    {isImage && (
                        // TODO: Show in modal, add show original link below the modal
                        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="mt-2 w-48 h-48 relative flex items-center bg-secondary aspect-square border rounded-md overflow-hidden">
                            <Image src={fileUrl} alt={content} fill className="object-cover" />
                        </a>
                    )}
                    {isFile && (
                        <div className="mt-2 p-2 relative flex items-center bg-foreground/10 dark:bg-background/10 rounded-md">
                            <FileIcon className="w-10 h-10 fill-indigo-200 stroke-indigo-400" />
                            {/* TODO: Show file name, show in modal, are you sure redirect to other website */}
                            <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="ml-2 max-w-[350px] text-sm text-indigo-500 dark:text-indigo-400 hover:underline overflow-hidden text-ellipsis whitespace-nowrap">
                                File
                            </a>
                        </div>
                    )}
                    {!fileUrl && !isEditing && (
                        <p className={cn(
                            "text-sm text-zinc-600 dark:text-zinc-300",
                            isDeleted && "mt-1 italic text-xs text-zinc-500 dark:text-zinc-400"
                        )}>
                            {isDeleted
                                ? `This message has been deleted${canActionMessage ? ` at: ${deletedAt}` : '.'}`
                                : content
                            }
                            {isUpdated && !isDeleted && (
                                <span className="mx-2 text-[10px] text-zinc-500 dark:text-zinc-400">
                                    (edited)
                                </span>
                            )}
                        </p>
                    )}
                    {!fileUrl && isEditing && (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="pt-2 w-full flex items-center gap-x-2">
                                <FormField control={form.control} name="content"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormControl>
                                                <div className="w-full relative">
                                                    <Input disabled={isLoading} autoComplete="off" placeholder="Edited Message" className="p-2 text-zinc-600 dark:text-zinc-200 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button disabled={isLoading} variant="primary" size="sm">Save</Button>
                            </form>
                            <span className="mt-1 text-[10px] text-zinc-400">Press escape to cancel, enter to save</span>
                        </Form>
                    )}
                </div>
            </div>
            {canActionMessage && !isEditing && !isDeleted && (
                <div className="p-1 hidden absolute -top-2 right-5 group-hover:flex items-center gap-x-2 bg-white dark:bg-zinc-800 border rounded-sm">
                    {canEditMessage && (
                        <ActionTooltip label="Edit">
                            <Edit onClick={() => setIsEditing(true)} className="ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition cursor-pointer" />
                        </ActionTooltip>
                    )}
                    {canDeleteMessage && (
                        <ActionTooltip label="Delete">
                            <Trash
                                onClick={() => onOpen("deleteMessage", {
                                    apiUrl: `${socketUrl}/${id}`,
                                    query: socketQuery
                                })}
                                className="ml-auto w-4 h-4 text-zinc-500 hover:text-rose-600 dark:hover:text-rose-300 transition cursor-pointer" />
                        </ActionTooltip>
                    )}
                </div>
            )}
        </div >
    )
}