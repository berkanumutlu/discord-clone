import { redirect } from "next/navigation";
import { Hash, ShieldAlert, ShieldCheck, Volume2 } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { currentProfile } from "@/lib/current-profile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ServerHeader } from "./server-header";
import { ServerSearch } from "./server-search";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

interface ServerSidebarProps {
    serverId: string;
}

const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 w-4 h-4" />,
    [ChannelType.AUDIO]: <Volume2 className="mr-2 w-4 h-4" />
};
const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="mr-2 w-4 h-4 text-indigo-500" />,
    [MemberRole.ADMIN]: <ShieldAlert className="mr-2 w-4 h-4 text-rose-500" />
};

export const ServerSidebar = async ({
    serverId
}: ServerSidebarProps) => {
    const profile = await currentProfile();
    if (!profile) return auth().redirectToSignIn();

    const server = await db.server.findUnique({
        where: { id: serverId },
        include: {
            channels: { orderBy: { createdAt: "asc" } },
            members: { include: { profile: true }, orderBy: { role: "asc" } }
        }
    });
    if (!server) return redirect("/");
    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO);
    const members = server?.members.filter((member) => member.profileId !== profile.id);
    const role = server?.members.find((member) => member.profileId === profile.id)?.role;

    return (
        <div className="w-full h-full flex flex-col text-primary bg-[#F2F3F5] dark:bg-[#2B2D31]">
            <ServerHeader server={server} role={role} />
            <ScrollArea className="px-3 flex-1">
                <div className="mt-2">
                    <ServerSearch
                        data={[
                            {
                                label: "Text Channels",
                                type: "channel",
                                data: textChannels?.map((channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type]
                                })) || []
                            },
                            {
                                label: "Voice Channels",
                                type: "channel",
                                data: audioChannels?.map((channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type]
                                })) || []
                            },
                            {
                                label: "Members",
                                type: "member",
                                data: members?.map((member) => ({
                                    id: member.id,
                                    name: member.profile.name,
                                    icon: roleIconMap[member.role]
                                })) || []
                            }
                        ]}
                    />
                </div>
                <Separator className="my-2 p-0 w-full bg-zinc-200 dark:bg-zinc-700 rounded-md" />
                {!!textChannels?.length && (
                    <div className="mb-2">
                        <ServerSection sectionType="channels" channelType={ChannelType.TEXT} role={role} label="Text Channels" />
                        <div className="space-y-[2px]">
                            {textChannels?.map((channel) => (
                                <ServerChannel key={channel.id} channel={channel} server={server} role={role} />
                            ))}
                        </div>
                    </div>
                )}
                {!!audioChannels?.length && (
                    <div className="mb-2">
                        <ServerSection sectionType="channels" channelType={ChannelType.AUDIO} role={role} label="Voice Channels" />
                        <div className="space-y-[2px]">
                            {audioChannels?.map((channel) => (
                                <ServerChannel key={channel.id} channel={channel} server={server} role={role} />
                            ))}
                        </div>
                    </div>
                )}
                {!!members?.length && (
                    <div className="mb-2">
                        <ServerSection sectionType="members" role={role} server={server} label={`Members (${members.length})`} />
                        <div className="space-y-[2px]">
                            {members?.map((member) => (
                                <ServerMember key={member.id} member={member} server={server} />
                            ))}
                        </div>
                    </div>
                )}
            </ScrollArea>
        </div>
    )
}