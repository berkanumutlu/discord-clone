import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

// Check if screen width is at least 992px
function isDesktop(): boolean {
    return typeof window !== "undefined" && window.matchMedia("(min-width: 992px)").matches
}

export function createHomeEggImageAnimation(element: HTMLElement) {
    const startY = "-48.5%"
    const endY = "21.5%"

    gsap.set(element, { y: startY })

    return gsap.fromTo(
        element,
        { y: startY },
        {
            y: endY,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                id: `home-egg-image-animation-${Math.random()}`,
            },
        },
    )
}

export function createHomeClydeImageAnimation(element: HTMLImageElement) {
    const startY = "-32.6%"
    const endY = isDesktop() ? "32.8%" : "5%"

    gsap.set(element, { y: startY })

    return gsap.fromTo(
        element,
        { y: startY },
        {
            y: endY,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                id: `home-clyde-image-animation-${Math.random()}`,
            },
        },
    )
}

export function createLineTextAnimation(element: HTMLElement, params: { duration?: number; repeat?: number } = {}) {
    const { duration = 20, repeat = -1 } = params

    // Get the width of the content to determine how far to scroll
    const contentWidth = element.scrollWidth
    const containerWidth = element.offsetWidth
    const distanceToScroll = contentWidth

    // Clone the content for seamless looping if needed
    const needsClone = contentWidth < containerWidth * 2

    if (needsClone) {
        // Clone the content to ensure seamless looping
        const clone = element.cloneNode(true) as HTMLElement
        element.appendChild(clone)
    }

    // Create the animation
    return gsap.to(element, {
        x: `-=${distanceToScroll}`,
        duration,
        repeat,
        ease: "linear", // Linear movement for smooth scrolling
        modifiers: {
            // This ensures the animation loops perfectly
            x: (x) => {
                // When we've scrolled the full width, reset to 0
                const currentX = Number.parseFloat(x)
                return `${currentX % distanceToScroll}px`
            },
        },
    })
}

export function createHomeCoinImageAnimation(element: HTMLImageElement) {
    const startY = "-84.5%"
    const endY = "24.2%"

    gsap.set(element, { y: startY })

    return gsap.fromTo(
        element,
        { y: startY },
        {
            y: endY,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                id: `home-coin-image-animation-${Math.random()}`,
            },
        },
    )
}

export function createHomeRadishImageAnimation(element: HTMLImageElement) {
    const startY = "-42.7%"
    const endY = "27.4%"

    gsap.set(element, { y: startY })

    return gsap.fromTo(
        element,
        { y: startY },
        {
            y: endY,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                id: `home-radish-image-animation-${Math.random()}`,
            },
        },
    )
}

export function createHomePanImageAnimation(element: HTMLImageElement) {
    const startY = "-16.1%"
    const endY = "30.5%"

    gsap.set(element, { y: startY })

    return gsap.fromTo(
        element,
        { y: startY },
        {
            y: endY,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                id: `home-pan-image-animation-${Math.random()}`,
            },
        },
    )
}

export function createDownloadCoinImageAnimation(element: HTMLImageElement) {
    const startY = "27.8%"
    const endY = "105.2%"

    gsap.set(element, { y: startY })

    return gsap.fromTo(
        element,
        { y: startY },
        {
            y: endY,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top",
                end: "bottom top",
                scrub: 1.2,
                id: `download-coin-image-animation-${Math.random()}`,
            },
        },
    )
}

export function createDownloadRadishImageAnimation(element: HTMLImageElement) {
    const startY = "0%"
    const endY = "37.5%"

    gsap.set(element, { y: startY })

    return gsap.fromTo(
        element,
        { y: startY },
        {
            y: endY,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
                id: `download-radish-image-animation-${Math.random()}`,
            },
        },
    )
}

export function createDownloadTrophyImageAnimation(element: HTMLImageElement) {
    const startY = "-31.25%"
    const endY = "9.375%"

    gsap.set(element, { y: startY })

    return gsap.fromTo(
        element,
        { y: startY },
        {
            y: endY,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
                id: `download-trophy-image-animation-${Math.random()}`,
            },
        },
    )
}