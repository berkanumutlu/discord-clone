"use client"

import { cn } from "@/lib/utils"
import { NavigationMenuCustomProps } from "@/types"
import { navigationMenuItems } from "@/data/globalData"
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu"
import NavigationMenuItemCustom from "@/components/main/navigation-menu/navigation-menu-item-custom"

export function NavigationMenuCustom({
    variant = "transparent",
    navStyle = "advanced",
}: NavigationMenuCustomProps) {
    return (
        <div className={cn(
            "relative hidden",
            navStyle === "advanced" && "mx-auto lg:block xl:static",
            navStyle === "basic" && "lg:flex flex-[1_1_auto] justify-center font-primary font-semibold text-[16px] leading-[140%] text-center",
        )}>
            <NavigationMenu className="navigationMenu">
                <NavigationMenuList className={cn(
                    "space-x-0 flex justify-start xl:justify-center items-start xl:items-center flex-row flex-1 flex-wrap xl:flex-nowrap xl:gap-x-0 bg-transparent overflow-visible",
                    navStyle === "basic" && "flex-nowrap",
                )}>
                    {navigationMenuItems.map((item, index) => {
                        return (<NavigationMenuItemCustom key={index} href={item?.href} label={item?.label} variant={variant} navStyle={navStyle} dropdownContent={item?.dropdownContent} />)
                    })}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}
