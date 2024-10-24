"use client";

import axios from "axios";
import qs from "query-string";
import * as z from "zod";
import { Plus, SmilePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

interface ChatInputProps {
    apiUrl: string;
    query: Record<string, any>;
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
                                    <button onClick={() => { }} type="button" className="p-1 w-[24px] h-[24px] absolute top-7 left-8 flex items-center justify-center bg-zinc-500 hover:bg-zinc-600 dark:bg-zinc-400 dark:hover:bg-zinc-300 rounded-full transition">
                                        <Plus className="text-white dark:text-[#313338]" />
                                    </button>
                                    <Input disabled={isLoading} placeholder={`Message ${type === "conversation" ? name : "#" + name}`} {...field} className="px-14 py-6 text-zinc-600 dark:text-zinc-200 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                    <div className="absolute top-7 right-8">
                                        <SmilePlus />
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