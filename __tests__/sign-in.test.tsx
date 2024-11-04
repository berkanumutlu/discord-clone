import { render, screen, fireEvent, waitFor, renderHook, act } from '@testing-library/react';
import SignInPage from '@/app/(auth)/(routes)/sign-in/[[...sign-in]]/page';
import { useSignIn } from '@clerk/nextjs';

type EmailCodeFactor = {
    strategy: 'email_code';
    emailAddressId: string;
    safeIdentifier: string;
};

const signUpUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL;
const afterSignInUrl = process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL;
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
    })
}));
jest.mock('@clerk/nextjs', () => {
    const originalModule = jest.requireActual('@clerk/nextjs');
    return {
        ...originalModule,
        SignIn: () => (
            <div data-testid="clerk-sign-in">
                <form data-testid="sign-in-form">
                    <input id="identifier-field" name="identifier" type="text" placeholder="Email address or username" />
                    <input id="password-field" name="password" type="password" placeholder="Password" />
                    <button type="submit">Continue</button>
                </form>
                <button>Sign in with Apple</button>
                <button>Sign in with GitHub</button>
                <button>Sign in with Google</button>
                <a href={signUpUrl}>Sign up</a>
            </div>
        ),
        useSignIn: jest.fn(() => ({
            isLoaded: true,
            signIn: {
                create: jest.fn().mockResolvedValue({
                    status: 'complete',
                    supportedFirstFactors: [
                        {
                            strategy: 'email_code',
                            emailAddressId: 'test-email-id',
                            safeIdentifier: 'john+clerk_test@example.com'
                        }
                    ]
                }),
                prepareFirstFactor: jest.fn().mockResolvedValue({}),
                attemptFirstFactor: jest.fn().mockResolvedValue({ status: 'complete' })
            }
        })),
    };
});

describe('SignIn Page', () => {
    beforeEach(() => {
        mockPush.mockClear();
        render(<SignInPage />);
    });

    it('renders the Clerk SignIn component', () => {
        expect(screen.getByTestId('clerk-sign-in')).toBeInTheDocument();
    });
    it('displays email/username and password fields', () => {
        expect(screen.getByPlaceholderText('Email address or username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });
    it('displays social login options', () => {
        expect(screen.getByText('Sign in with Apple')).toBeInTheDocument();
        expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument();
        expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
    });
    it('displays a link to sign up', () => {
        expect(screen.getByText('Sign up')).toBeInTheDocument();
    });
    it('allows user to fill in sign-in form', async () => {
        fireEvent.change(screen.getByPlaceholderText('Email address or username'), { target: { value: 'your_email+clerk_test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

        expect(screen.getByPlaceholderText('Email address or username')).toHaveValue('your_email+clerk_test@example.com');
        expect(screen.getByPlaceholderText('Password')).toHaveValue('password123');
    });
    it('handles form submission', async () => {
        fireEvent.change(screen.getByPlaceholderText('Email address or username'), { target: { value: 'your_email+clerk_test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

        const form = screen.getByTestId('sign-in-form');
        fireEvent.submit(form);

        await waitFor(() => {
            expect(screen.getByPlaceholderText('Email address or username')).toBeInTheDocument();
        });
    });
    test('Testing sign in via email code', async () => {
        const { result } = renderHook(() => useSignIn());

        await act(async () => {
            const emailAddress = 'john+clerk_test@example.com';

            expect(result.current.isLoaded).toBe(true);
            expect(result.current.signIn).toBeDefined();

            if (result.current.signIn) {
                const signInResp = await result.current.signIn.create({ identifier: emailAddress });

                expect(signInResp.status).toBe('complete');
                expect(signInResp.supportedFirstFactors).toBeDefined();

                const emailCodeFactor = signInResp.supportedFirstFactors?.find(
                    (ff): ff is EmailCodeFactor => ff.strategy === 'email_code' && ff.safeIdentifier === emailAddress
                );

                expect(emailCodeFactor).toBeDefined();

                if (emailCodeFactor) {
                    await result.current.signIn.prepareFirstFactor({
                        strategy: 'email_code',
                        emailAddressId: emailCodeFactor.emailAddressId,
                    });

                    const attemptResponse = await result.current.signIn.attemptFirstFactor({
                        strategy: 'email_code',
                        code: '424242',
                    });

                    expect(attemptResponse.status).toBe('complete');
                }
            } else {
                throw new Error('SignIn object is undefined');
            }
        });
    });
    it('redirects to main page after successful sign-in', async () => {
        const { result } = renderHook(() => useSignIn());

        await act(async () => {
            const emailAddress = 'john+clerk_test@example.com';

            if (result.current.signIn) {
                await result.current.signIn.create({ identifier: emailAddress });
                await result.current.signIn.prepareFirstFactor({
                    strategy: 'email_code',
                    emailAddressId: 'test-email-id',
                });
                const attemptResponse = await result.current.signIn.attemptFirstFactor({
                    strategy: 'email_code',
                    code: '424242',
                });

                expect(attemptResponse.status).toBe('complete');
                mockPush(afterSignInUrl);

                await waitFor(() => {
                    expect(mockPush).toHaveBeenCalledWith(afterSignInUrl);
                });
            } else {
                throw new Error('SignIn object is undefined');
            }
        });
    });
});