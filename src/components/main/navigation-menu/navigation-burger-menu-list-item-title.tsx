import { cn } from "@/lib/utils"

const NavigationBurgerMenuListItemTitle = ({ className, title }: { className?: string; title: string }) => {
    if (!title) return null
    return <div className={cn("mb-1 text-app-white font-abcgintodiscord font-medium text-lg md:text-base leading-[1.3] opacity-50", className)}>{title}</div>
}

export default NavigationBurgerMenuListItemTitle