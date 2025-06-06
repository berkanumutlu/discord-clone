"use client"

import { useState, useEffect, useMemo } from "react"

// Custom breakpoint values
export const breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1280,
    "2xl": 1440,
    "3xl": 1920,
}

// Interface for media queries
export interface MediaQueriesProps {
    isMobile: boolean // < 576px
    isTablet: boolean // >= 576px && < 992px
    isDesktop: boolean // >= 992px
    isLargeDesktop: boolean // >= 1280px
    isExtraLargeDesktop: boolean // >= 1440px
    isUltraLargeDesktop: boolean // >= 1920px

    // Screen sizes
    isXs: boolean // < 576px (same as mobile)
    isSm: boolean // >= 576px && < 768px
    isMd: boolean // >= 768px && < 992px
    isLg: boolean // >= 992px && < 1280px
    isXl: boolean // >= 1280px && < 1440px
    is2xl: boolean // >= 1440px && < 1920px
    is3xl: boolean // >= 1920px

    // Orientation
    isPortrait: boolean // height > width
    isLandscape: boolean // width > height

    // Special queries
    isTouch: boolean // Is touch device?
    isRetina: boolean // Is retina display?

    // Screen dimensions
    width: number
    height: number

    // Helper functions
    isMinWidth: (minWidth: number) => boolean // Check if width is at least minWidth
    isMaxWidth: (maxWidth: number) => boolean // Check if width is at most maxWidth
    isBetweenWidth: (minWidth: number, maxWidth: number) => boolean // Check if width is between minWidth and maxWidth
}

// Debounce function to improve performance
function debounce<T extends (...args: unknown[]) => unknown>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null

    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), wait)
    }
}

export function useMediaQuery(): MediaQueriesProps {
    // Initial values ​​(for SSR)
    const [state, setState] = useState<MediaQueriesProps>({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        isLargeDesktop: false,
        isExtraLargeDesktop: false,
        isUltraLargeDesktop: false,

        isXs: false,
        isSm: false,
        isMd: false,
        isLg: false,
        isXl: false,
        is2xl: false,
        is3xl: false,

        isPortrait: false,
        isLandscape: false,

        isTouch: false,
        isRetina: false,

        width: 0,
        height: 0,

        // Helper functions (initial values)
        isMinWidth: () => false,
        isMaxWidth: () => false,
        isBetweenWidth: () => false,
    })

    useEffect(() => {
        // Make sure we're running on the client-side
        if (typeof window === "undefined") return

        // Function to check media queries
        const checkMediaQueries = () => {
            const width = window.innerWidth
            const height = window.innerHeight

            // Breakpoint checks
            const isMobile = width < breakpoints.sm
            const isTablet = width >= breakpoints.sm && width < breakpoints.lg
            const isDesktop = width >= breakpoints.lg
            const isLargeDesktop = width >= breakpoints.xl
            const isExtraLargeDesktop = width >= breakpoints["2xl"]
            const isUltraLargeDesktop = width >= breakpoints["3xl"]

            // Detailed breakpoint checks
            const isXs = width < breakpoints.sm
            const isSm = width >= breakpoints.sm && width < breakpoints.md
            const isMd = width >= breakpoints.md && width < breakpoints.lg
            const isLg = width >= breakpoints.lg && width < breakpoints.xl
            const isXl = width >= breakpoints.xl && width < breakpoints["2xl"]
            const is2xl = width >= breakpoints["2xl"] && width < breakpoints["3xl"]
            const is3xl = width >= breakpoints["3xl"]

            // Orientation checks
            const isPortrait = height > width
            const isLandscape = width > height

            // Special checks
            const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
            const isRetina = window.devicePixelRatio > 1

            // Helper functions
            const isMinWidth = (minWidth: number) => width >= minWidth
            const isMaxWidth = (maxWidth: number) => width <= maxWidth
            const isBetweenWidth = (minWidth: number, maxWidth: number) => width >= minWidth && width <= maxWidth

            setState({
                isMobile,
                isTablet,
                isDesktop,
                isLargeDesktop,
                isExtraLargeDesktop,
                isUltraLargeDesktop,

                isXs,
                isSm,
                isMd,
                isLg,
                isXl,
                is2xl,
                is3xl,

                isPortrait,
                isLandscape,

                isTouch,
                isRetina,

                width,
                height,

                // Helper functions
                isMinWidth,
                isMaxWidth,
                isBetweenWidth,
            })
        }

        // Initial check
        checkMediaQueries()

        // Listen for resize events with debounce for better performance
        const debouncedCheckMediaQueries = debounce(checkMediaQueries, 100)
        window.addEventListener("resize", debouncedCheckMediaQueries)

        // Cleanup function
        return () => {
            window.removeEventListener("resize", debouncedCheckMediaQueries)
        }
    }, [])

    // Use memoization to prevent unnecessary re-renders
    return useMemo(() => state, [state])
}
