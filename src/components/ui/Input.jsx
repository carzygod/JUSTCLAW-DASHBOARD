import { cn } from "../../utils"

export function Input({ className, ...props }) {
    return (
        <input
            className={cn(
                "w-full bg-claw-950/50 border border-white/5 rounded-xl px-4 py-3 text-gray-200 outline-none focus:border-blue-500/50 focus:bg-claw-900/80 focus:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all placeholder:text-gray-600 shadow-inner",
                className
            )}
            {...props}
        />
    )
}
