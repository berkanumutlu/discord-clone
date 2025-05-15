import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import { NavigationMenuItemContentLinkProps } from "@/types"
import { NavigationMenuLink } from "@/components/ui/navigation-menu"

const NavigationMenuListItem = forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & {
        item?: NavigationMenuItemContentLinkProps
    }
>(({ className, item }, ref) => {
    return (
        <NavigationMenuLink
            ref={ref}
            href={item?.href}
            className={cn(
                "group mx-0 p-0 gap-x-1 gap-y-1 flex justify-start items-center text-app-white font-abcgintodiscord text-sm xl:text-[1rem] font-medium leading-[1.2] no-underline transition-opacity duration-350 hover:opacity-65",
                className,
            )}
            {...(item?.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
            {item?.title} {item?.isExternal && <ArrowUpRight className="ml-1 w-4 h-4 flex justify-center items-center transition-transform duration-300 overflow-hidden group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
        </NavigationMenuLink>
    )
})
NavigationMenuListItem.displayName = "NavigationMenuListItem"

export default NavigationMenuListItem