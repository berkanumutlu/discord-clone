import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function PATCH(
    req: Request,
    { params }: { params: { serverId: string } }
) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        if (!params.serverId) return new NextResponse("Server Id missing", { status: 400 });
        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id
            },
            data: {
                inviteCode: uuidv4()
            }
        });
        return NextResponse.json(server);
    } catch (error) {
        console.error("[SERVER_ID_INVITE_CODE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}