import { redirect } from 'next/navigation';
import { render, waitFor } from '@testing-library/react';
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { mockMember, mockProfile, mockServer, mockTextChannel } from '../__mocks__/data';
import ServerIdPage from '@/app/(main)/(routes)/servers/[serverId]/page';

jest.mock('next/navigation', () => ({
    ...jest.requireActual('next/navigation'),
    redirect: jest.fn(),
    useRouter: jest.fn()
}));
jest.mock('@/lib/db', () => ({
    db: {
        server: {
            findUnique: jest.fn()
        }
    }
}));
jest.mock('@clerk/nextjs', () => ({
    auth: jest.fn(() => ({
        userId: mockMember.id
    }))
}));
jest.mock('@/lib/current-profile', () => ({
    currentProfile: jest.fn()
}));
jest.mock('@/app/(main)/(routes)/servers/[serverId]/page', () => {
    return {
        __esModule: true,
        default: jest.fn()
    };
});

describe('ServerIdPage', () => {
    it('should redirect to the first channel when accessing the server URL', async () => {
        (currentProfile as jest.Mock).mockResolvedValue({ id: mockProfile.id });

        (db.server.findUnique as jest.Mock).mockResolvedValue({
            id: mockServer.id,
            channels: [{ id: mockTextChannel.id, name: mockTextChannel.name }]
        });

        const mockServerIdPage = ServerIdPage as jest.MockedFunction<typeof ServerIdPage>;
        mockServerIdPage.mockImplementation(async () => {
            redirect(`/servers/${mockServer.id}/channels/${mockTextChannel.id}`);
            return null;
        });

        render(await ServerIdPage({ params: { serverId: mockServer.id } }));

        await waitFor(() => {
            expect(redirect).toHaveBeenCalledWith(`/servers/${mockServer.id}/channels/${mockTextChannel.id}`);
        });
    });
});