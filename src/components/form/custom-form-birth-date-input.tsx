"use client"

import { useFormContext } from "react-hook-form"
import { days, months, years } from "@/data/dateData"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { InputProps } from "@/components/ui/input"
import { CustomCombobox } from "@/components/custom-combobox"
import { CustomFormLabel } from "@/components/form/custom-form-label"

type CustomFormBirthDateInputProps = {
    label?: string
    labelClassName?: string
    required?: InputProps["required"]
}

export const CustomFormBirthDateInput = ({
    label,
    labelClassName,
    required,
}: CustomFormBirthDateInputProps) => {
    const form = useFormContext()

    return (
        <fieldset className="flex flex-col">
            {label && (
                <CustomFormLabel
                    label={label}
                    labelClassName={labelClassName}
                    required={required}
                    fieldState={form.getFieldState("day")}
                />
            )}
            <div className="mb-1 grid grid-cols-3 gap-2">
                <FormField
                    control={form.control}
                    name="day"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <CustomCombobox
                                    options={days}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Day"
                                    className={form.formState.errors.day ? "border-2 border-app-status-danger" : ""}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="month"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <CustomCombobox
                                    options={months}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Month"
                                    className={form.formState.errors.month ? "border-2 border-app-status-danger" : ""}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <CustomCombobox
                                    options={years}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Year"
                                    className={form.formState.errors.year ? "border-2 border-app-status-danger" : ""}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
        </fieldset>
    )
}