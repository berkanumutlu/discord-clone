import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const updateThemeBasedOnTime = (setTheme: (theme: string) => void) => {
  const currentHour = new Date().getHours();
  const isDayTime = currentHour >= 6 && currentHour <= 18; // 6 AM - 6 PM
  const newTheme = isDayTime ? "light" : "dark";
  setTheme(newTheme);
};