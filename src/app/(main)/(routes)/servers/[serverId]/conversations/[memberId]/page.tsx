import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { getOrCreateConversation } from "@/lib/conversation";
import { ChatHeader } from "@/components/chat/chat-header";

interface MemberIdProps {
    params: {
        memberId: string;
        serverId: string;
    }
}

const MemberIdPage = async ({
    params
}: MemberIdProps) => {
    const profile = await currentProfile();
    if (!profile) return auth().redirectToSignIn();
    const currentMember = await db.member.findFirst({
        where: { serverId: params.serverId, profileId: profile.id },
        include: { profile: true }
    });
    if (!currentMember) return redirect("/");
    const conversation = await getOrCreateConversation(currentMember.id, params.memberId);
    if (!conversation) return redirect(`/servers/${params.serverId}`);
    const { memberOne, memberTwo } = conversation;
    const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

    return (
        <div className="h-full flex flex-col bg-white dark:bg-[#313338]">
            <ChatHeader serverId={params.serverId} name={otherMember.profile.name} imageUrl={otherMember.profile.imageUrl} type="conversation" />
        </div>
    )
}

export default MemberIdPage;