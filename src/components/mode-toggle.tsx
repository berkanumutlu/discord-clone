"use client";

import * as React from "react";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { updateThemeBasedOnTime } from "@/lib/utils";

export function ModeToggle() {
    const [mounted, setMounted] = React.useState(false);
    const { setTheme } = useTheme();
    const [userSelectedTheme, setUserSelectedTheme] = React.useState<string | null>(null); // Let's add state to track the theme

    // Checking the mount status
    React.useEffect(() => {
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
                return <SunMoon className="h-[1.9rem] w-[1.9rem]" />;
        }
    };

    // If the component is not mounted yet, do not render anything
    if (!mounted) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="bg-transparent border-0 focus-visible:!ring-transparent focus-visible:!ring-offset-transparent" variant="outline" size="icon">
                    {renderThemeIcon()}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleThemeChange("system")}>
                    Automatic
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
                    Dark
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
