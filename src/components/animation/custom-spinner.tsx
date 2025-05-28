export const CustomSpinnerAnimation = () => {
    return (
        <span className="absolute flex justify-center items-center" aria-label="Loading">
            <span className="size-8 inline-flex justify-center items-center contain-paint">
                <span className="size-2.5 absolute top-0 left-0 bg-app-brand-400 animate-spinner-wandering-cubes"></span>
                <span className="size-2.5 absolute top-0 left-0 bg-app-brand-400 animate-spinner-wandering-cubes delay-m900"></span>
            </span>
        </span>
    )
}
