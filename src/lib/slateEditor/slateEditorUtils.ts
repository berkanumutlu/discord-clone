import { Descendant, Editor, Element, Transforms } from "slate"

export const getPlainTextFromSlate = (value: Descendant[]): string => {
    return value
        .map((n) =>
            Element.isElement(n)
                ? n.children.map((c) => ("text" in c ? c.text : "")).join("")
                : ""
        )
        .join("\n")
}

export const isEditorEmpty = (value: Descendant[]): boolean => {
    return getPlainTextFromSlate(value) === ""
}

export const resetEditorValue = (): Descendant[] => {
    return [{ children: [{ text: "" }] }]
}

export const insertEmojiAtSelection = (editor: Editor, emoji: string) => {
    if (!editor.selection) return
    Transforms.insertText(editor, emoji)
}