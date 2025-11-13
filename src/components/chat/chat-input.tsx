"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import axios from "axios"
import qs from "query-string"
import * as z from "zod"
import { Gamepad2Icon, GiftIcon, ImagePlayIcon, PlusIcon, StickerIcon } from "lucide-react"
import { Descendant, Editor } from "slate"
import { insertEmojiAtSelection, resetEditorValue } from "@/lib/slateEditor/slateEditorUtils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useModal } from "@/hooks/use-modal-store"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { EmojiPicker } from "@/components/emoji-picker"
import { SlateEditor } from "@/components/slate-editor"

interface ChatInputProps {
    name: string
    type: "conversation" | "channel"
    apiUrl: string
    query: Record<string, string | number>
}

const formSchema = z.object({
    content: z.string().min(1)
})

export const ChatInput = ({
    name,
    type,
    apiUrl,
    query,
}: ChatInputProps) => {
    const router = useRouter()
    const { onOpen } = useModal()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: ""
        }
    })
    const isLoading = form.formState.isSubmitting

    const [editorInstance, setEditorInstance] = useState<Editor | null>(null)
    const [editorKey, setEditorKey] = useState<string>(Date.now().toString())
    const [editorValue, setEditorValue] = useState<Descendant[]>([{ children: [{ text: "" }] }])

    const sendMessage = async (message: string) => {
        try {
            const url = qs.stringifyUrl({ url: apiUrl, query })
            await axios.post(url, { content: message })

            setEditorValue(resetEditorValue())
            setEditorKey(Date.now().toString())
            form.reset()
            router.refresh()
        } catch (error) {
            console.error("[CHAT_INPUT_ONSUBMIT]", error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(() => sendMessage(form.getValues("content")))} className="formWithLoadedChatInput">
                <FormField control={form.control} name="content"
                    render={() => (
                        <FormItem className="space-y-0 channelBottomBarArea">
                            <FormControl>
                                <div className="channelTextArea">
                                    <div className="scrollableContainer">
                                        <div className="sansAttachButton">
                                            <div className="attachWrapper">
                                                <button
                                                    type="button"
                                                    disabled={isLoading}
                                                    onClick={() => onOpen("messageFile", { apiUrl, query })}
                                                    className="attachButton"
                                                    aria-label="More message options"
                                                >
                                                    <div className="attachButtonInner">
                                                        <PlusIcon className="emojiListIcon" />
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="textArea">
                                                <SlateEditor
                                                    editorKey={editorKey}
                                                    value={editorValue}
                                                    onChange={(val, text) => {
                                                        setEditorValue(val)
                                                        form.setValue("content", text, { shouldValidate: true })
                                                    }}
                                                    onSubmit={sendMessage}
                                                    onEditorReady={(editor) => setEditorInstance(editor)}
                                                    className="chatInput"
                                                    placeholder={`Message ${type === "conversation" ? "to " : "#"}${name}`}
                                                    disabled={isLoading}
                                                    autoFocus={true}
                                                    autoComplete="off"
                                                />
                                            </div>
                                            <div className="buttons">
                                                <div className="buttonItem giftButton" role="button" aria-label="Send a gift" tabIndex={0}>
                                                    <div className="buttonWrapper">
                                                        <div className="lottieIcon">
                                                            <GiftIcon width={20} height={20} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="buttonContainer expression-picker-chat-input-button">
                                                    <div className="buttonItem gifButton" role="button" aria-label="Open GIF picker" tabIndex={0}>
                                                        <div className="buttonWrapper">
                                                            <div className="lottieIcon">
                                                                <ImagePlayIcon width={20} height={20} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="buttonContainer expression-picker-chat-input-button">
                                                    <div className="buttonItem stickerButton" role="button" aria-label="Open sticker picker" tabIndex={0}>
                                                        <div className="buttonWrapper">
                                                            <div className="lottieIcon">
                                                                <StickerIcon width={20} height={20} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="buttonContainer expression-picker-chat-input-button">
                                                    <div className="buttonItem emojiButton">
                                                        <EmojiPicker
                                                            onSelect={(emoji: string) => {
                                                                if (editorInstance) {
                                                                    insertEmojiAtSelection(editorInstance, emoji)
                                                                }
                                                            }}
                                                            random={true}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="channelAppLauncher">
                                                    <div className="app-launcher-entrypoint">
                                                        <button
                                                            type="button"
                                                            aria-label="Apps"
                                                            className="appLauncherButton"
                                                            tabIndex={0}
                                                        >
                                                            <div className="buttonContents">
                                                                <div className="lottieIcon">
                                                                    <Gamepad2Icon width={20} height={20} />
                                                                </div>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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