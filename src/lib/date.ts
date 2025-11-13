export function formatDateCustom(
    dateValue?: Date | string | null,
    options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' },
    locale: string = 'en-GB',
): string {
    if (!dateValue) return ''

    const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue

    if (isNaN(date.getTime())) {
        throw new Error('Invalid date provided.')
    }

    return new Intl.DateTimeFormat(locale, options).format(date)
}

export function formatDateToISOString(dateValue: Date | null | undefined): string | null | undefined {
    if (!(dateValue instanceof Date) || isNaN(dateValue.getTime())) {
        return undefined
    }

    return dateValue.toISOString()
}

export function formatDateCustomChatMessageTime(dateValue?: Date | string | null) {
    return formatDateCustom(dateValue, { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })
}

export function formatDateCustomChatMessageTimeTooltip(dateValue?: Date | string | null) {
    return `${formatDateCustom(dateValue, { weekday: 'long' })} ${formatDateCustom(dateValue, { day: '2-digit', month: 'long', year: 'numeric' })} at ${formatDateCustom(dateValue, { hour: '2-digit', minute: '2-digit', hour12: false })}`
}