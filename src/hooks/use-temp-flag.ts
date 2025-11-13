import { useRef } from "react"

export function useTemporaryFlag(duration = 500) {
    const ref = useRef(false)

    const set = () => {
        ref.current = true
        setTimeout(() => {
            ref.current = false
        }, duration)
    }

    return [ref, set] as const
}