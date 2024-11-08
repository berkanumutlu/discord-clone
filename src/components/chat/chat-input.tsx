"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import qs from "query-string";
import * as z from "zod";
import { Plus } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EmojiPicker } from "@/components/emoji-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/hooks/use-modal-store";

interface ChatInputProps {
    apiUrl: string;
    query: Record<string, string | number>;
    name: string;
    type: "conversation" | "channel";
}

const formSchema = z.object({
    content: z.string().min(1)
});

export const ChatInput = ({
    apiUrl,
    query,
    name,
    type
}: ChatInputProps) => {
    const router = useRouter();
    const { onOpen } = useModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: ""
        }
    });
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({ url: apiUrl, query });
            await axios.post(url, values);
            form.reset();
            router.refresh();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="p-4 pb-6 relative">
                                    <button onClick={() => onOpen("messageFile", { apiUrl, query })} type="button" className="p-1 w-[24px] h-[24px] absolute top-7 left-8 flex items-center justify-center bg-zinc-500 hover:bg-zinc-600 dark:bg-zinc-400 dark:hover:bg-zinc-300 rounded-full transition"
                                        aria-label="Open attachment modal">
                                        <Plus className="text-white dark:text-[#313338]" />
                                    </button>
                                    <Input disabled={isLoading} autoComplete="off" placeholder={`Message ${type === "conversation" ? "to " : "#"}${name}`} {...field} className="px-14 py-6 text-zinc-600 dark:text-zinc-200 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                    <div className="absolute top-7 right-8">
                                        <EmojiPicker onChange={(emoji: string) => field.onChange(`${field.value} ${emoji}`)} />
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}