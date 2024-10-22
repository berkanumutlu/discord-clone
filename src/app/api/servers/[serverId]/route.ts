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
        const { name, imageUrl } = await req.json();
        const server = await db.server.update({
            where: { id: params.serverId, profileId: profile.id },
            data: { name, imageUrl }
        });
        return NextResponse.json(server);
    } catch (err) {
        console.log("[SERVER_ID_PATCH]", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
export async function DELETE(
    req: Request,
    { params }: { params: { serverId: string } }
) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });

        const server = await db.server.delete({
            where: { id: params.serverId, profileId: profile.id }
        });
        return NextResponse.json(server);
    } catch (err) {
        console.log("[SERVER_ID_DELETE]", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}