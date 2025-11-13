import { createElement, ReactNode } from "react"
import { MemberRole } from "@prisma/client"
import { ShieldAlert, ShieldCheck } from "lucide-react"

export const getUserRoleIcon = (userRole?: MemberRole): ReactNode => {
    switch (userRole) {
        case MemberRole.ADMIN:
            return createElement(ShieldAlert, { className: "size-4 text-app-role-default-admin" })
        case MemberRole.MODERATOR:
            return createElement(ShieldCheck, { className: "size-4 text-app-role-default-moderator" })
        default:
            return null
    }
}

export const getUserRoleTextColor = (userRole?: MemberRole): string => {
    switch (userRole) {
        case MemberRole.ADMIN:
            return "!text-app-role-default-admin"
        case MemberRole.MODERATOR:
            return "!text-app-role-default-moderator"
        default:
            return "!text-app-role-default-user"
    }
}