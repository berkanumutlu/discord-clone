"use client";

import { useParams, useRouter } from "next/navigation";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";

interface ServerMemberProps {
    member: Member & { profile: Profile };
    server: Server;
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="w-4 h-4 text-indigo-500" />,
    [MemberRole.ADMIN]: <ShieldAlert className="w-4 h-4 text-rose-500" />
};

export const ServerMember = ({
    member,
    server
}: ServerMemberProps) => {
    const router = useRouter();
    const params = useParams();

    const icon = roleIconMap[member.role];

    const onClick = () => {
        router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
    };

    return (
        <button onClick={onClick} className={cn(
            "group mb-1 px-2 py-2 w-full flex items-center gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 rounded-md transition",
            params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
        )}>
            <UserAvatar src={member.profile.imageUrl} className="w-8 h-8 md:w-8 md:h-8" />
            <p className={cn(
                "text-sm font-semibold group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
                params?.memberId === member.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
            )}>{member.profile.name}</p>
            {icon}
        </button>
    )
}