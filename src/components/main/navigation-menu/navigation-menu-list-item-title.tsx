import { cn } from "@/lib/utils"

const NavigationMenuListItemTitle = ({ className, title }: { className?: string; title: string }) => {
    return <div className={cn("mb-1 text-app-white font-abcgintodiscord text-sm xl:text-base !leading-[1.3rem] opacity-50", className)}>{title}</div>
}
NavigationMenuListItemTitle.displayName = "NavigationMenuListItemTitle"

export default NavigationMenuListItemTitle