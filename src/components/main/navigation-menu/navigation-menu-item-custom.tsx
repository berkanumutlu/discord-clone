import { forwardRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import { NavigationMenuCustomProps, NavigationMenuItemContentProps } from "@/types"
import { placeholderImageUrl } from "@/data"
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import NavigationMenuListItemTitle from "@/components/main/navigation-menu/navigation-menu-list-item-title"
import NavigationMenuListItem from "@/components/main/navigation-menu/navigation-menu-list-item"
import NavigationMenuDivider from "@/components/main/navigation-menu/navigation-menu-divider"

const NavigationMenuItemCustom = forwardRef<
    React.ElementRef<typeof NavigationMenuItem>,
    React.ComponentPropsWithoutRef<typeof NavigationMenuItem> & {
        label: string
        href?: string
        isExternal?: boolean
        variant?: NavigationMenuCustomProps["variant"]
        navStyle?: NavigationMenuCustomProps["navStyle"]
        dropdownContent?: NavigationMenuItemContentProps
    }
>(({ className, label, href = "#", isExternal = false, variant = "transparent", navStyle = "advanced", dropdownContent = {}, ...props }, ref) => {
    const labelTextColor = variant === "light" ? "text-app-black dark:text-app-white" : "text-app-white"
    const hasDropdownContent = navStyle === "advanced" && (dropdownContent?.links && dropdownContent?.links?.length > 0)
    const decorImage = dropdownContent?.decorImage ? "/images/decor" + dropdownContent.decorImage : placeholderImageUrl

    if (hasDropdownContent) {
        const dropdownGridTemplateColClass =
            (dropdownContent.links?.length ?? 0) === 1 ? "xl:grid-cols-[auto]" :
                (dropdownContent.links?.length ?? 0) === 2 ? "xl:grid-cols-[auto_1fr]" :
                    (dropdownContent.links?.length ?? 0) >= 3 ? "lg:grid-cols-[auto_auto_auto] xl:grid-cols-[auto_1fr_auto]" : ""
        const subMenuClass = "flex flex-col gap-x-3 gap-y-3 xl:text-[1.1rem]"

        return (
            <NavigationMenuItem ref={ref} className={className} {...props}>
                <NavigationMenuTrigger
                    className={cn(
                        "mx-0 p-[.625rem_.25rem_.625rem_.45rem] xl:pl-3 xl:pr-2 2xl:px-4 !h-auto min-h-[38px] xl:max-h-none flex justify-center items-center self-start lg:self-center !bg-transparent hover:!bg-app-blurple focus:!bg-app-blurple text-app-white hover:text-app-white font-abcgintodiscord font-medium text-sm xl:text-base leading-4 xl:leading-[1.2rem] no-underline xl:tracking-normal rounded-xl transition-colors duration-400 xl:[&[data-state=open]]:px-4 [&[data-state=open]]:!bg-app-blurple [&[data-state=open]]:text-app-white",
                        labelTextColor,
                    )}
                >
                    {label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-auto min-w-max">
                    <div className="m-0 lg:mx-auto p-0 lg:p-8 xl:p-10 h-auto relative block bg-app-blurple rounded-none lg:rounded-[40px] xl:overflow-visible">
                        <div className={cn(
                            "mx-auto xl:mt-0 w-full xl:max-w-[61.375rem] relative grid grid-cols-fr auto-cols-[1fr] grid-rows-[auto] gap-x-[1.875rem] gap-y-[1.875rem] z-[2]",
                            dropdownGridTemplateColClass,
                        )}>
                            {dropdownContent?.links?.map((group, groupIndex) => (
                                <div key={groupIndex + '-' + group.title + '-div'} className="pb-0 border-b border-app-white/10 [border-bottom-style:none]">
                                    <ul key={groupIndex + '-' + group.title + '-ul'} className={subMenuClass}>
                                        {group.title && <NavigationMenuListItemTitle title={group.title} />}
                                        {group.subMenu?.map((item, itemIndex) => {
                                            if (item.subMenu && item.subMenu.length > 0) {
                                                return (
                                                    <div key={itemIndex + '-' + item.title + '-subMenu'}>
                                                        <li className={subMenuClass}>
                                                            {item.href ? (
                                                                <NavigationMenuListItem item={item} />
                                                            ) : (
                                                                <NavigationMenuListItemTitle title={item.title} />
                                                            )}

                                                            <ul className={subMenuClass}>
                                                                {item.subMenu.map((subItem, subItemIndex) => (
                                                                    <NavigationMenuListItem key={subItemIndex + '-' + subItem.title} item={subItem} />
                                                                ))}
                                                            </ul>
                                                        </li>
                                                        {itemIndex < (group.subMenu?.length ?? 0) - 1 && (<NavigationMenuDivider key={itemIndex} />)}
                                                    </div>
                                                )
                                            }

                                            return (
                                                <li key={itemIndex + '-' + item.title}>
                                                    <NavigationMenuListItem item={item}
                                                        className={cn(
                                                            !group.title && "mb-6 lg:mb-3"
                                                        )}
                                                    />
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        {dropdownContent?.decorImage && (
                            <div className={cn(
                                "nav-decor",
                                dropdownContent?.decorImageClass,
                            )}>
                                <Image src={decorImage} alt="Decoration Image" fill sizes="140px" className="animate-fade-in-up-custom" />
                            </div>
                        )}
                    </div>
                </NavigationMenuContent>
            </NavigationMenuItem>
        )
    }

    return (
        <NavigationMenuItem ref={ref} className={className} {...props}>
            <NavigationMenuLink
                href={href}
                className={cn(
                    navigationMenuTriggerStyle(),
                    labelTextColor,
                    navStyle === "advanced" && "mx-0 p-[.625rem_.45rem] xl:px-3 2xl:px-4 h-auto min-h-[38px] flex justify-center items-center self-start lg:self-center bg-transparent hover:bg-app-blurple focus:bg-app-blurple !text-app-white font-abcgintodiscord font-medium text-[14px] xl:text-[16px] leading-4 xl:leading-[1.2rem] no-underline xl:tracking-normal rounded-xl transition-colors duration-400",
                    navStyle === "basic" && "m-2 xl:m-2.5 p-2 xl:p-2.5 !bg-transparent !text-app-white font-semibold text-[16px] no-underline hover:underline",
                )}
                {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
            >
                {label} {isExternal && <ArrowUpRight className="ml-1 w-3 h-3" />}
            </NavigationMenuLink>
        </NavigationMenuItem>
    )
})
NavigationMenuItemCustom.displayName = "NavigationMenuItemCustom"

export default NavigationMenuItemCustom