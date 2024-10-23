import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { MemberRole } from "@prisma/client";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

interface InviteCodePageProps {
    params: {
        inviteCode: string;
    }
}

const InviteCodePage = async ({
    params
}: InviteCodePageProps) => {
    const profile = await currentProfile();
    if (!profile) return auth().redirectToSignIn();
    if (!params.inviteCode) return redirect("/");

    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: { some: { profileId: profile.id } }
        }
    });
    if (existingServer) return redirect(`/servers/${existingServer.id}`);
    // I made the inviteCode field unique and did a migrate reset, but it still didn't work, so I added the server id finding process below.
    const serverToUpdate = await db.server.findFirst({
        where: { inviteCode: params.inviteCode }
    });
    if (serverToUpdate) {
        const joinServer = await db.server.update({
            where: { id: serverToUpdate.id },
            data: {
                members: { create: { profileId: profile.id, role: MemberRole.GUEST } }
            }
        });
        if (joinServer) return redirect(`/servers/${joinServer.id}`);
    }
    // TODO: Show informations
    return null;
}

export default InviteCodePage;