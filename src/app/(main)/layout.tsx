import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const MainLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-full">
            <div className="w-[72px] h-full flex-col fixed inset-y-0 z-30 hidden md:flex">
                <NavigationSidebar />
            </div>
            <main className="md:pl-[72px] h-full">{children}</main>
        </div>
    );
}

export default MainLayout;