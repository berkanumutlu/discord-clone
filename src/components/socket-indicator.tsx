"use client"

import { useSocket } from "@/components/providers/socket-provider"
import { Badge } from "@/components/ui/badge"

export const SocketIndicator = () => {
    const { isConnected } = useSocket()

    if (!isConnected) {
        return (
            <Badge variant="outline" className="bg-yellow-600 text-app-white border-none select-none">
                Reconnecting: Retrying every 3s
            </Badge>
        )
    }

    return (
        <Badge variant="outline" className="bg-emerald-600 text-app-white border-none animate-fadeOut delay-3000 select-none">
            Connected
        </Badge>
    )
}