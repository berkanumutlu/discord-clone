import type { HTMLAttributes } from "react"

type Source = {
    src: string
    type?: string
}

interface VideoHTMLAttributes {
    width?: string | number
    height?: string | number
    poster?: string
    preload?: "auto" | "metadata" | "none"
    controls?: boolean
}

type CustomVideoProps = {
    id?: string
    divClassName?: string
    src?: string
    sources?: Source[]
    autoPlay?: boolean
    loop?: boolean
    muted?: boolean
    playsInline?: boolean
    backgroundImage?: string
} & Omit<HTMLAttributes<HTMLVideoElement>, "autoPlay" | "loop" | "muted" | "playsInline"> & VideoHTMLAttributes

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
}: CustomVideoProps) {
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
