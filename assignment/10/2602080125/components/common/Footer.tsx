"use client";

const Footer = () => {
    const today = new Date().getFullYear()
    return (
        <footer className="border-t">
            <div className="mx-auto flex h-14 w-full max-w-[1920] items-center justify-end px-6 text-xs text-muted-foreground">
                <span>© {today} Assignment 10. All rights reserved.</span>
            </div>
        </footer>
    );
}
export default Footer