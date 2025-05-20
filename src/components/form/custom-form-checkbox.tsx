"use client"

import { useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

type Props = {
    label?: string
    name: string
    className?: string
    labelClassName?: string
    checkboxClassName?: string
    required?: boolean
}

export const CustomFormCheckbox = ({
    label,
    name,
    className,
    labelClassName,
    checkboxClassName,
    required = false,
}: Props) => {
    const form = useFormContext()

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn(
                    "space-y-0 relative flex flex-row flex-nowrap justify-start items-center",
                    "[&>input]:!transform-none",
                    className
                )}>
                    <FormControl>
                        <Checkbox
                            id={"id-" + label}
                            checked={field.value}
                            required={required}
                            onCheckedChange={field.onChange}
                            className={cn(
                                "size-6 flex flex-[0_0_auto] justify-center items-center bg-app-bg-checkbox-default border border-solid border-app-border-checkbox-default rounded-[6px]",
                                "data-[state=checked]:bg-app-bg-checkbox-checked data-[state=checked]:border-app-border-checkbox-checked [&>span]:text-app-white",
                                checkboxClassName
                            )}
                        />
                    </FormControl>
                    <div className="pl-2 min-w-0 block flex-[1_1_auto] text-app-text-normal-3 leading-[1.3333333333333333] cursor-pointer">
                        <label
                            htmlFor={"id-" + label}
                            dangerouslySetInnerHTML={{ __html: label ?? "" }}
                            className={cn(
                                "block text-app-text-normal-3 font-primary font-normal text-[12px] leading-[1.3333333333333333] cursor-pointer",
                                labelClassName
                            )}
                        ></label>
                    </div>
                </FormItem>
            )}
        />
    )
}