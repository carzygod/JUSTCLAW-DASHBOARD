import { cn } from "../../utils"

export function Card({ className, children, ...props }) {
    return (
        <div
            className={cn(
                "glass rounded-2xl p-6 relative overflow-hidden",
                className
            )}
            {...props}
        >
            {/* Subtle shine effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}
