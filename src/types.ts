import { Server as NetServer, Socket as NetSocket } from "net"
import { NextApiResponse } from "next"
import { ImageProps } from "next/image"
import { Server as ServerIOServer } from "socket.io"
import { Server, Member, Profile } from "@prisma/client"

export type ServerWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile })[]
}

export type NextApiResponseServerIo = NextApiResponse & {
    socket: NetSocket & {
        server: NetServer & {
            io: ServerIOServer
        }
    }
}

export interface LanguageDropdownProps {
    initialLanguage?: string
    onChange?: (language: string) => void
    className?: string
}

export type LogoType = "full" | "small" | "icon"
export type LogoFormat = "svg" | "png"
export type LogoColor = "white" | "black" | "blurple"

export type nitroBannerType = {
    image: string
    imageClassName?: string
    buttonText?: string
    buttonHref?: string
    className?: string
    featureList?: Array<{ image: string; label: string }>
}

export type nitroPerkType = {
    image?: { url?: string; alt?: string }
    title: string
    titleClassName?: string
    description?: string
}

export interface nitroPlanProps {
    id: string
    name: string
    images?: Array<Partial<ImageProps>>
    button?: { url: string; text: string; className?: string }
    divClassName?: string
    highlight?: { className?: string; image?: Partial<ImageProps> }
}

export interface nitroPlanFeatureProps {
    id: string
    name: string
    planValues?: Record<string, boolean | string> // plan.id -> true/false/string
}

export type nitroFAQCategoryType = {
    id?: string | number
    title: string
    value: string
    className?: string
}

export type nitroFAQType = {
    categoryId?: nitroFAQCategoryType["id"]
    question: string
    answer: string
    className?: string
}