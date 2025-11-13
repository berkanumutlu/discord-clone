"use client"

import { type KeyboardEvent, useEffect, useMemo, forwardRef } from "react"
import { createEditor, type Descendant, Transforms } from "slate"
import { Slate, Editable, withReact } from "slate-react"
import { SlateEditorType } from "@/types"
import { getPlainTextFromSlate, isEditorEmpty } from "@/lib/slateEditor/slateEditorUtils"

interface SlateEditorProps {
    editorKey: string
    value: Descendant[]
    onChange: (value: Descendant[], plainText: string) => void
    onSubmit: (text: string) => void
    onEditorReady?: (editor: SlateEditorType) => void
    className?: string
    placeholder?: string
    disabled?: boolean
    autoFocus?: boolean
    autoComplete?: string
}

export const SlateEditor = forwardRef<SlateEditorType, SlateEditorProps>(
    (
        {
            editorKey,
            value,
            onChange,
            onSubmit,
            onEditorReady,
            className,
            placeholder,
            disabled,
            autoFocus = false,
            autoComplete,
        },
        ref,
    ) => {
        const editor = useMemo(() => withReact(createEditor()), [])

        useEffect(() => {
            if (ref) {
                if (typeof ref === "function") {
                    ref(editor)
                } else {
                    ref.current = editor
                }
            }
            if (onEditorReady) {
                onEditorReady(editor)
            }
        }, [editor, ref, onEditorReady])

        const handleOnKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault()

                const text = getPlainTextFromSlate(value)
                if (text.trim()) {
                    onSubmit(text)
                    Transforms.delete(editor, { at: [0] })
                }
            }
        }

        return (
            <>
                {placeholder && isEditorEmpty(value) && <div className="placeholder">{placeholder}</div>}
                <Slate
                    key={editorKey}
                    editor={editor}
                    initialValue={value}
                    onChange={(val) => {
                        const text = getPlainTextFromSlate(val)
                        onChange(val, text)
                    }}
                >
                    <Editable
                        onKeyDown={handleOnKeyDown}
                        disabled={disabled}
                        className={className}
                        autoFocus={autoFocus}
                        autoComplete={autoComplete}
                        style={{
                            minHeight: "24px",
                            outline: "none",
                            whiteSpace: "pre-wrap",
                            maxHeight: "50vh",
                        }}
                    />
                </Slate>
            </>
        )
    },
)

SlateEditor.displayName = "SlateEditor"
