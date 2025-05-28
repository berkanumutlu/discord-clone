"use client"

import { ControllerFieldState } from "react-hook-form"
import { cn } from "@/lib/utils"
import { FormLabel } from "@/components/ui/form"
import { InputProps } from "@/components/ui/input"

type CustomFormLabelProps = {
    label: string
    labelClassName?: string
    required?: InputProps["required"]
    fieldState?: ControllerFieldState
}

export const CustomFormLabel = ({
    label,
    labelClassName,
    required,
    fieldState,
}: CustomFormLabelProps) => {
    return (
        <FormLabel
            className={cn(
                "mb-2 block text-app-header-secondary-2 font-display font-bold text-[12px] leading-[1.3333333333333333] uppercase tracking-[.02em]",
                fieldState?.invalid && "text-app-text-danger",
                labelClassName
            )}
        >
            {label}
            {required && !fieldState?.invalid && <span className="pl-1 text-app-text-danger font-[inherit] text-[12px] leading-4 align-baseline">*</span>}
            {fieldState?.error?.message && (
                <span className="font-medium italic text-[12px] leading-4 normal-case">
                    <span className="px-1">-</span>
                    {fieldState?.error?.message}
                </span>
            )}
        </FormLabel>
    )
}