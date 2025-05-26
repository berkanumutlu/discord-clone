import React from "react"
import { signUpUrl } from "@/data"
import { mockSignInData } from "../data"

export type EmailCodeFactorType = {
    strategy: "email_code"
    emailAddressId: string
    safeIdentifier: string
}

export const handleFormSubmitMock = jest.fn()
export const useAuth = jest.fn(() => ({
    isSignedIn: false,
    isLoaded: true,
}))
export const useSignIn = jest.fn(() => ({
    isLoaded: true,
    signIn: {
        create: jest.fn().mockResolvedValue({
            status: 'complete',
            supportedFirstFactors: [
                {
                    strategy: 'email_code',
                    emailAddressId: mockSignInData.emailAddressId,
                    safeIdentifier: mockSignInData.safeIdentifier,
                },
            ],
        }),
        prepareFirstFactor: jest.fn().mockResolvedValue({}),
        attemptFirstFactor: jest.fn().mockResolvedValue({ status: 'complete' }),
    },
}))
export const ClerkProvider = ({ children }: { children: React.ReactNode }) => React.createElement('div', null, children)
export const SignIn = () => (
    <div data-testid="clerkSignIn" className="cl-main">
        <div className="cl-socialButtonsRoot">
            <div data-testid="clerkSocialButtons" className="cl-socialButtons">
                <button className="cl-socialButtonsIconButton cl-button">Sign in with Apple</button>
                <button className="cl-socialButtonsIconButton cl-button">Sign in with GitHub</button>
                <button className="cl-socialButtonsIconButton cl-button">Sign in with Google</button>
            </div>
        </div>
        <form
            data-testid="clerkSignInForm"
            className="cl-form"
            onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleFormSubmitMock({
                    identifier: formData.get('identifier'),
                    password: formData.get('password'),
                })
            }}>
            <label htmlFor="identifier-field" className="cl-formFieldLabel cl-formFieldLabel__identifier-field">Email address or username label</label>
            <input
                id="identifier-field"
                name="identifier"
                type="text"
                placeholder="Email address or username"
                required
            />
            <label htmlFor="password-field" className="cl-formFieldLabel cl-formFieldLabel__password-field">Password label</label>
            <input
                id="password-field"
                name="password"
                type="password"
                placeholder="Password"
                required
            />
            <button type="submit">Continue</button>
        </form>
        <div className="cl-footer">
            <span className="cl-footerActionText">Don’t have an account?</span>
            <a href={signUpUrl} className="cl-footerActionLink">Sign up</a>
        </div>
    </div>
)