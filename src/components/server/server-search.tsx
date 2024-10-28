"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Command, Search } from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

interface ServerSearchProps {
    searchData?: {
        label: string;
        type: "channel" | "member",
        data: Array<{
            id: string;
            name: string;
            icon: React.ReactNode;
        }>
    }[]
}

export const ServerSearch = ({ searchData }: ServerSearchProps) => {
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key && e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => { document.removeEventListener("keydown", handleKeyDown) };
    }, [setOpen]);


    const onClick = ({ id, type }: { id: string, type: "channel" | "member" }) => {
        setOpen(false);
        if (type === "member") {
            return router.push(`/servers/${params?.serverId}/conversations/${id}`);
        }
        if (type === "channel") {
            return router.push(`/servers/${params?.serverId}/channels/${id}`);
        }
    };

    return (
        <>
            <button onClick={() => setOpen(true)} className="group px-2 py-2 w-full flex items-center gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 rounded-md transition">
                <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 group:hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">Search</p>
                <kbd className="ml-auto px-1.5 h-5 inline-flex items-center gap-1 font-mono text-[12px] font-medium text-muted-foreground bg-muted border rounded pointer-events-none">
                    <Command className="w-3 h-3" /> + K
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search all channels, members" />
                <CommandList>
                    <CommandEmpty>
                        No Results found
                    </CommandEmpty>
                    {searchData?.map(({ label, type, data }) => {
                        if (!data?.length) return null;

                        return (
                            <CommandGroup key={label} heading={label}>
                                {data?.map(({ id, icon, name }) => (
                                    <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                                        {icon}<span>{name}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        );
                    })}
                </CommandList>
            </CommandDialog>
        </>
    )
}