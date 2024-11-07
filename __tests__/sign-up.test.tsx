import Image from "next/image";
import { useSignUp } from "@clerk/nextjs";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { mockSignUpData } from "../__mocks__/data";
import SignUpPage from '@/app/(auth)/(routes)/sign-up/[[...sign-up]]/page';

const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL;
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush
    })
}));
jest.mock('@clerk/nextjs', () => ({
    SignUp: ({ routing }: { routing: any }) => (
        <div data-testid="clerk-sign-up" className="cl-rootBox cl-signUp-root">
            <div className="cl-card">
                <div className="cl-header">
                    <h1 className="cl-headerTitle">Create your account</h1>
                    <p className="cl-headerSubtitle">Welcome! Please fill in the details to get started.</p>
                </div>
                <div className="cl-main">
                    <div className="cl-socialButtons">
                        <button className="cl-socialButtonsIconButton" aria-label="Sign up with Apple">
                            <Image src="https://img.clerk.com/static/apple.svg" alt="Sign up with Apple" fill />
                        </button>
                        <button className="cl-socialButtonsIconButton" aria-label="Sign up with GitHub">
                            <Image src="https://img.clerk.com/static/github.svg" alt="Sign up with GitHub" fill />
                        </button>
                        <button className="cl-socialButtonsIconButton" aria-label="Sign up with Google">
                            <Image src="https://img.clerk.com/static/google.svg" alt="Sign up with Google" fill />
                        </button>
                    </div>
                    <div className="cl-dividerRow">
                        <div className="cl-dividerLine"></div>
                        <p className="cl-dividerText">or</p>
                        <div className="cl-dividerLine"></div>
                    </div>
                    <form className="cl-form" data-testid="sign-up-form" onSubmit={(e) => {
                        e.preventDefault();
                        if (routing?.handleComplete) {
                            routing.handleComplete();
                        }
                    }}>
                        <div className="cl-formFieldRow">
                            <input id="firstName-field" name="firstName" type="text" placeholder="First name" />
                            <input id="lastName-field" name="lastName" type="text" placeholder="Last name" />
                        </div>
                        <div className="cl-formFieldRow">
                            <input id="username-field" name="username" type="text" placeholder="Username" required />
                        </div>
                        <div className="cl-formFieldRow">
                            <input id="emailAddress-field" name="emailAddress" type="email" placeholder="Email address" required />
                        </div>
                        <div className="cl-formFieldRow">
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
    ),
    useSignUp: () => ({
        signUp: {
            create: jest.fn().mockResolvedValue({}),
            preparePhoneNumberVerification: jest.fn().mockResolvedValue({}),
            attemptPhoneNumberVerification: jest.fn().mockResolvedValue({
                verifications: {
                    phoneNumber: {
                        status: 'verified'
                    }
                }
            })
        }
    })
}));

describe('SignUp Page', () => {
    beforeEach(() => {
        mockPush.mockClear();
        render(<SignUpPage />);
    });

    it('renders the Clerk SignUp component', () => {
        expect(screen.getByTestId('clerk-sign-up')).toBeInTheDocument();
    });
    it('displays the correct header and subtitle', () => {
        expect(screen.getByText('Create your account')).toBeInTheDocument();
        expect(screen.getByText('Welcome! Please fill in the details to get started.')).toBeInTheDocument();
    });
    it('displays social login options', () => {
        expect(screen.getByLabelText('Sign up with Apple')).toBeInTheDocument();
        expect(screen.getByLabelText('Sign up with GitHub')).toBeInTheDocument();
        expect(screen.getByLabelText('Sign up with Google')).toBeInTheDocument();
    });
    it('displays all required form fields', () => {
        expect(screen.getByPlaceholderText('First name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Last name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });
    it('allows user to fill in sign-up form', async () => {
        fireEvent.change(screen.getByPlaceholderText('First name'), { target: { value: mockSignUpData.firstName } });
        fireEvent.change(screen.getByPlaceholderText('Last name'), { target: { value: mockSignUpData.lastName } });
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: mockSignUpData.username } });
        fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: mockSignUpData.email } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: mockSignUpData.password } });

        expect(screen.getByPlaceholderText('First name')).toHaveValue(mockSignUpData.firstName);
        expect(screen.getByPlaceholderText('Last name')).toHaveValue(mockSignUpData.lastName);
        expect(screen.getByPlaceholderText('Username')).toHaveValue(mockSignUpData.username);
        expect(screen.getByPlaceholderText('Email address')).toHaveValue(mockSignUpData.email);
        expect(screen.getByPlaceholderText('Password')).toHaveValue(mockSignUpData.password);
    });
    it('handles form submission', async () => {
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: mockSignUpData.username } });
        fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: mockSignUpData.email } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: mockSignUpData.password } });

        const form = screen.getByTestId('sign-up-form');
        fireEvent.submit(form);

        await waitFor(() => {
            expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        });
    });
    it('displays a link to sign in', () => {
        const signInLink = screen.getByText('Sign in');
        expect(signInLink).toBeInTheDocument();
        expect(signInLink).toHaveAttribute('href', signInUrl);
    });
    test('Testing sign up with phone number', async () => {
        const { signUp } = useSignUp();

        await signUp?.create({
            phoneNumber: mockSignUpData.phoneNumber
        });
        await signUp?.preparePhoneNumberVerification();

        const res = await signUp?.attemptPhoneNumberVerification({
            code: mockSignUpData.code
        });
        expect(res?.verifications.phoneNumber.status).toBe('verified');
    });
});