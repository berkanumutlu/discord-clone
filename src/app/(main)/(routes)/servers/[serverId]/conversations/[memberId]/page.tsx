import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { getOrCreateConversation } from "@/lib/conversation";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import { MediaRoom } from "@/components/media-room";

interface MemberIdProps {
    params: {
        memberId: string;
        serverId: string;
    },
    searchParams: {
        video?: boolean;
    }
}

const MemberIdPage = async ({
    params,
    searchParams
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
            <div className="sticky top-0 z-10 bg-inherit">
                <ChatHeader serverId={params.serverId} name={otherMember.profile.name} imageUrl={otherMember.profile.imageUrl} type="conversation" />
            </div>
            {searchParams.video && (
                <MediaRoom
                    chatId={conversation.id}
                    video={false}
                    audio={true}
                />
            )}
            {!searchParams.video && (
                <>
                    <div className="flex flex-1 overflow-y-auto">
                        <ChatMessages
                            name={otherMember.profile.name}
                            member={currentMember}
                            chatId={conversation.id}
                            type="conversation"
                            apiUrl="/api/direct-messages"
                            socketUrl="/api/socket/direct-messages"
                            socketQuery={{
                                conversationId: conversation.id
                            }}
                            paramKey="conversationId"
                            paramValue={conversation.id}
                        />
                    </div>
                    <div className="sticky bottom-0 z-10 bg-inherit">
                        <ChatInput
                            type="conversation"
                            name={otherMember.profile.name}
                            apiUrl="/api/socket/direct-messages"
                            query={{
                                conversationId: conversation.id
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default MemberIdPage;