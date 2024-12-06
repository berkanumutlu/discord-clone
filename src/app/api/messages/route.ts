import { NextResponse } from "next/server";
import { Message, Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export const dynamic = 'force-dynamic';
const MESSAGES_LIMIT = 15;

async function fetchMessages(channelId: string, cursor?: string) {
    const queryOptions: Prisma.MessageFindManyArgs = {
        take: MESSAGES_LIMIT,
        where: { channelId },
        include: {
            member: {
                include: { profile: true }
            }
        },
        orderBy: { createdAt: "desc" }
    };
    if (cursor) {
        queryOptions.cursor = { id: cursor };
        queryOptions.skip = 1; // Skip the cursor message
    }
    return await db.message.findMany(queryOptions);
}

export async function GET(req: Request) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        const { searchParams } = new URL(req.url);
        const channelId = searchParams.get("channelId");
        if (!channelId) return new NextResponse("Channel Id missing", { status: 400 });
        let messages: Message[] = [];
        const cursor = searchParams.get("cursor") || undefined;
        messages = await fetchMessages(channelId, cursor);
        let nextCursor = null;
        if (messages?.length === MESSAGES_LIMIT) {
            nextCursor = messages[MESSAGES_LIMIT - 1].id;
        }
        return NextResponse.json({ items: messages, nextCursor });
    } catch (error) {
        console.error("[MESSAGES_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}