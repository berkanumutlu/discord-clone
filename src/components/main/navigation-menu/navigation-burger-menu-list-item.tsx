import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { NavigationMenuItemContentLinkProps } from "./navigation-menu-list-item"

const NavigationBurgerMenuListItem = ({ className, item }: { className?: string, item: NavigationMenuItemContentLinkProps }) => {
    return (
        <Link
            href={item?.href || "#"}
            className={cn(
                "group mx-0 p-0 gap-x-1 gap-y-1 flex justify-start items-center text-app-white font-abcgintodiscord font-medium text-lg md:text-base leading-[1.2] no-underline transition-opacity duration-350 hover:opacity-65",
                className,
            )}
            {...(item?.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
            {item?.title} {item?.isExternal && <ArrowUpRight className="w-4 h-4 flex justify-center items-center transition-transform duration-300 overflow-hidden group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
        </Link>
    )
}

export default NavigationBurgerMenuListItem