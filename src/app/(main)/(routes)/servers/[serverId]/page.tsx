import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

interface ServerIdPageProps {
    params: {
        serverId: string;
    }
}

const ServerIdPage = async ({
    params
}: ServerIdPageProps) => {
    const profile = await currentProfile();
    if (!profile) return auth().redirectToSignIn();
    const server = await db.server.findUnique({
        where: { id: params.serverId, members: { some: { profileId: profile.id } } },
        include: { channels: { where: { name: "General" }, orderBy: { createdAt: "asc" } } }
    });
    const initialChannel = server?.channels[0];
    if (initialChannel?.name?.toLocaleLowerCase() !== "general") return null;

    return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`);
}

export default ServerIdPage;