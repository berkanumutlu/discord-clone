"use client";

import { useState } from "react";
import axios from "axios";
import qs from "query-string";
import { useRouter } from "next/navigation";
import { Dialog, DialogTitle, DialogDescription, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const DeleteChannelModal = () => {
    const router = useRouter();
    const { isOpen, onClose, type, data } = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const isModalOpen = isOpen && type === 'deleteChannel';
    const { server, channel } = data;

    const onClick = async () => {
        try {
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id
                }
            })
            await axios.delete(url);
            onClose();
            router.refresh();
            // router.push(`/servers/${server?.id}`);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="p-0 bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl font-bold text-center">Delete Channel</DialogTitle>
                    <DialogDescription className="!my-3 text-center text-zinc-500">
                        Are you sure want to do this?<br />
                        <span className="font-semibold text-indigo-500">#{channel?.name}</span> will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="px-6 py-4 bg-gray-100">
                    <div className="w-full flex justify-between items-center">
                        <Button onClick={onClose} variant="ghost" disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button onClick={onClick} variant="destructive" disabled={isLoading}>
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}