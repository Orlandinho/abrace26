export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md text-sidebar-primary-foreground">
                <img
                    src="/storage/img/abrace_logo.png"
                    alt="logo"
                    width={30}
                    height={30}
                />
            </div>
            <div className="ml-1 grid hidden flex-1 text-left text-sm sm:block">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Abrace IPVG
                </span>
            </div>
        </>
    );
}
