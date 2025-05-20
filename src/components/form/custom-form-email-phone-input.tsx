"use client"

import { useEffect, useRef, useState } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import { cn } from "@/lib/utils"
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input, InputProps } from "@/components/ui/input"
import { CustomFormLabel } from "@/components/form/custom-form-label"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"

interface CustomFormEmailPhoneInputProps {
    label?: string
    name?: string
    description?: string
    type?: InputProps["type"]
    className?: string
    inputClassName?: string
    labelClassName?: string
    required?: InputProps["required"]
    autoFocus?: boolean
    tabIndex?: number
    hasFormMessage?: boolean
}

export const CustomFormEmailPhoneInput = ({
    label = "Email or Phone Number",
    name = "emailOrPhone",
    description,
    type = "text",
    className,
    inputClassName,
    labelClassName,
    required = false,
    autoFocus = false,
    tabIndex,
    hasFormMessage = false,
}: CustomFormEmailPhoneInputProps) => {
    const form = useFormContext()
    const inputRef = useRef<HTMLInputElement>(null)
    const phoneInputRef = useRef<HTMLInputElement>(null)
    const [isPhone, setIsPhone] = useState(false)
    const [phoneValue, setPhoneValue] = useState("")
    const fieldValue = useWatch({ control: form.control, name })

    useEffect(() => {
        if (autoFocus && inputRef?.current) {
            inputRef.current.focus()
        }
    }, [autoFocus])

    // Check if input is a phone number
    useEffect(() => {
        if (!fieldValue) {
            setIsPhone(false)
            setPhoneValue("")
            return
        }

        const phoneRegex = /^[0-9+\s()-]+$/
        const isPhoneNumber = phoneRegex.test(fieldValue)
        setIsPhone(isPhoneNumber)

        if (isPhoneNumber) {
            setTimeout(() => {
                phoneInputRef?.current?.focus()
            }, 0)
        }
    }, [fieldValue, isPhone])

    // Handle phone input change
    const handlePhoneChange = (value: string) => {
        // If phone value is empty, switch back to email input
        if (!value) {
            setIsPhone(false)
            setPhoneValue("")
            form.setValue(name, "", { shouldValidate: true })
            setTimeout(() => {
                inputRef?.current?.focus()
            }, 0)
            return
        }

        setPhoneValue(value)
        form.setValue(name, `+${value}`, { shouldValidate: true })
    }

    // Handle email input change
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        // If value is empty, reset
        if (!value) {
            setIsPhone(false)
            setPhoneValue("")
            form.setValue(name, "", { shouldValidate: true })
            return
        }

        // Check if it's a phone number
        const phoneRegex = /^[0-9+\s()-]+$/
        const isPhoneNumber = phoneRegex.test(value)

        // If switching to phone, set the phone value
        if (isPhoneNumber) {
            // Extract the phone number without the + if it exists
            const phoneNumber = value.startsWith("+") ? value.substring(1) : value
            setPhoneValue(phoneNumber)

            // Focus the phone input after render
            setTimeout(() => {
                phoneInputRef?.current?.focus()
            }, 0)
        }

        form.setValue(name, value, { shouldValidate: true })
    }

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
                        <div className={cn(
                            "p-0 w-full h-11 flex items-center bg-app-bg-input-2 text-app-text-normal-3 text-[16px] border border-solid border-app-border-input focus-within:border-app-text-link-2 rounded-lg transition-colors duration-200 ease-in-out",
                            fieldState?.invalid && "border-2 border-app-status-danger",
                        )}>
                            <div className="relative flex flex-col flex-grow">
                                {isPhone ? (
                                    <PhoneInput
                                        value={phoneValue}
                                        onChange={handlePhoneChange}
                                        inputClass={cn("!w-full !bg-transparent !border-none !text-app-text-normal-3", inputClassName)}
                                        buttonClass="!bg-transparent !border-none [&>.selected-flag]:!bg-transparent"
                                        dropdownClass="dark:!bg-app-bg-secondary !text-app-text-normal-3"
                                        searchClass="!bg-app-bg-secondary-alt !text-app-text-normal-3"
                                        enableSearch={true}
                                        disableSearchIcon={false}
                                        searchPlaceholder="Search country..."
                                        inputProps={{
                                            ref: phoneInputRef,
                                            name,
                                            required,
                                            autoFocus,
                                            tabIndex,
                                            'aria-label': 'Phone Number'
                                        }}
                                    />
                                ) : (
                                    <Input
                                        {...field}
                                        ref={inputRef}
                                        type={type}
                                        tabIndex={tabIndex}
                                        aria-label="Email or Phone Number"
                                        onChange={handleEmailChange}
                                        className={cn(
                                            "peer p-[12px_10px] w-full h-11 bg-transparent text-app-text-normal-3 text-[16px] border-none rounded-lg transition-colors duration-200 ease-in-out",
                                            inputClassName
                                        )}
                                    />
                                )}
                            </div>
                        </div>
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
                </FormItem >
            )}
        />
    )
}