import type { HTMLAttributes, VideoHTMLAttributes } from "react"

export type CustomVideoSourceType = {
    src: string
    type?: string
}

export type CustomVideoType = {
    id?: string
    divClassName?: string
    src?: string
    sources?: CustomVideoSourceType[]
    autoPlay?: boolean
    loop?: boolean
    muted?: boolean
    playsInline?: boolean
    backgroundImage?: string
} & Omit<HTMLAttributes<HTMLVideoElement>, "autoPlay" | "loop" | "muted" | "playsInline"> & VideoHTMLAttributes<HTMLVideoElement>

export default function CustomVideo({
    id,
    divClassName = "",
    src,
    sources = [],
    autoPlay = true,
    loop = true,
    muted = true,
    playsInline = true,
    backgroundImage,
    ...videoProps
}: CustomVideoType) {
    return (
        <div data-autoplay={autoPlay} data-loop={loop} className={divClassName}>
            <video
                id={id}
                {...(autoPlay ? { autoPlay: true } : {})}
                {...(loop ? { loop: true } : {})}
                {...(muted ? { muted: true } : {})}
                {...(playsInline ? { playsInline: true } : {})} // For IOS device
                style={backgroundImage ? { backgroundImage: `url("${backgroundImage}")` } : undefined}
                data-object-fit="cover"
                {...videoProps}
            >
                {src && <source src={src} />}
                {sources.map((source, index) => (
                    <source key={index} src={source.src} type={source.type} />
                ))}
            </video>
        </div>
    )
}
