"use client";

import { useTheme } from "next-themes";
import { SmilePlus } from "lucide-react";
import Picker from "@emoji-mart/react";
import data, { Skin } from "@emoji-mart/data";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface EmojiPickerProps {
    onChange: (value: string) => void;
}

export const EmojiPicker = ({
    onChange
}: EmojiPickerProps) => {
    const { resolvedTheme } = useTheme();

    return (
        <Popover>
            <PopoverTrigger>
                <SmilePlus className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
            </PopoverTrigger>
            <PopoverContent side="right" sideOffset={40} className="mb-16 bg-transparent border-none shadow-none drop-shadow-none">
                <Picker data={data} theme={resolvedTheme} onEmojiSelect={(emoji: Skin) => onChange(emoji.native)} />
            </PopoverContent>
        </Popover>
    )
}