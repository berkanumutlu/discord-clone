import { ChannelType, MemberRole } from "@prisma/client";

export const DATE_FORMAT = "d MMM yyyy, HH:mm";

describe('Mock Data Tests', () => {
    it('should load mock data', () => {
        expect(true).toBe(true);
    });
});

export const mockServer = {
    id: '56bb2e31-1aa9-42d5-9e7d-903dcb3b67a8',
    name: 'My First Server',
    imageUrl: 'https://utfs.io/f/ZFr4IITn9uM2dS9jAOLMliqoZ9TugI154Gj7aOXCekvRxALE',
    inviteCode: '0678ee88-5d88-44d3-a763-92175a52d1e1',
    profileId: 'ac63727f-d5a3-4b5c-8fce-ac28a65b11b2',
    createdAt: new Date(),
    updatedAt: null
};
export const mockTextChannel = {
    id: 'e7812cf6-63cf-4b73-8639-1bcaef29166c',
    name: 'General',
    type: ChannelType.TEXT,
    profileId: 'ac63727f-d5a3-4b5c-8fce-ac28a65b11b2',
    serverId: '56bb2e31-1aa9-42d5-9e7d-903dcb3b67a8',
    createdAt: new Date(),
    updatedAt: null
};
export const mockTextMessage = {
    id: '226d88c3-268c-4919-934f-a6b955033dd4',
    content: 'Hello, world!',
    fileUrl: null,
    fileType: null,
    memberId: '784e56e0-b946-4997-9c1e-c72cdbb30c60',
    channelId: 'e7812cf6-63cf-4b73-8639-1bcaef29166c',
    createdAt: new Date(),
    updatedAt: null,
    deletedAt: null
};
export const mockVoiceChannel = {
    id: 'a2879242-382d-43c7-97a8-aa336f153a2e',
    name: 'Voice',
    type: ChannelType.AUDIO,
    profileId: 'ac63727f-d5a3-4b5c-8fce-ac28a65b11b2',
    serverId: '56bb2e31-1aa9-42d5-9e7d-903dcb3b67a8',
    createdAt: new Date(),
    updatedAt: null
};
export const mockProfile = {
    id: 'ac63727f-d5a3-4b5c-8fce-ac28a65b11b2',
    userId: 'user_2nz8AnMYY97sgpT4fQ24zPdaiBk',
    name: 'Test User',
    email: 'test@test.com',
    imageUrl: 'https://lh3.googleusercontent.com/-MZNMyTNoUxQ/AAAAAAAAAAI/AAAAAAAAAAA/ALKGfkmNRtcPlSBr59rSEaLUCnFN28KouA/s128-c/photo.jpg',
    createdAt: new Date(),
    updatedAt: null
};
export const mockMember = {
    id: '784e56e0-b946-4997-9c1e-c72cdbb30c60',
    role: MemberRole.GUEST,
    profileId: 'ac63727f-d5a3-4b5c-8fce-ac28a65b11b2',
    serverId: '56bb2e31-1aa9-42d5-9e7d-903dcb3b67a8',
    createdAt: new Date(),
    updatedAt: null
};
export const mockConversation = {
    id: '4fd427f8-1451-4f12-bd6f-397d1973d79b',
    memberOneId: '784e56e0-b946-4997-9c1e-c72cdbb30c60',
    memberTwoId: 'ecdd7c5e-16ab-4519-a11b-3e44a1dba7a5'
};
export const mockDirectMessage = {
    id: 'b682b6e6-007d-4ec1-89ab-dd06dbf7246b',
    content: 'this is a conversation message',
    fileUrl: null,
    fileType: null,
    memberId: '784e56e0-b946-4997-9c1e-c72cdbb30c60',
    conversationId: '4fd427f8-1451-4f12-bd6f-397d1973d79b',
    createdAt: new Date(),
    updatedAt: null
};