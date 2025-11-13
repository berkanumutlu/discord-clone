import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import slugify from "slugify"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const updateThemeBasedOnTime = (setTheme: (theme: string) => void) => {
  const currentHour = new Date().getHours()
  const isDayTime = currentHour >= 6 && currentHour <= 18 // 6 AM - 6 PM
  const newTheme = isDayTime ? "light" : "dark"
  setTheme(newTheme)
}

export function isThirdPartyAuthenticationEnabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
}

export function capitalizeText(text?: string): string {
  return text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";
}

export const slugifyText = (text: string): string => {
  return slugify(text, {
    replacement: '-',
    remove: undefined,
    lower: true,
    strict: true,
    trim: true
  })
}