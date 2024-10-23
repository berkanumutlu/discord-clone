import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function DELETE(
    req: Request,
    { params }: { params: { channelId: string } }
) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get("serverId");
        if (!serverId) return new NextResponse("Server Id missing", { status: 400 });
        if (!params.channelId) return new NextResponse("Channel Id missing", { status: 400 });
        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    delete: {
                        id: params.channelId,
                        name: { not: "general" }
                    }
                }
            }
        });
        return NextResponse.json(server);
    } catch (err) {
        console.log("[CHANNELS_DELETE]", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}