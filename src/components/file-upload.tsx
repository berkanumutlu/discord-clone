"use client";

import { useState } from "react";
import Image from "next/image";
import { FileIcon, X } from "lucide-react";
import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {
    const [mimeType, setMimeType] = useState<string | undefined>(undefined);

    if (value) {
        const isImage = mimeType?.startsWith("image");
        if (isImage) {
            return (
                <div className="relative w-20 h-20">
                    <Image src={value} alt="Uploaded Image" fill className="rounded-full" />
                    <button
                        onClick={() => {
                            onChange("");
                            setMimeType(undefined);
                        }}
                        type="button"
                        className="p-1 absolute top-0 right-0 bg-rose-500 text-white rounded-full shadow-sm"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )
        } else {
            return (
                <div className="mt-2 p-2 relative flex items-center bg-background/10 rounded-md">
                    <FileIcon className="w-10 h-10 fill-indigo-200 stroke-indigo-400" />
                    <a href={value} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline overflow-hidden text-ellipsis whitespace-nowrap max-w-[350px]">{value}</a>
                    <button
                        onClick={() => {
                            onChange("");
                            setMimeType(undefined);
                        }}
                        type="button"
                        className="p-1 absolute -top-2 -right-2 bg-rose-500 text-white rounded-full shadow-sm"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                if (res && res[0]) {
                    const { url, type } = res[0];
                    onChange(url);
                    setMimeType(type);
                }
            }}
            onUploadError={(err: Error) => {
                console.log("[FILE_UPLOAD]", err);
            }}
        />
    )
}