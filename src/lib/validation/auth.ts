import { z } from "zod"

// const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const phoneRegex = /^\+?[0-9]{7,15}$/
const usernameRegex = /^[a-zA-Z0-9._]+$/

export const loginSchema = z.object({
    emailOrPhone: z
        .string()
        .min(1, { message: "This field is required" })
        .refine((val) => val.trim() !== "", { message: "This field is required" })
        .superRefine((val, ctx) => {
            const isEmail = z.string().email().safeParse(val).success
            const isPhone = phoneRegex.test(val)

            if (!isEmail && !isPhone) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Enter a valid email address or phone number",
                })
            }
        }),
    password: z.string().min(1, { message: "This field is required" }),
})

export const registerSchema = z.object({
    email: z.string().min(1, { message: "Required" }).email({ message: "Invalid email address" }),
    global_name: z
        .string()
        .transform((val) => val.trim())
        .refine(
            (val) => val === "" || (/^[a-zA-Z\s]+$/.test(val) && val.replace(/\s/g, "") !== ""),
            {
                message: "Display name can only contain letters and must not be only spaces",
            }
        )
        .optional(),
    username: z
        .string()
        .min(1, { message: "Required" })
        .min(2, { message: "This must be 2-32 characters." })
        .max(32, { message: "Username must be less than 32 characters" })
        .regex(usernameRegex, {
            message: "Please only use numbers, letters, underscores _ , or periods.",
        }),
    password: z
        .string()
        .min(1, { message: "Required" })
        .min(8, { message: "Password must be at least 8 characters" })
        .refine((val) => /[A-Z]/.test(val), {
            message: "Password must contain at least one uppercase letter",
        })
        .refine((val) => /[0-9]/.test(val), {
            message: "Password must contain at least one number",
        })
        .refine((val) => /[!@#$%^&*(),.?":{}|<>\+\-]/.test(val), {
            message: "Password must contain at least one special character",
        }),
    day: z.string().min(1, { message: "Required" }).max(2),
    month: z.string().min(1, { message: "Required" }).max(2),
    year: z.string().min(1, { message: "Required" }).max(4),
    newsletter: z.boolean().optional(),
    terms: z.boolean().refine((val) => val === true, {
        message: "You must accept the Terms of Service and Privacy Policy",
    }),
}).refine((data) => {
    const { day, month, year } = data
    const d = parseInt(day, 10)
    const m = parseInt(month, 10)
    const y = parseInt(year, 10)

    const currentYear = new Date().getFullYear()
    if (isNaN(y) || y < currentYear - 150 || y > currentYear - 3) {
        return false
    }

    const date = new Date(y, m - 1, d)

    return (
        date.getFullYear() === y &&
        date.getMonth() === m - 1 &&
        date.getDate() === d
    )
}, {
    message: "Please enter a valid date of birth",
    path: ["day"],
}).transform(({ day, month, year, ...rest }) => {
    const birthDate = new Date(+year, +month - 1, +day).toISOString().slice(0, 10) // "YYYY-MM-DD"

    return {
        ...rest,
        birthDate,
    }
})

export type LoginFormValuesType = z.infer<typeof loginSchema>
export type RegisterFormValuesType = z.infer<typeof registerSchema>
