"use client"

import { type ReactNode, useEffect, useState } from "react"

interface GSAPProviderProps {
    children: ReactNode
}

export default function GSAPProvider({ children }: GSAPProviderProps) {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const loadGSAP = async () => {
            const gsap = (await import("gsap")).default
            const ScrollTrigger = (await import("gsap/ScrollTrigger")).default
            const ScrollToPlugin = (await import("gsap/ScrollToPlugin")).default

            // Register plugins
            gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

            // Set default smooth scrub value
            ScrollTrigger.defaults({
                toggleActions: "play none none reverse",
                markers: false, // Set "true" on the development
            })

            setIsLoaded(true)
        }

        loadGSAP()
    }, [])

    if (!isLoaded) {
        return null
    }

    return <>{children}</>
}
