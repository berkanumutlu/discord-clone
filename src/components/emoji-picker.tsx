"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { SmilePlus } from "lucide-react"
import Picker from "@emoji-mart/react"
import data, { Skin } from "@emoji-mart/data"
import { cn } from "@/lib/utils"
import { useTemporaryFlag } from "@/hooks/use-temp-flag"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface EmojiPickerProps {
    onOpen?: () => void
    onClose?: () => void
    onSelect: (value: string) => void
    iconWidth?: number
    iconHeight?: number
    side?: "top" | "right" | "bottom" | "left"
    sideOffset?: number
    random?: boolean
}

export const EmojiPicker = ({
    onOpen,
    onClose,
    onSelect,
    iconWidth = 24,
    iconHeight = 24,
    side = "right",
    sideOffset = 100,
    random = false,
}: EmojiPickerProps) => {
    const { resolvedTheme } = useTheme()
    const [open, setOpen] = useState(false)
    const [ignoreNextClose, setIgnoreNextClose] = useTemporaryFlag(500)
    const [emojiSpriteStyle, setEmojiSpriteStyle] = useState({})
    const [isHovered, setIsHovered] = useState(false)

    const handleOpenChange = (newOpen: boolean) => {
        if (newOpen) {
            setIgnoreNextClose()
            setOpen(true)
            onOpen?.()
        } else {
            if (ignoreNextClose.current) return
            setOpen(false)
            onClose?.()
            setIsHovered(false)
        }
    }

    const handleEmojiHover = () => {
        if (!open) {
            const row = Math.floor(Math.random() * 4)
            const col = row === 3 ? Math.floor(Math.random() * 17) : Math.floor(Math.random() * 20)
            setEmojiSpriteStyle({
                "--custom-emoji-sprite-row": row,
                "--custom-emoji-sprite-col": col,
            } as React.CSSProperties)
        }
        setIsHovered(true)
    }

    const handleEmojiUnhover = () => {
        if (!open) {
            setIsHovered(false)
        }
    }

    return (
        <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger>
                {random ? (
                    <div
                        className="spriteContainer"
                        style={emojiSpriteStyle}
                        onMouseEnter={handleEmojiHover}
                        onMouseLeave={handleEmojiUnhover}
                    >
                        <div className={cn("sprite spriteColored", isHovered ? "active" : "inactive")}></div>
                        <div className={cn("sprite spriteGreyscale", isHovered ? "inactive" : "active")}></div>
                    </div>
                ) : (
                    <SmilePlus width={iconWidth} height={iconHeight} className="emojiListIcon" />
                )}
            </PopoverTrigger>
            <PopoverContent side={side} sideOffset={sideOffset} className="mb-16 bg-transparent border-none shadow-none drop-shadow-none transition pointer-events-auto">
                <Picker
                    data={data}
                    theme={resolvedTheme}
                    onEmojiSelect={(emoji: Skin) => onSelect(emoji.native)}
                    onClickOutside={() => {
                        if (!ignoreNextClose.current) {
                            setOpen(false)
                            onClose?.()
                            setIsHovered(false)
                        }
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}