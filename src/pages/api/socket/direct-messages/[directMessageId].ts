import { NextApiRequest } from "next";
import { MemberRole } from "@prisma/client";
import { NextApiResponseServerIo } from "@/types";
import { db } from "@/lib/db";
import { currentProfilePages } from "@/lib/current-profile-pages";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo
) {
    if (req.method !== "PATCH" && req.method !== "DELETE") return res.status(405).json({ error: "Method not allowed" });
    try {
        const profile = await currentProfilePages(req);
        if (!profile) return res.status(401).json({ error: "Unauthorized" });
        const { directMessageId, conversationId } = req.query;
        if (!conversationId) return res.status(400).json({ error: "Conversation Id missing" });
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
                memberTwo: { include: { profile: true } }
            }
        });
        if (!conversation) return res.status(404).json({ error: "Conversation not found" });
        const member = conversation.memberOne.profileId === profile.id ? conversation.memberOne : conversation.memberTwo;
        if (!member) return res.status(404).json({ error: "Member not found" });
        let directMessage = await db.directMessage.findFirst({
            where: { id: directMessageId as string, conversationId: conversationId as string },
            include: { member: { include: { profile: true } } }
        });
        if (!directMessage || directMessage.deletedAt !== null) return res.status(404).json({ error: "Message not found" });
        const isMessageOwner = directMessage.memberId === member.id;
        const isAdmin = member.role === MemberRole.ADMIN;
        const isModerator = member.role === MemberRole.MODERATOR;
        const canModify = isMessageOwner || isAdmin || isModerator;
        if (!canModify) return res.status(401).json({ error: "Unauthorized" });

        if (req.method === "PATCH") {
            if (!isMessageOwner) return res.status(401).json({ error: "Unauthorized" });
            const { content } = req.body;
            if (!content) return res.status(400).json({ error: "Content missing" });
            directMessage = await db.directMessage.update({
                where: { id: directMessageId as string },
                data: { content },
                include: { member: { include: { profile: true } } }
            });
        } else if (req.method === "DELETE") {
            directMessage = await db.directMessage.update({
                where: { id: directMessageId as string },
                data: { deletedAt: new Date() },
                include: { member: { include: { profile: true } } }
            });
        }

        const updateKey = `chat:${conversation.id}:messages:update`;
        res?.socket?.server?.io?.emit(updateKey, directMessage);

        return res.status(200).json(directMessage);
    } catch (error) {
        console.error("[DIRECT_MESSAGE_ID]", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}