import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
    src?: string
    alt?: string
    label?: string
    avatarClassName?: string
    avatarImageClassName?: string
    avatarFallbackClassName?: string
    onClick?: () => void
}

export const UserAvatar = ({
    src,
    alt,
    label,
    avatarClassName,
    avatarImageClassName,
    avatarFallbackClassName,
    onClick,
}: UserAvatarProps) => {
    return (
        <Avatar className={cn(avatarClassName)} onClick={onClick} asChild>
            <>
                <AvatarImage src={src} alt={alt ?? undefined} className={cn("userAvatar", avatarImageClassName)} />
                <AvatarFallback className={cn(avatarFallbackClassName)}>{label ?? alt}</AvatarFallback>
            </>
        </Avatar>
    )
}