"use client"

import { useRouter } from "next/navigation"

export const useRouterCustom = () => {
    const router = useRouter()

    const goTo = (path: string) => {
        router.push(path)
    }

    const goToWithQuery = (path: string, query: Record<string, string | number>) => {
        const stringQuery: Record<string, string> = Object.fromEntries(
            Object.entries(query).map(([key, value]) => [key, String(value)])
        )
        const url = new URLSearchParams(stringQuery).toString()
        router.push(`${path}?${url}`)
    }

    const replace = (path: string) => {
        router.replace(path)
    }

    const goBack = () => {
        router.back()
    }

    const refresh = () => {
        router.refresh()
    }

    return {
        goTo,
        goToWithQuery,
        replace,
        goBack,
        refresh,
    }
}