"use client"

import Link from "next/link"
import { ActionTooltip } from "@/components/action-tooltip"

interface NavigationActionItemProps {
    label: string
    href?: string
    children: React.ReactNode
    onClick?: () => void
    showTutorialContainer?: boolean
    showPill?: boolean
}

export const NavigationActionItem = ({
    label,
    href,
    onClick,
    children,
    showTutorialContainer = false,
    showPill = true,
}: NavigationActionItemProps) => {
    const content = (
        <div className="listItem">
            <ActionTooltip side="right" align="center" label={label} sideOffset={12}>
                <div className="listItemWrapper" role="treeitem" aria-selected="false">
                    {href ? (
                        <Link href={href}>
                            <div className="childWrapper">{children}</div>
                        </Link>
                    ) : (
                        <button onClick={onClick}>
                            <div className="childWrapper">{children}</div>
                        </button>
                    )}
                </div>
                {showPill && (
                    <div className="listItemPill">
                        <span className="listItemPillItem"></span>
                    </div>
                )}
            </ActionTooltip>
        </div>
    )

    if (showTutorialContainer) {
        return <div className="tutorialContainer">{content}</div>
    }

    return content
}
