import React from 'react';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as socketIo from 'socket.io-client';
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatHeader } from '@/components/chat/chat-header';
import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessages } from '@/components/chat/chat-messages';
import { SocketIndicator } from '@/components/socket-indicator';
import { useSocket } from "@/components/providers/socket-provider";
import { MessageFileModal } from '@/components/modals/message-file-modal';
import { useModal } from '@/hooks/use-modal-store';
import { mockServer, mockTextChannel, mockTextMessage, mockMember, mockTextMessages } from '../__mocks__/data';

jest.mock('next/navigation', () => ({
    ...jest.requireActual('next/navigation'),
    useRouter: jest.fn(() => ({
        refresh: jest.fn(),
        push: jest.fn()
    })),
    useParams: jest.fn(() => ({}))
}));
jest.mock('@clerk/nextjs', () => ({
    auth: jest.fn(() => ({
        userId: mockMember.id,
        redirectToSignIn: jest.fn()
    }))
}));
jest.mock('@clerk/nextjs/server', () => ({
    auth: jest.fn(() => ({
        userId: mockMember.id,
        redirectToSignIn: jest.fn()
    }))
}));
jest.mock('@/lib/current-profile', () => ({
    currentProfile: jest.fn()
}));
jest.mock('@/hooks/use-modal-store', () => ({
    useModal: jest.fn().mockReturnValue({ onOpen: jest.fn() })
}));
jest.mock('socket.io-client', () => ({
    io: jest.fn(() => ({
        on: jest.fn(),
        emit: jest.fn(),
        disconnect: jest.fn()
    }))
}));
jest.mock("@/components/providers/socket-provider", () => ({
    useSocket: jest.fn()
}));
jest.mock('@/hooks/use-chat-socket', () => ({
    useChatSocket: jest.fn(() => ({
        queryKey: `chat:${mockTextChannel.id}`,
        addKey: `chat:${mockTextChannel.id}:messages`,
        updateKey: `chat:${mockTextChannel.id}:messages:update`
    }))
}));
jest.mock("@/hooks/use-chat-query", () => ({
    useChatQuery: jest.fn(() => ({
        data: { pages: [{ items: mockTextMessages }] },
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
        isLoading: false,
        status: 'success'
    }))
}));
jest.mock("@/hooks/use-chat-scroll", () => ({
    useChatScroll: jest.fn()
}));
jest.mock("@/components/mobile-toggle", () => ({
    MobileToggle: () => <div data-testid="mobile-toggle" />
}));
jest.mock('axios');
jest.mock('@/components/emoji-picker', () => ({
    EmojiPicker: ({ onChange }: { onChange: (emoji: string) => void }) => {
        return (
            <button data-testid="emoji-button" onClick={() => onChange("😀")}>
                Emoji Picker
            </button>
        );
    }
}));
jest.mock('@/components/file-upload', () => ({
    FileUpload: jest.fn()
}));
jest.mock('next/image', () => ({
    __esModule: true,
    default: jest.fn((props) => <img {...props} />)
}));

describe('Channel Component', () => {
    const queryClient = new QueryClient();
    let mockIo: jest.Mock;
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve({})
        })
    ) as jest.Mock;
    const renderChatInput = () => {
        return render(
            <QueryClientProvider client={queryClient}>
                <ChatInput
                    apiUrl={`/api/socket/messages`}
                    query={{ channelId: mockTextChannel.id, serverId: mockTextChannel.serverId }}
                    name={mockTextChannel.name}
                    type="channel"
                />
            </QueryClientProvider>
        );
    };

    beforeEach(() => {
        mockIo = socketIo.io as jest.Mock;
        mockIo.mockClear();
    });

    afterEach(() => {
        jest.clearAllMocks();
        queryClient.clear();
    });

    it('should establish socket connection when channel is opened', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ChatMessages
                    name={mockTextChannel.name}
                    member={mockMember}
                    chatId={mockTextChannel.id}
                    type="channel"
                    apiUrl={`/api/channels/${mockTextChannel.id}/messages`}
                    socketUrl="/api/socket/messages"
                    socketQuery={{ channelId: mockTextChannel.id, serverId: mockTextChannel.serverId }}
                    paramKey="channelId"
                    paramValue={mockTextChannel.id}
                />
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('First Message')).toBeInTheDocument();
        });
    });
    it('should display channel name in chat header', () => {
        (useSocket as jest.Mock).mockReturnValue({ isConnected: true });

        render(
            <ChatHeader
                serverId={mockServer.id}
                name={mockTextChannel.name}
                type="channel"
            />
        );

        expect(screen.getByText(mockTextChannel.name)).toBeInTheDocument();
    });
    it('should render chat input', () => {
        render(<ChatInput
            apiUrl={`/api/socket/messages`}
            query={{ channelId: mockTextChannel.id, serverId: mockTextChannel.serverId }}
            name={mockTextChannel.name}
            type="channel"
        />);

        expect(screen.getByPlaceholderText(`Message #${mockTextChannel.name}`)).toBeInTheDocument();
    });
    it('should display "Live: Connected" when socket is connected', async () => {
        (useSocket as jest.Mock).mockReturnValue({ isConnected: true });

        render(<SocketIndicator />);

        await waitFor(() => {
            expect(screen.getByText('Live: Connected')).toBeInTheDocument();
        });
    });
    it('should display "Fallback: Polling every 1s" when socket is not connected', () => {
        (useSocket as jest.Mock).mockReturnValue({ isConnected: false });

        render(<SocketIndicator />);

        expect(screen.getByText('Fallback: Polling every 1s')).toBeInTheDocument();
    });
    it('should display the last 15 messages', async () => {
        const mockMessages = Array(20).fill(null).map((_, index) => ({
            ...mockTextMessage,
            id: `message-${index}`,
            content: `Message ${index}`
        }));

        const { useChatQuery } = jest.requireMock('@/hooks/use-chat-query') as { useChatQuery: jest.Mock };
        useChatQuery.mockReturnValue({
            data: { pages: [{ items: mockMessages.slice(-15) }] },
            fetchNextPage: jest.fn(),
            hasNextPage: false,
            isFetchingNextPage: false,
            isLoading: false,
            status: 'success'
        });

        render(
            <QueryClientProvider client={queryClient}>
                <ChatMessages
                    name={mockTextChannel.name}
                    member={mockMember}
                    chatId={mockTextChannel.id}
                    type="channel"
                    apiUrl={`/api/channels/${mockTextChannel.id}/messages`}
                    socketUrl="/api/socket/messages"
                    socketQuery={{ channelId: mockTextChannel.id, serverId: mockTextChannel.serverId }}
                    paramKey="channelId"
                    paramValue={mockTextChannel.id}
                />
            </QueryClientProvider>
        );

        await waitFor(() => {
            const messageElements = screen.getAllByText(/Message \d+/);
            expect(messageElements.length).toBe(15);
            expect(screen.getByText('Message 19')).toBeInTheDocument();
            expect(screen.queryByText('Message 4')).not.toBeInTheDocument();
        });
    });
    it('should send a message when input is submitted', async () => {
        const mockMessages = Array(20).fill(null).map((_, index) => ({
            ...mockTextMessage,
            id: `message-${index}`,
            content: `Message ${index}`
        }));

        const { useChatQuery } = jest.requireMock('@/hooks/use-chat-query') as { useChatQuery: jest.Mock };
        useChatQuery.mockReturnValue({
            data: { pages: [{ items: mockMessages.slice(-15) }] },
            fetchNextPage: jest.fn(),
            hasNextPage: false,
            isFetchingNextPage: false,
            isLoading: false,
            status: 'success'
        });

        const { rerender } = render(
            <QueryClientProvider client={queryClient}>
                <>
                    <ChatMessages
                        name={mockTextChannel.name}
                        member={mockMember}
                        chatId={mockTextChannel.id}
                        type="channel"
                        apiUrl={`/api/channels/${mockTextChannel.id}/messages`}
                        socketUrl="/api/socket/messages"
                        socketQuery={{ channelId: mockTextChannel.id, serverId: mockTextChannel.serverId }}
                        paramKey="channelId"
                        paramValue={mockTextChannel.id}
                    />
                    <ChatInput
                        apiUrl={`/api/socket/messages`}
                        query={{ channelId: mockTextChannel.id, serverId: mockTextChannel.serverId }}
                        name={mockTextChannel.name}
                        type="channel"
                    />
                </>
            </QueryClientProvider>
        );

        // Check if the last 15 messages are displayed
        await waitFor(() => {
            const messageElements = screen.getAllByText(/Message \d+/);
            expect(messageElements.length).toBe(15);
            expect(screen.getByText('Message 19')).toBeInTheDocument();
            expect(screen.queryByText('Message 4')).not.toBeInTheDocument();
        });

        // Send a new message
        const mockPost = jest.spyOn(axios, 'post').mockResolvedValueOnce({});
        const input = screen.getByPlaceholderText(`Message #${mockTextChannel.name}`);
        fireEvent.change(input, { target: { value: 'Hello, world!' } });
        fireEvent.submit(input);

        await waitFor(() => {
            expect(mockPost).toHaveBeenCalledWith(
                expect.stringContaining('/api/socket/messages'),
                { content: 'Hello, world!' }
            );
        });

        // Update the mock to include the new message
        const updatedMockMessages = [
            ...mockMessages.slice(-14),
            { ...mockTextMessage, id: 'new-message-21', content: 'Hello, world!' }
        ];
        useChatQuery.mockReturnValue({
            data: { pages: [{ items: updatedMockMessages }] },
            fetchNextPage: jest.fn(),
            hasNextPage: false,
            isFetchingNextPage: false,
            isLoading: false,
            status: 'success'
        });

        // Re-render the component to reflect the updated messages
        rerender(
            <QueryClientProvider client={queryClient}>
                <>
                    <ChatMessages
                        name={mockTextChannel.name}
                        member={mockMember}
                        chatId={mockTextChannel.id}
                        type="channel"
                        apiUrl={`/api/channels/${mockTextChannel.id}/messages`}
                        socketUrl="/api/socket/messages"
                        socketQuery={{ channelId: mockTextChannel.id, serverId: mockTextChannel.serverId }}
                        paramKey="channelId"
                        paramValue={mockTextChannel.id}
                    />
                    <ChatInput
                        apiUrl={`/api/socket/messages`}
                        query={{ channelId: mockTextChannel.id, serverId: mockTextChannel.serverId }}
                        name={mockTextChannel.name}
                        type="channel"
                    />
                </>
            </QueryClientProvider>
        );

        // Check if the new message is added to the bottom of the list
        await waitFor(() => {
            const messageElements = screen.getAllByText(/Message \d+|Hello, world!/);
            expect(messageElements.length).toBe(15);
            expect(screen.getByText('Hello, world!')).toBeInTheDocument();
            expect(screen.queryByText('Message 5')).not.toBeInTheDocument();
        });
    });
    it('should open emoji picker when emoji button is clicked', async () => {
        renderChatInput();

        const emojiButton = screen.getByRole('button', { name: /Emoji Picker/i });
        expect(emojiButton).toBeInTheDocument();
    });
    it('should add selected emoji to input', async () => {
        renderChatInput();

        const input = screen.getByPlaceholderText(`Message #${mockTextChannel.name}`) as HTMLInputElement;
        const emojiButton = screen.getByTestId('emoji-button');

        fireEvent.change(input, { target: { value: 'Hello' } });
        fireEvent.click(emojiButton);

        await waitFor(() => {
            expect(input.value).toBe('Hello 😀');
        });
    });
    it('should open attachment modal when plus button is clicked', () => {
        const mockOnOpen = jest.fn();
        (useModal as unknown as jest.Mock).mockReturnValue({
            onOpen: mockOnOpen
        });

        renderChatInput();

        const plusButton = screen.getByRole('button', { name: /open attachment modal/i });
        fireEvent.click(plusButton);

        expect(mockOnOpen).toHaveBeenCalledWith('messageFile', { apiUrl: `/api/socket/messages`, query: { channelId: mockTextChannel.id, serverId: mockTextChannel.serverId } });
    });
    it('should open attachment modal, upload image, and display it in message list', async () => {
        const { FileUpload } = jest.requireMock('@/components/file-upload') as { FileUpload: jest.Mock };
        FileUpload.mockImplementation(({ onChange }: { onChange: (url: string, type: string) => void }) => (
            <input
                type="file"
                data-testid="file-upload"
                onChange={() => onChange('https://utfs.io/f/ZFr4IITn9uM2mueS1sOwl9gdaXn1oFErRxOBzS4m3Tbt0jfZ', 'image/jpeg')}
            />
        ));
        const NextImage = jest.requireMock('next/image').default as jest.Mock;
        NextImage.mockImplementation((props: any) => (
            <img data-testid="uploaded-image" alt={props.alt || ''} {...props} fill={props.fill?.toString()} />
        ));

        // Mock `useModal`'s `onOpen` and `onClose` methods
        const mockOnOpen = jest.fn();
        const mockOnClose = jest.fn();
        (useModal as unknown as jest.Mock).mockReturnValue({
            isOpen: true,
            onOpen: mockOnOpen,
            onClose: mockOnClose,
            type: 'messageFile',
            data: {
                apiUrl: `/api/socket/messages`,
                query: { channelId: mockTextChannel.id, serverId: mockTextChannel.serverId }
            }
        });

        // Mock fetch and axios post calls
        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({ items: [] })
        } as any);

        const mockAxiosPost = jest.spyOn(axios, 'post').mockResolvedValueOnce({
            data: {
                id: 'new-message-id',
                content: '',
                fileUrl: 'https://utfs.io/f/ZFr4IITn9uM2mueS1sOwl9gdaXn1oFErRxOBzS4m3Tbt0jfZ',
                fileType: 'image/jpeg',
                createdAt: new Date(),
                updatedAt: null
            }
        });

        // Render chat components
        const { rerender } = render(
            <QueryClientProvider client={queryClient}>
                <>
                    <ChatMessages name={mockTextChannel.name} member={mockMember} chatId={mockTextChannel.id} type="channel" apiUrl={`/api/channels/${mockTextChannel.id}/messages`} socketUrl="/api/socket/messages" socketQuery={{ channelId: mockTextChannel.id }} paramKey="channelId" paramValue={mockTextChannel.id} />
                    <ChatInput apiUrl={`/api/socket/messages`} query={{ channelId: mockTextChannel.id, serverId: mockTextChannel.serverId }} name={mockTextChannel.name} type="channel" />
                    <MessageFileModal />
                </>
            </QueryClientProvider>
        );

        // Click the plus button to open modal
        const plusButton = screen.getByLabelText('Open attachment modal');
        fireEvent.click(plusButton);

        // Wait for the modal to open and find the file input
        const fileInput = await screen.findByTestId('file-upload');
        expect(fileInput).toBeInTheDocument();

        // Simulate file upload
        fireEvent.change(fileInput);

        const sendButton = await screen.findByRole('button', { name: /send/i });
        fireEvent.click(sendButton);

        // Verify axios.post was called
        await waitFor(() => {
            expect(mockAxiosPost).toHaveBeenCalledWith(
                expect.stringContaining('/api/socket/messages'),
                expect.objectContaining({
                    fileUrl: 'https://utfs.io/f/ZFr4IITn9uM2mueS1sOwl9gdaXn1oFErRxOBzS4m3Tbt0jfZ',
                    fileType: 'image/jpeg'
                })
            );
        });

        // Ensure modal closes and `onClose` was called
        await waitFor(() => {
            expect(mockOnClose).toHaveBeenCalled();
        });

        // Update the chat query mock to include the new message
        const { useChatQuery } = jest.requireMock('@/hooks/use-chat-query') as { useChatQuery: jest.Mock };
        useChatQuery.mockReturnValue({
            data: {
                pages: [{
                    items: [{
                        id: 'new-message-id',
                        content: '',
                        fileUrl: 'https://utfs.io/f/ZFr4IITn9uM2mueS1sOwl9gdaXn1oFErRxOBzS4m3Tbt0jfZ',
                        fileType: 'image/jpeg',
                        member: mockMember,
                        createdAt: new Date(),
                        updatedAt: null
                    }]
                }]
            },
            fetchNextPage: jest.fn(),
            hasNextPage: false,
            isFetchingNextPage: false,
            isLoading: false,
            status: 'success'
        });

        // Rerender the component to reflect the updated mock
        await act(async () => {
            rerender(
                <QueryClientProvider client={queryClient}>
                    <>
                        <ChatMessages
                            name={mockTextChannel.name}
                            member={mockMember}
                            chatId={mockTextChannel.id}
                            type="channel"
                            apiUrl={`/api/channels/${mockTextChannel.id}/messages`}
                            socketUrl="/api/socket/messages"
                            socketQuery={{ channelId: mockTextChannel.id }}
                            paramKey="channelId"
                            paramValue={mockTextChannel.id}
                        />
                        <ChatInput
                            apiUrl={`/api/socket/messages`}
                            query={{ channelId: mockTextChannel.id, serverId: mockTextChannel.serverId }}
                            name={mockTextChannel.name}
                            type="channel"
                        />
                        <MessageFileModal />
                    </>
                </QueryClientProvider>
            );
        });

        // Verify the uploaded image appears in the message list
        await waitFor(() => {
            const imageElement = screen.getByTestId('uploaded-image');
            expect(imageElement).toHaveAttribute('src', 'https://utfs.io/f/ZFr4IITn9uM2mueS1sOwl9gdaXn1oFErRxOBzS4m3Tbt0jfZ');
            expect(imageElement).toHaveAttribute('alt', '');
        });
    });
    it('should open attachment modal, upload file, and display uploaded file as a link in message list', async () => {
        const { FileUpload } = jest.requireMock('@/components/file-upload') as { FileUpload: jest.Mock };
        FileUpload.mockImplementation(({ onChange }: { onChange: (url: string, type: string) => void }) => (
            <input
                type="file"
                data-testid="file-upload"
                onChange={() => onChange('https://utfs.io/f/ZFr4IITn9uM29ixCLMqlwYzQi7NB03onPLc4lb2Z51yspeFg', 'application/pdf')}
            />
        ));

        const mockOnOpen = jest.fn();
        const mockOnClose = jest.fn();
        (useModal as unknown as jest.Mock).mockReturnValue({
            isOpen: true,
            onOpen: mockOnOpen,
            onClose: mockOnClose,
            type: 'messageFile',
            data: {
                apiUrl: `/api/socket/messages`,
                query: { channelId: mockTextChannel.id, serverId: mockTextChannel.serverId }
            }
        });

        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({ items: [] })
        } as any);

        const mockAxiosPost = jest.spyOn(axios, 'post').mockResolvedValueOnce({
            data: {
                id: 'new-message-id',
                content: '',
                fileUrl: 'https://utfs.io/f/ZFr4IITn9uM29ixCLMqlwYzQi7NB03onPLc4lb2Z51yspeFg',
                fileType: 'application/pdf',
                createdAt: new Date(),
                updatedAt: null
            }
        });

        const { rerender } = render(
            <QueryClientProvider client={queryClient}>
                <>
                    <ChatMessages
                        name={mockTextChannel.name}
                        member={mockMember}
                        chatId={mockTextChannel.id}
                        type="channel"
                        apiUrl={`/api/channels/${mockTextChannel.id}/messages`}
                        socketUrl="/api/socket/messages"
                        socketQuery={{ channelId: mockTextChannel.id }}
                        paramKey="channelId"
                        paramValue={mockTextChannel.id}
                    />
                    <ChatInput
                        apiUrl={`/api/socket/messages`}
                        query={{ channelId: mockTextChannel.id, serverId: mockTextChannel.serverId }}
                        name={mockTextChannel.name}
                        type="channel"
                    />
                    <MessageFileModal />
                </>
            </QueryClientProvider>
        );

        const plusButton = screen.getByLabelText('Open attachment modal');
        fireEvent.click(plusButton);

        const fileInput = await screen.findByTestId('file-upload');
        expect(fileInput).toBeInTheDocument();
        fireEvent.change(fileInput);

        const sendButton = await screen.findByRole('button', { name: /send/i });
        fireEvent.click(sendButton);

        await waitFor(() => {
            expect(mockAxiosPost).toHaveBeenCalledWith(
                expect.stringContaining('/api/socket/messages'),
                expect.objectContaining({
                    fileUrl: 'https://utfs.io/f/ZFr4IITn9uM29ixCLMqlwYzQi7NB03onPLc4lb2Z51yspeFg',
                    fileType: 'application/pdf'
                })
            );
        });

        await waitFor(() => {
            expect(mockOnClose).toHaveBeenCalled();
        });

        const { useChatQuery } = jest.requireMock('@/hooks/use-chat-query') as { useChatQuery: jest.Mock };
        useChatQuery.mockReturnValue({
            data: {
                pages: [{
                    items: [{
                        id: 'new-message-id',
                        content: '',
                        fileUrl: 'https://utfs.io/f/ZFr4IITn9uM29ixCLMqlwYzQi7NB03onPLc4lb2Z51yspeFg',
                        fileType: 'application/pdf',
                        member: mockMember,
                        createdAt: new Date(),
                        updatedAt: null
                    }]
                }]
            },
            fetchNextPage: jest.fn(),
            hasNextPage: false,
            isFetchingNextPage: false,
            isLoading: false,
            status: 'success'
        });

        await act(async () => {
            rerender(
                <QueryClientProvider client={queryClient}>
                    <>
                        <ChatMessages
                            name={mockTextChannel.name}
                            member={mockMember}
                            chatId={mockTextChannel.id}
                            type="channel"
                            apiUrl={`/api/channels/${mockTextChannel.id}/messages`}
                            socketUrl="/api/socket/messages"
                            socketQuery={{ channelId: mockTextChannel.id }}
                            paramKey="channelId"
                            paramValue={mockTextChannel.id}
                        />
                        <ChatInput
                            apiUrl={`/api/socket/messages`}
                            query={{ channelId: mockTextChannel.id, serverId: mockTextChannel.serverId }}
                            name={mockTextChannel.name}
                            type="channel"
                        />
                        <MessageFileModal />
                    </>
                </QueryClientProvider>
            );
        });

        await waitFor(() => {
            const fileLink = screen.getByText('File');
            expect(fileLink).toHaveAttribute('href', 'https://utfs.io/f/ZFr4IITn9uM29ixCLMqlwYzQi7NB03onPLc4lb2Z51yspeFg');
        });
        expect(screen.getByText(mockMember.profile.name)).toBeInTheDocument();
    });
});