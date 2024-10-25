import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { ServerSidebar } from "@/components/server/server-sidebar";

const ServerIdLayout = async ({
    children,
    params
}: {
    children: React.ReactNode;
    params: { serverId: string };
}) => {
    const profile = await currentProfile();
    if (!profile) return auth().redirectToSignIn();
    const server = await db.server.findUnique({
        where: { id: params.serverId, members: { some: { profileId: profile.id } } }
    });
    if (!server) return redirect("/");

    return (
        <div className="h-full">
            <div className="w-60 h-full md:flex flex-col fixed inset-y-0 z-20 hidden">
                <ServerSidebar serverId={params.serverId} />
            </div>
            <main className="h-full md:pl-60">
                {children}
            </main>
        </div>
    );
}

export default ServerIdLayout;