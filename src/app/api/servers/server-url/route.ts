import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const profile = await currentProfile();
        if (!profile) {
            return NextResponse.json({ serverUrl: "" });
        }
        const server = await db.server.findFirst({
            where: {
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            }
        });
        const serverUrl = server ? `/servers/${server.id}` : "";
        return NextResponse.json({ serverUrl });
    } catch (error) {
        console.error("[SERVER_URL_GET]", error);
        return NextResponse.json({ serverUrl: "" });
    }
}