"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";

export const NavigationAction = () => {
    return (
        <div>
            <ActionTooltip side="right" align="center" label="Add a Server">
                <button className="group flex items-center">
                    <div className="mx-3 w-[48px] h-[48px] flex rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
                        <Plus size={26} className="group-hover:text-white transition text-emerald-500" />
                    </div>
                </button>
            </ActionTooltip>
        </div>
    )
}