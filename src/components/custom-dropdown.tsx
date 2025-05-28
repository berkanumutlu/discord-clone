"use client"

import type * as React from "react"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CustomDropdownProps<T> {
  value: T
  options: T[]
  onChange: (value: T) => void
  renderOption?: (option: T) => React.ReactNode
  placeholder?: string
  contentClassName?: string
  triggerClassName?: string
  itemClassName?: string
  maxHeightContent?: number
  disabled?: boolean
}

export function CustomDropdown<T>({
  value,
  options,
  onChange,
  renderOption = (option) => String(option),
  placeholder = "Select an option",
  contentClassName = "",
  triggerClassName = "",
  itemClassName = "",
  maxHeightContent = 256,
  disabled = false,
}: CustomDropdownProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={disabled}
        className={`mx-auto px-[16px] py-[17.5px] pl-[24px] w-full max-h-14 relative flex items-center justify-between align-top gap-x-2 gap-y-2 bg-app-white/10 text-app-white font-normal text-base no-underline text-left rounded-[16px] transition-all duration-300 whitespace-nowrap cursor-pointer select-none focus:outline-0 focus-visible:outline-0 ${triggerClassName}`}
      >
        <span>{value ? renderOption(value) : placeholder}</span>
        <ChevronDown className="w-6 h-6 ml-auto" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`mt-2 p-2 pr-[6px] w-full block bg-[#5b62c7] text-app-text-normal text-base border-none rounded-3xl custom-scrollbar !overflow-y-scroll z-[900] ${contentClassName}`}
        style={{ maxHeight: `${maxHeightContent}px`, minWidth: 'var(--radix-dropdown-menu-trigger-width)' }}
      >
        {options.map((option, index) => (
          <DropdownMenuItem
            key={index}
            className={`px-[17.5px] py-[16px] block hover:bg-app-white/10 focus:bg-app-white/10 text-app-white focus:text-app-white font-abcgintodiscord text-base rounded-2xl cursor-pointer ${itemClassName}`}
            onClick={() => onChange(option)}
          >
            {renderOption(option)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
