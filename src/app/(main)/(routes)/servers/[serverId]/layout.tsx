import { ReactNode } from "react"
import { redirect } from "next/navigation"
import dynamic from "next/dynamic"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { currentProfile } from "@/lib/current-profile"
import MainLayoutComponent from "@/components/main/main-layout"

const ServerSidebarMenu = dynamic(() => import("@/components/server/server-sidebar-menu").then(mod => mod.ServerSidebarMenu), { ssr: false })

const ServerLayout = async ({
    children,
    params
}: {
    children: ReactNode
    params: { serverId: string }
}) => {
    const profile = await currentProfile()
    if (!profile) return auth().redirectToSignIn()
    const server = await db.server.findUnique({
        where: { id: params.serverId, members: { some: { profileId: profile.id } } }
    })
    if (!server) return redirect("/")

    return (
        <MainLayoutComponent PageSidebarMenu={<ServerSidebarMenu serverId={params.serverId} />}>
            <main className="mainContainer" aria-label="Friends">
                {children}
            </main>
        </MainLayoutComponent>
    )
}

export default ServerLayout