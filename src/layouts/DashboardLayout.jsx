import { Link, Outlet, useLocation } from "react-router-dom"
import { LayoutDashboard, User, LogOut, Settings } from "lucide-react"
import { cn } from "../utils"

function SidebarItem({ icon: Icon, label, href, active }) {
    return (
        <Link
            to={href}
            className={cn(
                "flex items-center px-4 py-3 rounded-xl transition-all mb-2 relative group overflow-hidden",
                active
                    ? "bg-claw-800/50 text-blue-400 shadow-[inset_2px_2px_5px_#05080f,inset_-2px_-2px_5px_#151e32] border border-white/5"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
        >
            {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 shadow-[0_0_10px_#3b82f6]" />}
            <Icon size={20} className="mr-3 relative z-10" />
            <span className="font-medium relative z-10">{label}</span>
        </Link>
    )
}

export default function DashboardLayout() {
    const location = useLocation()

    return (
        <div className="flex min-h-screen">
            {/* Sidebar - Glass Panel */}
            <aside className="w-64 glass m-4 rounded-3xl p-6 hidden md:flex flex-col border-r-0 fixed h-[calc(100vh-2rem)] z-50">
                <div className="mb-10 px-2 flex justify-center">
                    <img src="/logo.png" alt="JustClaw Logo" className="h-12 object-contain" />
                </div>

                <nav className="flex-1 space-y-1">
                    <SidebarItem
                        icon={User}
                        label="Profile"
                        href="/dashboard/profile"
                        active={location.pathname === "/dashboard/profile"}
                    />
                    <SidebarItem
                        icon={LayoutDashboard}
                        label="My Bots"
                        href="/dashboard/bots"
                        active={location.pathname === "/dashboard/bots"}
                    />

                </nav>

                <SidebarItem icon={LogOut} label="Logout" href="/" />
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto md:ml-72 relative z-10">
                <Outlet />
            </main>

            {/* Ambient background for dashboard */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-50"></div>
        </div>
    )
}
