import { protectedRoutePatterns, ignoredRoutePatterns } from "@/lib/route/route-patterns"

// Client-side version of route matching
export function isProtectedRoute(path: string): boolean {
    return protectedRoutePatterns.some((pattern) => {
        const regexPattern = new RegExp(`^${pattern.replace(/\*/g, ".*")}$`)
        return regexPattern.test(path)
    })
}

export function isIgnoredRoute(path: string): boolean {
    return ignoredRoutePatterns.some((pattern) => {
        const regexPattern = new RegExp(`^${pattern.replace(/\*/g, ".*")}$`)
        return regexPattern.test(path)
    })
}
