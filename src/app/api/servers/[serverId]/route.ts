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
    } catch (error) {
        console.error("[SERVER_ID_PATCH]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
export async function DELETE(
    req: Request,
    { params }: { params: { serverId: string } }
) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        if (!params.serverId) return new NextResponse("Server Id missing", { status: 400 });
        const server = await db.server.delete({
            where: { id: params.serverId, profileId: profile.id }
        });
        return NextResponse.json(server);
    } catch (error) {
        console.error("[SERVER_ID_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}