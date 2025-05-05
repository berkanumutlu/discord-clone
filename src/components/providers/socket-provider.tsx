"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useRef } from "react"
import { useAuth } from "@clerk/nextjs"
import { io as ClientIO, type Socket } from "socket.io-client"
import { isProtectedRoute } from "@/lib/route/client-route-matchers"

type SocketContextType = {
    socket: Socket | null
    isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
})

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [isConnected, setIsConnected] = useState(false)
    const { isSignedIn } = useAuth()
    const socketRef = useRef<Socket | null>(null) // Use useRef instead of useState for the socket to avoid re-renders
    const socketInitializedRef = useRef(false) // Use another ref to track initialization

    useEffect(() => {
        // Get the current pathname
        const pathname = window.location.pathname
        const shouldConnect = isSignedIn && isProtectedRoute(pathname)

        // Function to create and set up socket
        const setupSocket = () => {
            // Clean up any existing socket first
            if (socketRef.current) {
                socketRef.current.disconnect()
                socketRef.current = null
                setIsConnected(false)
            }

            // Only create a new socket if user is signed in and on a protected route
            if (shouldConnect) {
                const socketInstance = ClientIO(process.env.NEXT_PUBLIC_SITE_URL! || "", {
                    path: "/api/socket/io",
                    addTrailingSlash: false,
                    withCredentials: true,
                    reconnectionAttempts: 5,
                    reconnectionDelay: 3000,
                })

                socketInstance.on("connect", () => {
                    setIsConnected(true)
                })

                socketInstance.on("disconnect", () => {
                    setIsConnected(false)
                })

                socketRef.current = socketInstance
                socketInitializedRef.current = true
            }
        }

        // Set up socket connection
        setupSocket()

        // Listen for route changes
        const handleRouteChange = () => {
            const newPathname = window.location.pathname
            const newShouldConnect = isSignedIn && isProtectedRoute(newPathname)

            if (newShouldConnect !== shouldConnect) {
                setupSocket()
            }
        }

        // Add event listener for popstate (browser back/forward)
        window.addEventListener("popstate", handleRouteChange)

        // Clean up function
        return () => {
            window.removeEventListener("popstate", handleRouteChange)

            if (socketRef.current) {
                socketRef.current.disconnect()
            }
        }
    }, [isSignedIn]) // Only depend on isSignedIn, not on socket state

    // Create a value object that doesn't change on every render
    const value = {
        socket: socketRef.current,
        isConnected,
    }

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}
