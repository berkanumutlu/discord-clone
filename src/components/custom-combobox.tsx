"use client"

import { forwardRef, useRef, useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

type CustomComboboxOptionType = {
    label: string
    value: string
}

interface CustomComboboxProps {
    options: CustomComboboxOptionType[]
    value: string
    placeholder?: string
    className?: string
    onChange: (value: string) => void
}

export const CustomCombobox = forwardRef<
    HTMLButtonElement,
    CustomComboboxProps
>(({ options, value, placeholder, className, onChange }: CustomComboboxProps, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const commandInputRef = useRef<HTMLInputElement>(null)
    const selectedItemRef = useRef<HTMLDivElement | null>(null)
    const selectedOption = options.find((option) => option.value === value)

    const handleOpenChange = (isOpen: boolean) => {
        setIsOpen(isOpen)
        if (isOpen) {
            // Focus the search input when opened
            requestAnimationFrame(() => {
                commandInputRef.current?.focus()
                selectedItemRef.current?.scrollIntoView({
                    block: "nearest",
                    behavior: "auto",
                })
            })
        } else {
            // Reset search term when closed
            setSearchTerm("")
        }
    }

    return (
        <Popover open={isOpen} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
                <Button
                    ref={ref}
                    variant="outline"
                    role="combobox"
                    aria-expanded={isOpen}
                    className={cn("group w-full justify-between !bg-app-bg-input-2 border-app-bg-input-2 font-medium text-[16px] leading-4", className)}
                >
                    {selectedOption ? selectedOption.label : placeholder || "Select..."}
                    <ChevronDown className="ml-2 size-4 shrink-0 transition duration-200 opacity-50 group-data-[state=open]:rotate-180" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full border-app-bg-tertiary-2 shadow-[rgba(0,0,0,0.1)_0px_0px_0px_1px,rgba(0,0,0,0.1)_0px_4px_11px]">
                <Command className="bg-app-bg-secondary-alt">
                    <CommandInput
                        ref={commandInputRef}
                        value={searchTerm}
                        placeholder={placeholder || "Search..."}
                        onValueChange={setSearchTerm}
                    />
                    <CommandList className="bg-app-bg-base-lower">
                        <CommandEmpty className="py-3 font-medium text-[14px] leading-3 text-center">No results found.</CommandEmpty>
                        <CommandGroup className="max-h-60 overflow-y-auto">
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    ref={option.value === value ? selectedItemRef : undefined}
                                    value={option.value}
                                    onSelect={(currentValue) => {
                                        if (currentValue !== value) {
                                            onChange(currentValue)
                                        }
                                        setIsOpen(false)
                                    }}
                                    className="p-3 min-h-10 bg-transparent hover:!bg-app-bg-modifier-selected !text-app-interactive-normal-2 hover:!text-app-interactive-active font-medium text-[16px] leading-4 cursor-pointer data-[selected=true]:bg-app-bg-modifier-selected data-[selected=true]:!text-app-interactive-active"
                                >
                                    <Check className={cn("mr-2 w-4 h-4 transition-opacity", value === option.value ? "opacity-100" : "opacity-0")} />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
})

CustomCombobox.displayName = "CustomCombobox"