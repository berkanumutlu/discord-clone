"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationAction = () => {
    const { onOpen } = useModal();

    return (
        <div>
            <ActionTooltip side="right" align="center" label="Add a Server">
                <button onClick={() => onOpen("createServer")} className="group flex items-center">
                    <div className="mx-3 w-[48px] h-[48px] flex items-center justify-center rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
                        <Plus size={24} className="group-hover:text-white transition text-emerald-500" />
                    </div>
                </button>
            </ActionTooltip>
        </div>
    )
}