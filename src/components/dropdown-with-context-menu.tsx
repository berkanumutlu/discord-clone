"use client"

import { ReactElement, ReactNode, useState } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { ContextMenu, ContextMenuTrigger, ContextMenuContent } from "@/components/ui/context-menu"

type DropdownWithContextMenuProps = {
    dropdownMenuTrigger: ReactElement
    dropdownMenuContent: ReactNode
    contextMenuContent: ReactNode
}

export function DropdownWithContextMenu({
    dropdownMenuTrigger,
    dropdownMenuContent,
    contextMenuContent,
}: DropdownWithContextMenuProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <div
                    onClick={(e) => {
                        e.preventDefault()
                        setDropdownOpen((prev) => !prev)
                    }}
                    onContextMenu={(e) => {
                        if (dropdownOpen) {
                            e.preventDefault()
                            return
                        }
                        setDropdownOpen(false)
                    }}
                    className="group"
                    data-state={dropdownOpen ? "open" : "closed"}
                >
                    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                        <DropdownMenuTrigger asChild>
                            {dropdownMenuTrigger}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-0 border-none rounded-lg z-[102]">
                            {dropdownMenuContent}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="p-0 border-none rounded-lg z-[102]">
                {contextMenuContent}
            </ContextMenuContent>
        </ContextMenu>
    )
}
