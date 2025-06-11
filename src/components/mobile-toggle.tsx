import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationSidebarMenu } from "@/components/navigation/navigation-sidebar-menu";
import { ServerSidebarMenu } from "@/components/server/server-sidebar-menu";

export const MobileToggle = ({
    serverId
}: {
    serverId: string;
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild className="mr-1">
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex flex-col gap-0">
                {/* Manual Header without default Close button */}
                <div className="px-4 py-2 flex items-center justify-between bg-[#dcdddf] dark:bg-[#121214]">
                    <h2 className="text-lg font-bold">Menu</h2>
                </div>
                <div className="flex flex-1 gap-0">
                    <div className="w-[72px] z-[21]">
                        <NavigationSidebarMenu />
                    </div>
                    <ServerSidebarMenu serverId={serverId} />
                </div>
            </SheetContent>
        </Sheet>
    );
};
