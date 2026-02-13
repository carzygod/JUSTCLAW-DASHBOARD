import { cn } from "../../utils"

export function Button({ className, variant = "primary", size = "md", children, ...props }) {
    const variants = {
        primary: "bg-gradient-to-br from-claw-800 to-claw-900 border border-white/5 text-blue-400 shadow-[5px_5px_10px_#05080f,-5px_-5px_10px_#151e32] hover:shadow-[inset_5px_5px_10px_#05080f,inset_-5px_-5px_10px_#151e32] active:shadow-[inset_5px_5px_10px_#05080f,inset_-5px_-5px_10px_#151e32] hover:text-blue-300 transition-all duration-300",
        ghost: "bg-transparent hover:bg-white/5 text-gray-400 hover:text-white backdrop-blur-sm border border-transparent hover:border-white/5",
        outline: "glass text-gray-300 hover:bg-claw-800/50 hover:text-white"
    }

    const sizes = {
        sm: "px-3 py-1.5 text-sm rounded-lg",
        md: "px-6 py-3 text-base rounded-xl",
        lg: "px-8 py-4 text-lg rounded-2xl"
    }

    return (
        <button
            className={cn(
                "font-medium flex items-center justify-center gap-2 relative overflow-hidden group",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </button>
    )
}
