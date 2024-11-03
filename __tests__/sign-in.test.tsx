import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInPage from '@/app/(auth)/(routes)/sign-in/[[...sign-in]]/page';

const signUpUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL;
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
    useSignIn: jest.fn(() => ({
        signIn: {
            create: jest.fn().mockResolvedValue({
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
}));
jest.mock('@clerk/nextjs', () => ({
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
}));

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
});