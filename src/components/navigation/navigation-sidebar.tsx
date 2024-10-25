import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { UserButton } from "@clerk/nextjs";
import { currentProfile } from "@/lib/current-profile";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";
import { NavigationAction } from "./navigation-action";
import { NavigationItem } from "./navigation-item";

export const NavigationSidebar = async () => {
    const profile = await currentProfile();
    if (!profile) return redirect("/");
    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    return (
        <div className="space-y-4 py-3 w-full h-full flex flex-col items-center text-primary bg-[#E3E5E8] dark:bg-[#1E1F22]">
            <NavigationAction />
            <Separator className="mx-auto w-10 h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md" />
            <ScrollArea className="w-full flex-1">
                {servers.map((server) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl} />
                    </div>
                ))}
            </ScrollArea>
            <div className="mt-auto flex flex-col items-center gap-y-4">
                <ModeToggle />
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: "w-[48px] h-[48px] hover:rounded-[16px] transition-all overflow-hidden"
                        }
                    }}
                />
            </div>
        </div>
    )
}