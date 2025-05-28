import { clerkMiddleware } from "@clerk/nextjs/server"
import { isProtectedRoute, isIgnoredRoute } from "@/lib/route/route-matchers"

export default clerkMiddleware((auth, request) => {
    // First check if it's an ignored route
    if (isIgnoredRoute(request)) {
        return // Skip authentication check for ignored routes
    }

    // Then check if it's a protected route
    if (isProtectedRoute(request)) {
        auth().protect()
    }
})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
}
