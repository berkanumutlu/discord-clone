import Link from "next/link"
import { cn } from "@/lib/utils"
import { NavigationMenuItemProps } from "@/types"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import NavigationBurgerMenuListItem from "./navigation-burger-menu-list-item"
import NavigationBurgerMenuListItemTitle from "./navigation-burger-menu-list-item-title"

const NavigationBurgerMenuItem = ({ item }: { item: NavigationMenuItemProps }) => {
    if (item?.dropdownContent) {
        return (
            <AccordionItem value={item.label} className="mx-0 static block font-abcgintonormal font-medium text-[.9rem] text-left border-b-[1px] border-solid border-app-white/5 rounded-none">
                <AccordionTrigger
                    className="mx-0 p-[1.5rem_1rem_1.5rem_0] relative flex justify-between items-center gap-x-1 gap-y-1 text-app-white font-abcgintodiscord font-medium text-lg leading-[1.3rem] md:text-base md:leading-[1.2rem] tracking-normal align-top text-left no-underline hover:no-underline rounded-2xl whitespace-nowrap select-none cursor-pointer
                        [&>svg]:w-4 [&>svg]:h-4 [&>svg]:static [&>svg]:flex [&>svg]:justify-center [&>svg]:items-center [&>svg]:overflow-hidden">{item.label}</AccordionTrigger>
                <AccordionContent className="p-0 min-w-full h-auto block static bg-transparent">
                    <div className="px-0 h-auto relative block rounded-br-[5.5rem] rounded-bl-[5.5rem]">
                        <ul className="mt-2 mx-auto w-full relative grid grid-cols-1 auto-rows-auto auto-cols-fr gap-10 z-[2]">
                            {item.dropdownContent?.links?.map((subItem, subItemIndex) => {
                                const subMenuClass = "flex flex-col gap-x-3 gap-y-3 text-[1rem]"

                                return (
                                    <li key={subItemIndex + '-' + subItem.title} className={cn(
                                        "pb-10 border-b-[1px] border-solid border-app-white/10",
                                        subMenuClass,
                                    )}>
                                        {subItem.href ? (
                                            <NavigationBurgerMenuListItem item={subItem} />
                                        ) : (
                                            <NavigationBurgerMenuListItemTitle title={subItem.title} />
                                        )}

                                        {subItem?.subMenu && subItem?.subMenu?.length > 0 && (
                                            <ul className={cn(
                                                subMenuClass,
                                                !subItem?.title && "gap-6"
                                            )}>
                                                {subItem?.subMenu?.map((subMenuItem, subMenuItemIndex) => {
                                                    if (subMenuItem?.subMenu && subMenuItem?.subMenu?.length > 0) {
                                                        return (
                                                            <li key={subMenuItemIndex + '-' + subMenuItem.title} className="flex flex-col gap-3">
                                                                <NavigationBurgerMenuListItemTitle title={subMenuItem.title} />

                                                                <ul className={subMenuClass}>
                                                                    {subMenuItem.subMenu.map((subSub, subSubIndex) => (
                                                                        <li key={subSubIndex + '-' + subSub.title}>
                                                                            <NavigationBurgerMenuListItem item={subSub} />
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </li>
                                                        )
                                                    }

                                                    return (
                                                        <li key={subMenuItemIndex + '-' + subMenuItem.title}>
                                                            <NavigationBurgerMenuListItem item={subMenuItem} />
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </AccordionContent>
            </AccordionItem>
        )
    }

    return (
        <AccordionItem value={item.label} className="mx-0 static block font-abcgintonormal font-medium text-[.9rem] text-left border-b-[1px] border-solid border-app-white/5 rounded-none">
            <Link href={item.href} className="mx-0 p-[1.5rem_.45rem_1.5rem_0] m-h-[38px] flex justify-start items-center self-start text-app-white font-abcgintodiscord font-medium text-[18px] md:text-[16px] leading-[1.3] md:leading-4 no-underline tracking-normal border-b-[1px] border-solid border-app-white/5 rounded-none transition-colors duration-400">{item.label}</Link>
        </AccordionItem>
    )
}

export default NavigationBurgerMenuItem;