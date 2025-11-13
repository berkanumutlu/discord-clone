import { create } from "zustand";
import { Channel, ChannelType, Server } from "@prisma/client";

export type ModalType = 'invitePeople' | 'members' | 'downloadApps'
    | 'createServer' | 'editServer' | 'leaveServer' | 'deleteServer'
    | 'createChannel' | 'editChannel' | 'deleteChannel'
    | 'messageFile' | 'deleteMessage';

interface ModalData {
    server?: Server;
    channel?: Channel;
    channelType?: ChannelType;
    apiUrl?: string;
    query?: Record<string, string | number>;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ type, data, isOpen: true }),
    onClose: () => set({ type: null, isOpen: false })
}))