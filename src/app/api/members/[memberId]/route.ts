import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function PATCH(
    req: Request,
    { params }: { params: { memberId: string } }
) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get("serverId");
        if (!serverId) return new NextResponse("Server Id missing", { status: 400 });
        if (!params.memberId) return new NextResponse("Member Id missing", { status: 400 });
        const { role } = await req.json();
        const server = await db.server.update({
            where: { id: serverId, profileId: profile.id },
            data: {
                members: {
                    update: {
                        where: { id: params.memberId, profileId: { not: profile.id } },
                        data: { role }
                    }
                }
            },
            include: { members: { include: { profile: true }, orderBy: { role: "asc" } } }
        });
        return NextResponse.json(server);
    } catch (err) {
        console.log("[MEMBERS_ID_PATCH]", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { memberId: string } }
) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });
        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get("serverId");
        if (!serverId) return new NextResponse("Server Id missing", { status: 400 });
        if (!params.memberId) return new NextResponse("Member Id missing", { status: 400 });
        const server = await db.server.update({
            where: { id: serverId, profileId: profile.id },
            data: {
                members: {
                    deleteMany: { id: params.memberId, profileId: { not: profile.id } }
                }
            },
            include: { members: { include: { profile: true }, orderBy: { role: "asc" } } }
        });
        return NextResponse.json(server);
    } catch (err) {
        console.log("[MEMBERS_ID_DELETE]", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
}