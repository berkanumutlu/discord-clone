import React from "react"
import { signInUrl, signUpUrl } from "@/data/authData"
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
export const useSignUp = jest.fn(() => ({
    signUp: {
        create: jest.fn().mockResolvedValue({
            status: 'complete',
        }),
        preparePhoneNumberVerification: jest.fn().mockResolvedValue({}),
        attemptPhoneNumberVerification: jest.fn().mockResolvedValue({
            verifications: {
                phoneNumber: {
                    status: 'verified'
                }
            }
        })
    }
}))
export const ClerkProvider = ({ children }: { children: React.ReactNode }) => React.createElement('div', null, children)
export const SignIn = () => (
    <div data-testid="clerkSignIn" className="cl-rootBox cl-signIn-root">
        <div className="cl-card">
            <div className="cl-header">
                <h1 className="cl-headerTitle">Sign in to Discord Clone</h1>
                <p className="cl-headerSubtitle">Welcome back! Please sign in to continue</p>
            </div>
            <div className="cl-main">
                <div className="cl-socialButtonsRoot">
                    <div data-testid="clerkSocialButtons" className="cl-socialButtons">
                        <button className="cl-socialButtonsIconButton cl-button cl-socialButtonsIconButton__apple cl-button__apple">Sign in with Apple</button>
                        <button className="cl-socialButtonsIconButton cl-button cl-socialButtonsIconButton__github cl-button__github">Sign in with GitHub</button>
                        <button className="cl-socialButtonsIconButton cl-button cl-socialButtonsIconButton__google cl-button__google">Sign in with Google</button>
                    </div>
                </div>
                <div className="cl-dividerRow">
                    <div className="cl-dividerLine"></div>
                    <p className="cl-dividerText">or</p>
                    <div className="cl-dividerLine"></div>
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
                    <label className="cl-formFieldLabel cl-formFieldLabel__identifier-field" htmlFor="identifier-field">Email address or username label</label>
                    <input
                        id="identifier-field"
                        name="identifier"
                        type="text"
                        placeholder="Email address or username"
                        required
                    />
                    <label className="cl-formFieldLabel cl-formFieldLabel__password-field" htmlFor="password-field">Password label</label>
                    <input
                        id="password-field"
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Continue</button>
                </form>
            </div>
            <div className="cl-footer">
                <span className="cl-footerActionText">Don’t have an account?</span>
                <a href={signUpUrl} className="cl-footerActionLink">Sign up</a>
            </div>
        </div>
    </div>
)
export const SignUp = () => (
    <div data-testid="clerkSignUp" className="cl-rootBox cl-signUp-root">
        <div className="cl-card">
            <div className="cl-header">
                <h1 className="cl-headerTitle">Create your account</h1>
                <p className="cl-headerSubtitle">Welcome! Please fill in the details to get started.</p>
            </div>
            <div className="cl-main">
                <div className="cl-socialButtonsRoot">
                    <div data-testid="clerkSocialButtons" className="cl-socialButtons">
                        <button className="cl-socialButtonsIconButton cl-button cl-socialButtonsIconButton__apple cl-button__apple" aria-label="Sign up with Apple">Sign up with Apple</button>
                        <button className="cl-socialButtonsIconButton cl-button cl-socialButtonsIconButton__github cl-button__github" aria-label="Sign up with GitHub">Sign up with GitHub</button>
                        <button className="cl-socialButtonsIconButton cl-button cl-socialButtonsIconButton__google cl-button__google" aria-label="Sign up with Google">Sign up with Google</button>
                    </div>
                </div>
                <div className="cl-dividerRow">
                    <div className="cl-dividerLine"></div>
                    <p className="cl-dividerText">or</p>
                    <div className="cl-dividerLine"></div>
                </div>
                <form
                    data-testid="clerkSignUpForm"
                    className="cl-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(e.currentTarget)
                        handleFormSubmitMock({
                            firstName: formData.get('firstName'),
                            lastName: formData.get('lastName'),
                            username: formData.get('username'),
                            emailAddress: formData.get('emailAddress'),
                            password: formData.get('password'),
                        })
                    }}>
                    <div className="cl-formFieldRow">
                        <label className="cl-formFieldLabel cl-formFieldLabel__firstName-field" htmlFor="firstName-field">First name label</label>
                        <input id="firstName-field" name="firstName" type="text" placeholder="First name" />
                        <label className="cl-formFieldLabel cl-formFieldLabel__lastName-field" htmlFor="lastName-field">Last name label</label>
                        <input id="lastName-field" name="lastName" type="text" placeholder="Last name" />
                    </div>
                    <div className="cl-formFieldRow">
                        <label className="cl-formFieldLabel cl-formFieldLabel__username-field" htmlFor="username-field">Username label</label>
                        <input id="username-field" name="username" type="text" placeholder="Username" required />
                    </div>
                    <div className="cl-formFieldRow">
                        <label className="cl-formFieldLabel cl-formFieldLabel__emailAddress-field" htmlFor="emailAddress-field">Email address label</label>
                        <input id="emailAddress-field" name="emailAddress" type="text" placeholder="Email address" required />
                    </div>
                    <div className="cl-formFieldRow">
                        <label className="cl-formFieldLabel cl-formFieldLabel__password-field" htmlFor="password-field">Password label</label>
                        <input id="password-field" name="password" type="password" placeholder="Password" required />
                    </div>
                    <button type="submit" className="cl-formButtonPrimary">Continue</button>
                </form>
            </div>
            <div className="cl-footer">
                <span className="cl-footerActionText">Already have an account?</span>
                <a href={signInUrl} className="cl-footerActionLink">Sign in</a>
            </div>
        </div>
    </div>
)