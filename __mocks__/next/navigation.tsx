export const useRouterMock = {
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
}
export const useRouter = () => useRouterMock

export const usePathname = jest.fn(() => '/')
export const useSearchParams = jest.fn(() => new URLSearchParams())
export const useParams = jest.fn(() => ({}))
export const useSelectedLayoutSegments = jest.fn(() => [])
export const redirect = jest.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`)
})