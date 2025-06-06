export const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? "/login"
export const afterSignInUrl = process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL ?? "/channels/@me"
export const signUpUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? "/register"
export const afterSignUpUrl = process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL ?? "/login"