"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, RefreshCw } from "lucide-react";
import { Dialog, DialogTitle, DialogDescription, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const LeaveServerModal = () => {
    const router = useRouter();
    const { isOpen, onClose, type, data } = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const isModalOpen = isOpen && type === 'leaveServer';
    const { server } = data;

    const onClick = async () => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/servers/${server?.id}/leave`);
            onClose();
            router.refresh();
            router.push("/");
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="p-0 bg-white text-black">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl font-bold text-center">Leave Server</DialogTitle>
                    <DialogDescription className="!my-3 text-center text-zinc-500">
                        Are you sure want to leave <span className="font-semibold text-indigo-500">{server?.name}</span>?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="px-6 py-4 bg-gray-100">
                    <div className="w-full flex justify-between items-center">
                        <Button onClick={onClose} variant="ghost" disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button onClick={onClick} variant="primary" disabled={isLoading}>
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}