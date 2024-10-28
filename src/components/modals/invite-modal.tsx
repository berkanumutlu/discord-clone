"use client";

import { useState } from "react";
import axios from "axios";
import { Check, Copy, RefreshCw } from "lucide-react";
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";
import { UseOrigin } from "@/hooks/use-origin";

export const InviteModal = () => {
    const origin = UseOrigin();
    const { isOpen, onOpen, onClose, type, data } = useModal();
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    const isModalOpen = isOpen && type === 'invite';
    const { server } = data;
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        setIsTooltipOpen(true);
        setTimeout(() => {
            setIsTooltipOpen(false);
            setTimeout(() => {
                setCopied(false);
            }, 200);
        }, 1500);

    };
    const onNew = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);
            onOpen("invite", { server: response.data });
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
                    <DialogTitle className="text-2xl font-bold text-center">Invite Friends</DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server invite link
                    </Label>
                    <div className="mt-2 flex items-center gap-x-2">
                        <Input value={inviteUrl} disabled={isLoading} className="text-black bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                        <ActionTooltip side="top" align="center" label={copied ? "Copied!" : "Copy to clipboard"} open={isTooltipOpen || undefined}>
                            <Button size="icon" onClick={onCopy} disabled={isLoading}>
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                        </ActionTooltip>
                    </div>
                    <Button variant="link" size="sm" onClick={onNew} disabled={isLoading} className="mt-4 text-xs text-zinc-500">
                        <RefreshCw className="w-4 h-4" />
                        Generate a new invite link
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}