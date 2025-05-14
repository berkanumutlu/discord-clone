import { Suspense } from "react"
import ServerInfoCardSkeleton from "@/components/skeletons/server-info-card-skeleton"
import ServerInfoCard from "@/components/servers/server-info-card"

const ServerInfoCardItem = () => {
    return (
        <Suspense fallback={<ServerInfoCardSkeleton />}>
            <ServerInfoCard />
        </Suspense>
    )
}

export default ServerInfoCardItem