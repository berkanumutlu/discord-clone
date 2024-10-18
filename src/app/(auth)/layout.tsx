const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full bg-red-500">
            Auth Layout
            {children}
        </div>
    );
}

export default AuthLayout;