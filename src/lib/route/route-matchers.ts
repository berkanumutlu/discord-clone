import { createRouteMatcher } from "@clerk/nextjs/server"
import { protectedRoutePatterns, ignoredRoutePatterns } from "./route-patterns"

// Create route matchers using Clerk's function (server-side only)
export const isProtectedRoute = createRouteMatcher(protectedRoutePatterns)
export const isIgnoredRoute = createRouteMatcher(ignoredRoutePatterns)
