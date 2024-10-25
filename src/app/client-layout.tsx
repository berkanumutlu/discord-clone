"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { updateThemeBasedOnTime } from "@/lib/utils";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { theme, setTheme } = useTheme(); // setTheme from next-themes
    const [mounted, setMounted] = useState(false);
    const [isSystemTheme, setIsSystemTheme] = useState(false); // Track if the user has selected the "system" theme

    useEffect(() => {
        setMounted(true); // Signals that the component is mounted
    }, []);

    useEffect(() => {
        const userSelectedTheme = localStorage.getItem("user-selected-theme");
        if (theme === "system" || !userSelectedTheme || userSelectedTheme === "system") {
            setIsSystemTheme(true);
        } else {
            setIsSystemTheme(false);
        }
    }, [theme]);

    useEffect(() => {
        // If system theme is selected, check the clock
        if (mounted && isSystemTheme) {
            updateThemeBasedOnTime(setTheme);
        }
    }, [mounted, isSystemTheme, setTheme]); // check if isSystemTheme changes

    // If the component is not mounted yet, do not render anything
    if (!mounted) {
        return null;
    }

    return (<>{children}</>);
}
