"use client"

import { useEffect, useRef } from "react"
import { useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input, InputProps } from "@/components/ui/input"
import { CustomFormLabel } from "@/components/form/custom-form-label"

interface CustomFormInputProps {
    label?: string
    name: string
    description?: string
    type?: InputProps["type"]
    className?: string
    inputClassName?: string
    labelClassName?: string
    required?: InputProps["required"]
    autoFocus?: boolean
    autocomplete?: InputProps["autoComplete"]
    tabIndex?: number
    hasFormMessage?: boolean
}

export const CustomFormInput = ({
    label,
    name,
    description,
    type = "text",
    className,
    inputClassName,
    labelClassName,
    required = false,
    autoFocus = false,
    autocomplete,
    tabIndex,
    hasFormMessage = false,
}: CustomFormInputProps) => {
    const form = useFormContext()
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (autoFocus && inputRef?.current) {
            inputRef.current.focus()
        }
    }, [autoFocus])

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem className={cn("space-y-0 pt-1 relative", className)}>
                    {label && (
                        <CustomFormLabel
                            label={label}
                            labelClassName={labelClassName}
                            required={required}
                            fieldState={fieldState}
                        />
                    )}
                    <FormControl>
                        <Input
                            {...field}
                            ref={inputRef}
                            type={type}
                            tabIndex={tabIndex}
                            autoComplete={autocomplete}
                            className={cn(
                                "peer p-[12px_10px] w-full h-11 bg-app-bg-input-2 text-app-text-normal-3 text-[16px] border border-solid border-app-border-input focus:border-app-text-link-2 rounded-lg transition-colors duration-200 ease-in-out",
                                fieldState?.invalid && "border-2 border-app-status-danger",
                                inputClassName
                            )}
                        />
                    </FormControl>
                    <div className={cn(
                        "pb-0 h-0 opacity-0 scale-y-95 text-app-text-normal-3 font-primary font-normal text-[14px] leading-[1.2857142857142858] transition-all duration-500 ease-in-out pointer-events-none overflow-hidden",
                        "peer-focus:mt-2 peer-focus:pb-9 peer-focus:sm:pb-0 peer-focus:h-[18px] peer-focus:opacity-100 peer-focus:scale-y-100 peer-focus:pointer-events-auto",
                        (!(hasFormMessage && fieldState.error?.message) && !description) && "peer-focus:mt-0 peer-focus:pb-0 peer-focus:h-0 peer-focus:opacity-0 peer-focus:scale-y-95 peer-focus:pointer-events-none"
                    )}>
                        {(hasFormMessage && fieldState.error?.message) ? (
                            <FormMessage className="font-[inherit] font-normal text-inherit leading-[inherit]">{fieldState.error.message}</FormMessage>
                        ) : description && (
                            <FormDescription className="font-[inherit] font-normal text-inherit leading-[inherit]">{description}</FormDescription>
                        )}
                    </div>
                </FormItem>
            )}
        />
    )
}