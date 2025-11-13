export const days = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
}))
export const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2000, i, 1)
    return {
        value: String(i + 1),
        label: new Intl.DateTimeFormat("en-GB", { month: "long" }).format(date),
    }
})
const currentYear = new Date().getFullYear() - 3
export const years = Array.from({ length: 150 }, (_, i) => ({
    value: String(currentYear - i),
    label: String(currentYear - i),
}))