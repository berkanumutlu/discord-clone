import { NextResponse } from "next/server";
import { DirectMessage, Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

const MESSAGES_LIMIT = 15;

async function fetchDirectMessages(conversationId: string, cursor?: string) {
    const queryOptions: Prisma.DirectMessageFindManyArgs = {
        take: MESSAGES_LIMIT,
        where: { conversationId },
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
    return await db.directMessage.findMany(queryOptions);
}

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        const { searchParams } = new URL(req.url);
        const conversationId = searchParams.get("conversationId");
        if (!conversationId) return new NextResponse("Conversation Id missing", { status: 400 });
        let messages: DirectMessage[] = [];
        const cursor = searchParams.get("cursor") || undefined;
        messages = await fetchDirectMessages(conversationId, cursor);
        let nextCursor = null;
        if (messages?.length === MESSAGES_LIMIT) {
            nextCursor = messages[MESSAGES_LIMIT - 1].id;
        }
        return NextResponse.json({ items: messages, nextCursor });
    } catch (err) {
        console.log("[DIRECT_MESSAGES_GET]", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}