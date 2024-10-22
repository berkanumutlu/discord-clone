"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

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
    const fileType = value?.split(".").pop();
    if (value && fileType !== 'pdf') {
        return (
            <div className="relative w-20 h-20">
                <Image
                    src={value}
                    alt="Uploaded Image"
                    className="rounded-full"
                    fill
                />
                <button
                    onClick={() => onChange("")}
                    className="absolute top-0 right-0 p-1 bg-rose-500 text-white rounded-full shadow-sm"
                    type="button"
                ><X className="w-4 h-4" /></button>
            </div>
        )
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(err: Error) => {
                console.log("[FILE_UPLOAD]", err);
            }}
        />
    )
}