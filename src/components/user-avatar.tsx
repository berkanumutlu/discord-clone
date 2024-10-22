import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
    src?: string;
    className?: string;
}

export const UserAvatar = ({
    src,
    className
}: UserAvatarProps) => {
    return (
        <Avatar className={cn(
            "w-7 h-7 md:w-10 md:h-10",
            className
        )}>
            <AvatarImage src={src} />
        </Avatar>
    )
}