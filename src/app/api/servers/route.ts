import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { ChannelType, MemberRole } from "@prisma/client";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function POST(req: Request) {
    try {
        const { name, imageUrl } = await req.json();
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        const server = await db.server.create({
            data: {
                profileId: profile.id,
                name,
                imageUrl,
                inviteCode: uuidv4(),
                channels: { create: [{ name: "General", type: ChannelType.TEXT, profileId: profile.id }, { name: "Voice", type: ChannelType.AUDIO, profileId: profile.id }] },
                members: { create: [{ profileId: profile.id, role: MemberRole.ADMIN }] }
            }
        });
        return NextResponse.json(server);
    } catch (error) {
        console.error("[SERVERS_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}