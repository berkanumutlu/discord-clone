import React from "react"
import { useAuth } from "@clerk/nextjs"
import { act, render, screen, waitFor, within } from "@testing-library/react"
import { afterSignInUrl, signInUrl } from "@/data"
import HomePageClient from "@/app/page-client"
import { useMedia } from "@/context/media-query-context"
import { createHomeClydeImageAnimation, createHomeCoinImageAnimation, createHomeEggImageAnimation, createHomePanImageAnimation, createHomeRadishImageAnimation, createLineTextAnimation } from "@/lib/animations" // Mock GSAP animations to prevent actual animation execution during tests

// Mock all GSAP animation functions since we don't need to test their actual animation logic in a component test
jest.mock('@/lib/animations', () => ({
    createHomeClydeImageAnimation: jest.fn(() => ({
        play: jest.fn(),
        pause: jest.fn(),
        kill: jest.fn(),
    })),
    createHomeCoinImageAnimation: jest.fn(() => ({
        play: jest.fn(),
        pause: jest.fn(),
        kill: jest.fn(),
    })),
    createHomeEggImageAnimation: jest.fn(() => ({
        play: jest.fn(),
        pause: jest.fn(),
        kill: jest.fn(),
    })),
    createHomePanImageAnimation: jest.fn(() => ({
        play: jest.fn(),
        pause: jest.fn(),
        kill: jest.fn(),
    })),
    createHomeRadishImageAnimation: jest.fn(() => ({
        play: jest.fn(),
        pause: jest.fn(),
        kill: jest.fn(),
    })),
    createLineTextAnimation: jest.fn(() => ({
        play: jest.fn(),
        pause: jest.fn(),
        kill: jest.fn(),
    })),
}))

describe('Home Page (Client) Tests', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
        // Default mock for useMedia for tests that don't override it
        (useMedia as jest.Mock).mockReturnValue({
            isMaxWidth: jest.fn((width: number) => false), // Default to desktop view
        })
    })

    it('should render without crashing', async () => {
        (useAuth as jest.Mock).mockReturnValue({
            isSignedIn: false,
            isLoaded: true
        })

        await act(async () => { render(<HomePageClient />) })
    })
    it('should render the AppLogo image with text', async () => {
        await act(async () => { render(<HomePageClient />) })

        const appLogoLink = screen.getAllByTestId<HTMLAnchorElement>("appLogoImageLinkMock")[0]
        expect(appLogoLink).toBeInTheDocument()
        expect(appLogoLink).toHaveAttribute("href", "/")

        const appLogoDiv = within(appLogoLink).getByTestId("appLogoImageDivMock")
        expect(appLogoDiv).toBeInTheDocument()

        const appLogoImage = within(appLogoDiv).getByTestId("appLogoImageMock")
        expect(appLogoImage).toBeInTheDocument()
        expect(appLogoImage).toHaveAttribute("src", expect.stringContaining("/images/logo/"))
        expect(appLogoImage).toHaveAttribute("alt", "Discord Clone logo mock")

        const appLogoText = within(appLogoDiv).getByTestId("appLogoImageTextMock")
        expect(appLogoText).toBeInTheDocument()
        expect(appLogoText).toHaveTextContent("Clone")
    })
    it('should render "Log In" button with signInUrl in the Header section when user is not signed in', async () => {
        (useAuth as jest.Mock).mockReturnValue({
            isSignedIn: false,
            isLoaded: true,
        })

        await act(async () => { render(<HomePageClient />) })

        const authButton = document.querySelector(".headerAuthButton") as HTMLAnchorElement
        expect(authButton).toBeInTheDocument()
        expect(authButton).toHaveAttribute("href", signInUrl)
        expect(authButton.textContent?.toLowerCase()).toContain("log in")
    })
    it('should render "Open Discord" button with afterSignInUrl in the Header section when user is signed in', async () => {
        (useAuth as jest.Mock).mockReturnValue({
            isSignedIn: true,
            isLoaded: true,
        })

        await act(async () => { render(<HomePageClient />) })

        const authButton = document.querySelector(".headerAuthButton") as HTMLAnchorElement
        expect(authButton).toBeInTheDocument()
        expect(authButton).toHaveAttribute("href", afterSignInUrl)
        expect(authButton.textContent?.toLowerCase()).toContain("open discord")
    })
    it('should render the hero section heading, text, image', async () => {
        await act(async () => { render(<HomePageClient />) })

        const heroHeading = screen.getByRole("heading", {
            level: 1,
            name: /group chat that’s all fun\s*&\s*games/i,
        })
        expect(heroHeading).toBeInTheDocument()

        const heroText = screen.getByText(/Discord is great for playing games and chilling with friends, or even building a worldwide community. Customize your own space to talk, play, and hang out./i)
        expect(heroText).toBeInTheDocument()

        const mobileHeroImage = screen.getByAltText("Group chat that’s all fun&nbsp;& games")
        expect(mobileHeroImage).toBeInTheDocument()
        expect(mobileHeroImage).toHaveAttribute("src", expect.stringContaining("/images/home/"))
    })
    it('should render the "Download for Windows" and "Open Discord in your browser" buttons', async () => {
        await act(async () => { render(<HomePageClient />) })

        const downloadButtonForWindowsLink = screen.getAllByText<HTMLAnchorElement>("Download for Windows")[0]
        expect(downloadButtonForWindowsLink).toBeInTheDocument()
        expect(downloadButtonForWindowsLink).toHaveAttribute("href", expect.stringContaining("/api/downloads/"))

        const downloadButtonForWindowsIcon = within(downloadButtonForWindowsLink).getByTestId("lucide-download")
        expect(downloadButtonForWindowsIcon).toBeInTheDocument()
        expect(downloadButtonForWindowsIcon.tagName.toLowerCase()).toBe("svg")
        expect(downloadButtonForWindowsIcon).toHaveClass("lucide")
        expect(downloadButtonForWindowsIcon).toHaveClass("lucide-download")

        const openDiscordInBrowserLink = screen.getByText<HTMLAnchorElement>("Open Discord in your browser")
        expect(openDiscordInBrowserLink).toBeInTheDocument()
        expect(openDiscordInBrowserLink).toHaveAttribute("href", "/app")
    })
    it('should render the background star images', async () => {
        await act(async () => { render(<HomePageClient />) })

        const allImages = screen.getAllByRole("img")
        expect(allImages.length).toBeGreaterThan(0)

        const starImages = allImages.filter(img => img.classList.contains("star-hero-home"))
        expect(starImages.length).toBeGreaterThan(0)

        const validImageExtensions = [".svg", ".webp", ".png", ".jpg", ".jpeg"]
        const validStarImageSizeClasses = ["star-lg", "star-m", "star-sm"]
        for (const starImage of starImages) {
            const src = starImage.getAttribute("src") || ""
            expect(src.includes("/images/home/star_")).toBe(true)

            const isValidImageExtension = validImageExtensions.some(ext => src.endsWith(ext))
            expect(isValidImageExtension).toBe(true)

            const classList = starImage.className.split(" ")
            const hasValidSizeClass = classList.some(cls => validStarImageSizeClasses.includes(cls))
            expect(hasValidSizeClass).toBe(true)
        }
    })
    it('should render the CustomVideo component', async () => {
        await act(async () => { render(<HomePageClient />) })

        const allCustomVideos = screen.getAllByTestId('customVideoDivMock')
        expect(allCustomVideos.length).toBeGreaterThan(0)
    })
    it('should calls animation functions for desktop view', async () => {
        (useMedia as jest.Mock).mockReturnValue({
            isMaxWidth: jest.fn((width: number) => false),
        })

        await act(async () => { render(<HomePageClient />) })

        // Wait for useEffect to run and animations to potentially be called
        await waitFor(() => {
            expect(createHomeEggImageAnimation).toHaveBeenCalled()
            expect(createHomeClydeImageAnimation).toHaveBeenCalled()
            expect(createLineTextAnimation).toHaveBeenCalled()
            expect(createHomeCoinImageAnimation).toHaveBeenCalled()
            expect(createHomeRadishImageAnimation).toHaveBeenCalled()
            expect(createHomePanImageAnimation).toHaveBeenCalled()
        })
    })
    it('should NOT call animation functions for mobile view', async () => {
        // Ensure isMaxWidth returns true for mobile (e.g., any width <= 767)
        (useMedia as jest.Mock).mockReturnValue({
            isMaxWidth: jest.fn((width: number) => width <= 767),
        })

        await act(async () => { render(<HomePageClient />) })

        // Wait for useEffect to run and animations to potentially be not called
        await waitFor(() => {
            expect(createHomeEggImageAnimation).not.toHaveBeenCalled()
            expect(createHomeClydeImageAnimation).not.toHaveBeenCalled()
            expect(createLineTextAnimation).not.toHaveBeenCalled()
            expect(createHomeCoinImageAnimation).not.toHaveBeenCalled()
            expect(createHomeRadishImageAnimation).not.toHaveBeenCalled()
            expect(createHomePanImageAnimation).not.toHaveBeenCalled()
        })
    })
})