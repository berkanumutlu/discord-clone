"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Check, Moon, Sun, SunMoon } from "lucide-react";
import { updateThemeBasedOnTime } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
    const { setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [userSelectedTheme, setUserSelectedTheme] = useState<string | null>(null); // Let's add state to track the theme

    // Checking the mount status
    useEffect(() => {
        setMounted(true);
        const userSelectedTheme = localStorage.getItem("user-selected-theme");
        setUserSelectedTheme(userSelectedTheme || "system"); // If not present, "system" is the default
    }, []);

    // Update localStorage when user changes theme
    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme);
        setUserSelectedTheme(newTheme);
        localStorage.setItem("user-selected-theme", newTheme); // Save new selection to localStorage
        if (newTheme === "system") {
            updateThemeBasedOnTime(setTheme);
        }
    };

    // Set icon
    const renderThemeIcon = () => {
        switch (userSelectedTheme) {
            case "light":
                return <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />;
            case "dark":
                return <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />;
            default:
                return <SunMoon className="h-[1.9rem] w-[1.9rem] rotate-0 scale-100 transition-all" />;
        }
    };

    // If the component is not mounted yet, do not render anything
    if (!mounted) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="text-app-black bg-transparent border-0 focus-visible:!ring-transparent focus-visible:!ring-offset-transparent">
                    {renderThemeIcon()}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleThemeChange("system")}>
                    Automatic{userSelectedTheme === "system" && (<Check className="ml-auto w-4 h-4" />)}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("light")}>
                    Light{userSelectedTheme === "light" && (<Check className="ml-auto w-4 h-4" />)}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
                    Dark{userSelectedTheme === "dark" && (<Check className="ml-auto w-4 h-4" />)}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
