import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/types";
import { db } from "@/lib/db";
import { currentProfilePages } from "@/lib/current-profile-pages";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo
) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    try {
        const profile = await currentProfilePages(req);
        if (!profile) return res.status(401).json({ error: "Unauthorized" });
        const { conversationId } = req.query;
        if (!conversationId) return res.status(400).json({ error: "Conversation Id missing" });
        const { content, fileUrl, fileType } = req.body;
        if (!content) return res.status(400).json({ error: "Content missing" });
        const conversation = await db.conversation.findFirst({
            where: {
                id: conversationId as string,
                OR: [
                    { memberOne: { profileId: profile.id } },
                    { memberTwo: { profileId: profile.id } }
                ]
            },
            include: {
                memberOne: { include: { profile: true } },
                memberTwo: { include: { profile: true } },
            }
        });
        if (!conversation) return res.status(404).json({ error: "Conversation not found" });
        const member = conversation.memberOne.profileId === profile.id ? conversation.memberOne : conversation.memberTwo;
        if (!member) return res.status(404).json({ error: "Member not found" });
        const directMessage = await db.directMessage.create({
            data: { content, fileUrl, fileType, conversationId: conversationId as string, memberId: member.id },
            include: { member: { include: { profile: true } } }
        });

        const channelKey = `chat:${conversation.id}:messages`;
        res?.socket?.server?.io?.emit(channelKey, directMessage);

        return res.status(200).json(directMessage);
    } catch (err) {
        console.log("[DIRECT_MESSAGES_POST]", err);
        return res.status(500).json({ error: "Internal Error" });
    }
}