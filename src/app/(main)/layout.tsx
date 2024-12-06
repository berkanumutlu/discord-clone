import { ReactNode } from "react";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const MainLayout = async ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <div className="h-full">
            <div className="w-[72px] h-full fixed inset-y-0 hidden md:flex flex-col z-30">
                <NavigationSidebar />
            </div>
            <main className="md:pl-[72px] h-full">{children}</main>
        </div>
    );
}

export default MainLayout;