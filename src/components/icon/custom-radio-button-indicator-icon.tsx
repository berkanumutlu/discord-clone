export function CustomRadioButtonIndicatorIcon({ checked = false }: { checked: boolean }) {
    return (
        <div className="radioIndicatorGroup">
            <svg viewBox="0 0 24 24" className="radioIndicator">
                <circle cx="12" cy="12" r="12" className="radioIndicatorBackground" />
                <circle cx="12" cy="12" r="12" strokeWidth={1} fill="none" className="radioIndicatorStroke" />
                {checked && (
                    <circle cx="12" cy="12" r="5" className="radioIndicatorIcon" />
                )}
            </svg>
        </div>
    )
}