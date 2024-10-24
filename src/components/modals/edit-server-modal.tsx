"use client";

import axios from "axios";
import * as z from "zod";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Dialog, DialogTitle, DialogContent, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { useModal } from "@/hooks/use-modal-store";

const forSchema = z.object({
    name: z.string().min(1, {
        message: "Server name is required."
    }),
    imageUrl: z.string().min(1, {
        message: "Server image is required."
    })
});

export const EditServerModal = () => {
    const router = useRouter();
    const { isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === 'editServer';
    const { server } = data;
    const form = useForm({
        resolver: zodResolver(forSchema),
        defaultValues: {
            name: "",
            imageUrl: ""
        }
    });

    useEffect(() => {
        if (server) {
            form.setValue("name", server.name);
            form.setValue("imageUrl", server.imageUrl);
        } else {
            form.reset();
        }
    }, [isModalOpen, server, form]);

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof forSchema>) => {
        try {
            await axios.patch(`/api/servers/${server?.id}`, values);
            form.reset();
            router.refresh();
            onClose();
        } catch (err) {
            console.log("[CREATE_SERVER]", err);
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
                    <DialogTitle className="text-2xl font-bold text-center">Customize your server</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Give your server a personality with a name and an image. You can always change it later.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField control={form.control} name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="serverImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField control={form.control} name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:secondary/70">Server name</FormLabel>
                                        <FormControl>
                                            <Input disabled={isLoading} className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" placeholder="Enter Server name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant="primary" disabled={isLoading}>Save</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}