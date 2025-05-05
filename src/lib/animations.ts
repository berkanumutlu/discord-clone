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
    gsap.set(element, { y: "-48.5%" })

    return gsap.fromTo(
        element,
        { y: "-48.5%" },
        {
            y: "21.5%",
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                id: `home-egg-animation-${Math.random()}`,
            },
        },
    )
}

export function createHomeClydeImageAnimation(element: HTMLImageElement) {
    gsap.set(element, { y: "-32.6%" })

    return gsap.fromTo(
        element,
        { y: "-32.6" },
        {
            y: isDesktop() ? "32.8%" : "5%",
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                id: `home-clyde-animation-${Math.random()}`,
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
    gsap.set(element, { y: "-84.5%" })

    return gsap.fromTo(
        element,
        { y: "-84.5%" },
        {
            y: "24.2%",
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                id: `home-coin-animation-${Math.random()}`,
            },
        },
    )
}

export function createHomeRadishImageAnimation(element: HTMLImageElement) {
    gsap.set(element, { y: "-42.7%" })

    return gsap.fromTo(
        element,
        { y: "-42.7%" },
        {
            y: "27.4%",
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                id: `home-radish-animation-${Math.random()}`,
            },
        },
    )
}

export function createHomePanImageAnimation(element: HTMLImageElement) {
    gsap.set(element, { y: "-16.1%" })

    return gsap.fromTo(
        element,
        { y: "-16.1%" },
        {
            y: "30.5%",
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5,
                id: `home-radish-animation-${Math.random()}`,
            },
        },
    )
}