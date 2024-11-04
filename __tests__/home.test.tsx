import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { render, screen, waitFor } from '@testing-library/react';
import HomeClient from '@/app/client-page';
import { mockServer } from '../__mocks__/data';

const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL;
jest.mock('next/navigation', () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
        replace: jest.fn(),
        back: jest.fn(),
    }),
    useParams: jest.fn()
}));
jest.mock('@clerk/nextjs', () => ({
    useAuth: jest.fn().mockReturnValue({
        isSignedIn: false
    }),
    ClerkProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
jest.mock('next-themes', () => ({
    useTheme: jest.fn().mockReturnValue({ theme: 'light' }),
}));
jest.mock('@/hooks/use-modal-store', () => ({
    useModal: jest.fn().mockReturnValue({ onOpen: jest.fn() }),
}));

describe('Home page', () => {
    it('should redirect to ' + signInUrl + ' if the user is not signed in', async () => {
        const mockRouterPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({
            push: mockRouterPush
        });

        (useAuth as jest.Mock).mockReturnValue({
            isSignedIn: false
        });

        render(<HomeClient serverUrl={null} />);

        await waitFor(() => {
            expect(mockRouterPush).toHaveBeenCalledWith(signInUrl);
        });
    });
    it('should render welcome message if the user is signed in', () => {
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
        });

        (useAuth as jest.Mock).mockReturnValue({
            isSignedIn: true
        });

        render(<HomeClient serverUrl={null} />);

        expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument();
    });
    it('should render "Create your first server" button when serverUrl is null', () => {
        (useAuth as jest.Mock).mockReturnValue({
            isSignedIn: true,
        });

        render(<HomeClient serverUrl={null} />);

        expect(screen.getByText('Create your first server')).toBeInTheDocument();
    });
    it('should render "Start now" button when serverUrl is provided', () => {
        (useAuth as jest.Mock).mockReturnValue({
            isSignedIn: true,
        });

        render(<HomeClient serverUrl={`/servers/${mockServer.id}`} />);

        expect(screen.getByText('Start now')).toBeInTheDocument();
    });
});
