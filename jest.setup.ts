import React from "react"
import { TextEncoder as NodeTextEncoder, TextDecoder as NodeTextDecoder } from "util"
import "@testing-library/jest-dom"
import { LucideProps } from "lucide-react"
import { CustomVideoType, CustomVideoSourceType } from "@/components/main/custom-video"

global.TextEncoder = NodeTextEncoder as unknown as typeof TextEncoder
global.TextDecoder = NodeTextDecoder as unknown as typeof TextDecoder

class ResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
}
global.ResizeObserver = ResizeObserver

type NextImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    priority?: boolean
    placeholder?: "blur" | "empty"
    blurDataURL?: string
    loader?: (...args: unknown[]) => string
    fill?: boolean
    unoptimized?: boolean
}

jest.mock('next/image', () => ({
    __esModule: true,
    default: React.forwardRef(function MockedNextImage(props: NextImageProps, ref) {
        const { priority, placeholder, blurDataURL, loader, fill, unoptimized, ...rest } = props
        return React.createElement("img", { ...rest, ref, role: "img" })
    }),
}))
jest.mock('next/link', () => ({
    __esModule: true,
    default: jest.fn((props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => React.createElement('a', props, props.children)),
}))
jest.mock('next/navigation')
jest.mock('@clerk/nextjs')
jest.mock('query-string', () => ({
    parse: jest.fn(),
    stringify: jest.fn(),
    stringifyUrl: jest.fn(({ url, query }) => {
        const queryString = Object.entries(query).map(([key, value]) => `${key}=${value}`).join("&")
        return `${url}?${queryString}`
    })
}))
jest.mock('date-fns', () => ({
    ...jest.requireActual('date-fns'),
    format: jest.fn((date) => {
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            return 'Invalid Date'
        }
        const options: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        }
        return new Intl.DateTimeFormat("en-GB", options).format(date as Date)
    })
}))
jest.mock('lucide-react', () => {
    return new Proxy({}, {
        get: (_target, iconName: string) => {
            return (props: LucideProps) =>
                React.createElement("svg", {
                    ...props,
                    className: `lucide lucide-${iconName.toLowerCase()} ${props?.className ?? ""}`.trim(),
                    "data-testid": `lucide-${iconName.toLowerCase()}`
                })
        }
    })
})
jest.mock('@/lib/utils', () => ({
    ...jest.requireActual('@/lib/utils'),
    isThirdPartyAuthenticationEnabled: jest.fn(),
}))
jest.mock('@/context/media-query-context', () => ({
    useMedia: jest.fn(),
    MediaQueryProvider: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children)
}))
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
})
window.HTMLElement.prototype.scrollIntoView = jest.fn()
jest.mock('@/components/main/app-logo', () => ({
    __esModule: true,
    AppLogo: ({
        type = "small",
        color = "white",
        format = "svg",
        width = 180,
        height = 38,
        showText = true,
        href = "/",
        className = "",
        linkClassName = "",
    }) => {
        const logoSrc = `/images/logo/${type}/${type}_${color}_RGB.${format}`

        const imageElement = React.createElement("img", {
            src: logoSrc,
            alt: "Discord Clone logo mock",
            width,
            height,
            "data-testid": "appLogoImageMock",
            className,
        })

        const content = showText && type !== "icon"
            ? React.createElement(
                "div",
                { "data-testid": "appLogoImageDivMock", className, },
                imageElement,
                React.createElement(
                    "span",
                    { "data-testid": "appLogoImageTextMock", className: `text-app-${color}` },
                    "Clone"
                )
            )
            : React.createElement(
                "div",
                { "data-testid": "appLogoImageDivMock", className },
                imageElement
            )

        if (href) {
            return React.createElement("a", { href, className: linkClassName, "data-testid": "appLogoImageLinkMock" }, content)
        }

        return content
    }
}))
jest.mock('@/components/main/custom-video', () => {
    return {
        __esModule: true,
        default: (props: CustomVideoType) => {
            const {
                id,
                divClassName,
                src,
                sources = [],
                autoPlay = true,
                loop = true,
                muted = true,
                playsInline = true,
                backgroundImage,
                ...restProps
            } = props

            const videoStyle = backgroundImage
                ? { backgroundImage: `url("${backgroundImage}")` }
                : undefined

            return React.createElement(
                "div",
                { "data-testid": "customVideoDivMock", className: divClassName || "" },
                React.createElement(
                    "video",
                    {
                        id,
                        autoPlay,
                        loop,
                        muted,
                        playsInline,
                        style: videoStyle,
                        "data-object-fit": "cover",
                        ...restProps,
                    },
                    src ? React.createElement("source", { src, key: "main" }) : null,
                    ...sources.map((source: CustomVideoSourceType, index: number) =>
                        React.createElement("source", {
                            src: source.src,
                            type: source.type,
                            key: index,
                        })
                    )
                )
            )
        },
    }
})