"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useMediaQuery, type MediaQueriesProps } from "@/hooks/use-media-query"

// Create Context
const MediaQueryContext = createContext<MediaQueriesProps | undefined>(undefined)

// Provider component
export function MediaQueryProvider({ children }: { children: ReactNode }) {
    const mediaQueries = useMediaQuery()

    return <MediaQueryContext.Provider value={mediaQueries}>{children}</MediaQueryContext.Provider>
}

// Hook to use the context
export function useMedia(): MediaQueriesProps {
    const context = useContext(MediaQueryContext)

    if (context === undefined) {
        throw new Error("useMedia must be used within a MediaQueryProvider")
    }

    return context
}
