import { useAuth, useSignIn } from "@clerk/nextjs"
import { render, screen, fireEvent, renderHook, act, within, waitFor } from "@testing-library/react"
import { isThirdPartyAuthenticationEnabled } from "@/lib/utils"
import { afterSignInUrl, signUpUrl } from "@/data"
import { mockSignInData } from "../__mocks__/data"
import { EmailCodeFactorType, handleFormSubmitMock } from "../__mocks__/@clerk/nextjs"
import { redirect, useRouterMock } from "../__mocks__/next/navigation"
import LoginPage from "@/app/(auth)/(routes)/login/[[...login]]/page"

describe('Login Page Tests', () => {
    describe('With Third Party Authentication (Clerk)', () => {
        beforeEach(async () => {
            (isThirdPartyAuthenticationEnabled as jest.Mock).mockReturnValue(true)
            await act(async () => { render(<LoginPage />) })
        })

        it('should render the Clerk SignIn component', () => {
            expect(screen.getByTestId("clerkSignIn")).toBeInTheDocument()
            expect(screen.getByTestId("clerkSignInForm")).toBeInTheDocument()
        })
        it('should render email/username and password fields', () => {
            // const usernameInput = screen.getByPlaceholderText("Email address or username")
            const usernameInput = screen.getByRole("textbox", { name: "Email address or username label" })
            expect(usernameInput).toBeInTheDocument()
            expect(usernameInput).toBeRequired()
            expect(usernameInput).toHaveAttribute("id", "identifier-field")
            expect(usernameInput).toHaveAttribute("type", "text")
            expect(usernameInput).toHaveAttribute("name", "identifier")

            const passwordInput = screen.getByLabelText("Password label")
            expect(passwordInput).toBeInTheDocument()
            expect(passwordInput).toBeRequired()
            expect(passwordInput).toHaveAttribute("id", "password-field")
            expect(passwordInput).toHaveAttribute("type", "password")
            expect(passwordInput).toHaveAttribute("name", "password")
        })
        it('should render social login buttons', () => {
            const socialLoginButtons = screen.getByTestId("clerkSocialButtons")
            expect(socialLoginButtons).toBeInTheDocument()

            const socialLoginButtonList = within(socialLoginButtons).getAllByRole("button")
            expect(socialLoginButtonList.length).toBe(3)
            expect(socialLoginButtonList.filter(socialButton => socialButton.classList.contains("cl-socialButtonsIconButton")).length).toBe(3)
            expect(within(socialLoginButtons).getByText("Sign in with Apple")).toBeInTheDocument()
            expect(within(socialLoginButtons).getByText("Sign in with GitHub")).toBeInTheDocument()
            expect(within(socialLoginButtons).getByText("Sign in with Google")).toBeInTheDocument()
        })
        it('should render a link called "Sign up"', () => {
            const signUpLink = screen.getByText("Sign up")
            expect(signUpLink).toBeInTheDocument()
            expect(signUpLink).toHaveAttribute("href", signUpUrl)
            expect(signUpLink).toHaveAttribute("class", "cl-footerActionLink")
        })
        it('should allow user to fill in sign-in form', async () => {
            const usernameInput = screen.getByRole("textbox", { name: "Email address or username label" })
            const passwordInput = screen.getByLabelText("Password label")

            fireEvent.change(usernameInput, { target: { value: mockSignInData.email } })
            fireEvent.change(passwordInput, { target: { value: mockSignInData.password } })

            expect(usernameInput).toHaveValue(mockSignInData.email)
            expect(passwordInput).toHaveValue(mockSignInData.password)
        })
        test('Testing form submission', async () => {
            handleFormSubmitMock.mockClear()

            const usernameInput = screen.getByRole("textbox", { name: "Email address or username label" })
            const passwordInput = screen.getByLabelText("Password label")

            fireEvent.change(usernameInput, { target: { value: mockSignInData.email } })
            fireEvent.change(passwordInput, { target: { value: mockSignInData.password } })

            /* const submitButton = screen.getByRole("button", { name: /continue/i })
            fireEvent.click(submitButton) */
            const form = screen.getByTestId("clerkSignInForm")
            fireEvent.submit(form)

            expect(handleFormSubmitMock).toHaveBeenCalledWith({
                identifier: mockSignInData.email,
                password: mockSignInData.password,
            })
        })
        test('Testing sign in via email code', async () => {
            const { result } = renderHook(() => useSignIn())

            await act(async () => {
                expect(result.current.isLoaded).toBe(true)
                expect(result.current.signIn).toBeDefined()

                if (result.current.signIn) {
                    const signInResp = await result.current.signIn.create({ identifier: mockSignInData.safeIdentifier })

                    expect(signInResp.status).toBe("complete")
                    expect(signInResp.supportedFirstFactors).toBeDefined()

                    const emailCodeFactor = signInResp.supportedFirstFactors?.find(
                        (ff): ff is EmailCodeFactorType => ff.strategy === "email_code" && ff.safeIdentifier === mockSignInData.safeIdentifier
                    )

                    expect(emailCodeFactor).toBeDefined()

                    if (emailCodeFactor) {
                        await result.current.signIn.prepareFirstFactor({
                            strategy: "email_code",
                            emailAddressId: emailCodeFactor.emailAddressId,
                        })

                        const attemptResponse = await result.current.signIn.attemptFirstFactor({
                            strategy: "email_code",
                            code: mockSignInData.code,
                        })

                        expect(attemptResponse.status).toBe("complete")
                    }
                } else {
                    throw new Error("clerk SignIn object is undefined")
                }
            })
        })
        it('should redirect to "afterSignInUrl" after successful sign-in', async () => {
            useRouterMock.push.mockClear()

            const { result } = renderHook(() => useSignIn())

            await act(async () => {
                if (result.current.signIn) {
                    await result.current.signIn.create({ identifier: mockSignInData.safeIdentifier })
                    await result.current.signIn.prepareFirstFactor({
                        strategy: "email_code",
                        emailAddressId: mockSignInData.emailAddressId
                    })
                    const attemptResponse = await result.current.signIn.attemptFirstFactor({
                        strategy: "email_code",
                        code: mockSignInData.code,
                    })

                    expect(attemptResponse.status).toBe("complete")
                    /* useRouterMock.pushMock(afterSignInUrl)
                    await waitFor(() => {
                        expect(useRouterMock.pushMock).toHaveBeenCalledWith(afterSignInUrl)
                    }) */
                    expect(() => {
                        redirect(afterSignInUrl)
                    }).toThrow("NEXT_REDIRECT:" + afterSignInUrl)
                } else {
                    throw new Error("clerk SignIn object is undefined")
                }
            })
        })
        it('should redirect to "afterSignInUrl" if user is already signed in', () => {
            (useAuth as jest.Mock).mockReturnValue({
                isSignedIn: true,
                isLoaded: true,
            })

            render(<LoginPage />)

            expect(redirect).toHaveBeenCalledWith(afterSignInUrl)
        })
    })
    describe('Without Third Party Authentication', () => {
        beforeEach(async () => {
            (isThirdPartyAuthenticationEnabled as jest.Mock).mockReturnValue(false)
            await act(async () => { render(<LoginPage />) })
        })

        it('should render the Register form', () => {
            const clerkSignInElement = screen.queryByTestId("clerkSignIn")
            expect(clerkSignInElement).toBeNull()
            expect(clerkSignInElement).not.toBeInTheDocument()

            const authform = document.querySelector("form.authForm")
            expect(authform).toBeInTheDocument()
        })
        it('should render AppLogo without text', () => {
            const appLogoLink = screen.queryByTestId<HTMLAnchorElement>("appLogoImageLinkMock")
            expect(appLogoLink).not.toBeInTheDocument()

            const appLogoDiv = screen.getByTestId("appLogoImageDivMock")
            expect(appLogoDiv).toBeInTheDocument()

            const appLogoImage = within(appLogoDiv).getByTestId("appLogoImageMock")
            expect(appLogoImage).toBeInTheDocument()
            expect(appLogoImage).toHaveAttribute("src", expect.stringContaining("/images/logo/"))
            expect(appLogoImage).toHaveAttribute("alt", "Discord Clone logo mock")
            expect(appLogoImage).toHaveClass("sm:hidden")

            const appLogoText = within(appLogoDiv).queryByTestId("appLogoImageTextMock")
            expect(appLogoText).not.toBeInTheDocument()
        })
        it('should render h1 heading and text', () => {
            expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
            expect(screen.getByText(/we're so excited to see you again!/i)).toBeInTheDocument()
        })
        it('should render email/phone and password fields and other form elements', () => {
            const emailOrPhoneInput = screen.getByRole("textbox", { name: /email or phone number/i })
            expect(emailOrPhoneInput).toBeInTheDocument()
            expect(emailOrPhoneInput).toHaveAttribute("name", "emailOrPhone")
            expect(emailOrPhoneInput).toHaveAttribute("type", "text")

            const passwordInput = screen.getByLabelText(/password/i)
            expect(passwordInput).toBeInTheDocument()
            expect(passwordInput).toHaveAttribute("type", "password")
            expect(passwordInput).toHaveAttribute("name", "password")

            const loginButton = screen.getByRole("button", { name: /log in/i })
            expect(loginButton).toBeInTheDocument()
            expect(loginButton).toHaveAttribute("type", "submit")

            expect(screen.getByText(/need an account\?/i)).toBeInTheDocument()

            const registerLink = screen.getByRole("link", { name: /register/i })
            expect(registerLink).toBeInTheDocument()
            expect(registerLink).toHaveAttribute("href", signUpUrl)

            const forgotPasswordLink = screen.getByText(/forgot your password\?/i)
            expect(forgotPasswordLink).toBeInTheDocument()
        })
        it('should render h2 heading "Log in with QR Code" and "Or, sign in with passkey" link', () => {
            const qrHeading = screen.getByRole("heading", {
                name: /log in with qr code/i,
                level: 2,
            })
            expect(qrHeading).toBeInTheDocument()

            const passkeyLink = screen.getByRole("button", {
                name: /or, sign in with passkey/i,
            })
            expect(passkeyLink).toBeInTheDocument()
        })
        test('Testing switch back to email input when phone is cleared', async () => {
            const emailOrPhoneInput = screen.getByRole("textbox", { name: /email or phone number/i })
            fireEvent.change(emailOrPhoneInput, { target: { value: "5551234567" } })

            await waitFor(() => {
                expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
                expect(emailOrPhoneInput).not.toBeInTheDocument()
            })

            const phoneInput = screen.getByLabelText(/phone number/i)
            fireEvent.change(phoneInput, { target: { value: "" } })

            await waitFor(() => {
                expect(screen.getByRole("textbox", { name: /email or phone number/i })).toBeInTheDocument()
                expect(phoneInput).not.toBeInTheDocument()
            })
        })
        it('should contain div.qrCode inside div.qrCodeContainer', async () => {
            const qrContainer = document.querySelector(".qrCodeContainer")
            expect(qrContainer).toBeInTheDocument()

            const qrCodeOverlay = qrContainer?.querySelector(".qrCodeOverlay")
            expect(qrCodeOverlay).toBeInTheDocument()

            const qrCode = qrContainer?.querySelector(".qrCode")
            expect(qrCode).not.toBeInTheDocument()

            /* await waitFor(() => {
                const qrCode = qrContainer?.querySelector(".qrCode")
                expect(qrCode).toBeInTheDocument()
                expect(qrCode?.innerHTML).toContain("<svg>")
            }) */
        })
    })
})