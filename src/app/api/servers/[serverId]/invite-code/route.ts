import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function PATCH(
    req: Request,
    { params }: { params: { serverId: string } }
) {
    try {
        if (!params.serverId) return new NextResponse("Server Id Missing", { status: 400 });
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
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
    } catch (err) {
        console.log("[SERVER_ID]", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}