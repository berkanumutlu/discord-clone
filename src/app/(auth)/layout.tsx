import Image from "next/image"
import { AppLogo } from "@/components/main/app-logo"

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-0 flex flex-[1_1_auto] flex-row">
            <div className="min-w-0 flex-[1]">
                <div className="h-full static">
                    <div className="w-[100vw] min-h-[100vh] relative overflow-auto">
                        <Image src={"/images/background/d8680b1c1576ecc8.svg"} alt={""} fill className="!fixed select-none indent-[-9999px] z-[-1]" />
                        <AppLogo linkClassName="relative top-12 left-12 hidden md:inline-flex z-[1]" />
                        <div className="size-full sm:min-h-[580px] sm:absolute sm:top-0 sm:left-0 sm:flex sm:justify-center sm:items-center">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout