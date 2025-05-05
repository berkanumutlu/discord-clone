type Source = {
    src: string;
    type?: string;
};

type CustomVideoProps = {
    id?: string;
    className?: string;
    src?: string;
    sources?: Source[];
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    playsInline?: boolean;
    backgroundImage?: string;
};

export default function CustomVideo({
    id,
    className = '',
    src,
    sources = [],
    autoPlay = true,
    loop = true,
    muted = true,
    playsInline = true,
    backgroundImage,
}: CustomVideoProps) {
    return (
        <div
            data-autoplay={autoPlay}
            data-loop={loop}
            className={`home--group-chat-img video _2025 w-background-video w-background-video-atom ${className}`}
        >
            <video
                id={id}
                {...(autoPlay ? { autoPlay: true } : {})}
                {...(loop ? { loop: true } : {})}
                {...(muted ? { muted: true } : {})}
                {...(playsInline ? { playsInline: true } : {})} // For IOS device
                style={
                    backgroundImage
                        ? { backgroundImage: `url("${backgroundImage}")` }
                        : undefined
                }
                data-object-fit="cover"
            >
                {src && <source src={src} />}
                {sources.map((source, index) => (
                    <source key={index} src={source.src} type={source.type} />
                ))}
            </video>
        </div>
    );
}
