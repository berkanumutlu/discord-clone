import { z } from "zod"

export const loginSchema = z.object({
    emailOrPhone: z.string().min(1, { message: "This field is required" }),
    password: z.string().min(1, { message: "This field is required" }),
})

export type LoginFormValuesType = z.infer<typeof loginSchema>
