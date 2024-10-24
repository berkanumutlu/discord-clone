"use client";

import { useSocket } from "@/components/providers/socket-provier";
import { Badge } from "@/components/ui/badge";

export const SocketIndicator = () => {
    const { isConnected } = useSocket();
    if (!isConnected) {
        return (
            <Badge variant="outline" className="text-white bg-yellow-600 border-none select-none">
                Fallback: Polling every 1s
            </Badge>
        )
    }

    return (
        <Badge variant="outline" className="text-white bg-emerald-600 border-none select-none">
            Live: Real-time updates
        </Badge>
    )
}