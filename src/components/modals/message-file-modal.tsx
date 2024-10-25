"use client";

import axios from "axios";
import qs from "query-string";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Dialog, DialogTitle, DialogContent, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { useModal } from "@/hooks/use-modal-store";

const forSchema = z.object({
    fileUrl: z.string().min(1, {
        message: "Attachment is required."
    })
});

export const MessageFileModal = () => {
    const router = useRouter();
    const { isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === 'messageFile';
    const form = useForm({
        resolver: zodResolver(forSchema),
        defaultValues: {
            fileUrl: ""
        }
    });
    const isLoading = form.formState.isSubmitting;
    const { apiUrl, query } = data;

    const onSubmit = async (values: z.infer<typeof forSchema>) => {
        try {
            const url = qs.stringifyUrl({ url: apiUrl || "", query })
            await axios.post(url, { ...values, content: values.fileUrl });
            form.reset();
            router.refresh();
            onClose();
        } catch (err) {
            console.log("[INITIAL_MODAL]", err);
        }
    };
    const handleClose = () => {
        form.reset();
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="p-0 bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl font-bold text-center">Add and attachment</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Send a file as a message
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField control={form.control} name="fileUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="messageFile"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant="primary" disabled={isLoading}>Send</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}