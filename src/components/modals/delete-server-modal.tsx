"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dialog, DialogTitle, DialogDescription, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const DeleteServerModal = () => {
    const router = useRouter();
    const { isOpen, onClose, type, data } = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const isModalOpen = isOpen && type === 'deleteServer';
    const { server } = data;

    const onClick = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/servers/${server?.id}`);
            onClose();
            router.refresh();
            router.push("/");
        } catch (error) {
            console.error("[DELETE_SERVER_MODAL_ONCLICK]", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="p-0 bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl font-bold text-center">Delete Server</DialogTitle>
                    <DialogDescription className="!my-3 text-center text-zinc-500">
                        Are you sure want to do this?<br />
                        <span className="font-semibold text-indigo-500">{server?.name}</span> will be permanently deleted.
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