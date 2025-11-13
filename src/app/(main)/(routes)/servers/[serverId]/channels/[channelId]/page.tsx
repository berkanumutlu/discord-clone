import { redirect } from "next/navigation"
import { ChannelType } from "@prisma/client"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { currentProfile } from "@/lib/current-profile"
import { ChatHeader } from "@/components/chat/chat-header"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatMessages } from "@/components/chat/chat-messages"
import { MediaRoom } from "@/components/media-room"

interface ChannelIdProps {
    params: {
        serverId: string
        channelId: string
    }
}

const ChannelIdPage = async ({
    params
}: ChannelIdProps) => {
    const userProfile = await currentProfile()
    if (!userProfile) return auth().redirectToSignIn()

    const channel = await db.channel.findUnique({ where: { id: params.channelId } })
    const member = await db.member.findFirst({ where: { serverId: params.serverId, profileId: userProfile.id } })
    if (!channel || !member) return redirect("/")

    return (
        <div className="size-full flex">
            <div className="chatContainer">
                <ChatHeader title={channel.name} serverId={channel.serverId} type="channel" />
                <div className="pageContent">
                    <div className="chatContent" aria-label={`${channel.name} (channel)`}>
                        {channel.type === ChannelType.TEXT && (
                            <>
                                <ChatMessages
                                    chatId={channel.id}
                                    type="channel"
                                    name={channel.name}
                                    member={member}
                                    apiUrl="/api/messages"
                                    socketUrl="/api/socket/messages"
                                    socketQuery={{
                                        channelId: channel.id,
                                        serverId: channel.serverId
                                    }}
                                    paramKey="channelId"
                                    paramValue={channel.id}
                                />
                                <ChatInput
                                    type="channel"
                                    name={channel.name}
                                    apiUrl="/api/socket/messages"
                                    query={{
                                        channelId: channel.id,
                                        serverId: channel.serverId
                                    }}
                                />
                            </>
                        )}
                        {channel.type === ChannelType.AUDIO && (
                            <MediaRoom
                                chatId={channel.id}
                                video={false}
                                audio={true}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChannelIdPage