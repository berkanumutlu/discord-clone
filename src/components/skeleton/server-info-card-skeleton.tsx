import { Skeleton } from "@/components/ui/skeleton"

const ServerInfoCardSkeleton = () => {
    return (
        <div className="mb-4 lg:mb-5 p-2 w-full h-auto inline-block hover:bg-[rgba(106,116,128,.16)] rounded-lg">
            <div className="flex flex-row">
                <Skeleton className="mr-4 w-full max-w-64 h-36 hidden lg:block rounded-lg z-[1]" />
                <Skeleton className="mr-4 lg:mr-2 size-10 lg:size-6 lg:hidden rounded-lg" />
                <div className="w-full flex flex-col">
                    <div className="mb-2 flex flex-row lg:items-center">
                        <div className="lg:mr-2 lg:h-8 hidden lg:block z-[1]">
                            <Skeleton className="lg:w-6 lg:h-6 rounded-lg" />
                        </div>
                        <Skeleton className="w-full h-[18px]" />
                    </div>
                    <Skeleton className="mb-2 w-full h-9" />
                    <Skeleton className="w-1/2 h-4" />
                    <Skeleton className="mt-auto w-1/4 h-4 hidden lg:block" />
                </div>
            </div>
        </div>
    )
}

export default ServerInfoCardSkeleton