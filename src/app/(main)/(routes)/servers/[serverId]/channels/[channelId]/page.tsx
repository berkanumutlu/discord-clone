import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { ChatHeader } from "@/components/chat/chat-header";

interface ChannelIdProps {
    params: {
        serverId: string;
        channelId: string;
    }
}

const ChannelIdPage = async ({
    params
}: ChannelIdProps) => {
    const profile = await currentProfile();
    if (!profile) return auth().redirectToSignIn();
    const channel = await db.channel.findUnique({ where: { id: params.channelId } });
    const member = await db.member.findFirst({ where: { serverId: params.serverId, profileId: profile.id } });
    if (!channel || !member) return redirect("/");

    return (
        <div className="h-full flex fex-col bg-white dark:bg-[#313338]">
            <ChatHeader name={channel.name} serverId={channel.serverId} type="channel" />
        </div>
    )
}

export default ChannelIdPage;