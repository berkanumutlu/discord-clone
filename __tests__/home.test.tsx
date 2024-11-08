import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { act, render, screen, waitFor } from '@testing-library/react';
import HomeClient from '@/app/client-page';

const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL;
jest.mock('next/navigation', () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
    })
}));
jest.mock('@clerk/nextjs', () => ({
    useAuth: jest.fn().mockReturnValue({
        isSignedIn: false,
        isLoaded: true
    }),
    ClerkProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));
jest.mock('next-themes', () => ({
    useTheme: jest.fn().mockReturnValue({ theme: 'light' })
}));
jest.mock('@/hooks/use-modal-store', () => ({
    useModal: jest.fn().mockReturnValue({ onOpen: jest.fn() })
}));
global.fetch = jest.fn();

describe('Home page', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should redirect to ' + signInUrl + ' if the user is not signed in', async () => {
        const mockRouterPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({
            push: mockRouterPush
        });

        (useAuth as jest.Mock).mockReturnValue({
            isSignedIn: false,
            isLoaded: true
        });

        await act(async () => {
            render(<HomeClient />);
        });

        await waitFor(() => {
            expect(mockRouterPush).toHaveBeenCalledWith(signInUrl);
        });
    });
    it('should render welcome message if the user is signed in', async () => {
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn()
        });

        (useAuth as jest.Mock).mockReturnValue({
            isSignedIn: true,
            isLoaded: true
        });

        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue({ serverUrl: null })
        });

        await act(async () => {
            render(<HomeClient />);
        });

        expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument();
    });
    it('should render "Create your first server" button when serverUrl is null', async () => {
        (useAuth as jest.Mock).mockReturnValue({
            isSignedIn: true,
            isLoaded: true
        });

        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue({ serverUrl: null })
        });

        await act(async () => {
            render(<HomeClient />);
        });

        await waitFor(() => {
            expect(screen.getByText('Create your first server')).toBeInTheDocument();
        });
    });
    it('should render "Start now" button when serverUrl is provided', async () => {
        (useAuth as jest.Mock).mockReturnValue({
            isSignedIn: true,
            isLoaded: true
        });

        (fetch as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue({ serverUrl: '/servers/12345' })
        });

        await act(async () => {
            render(<HomeClient />);
        });

        const startNowButton = await screen.findByText('Start now');
        expect(startNowButton).toBeInTheDocument();
        expect(startNowButton).toHaveAttribute('href', '/servers/12345');
    });
});
