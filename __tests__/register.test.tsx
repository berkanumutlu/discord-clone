import { redirect, useRouter } from "next/navigation"
import { useAuth, useSignUp } from "@clerk/nextjs"
import { render, screen, fireEvent, act, within, renderHook, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { isThirdPartyAuthenticationEnabled } from "@/lib/utils"
import { RegisterFormValuesType } from "@/lib/validation/auth"
import { afterSignInUrl, signInUrl } from "@/data/authData"
import { mockSignUpData } from "../__mocks__/data"
import { handleFormSubmitMock } from "../__mocks__/@clerk/nextjs"
import RegisterPage from "@/app/(auth)/(routes)/register/[[...register]]/page"
import AuthLayout from "@/app/(auth)/layout"

// TODO: Add more specific tests for the Register actions
describe('Register Page Tests', () => {
    describe('With Third Party Authentication (Clerk)', () => {
        beforeEach(async () => {
            jest.clearAllMocks();
            (isThirdPartyAuthenticationEnabled as jest.Mock).mockReturnValue(true)

            await act(async () => {
                render(
                    <AuthLayout>
                        <RegisterPage />
                    </AuthLayout>
                )
            })
        })

        it('should render the Clerk SignUp component', () => {
            expect(screen.getByTestId("clerkSignUp")).toBeInTheDocument()
            expect(screen.getByTestId("clerkSignUpForm")).toBeInTheDocument()
        })
        it('should render h1 heading and subtitle', () => {
            expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
            expect(screen.getByText(/welcome! please fill in the details to get started./i)).toBeInTheDocument()
        })
        it('should render Sign up form fields', () => {
            const firstNameInput = screen.getByRole("textbox", { name: "First name label" })
            expect(firstNameInput).toBeInTheDocument()
            expect(firstNameInput).not.toBeRequired()
            expect(firstNameInput).toHaveAttribute("id", "firstName-field")
            expect(firstNameInput).toHaveAttribute("name", "firstName")

            const lastNameInput = screen.getByRole("textbox", { name: "Last name label" })
            expect(lastNameInput).toBeInTheDocument()
            expect(lastNameInput).not.toBeRequired()
            expect(lastNameInput).toHaveAttribute("id", "lastName-field")
            expect(lastNameInput).toHaveAttribute("name", "lastName")

            const usernameInput = screen.getByRole("textbox", { name: "Username label" })
            expect(usernameInput).toBeInTheDocument()
            expect(usernameInput).toBeRequired()
            expect(usernameInput).toHaveAttribute("id", "username-field")
            expect(usernameInput).toHaveAttribute("name", "username")

            const emailInput = screen.getByRole("textbox", { name: "Email address label" })
            expect(emailInput).toBeInTheDocument()
            expect(emailInput).toBeRequired()
            expect(emailInput).toHaveAttribute("id", "emailAddress-field")
            expect(emailInput).toHaveAttribute("name", "emailAddress")

            const passwordInput = screen.getByLabelText("Password label")
            expect(passwordInput).toBeInTheDocument()
            expect(passwordInput).toBeRequired()
            expect(passwordInput).toHaveAttribute("id", "password-field")
            expect(passwordInput).toHaveAttribute("name", "password")
            expect(passwordInput).toHaveAttribute("type", "password")

            const submitButton = screen.getByRole("button", { name: /continue/i })
            expect(submitButton).toBeInTheDocument()
            expect(submitButton).toHaveAttribute("type", "submit")
        })
        it('should render social register buttons', () => {
            const socialLoginButtons = screen.getByTestId("clerkSocialButtons")
            expect(socialLoginButtons).toBeInTheDocument()

            const socialLoginButtonList = within(socialLoginButtons).getAllByRole("button")
            expect(socialLoginButtonList.length).toBe(3)
            expect(socialLoginButtonList.filter(socialButton => socialButton.classList.contains("cl-socialButtonsIconButton")).length).toBe(3)
            expect(within(socialLoginButtons).getByText("Sign up with Apple")).toBeInTheDocument()
            expect(within(socialLoginButtons).getByText("Sign up with GitHub")).toBeInTheDocument()
            expect(within(socialLoginButtons).getByText("Sign up with Google")).toBeInTheDocument()
        })
        it('should render a link called "Sign in"', () => {
            const signInLink = screen.getByText("Sign in")
            expect(signInLink).toBeInTheDocument()
            expect(signInLink).toHaveAttribute("href", signInUrl)
            expect(signInLink).toHaveAttribute("class", "cl-footerActionLink")
        })
        it('should allow user to fill in sign-up form', () => {
            const firstNameInput = screen.getByRole("textbox", { name: "First name label" })
            const lastNameInput = screen.getByRole("textbox", { name: "Last name label" })
            const usernameInput = screen.getByRole("textbox", { name: "Username label" })
            const emailInput = screen.getByRole("textbox", { name: "Email address label" })
            const passwordInput = screen.getByLabelText("Password label")

            fireEvent.change(firstNameInput, { target: { value: mockSignUpData.firstName } })
            fireEvent.change(lastNameInput, { target: { value: mockSignUpData.lastName } })
            fireEvent.change(usernameInput, { target: { value: mockSignUpData.username } })
            fireEvent.change(emailInput, { target: { value: mockSignUpData.email } })
            fireEvent.change(passwordInput, { target: { value: mockSignUpData.password } })

            expect(firstNameInput).toHaveValue(mockSignUpData.firstName)
            expect(lastNameInput).toHaveValue(mockSignUpData.lastName)
            expect(usernameInput).toHaveValue(mockSignUpData.username)
            expect(emailInput).toHaveValue(mockSignUpData.email)
            expect(passwordInput).toHaveValue(mockSignUpData.password)
        })
        test('Testing form submission', async () => {
            handleFormSubmitMock.mockClear()

            const usernameInput = screen.getByRole("textbox", { name: "Username label" })
            const emailInput = screen.getByRole("textbox", { name: "Email address label" })
            const passwordInput = screen.getByLabelText("Password label")

            fireEvent.change(usernameInput, { target: { value: mockSignUpData.username } })
            fireEvent.change(emailInput, { target: { value: mockSignUpData.email } })
            fireEvent.change(passwordInput, { target: { value: mockSignUpData.password } })

            const signUpForm = screen.getByTestId("clerkSignUpForm")
            fireEvent.submit(signUpForm)

            expect(handleFormSubmitMock).toHaveBeenCalledWith({
                firstName: "",
                lastName: "",
                username: mockSignUpData.username,
                emailAddress: mockSignUpData.email,
                password: mockSignUpData.password,
            })
        })
        test('Testing sign up with phone number', async () => {
            const { signUp } = useSignUp()

            await signUp?.create({
                phoneNumber: mockSignUpData.phoneNumber
            })
            await signUp?.preparePhoneNumberVerification()

            const signUpResponse = await signUp?.attemptPhoneNumberVerification({
                code: mockSignUpData.code
            })
            expect(signUpResponse?.verifications.phoneNumber.status).toBe("verified")
        })
        it('should redirect to "afterSignUpUrl" after successful sign-up', async () => {
            const { result } = renderHook(() => useSignUp())

            await act(async () => {
                if (result?.current?.signUp) {
                    const attemptResponse = await result.current.signUp.create({
                        username: mockSignUpData.username,
                        emailAddress: mockSignUpData.email,
                        password: mockSignUpData.password,
                    })

                    expect(attemptResponse.status).toBe("complete")

                    expect(() => {
                        redirect(afterSignInUrl)
                    }).toThrow("NEXT_REDIRECT:" + afterSignInUrl)
                } else {
                    throw new Error("clerk SignUp object is undefined")
                }
            })
        })
    })
    describe('Without Third Party Authentication', () => {
        beforeEach(async () => {
            jest.clearAllMocks();
            (isThirdPartyAuthenticationEnabled as jest.Mock).mockReturnValue(false)

            await act(async () => {
                render(
                    <AuthLayout>
                        <RegisterPage />
                    </AuthLayout>
                )
            })
        })

        it('should render the Register form', () => {
            const clerkSignInElement = screen.queryByTestId("clerkSignUp")
            expect(clerkSignInElement).toBeNull()
            expect(clerkSignInElement).not.toBeInTheDocument()

            expect(document.querySelector("form.registerForm")).toBeInTheDocument()
        })
        it('should render AppLogo without text', () => {
            const registerForm = document.querySelector("form.registerForm")

            const appLogoLink = registerForm?.querySelector('a[data-testid="appLogoImageLinkMock"]')
            expect(appLogoLink).not.toBeInTheDocument()

            const appLogoDiv = registerForm?.querySelector('div[data-testid="appLogoImageDivMock"]')
            expect(appLogoDiv).toBeInTheDocument()

            const appLogoImage = appLogoDiv?.querySelector('img[data-testid="appLogoImageMock"]')
            expect(appLogoImage).toBeInTheDocument()
            expect(appLogoImage).toHaveAttribute("src", expect.stringContaining("/images/logo/"))
            expect(appLogoImage).toHaveAttribute("alt", "Discord Clone logo mock")
            expect(appLogoImage).toHaveClass("sm:hidden")

            const appLogoText = appLogoDiv?.querySelector('span[data-testid="appLogoImageTextMock"]')
            expect(appLogoText).not.toBeInTheDocument()
        })
        it('should render h1 heading', () => {
            expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
        })
        it('should render Register form fields', () => {
            const emailInput = screen.getByRole("textbox", { name: /email/i })
            expect(emailInput).toBeInTheDocument()
            expect(within(emailInput.parentElement!).getByText("*")).toBeInTheDocument()
            expect(emailInput).toHaveAttribute("name", "email")
            expect(emailInput).toHaveAttribute("type", "email")
            expect(emailInput).toHaveAttribute("autocomplete", "username")

            const displayNameInput = screen.getByRole("textbox", { name: /display name/i })
            expect(displayNameInput).toBeInTheDocument()
            expect(within(displayNameInput.parentElement!).queryByText("*")).not.toBeInTheDocument()
            expect(displayNameInput).toHaveAttribute("name", "global_name")
            expect(displayNameInput).toHaveAttribute("type", "text")
            expect(displayNameInput).toHaveAttribute("autocomplete", "off")

            const displayNameInputDescription = displayNameInput.getAttribute("aria-describedby")
            expect(displayNameInputDescription).toBeTruthy()
            const displayNameInputDescriptionElement = document.getElementById(displayNameInputDescription!)
            expect(displayNameInputDescriptionElement).toBeInTheDocument()
            expect(displayNameInputDescriptionElement?.textContent?.trim().length).toBeGreaterThan(0)

            const usernameInput = screen.getByRole("textbox", { name: /username/i })
            expect(usernameInput).toBeInTheDocument()
            expect(within(usernameInput.parentElement!).getByText("*")).toBeInTheDocument()
            expect(usernameInput).toHaveAttribute("name", "username")
            expect(usernameInput).toHaveAttribute("type", "text")
            expect(usernameInput).toHaveAttribute("autocomplete", "off")

            const usernameInputDescription = usernameInput.getAttribute("aria-describedby")
            expect(usernameInputDescription).toBeTruthy()
            const usernameInputDescriptionElement = document.getElementById(usernameInputDescription!)
            expect(usernameInputDescriptionElement).toBeInTheDocument()
            expect(usernameInputDescriptionElement?.textContent?.trim().length).toBeGreaterThan(0)

            const passwordInput = screen.getByLabelText(/password/i)
            expect(passwordInput).toBeInTheDocument()
            expect(within(passwordInput.parentElement!).getByText("*")).toBeInTheDocument()
            expect(passwordInput).toHaveAttribute("name", "password")
            expect(passwordInput).toHaveAttribute("type", "password")
            expect(passwordInput).toHaveAttribute("autocomplete", "current-password")

            const dateOfBirthLabel = screen.getByText("Date of Birth")
            expect(dateOfBirthLabel).toBeInTheDocument()
            expect(within(dateOfBirthLabel.parentElement!).getByText("*")).toBeInTheDocument()

            const dateOfBirthComboboxList = screen.getAllByRole("combobox")
            expect(dateOfBirthComboboxList).toHaveLength(3)
            expect(dateOfBirthComboboxList[0]).toHaveTextContent("Day")
            expect(dateOfBirthComboboxList[1]).toHaveTextContent("Month")
            expect(dateOfBirthComboboxList[2]).toHaveTextContent("Year")
            for (const combobox of dateOfBirthComboboxList) {
                expect(combobox).toHaveAttribute("aria-haspopup", "dialog")
                expect(combobox).toHaveAttribute("aria-expanded", "false")
                const icon = within(combobox).getByTestId("lucide-chevrondown")
                expect(icon).toBeInTheDocument()
            }

            const newsletterCheckbox = screen.queryByRole("checkbox", { name: /(Optional).*updates.*/i })
            expect(newsletterCheckbox).toBeInTheDocument()
            expect(newsletterCheckbox).toHaveAttribute("aria-checked", "false")
            expect(newsletterCheckbox?.getAttribute("data-state")).toBe("unchecked")

            const submitButton = screen.getByRole("button", { name: /continue/i })
            expect(submitButton).toBeInTheDocument()
            expect(submitButton).toBeDisabled()
            expect(submitButton).toHaveAttribute("type", "submit")

            const termsCheckbox = screen.queryByRole("checkbox", { name: /i have read and agree.*/i })
            expect(termsCheckbox).toBeInTheDocument()
            expect(termsCheckbox).toHaveAttribute("aria-checked", "false")
            expect(termsCheckbox?.getAttribute("data-state")).toBe("unchecked")

            const loginLink = screen.getByRole("link", { name: /already have an account?/i })
            expect(loginLink).toBeInTheDocument()
            expect(loginLink).toHaveAttribute("href", signInUrl)
        })
        it('should toggle aria-checked when terms checkbox is checked', async () => {
            const termsCheckbox = screen.queryByRole("checkbox", { name: /i have read and agree.*/i })
            expect(termsCheckbox).toBeInTheDocument()
            expect(termsCheckbox).toHaveAttribute("aria-checked", "false")
            expect(termsCheckbox?.getAttribute("data-state")).toBe("unchecked")

            fireEvent.click(termsCheckbox as HTMLElement)
            expect(termsCheckbox).toHaveAttribute("aria-checked", "true")
            expect(termsCheckbox?.getAttribute("data-state")).toBe("checked")

            fireEvent.click(termsCheckbox as HTMLElement)
            expect(termsCheckbox).toHaveAttribute("aria-checked", "false")
            expect(termsCheckbox?.getAttribute("data-state")).toBe("unchecked")
        })
        it('should enabled submit button when terms checkbox is checked', async () => {
            const termsCheckbox = screen.queryByRole("checkbox", { name: /i have read and agree.*/i })
            expect(termsCheckbox).toBeInTheDocument()

            fireEvent.click(termsCheckbox as HTMLElement)
            expect(screen.getByRole("button", { name: /continue/i })).toBeEnabled()

            fireEvent.click(termsCheckbox as HTMLElement)
            expect(screen.getByRole("button", { name: /continue/i })).toBeDisabled()
        })
        it('should submit button display a tooltip message when terms checkbox is unchecked', async () => {
            const submitButton = screen.getByRole("button", { name: /continue/i })

            await userEvent.hover(submitButton)

            const tooltips = await screen.findAllByRole("tooltip")
            const submitButtonTooltip = tooltips.find((tooltip) =>
                tooltip.textContent?.match(/you need to agree/i)
            )
            expect(submitButtonTooltip).toBeInTheDocument()
            expect(submitButtonTooltip).toBeVisible()

            await userEvent.unhover(submitButton)
            await userEvent.click(screen.queryByRole("checkbox", { name: /i have read and agree.*/i }) as HTMLElement)
            await userEvent.hover(submitButton)

            await waitFor(() => {
                const tooltipQuery = screen.queryAllByRole("tooltip")
                expect(tooltipQuery.length).toBe(0)
            })
        })
    })
    describe('Without Third Party Authentication', () => {
        test('Testing form submission', async () => {
            jest.clearAllMocks();
            (isThirdPartyAuthenticationEnabled as jest.Mock).mockReturnValue(false)
            const handleSubmit: (data: RegisterFormValuesType) => void = jest.fn()

            await act(async () => {
                render(
                    <AuthLayout>
                        <RegisterPage onSubmit={handleSubmit} />
                    </AuthLayout>
                )
            })

            await userEvent.type(screen.getByRole("textbox", { name: /email/i }), mockSignUpData.email)
            await userEvent.type(screen.getByRole("textbox", { name: /display name/i }), mockSignUpData.displayName)
            await userEvent.type(screen.getByRole("textbox", { name: /username/i }), mockSignUpData.username)
            await userEvent.type(screen.getByLabelText(/password/i), mockSignUpData.password)

            const [daySelect, monthSelect, yearSelect] = screen.getAllByRole("combobox")
            await userEvent.click(daySelect)
            await userEvent.click(await screen.findByText(mockSignUpData.birthDateDay))
            await userEvent.click(monthSelect)
            await userEvent.click(await screen.findByText(mockSignUpData.birthDateMonth))
            await userEvent.click(yearSelect)
            await userEvent.click(await screen.findByText(mockSignUpData.birthDateYear))

            const termsCheckbox = screen.queryByRole("checkbox", { name: /i have read and agree.*/i })
            await userEvent.click(termsCheckbox as HTMLElement)

            const submitButton = screen.getByRole("button", { name: /continue/i })
            await userEvent.click(submitButton)

            await waitFor(() => {
                expect(handleSubmit).toHaveBeenCalledWith(
                    expect.objectContaining({
                        email: mockSignUpData.email,
                        global_name: mockSignUpData.displayName,
                        username: mockSignUpData.username,
                        password: mockSignUpData.password,
                        newsletter: false,
                        terms: true,
                        birthDate: mockSignUpData.birthDate,
                    })
                )
            })
        })
    })
    describe('When user is already signed in', () => {
        beforeEach(async () => {
            jest.clearAllMocks();
            (useAuth as jest.Mock).mockReturnValue({
                isSignedIn: true,
                isLoaded: true,
            })

            await act(async () => {
                render(
                    <AuthLayout>
                        <RegisterPage />
                    </AuthLayout>
                )
            })
        })

        it('should redirect to "afterSignInUrl"', () => {
            const router = useRouter();
            expect(router.replace).toHaveBeenCalledWith(afterSignInUrl)
        })
        it('should not render the sign up form', () => {
            expect(screen.queryByTestId("clerkSignUpForm")).not.toBeInTheDocument()
            expect(document.querySelector("form.registerForm")).not.toBeInTheDocument()
        })
    })
})