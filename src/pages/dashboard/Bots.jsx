import { useState } from "react"
import { Plus, Server, Cpu, Clock, Trash2, StopCircle, PlayCircle } from "lucide-react"
import { Button } from "../../components/ui/Button"
import { Card } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { cn } from "../../utils"

export default function Bots() {
    const [showModal, setShowModal] = useState(false)
    const [bots, setBots] = useState([
        { id: 1, name: "Alpha Trader", status: "running", storage: "512MB", cpu: "12%", expiry: "14 days" },
        { id: 2, name: "Beta Sniper", status: "stopped", storage: "256MB", cpu: "0%", expiry: "7 days" },
    ])


    const [newBotValues, setNewBotValues] = useState({ name: "", telegramKey: "", telegramId: "" })

    // Fee Logic
    const DEPLOYMENT_FEE = 5.00
    const MONTHLY_ESTIMATE = 29.00
    const TOTAL_DUE = DEPLOYMENT_FEE + MONTHLY_ESTIMATE

    const handleCreateBot = (e) => {
        e.preventDefault()
        setBots([...bots, {
            id: bots.length + 1,
            name: newBotValues.name || "New Bot",
            status: "running",
            storage: "512MB",
            cpu: "5%",
            expiry: "30 days"
        }])
        setShowModal(false)
        setNewBotValues({ name: "", telegramKey: "", telegramId: "" })
    }

    return (
        <div className="relative">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Your Bots</h1>
                <Button onClick={() => setShowModal(true)}>
                    <Plus size={20} className="mr-2" /> New Bot
                </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bots.map((bot) => (
                    <Card key={bot.id} className="relative group">
                        <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 bg-claw-900 rounded-full hover:text-blue-500 text-gray-400">
                                <SettingsIcon size={16} />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className={cn(
                                "h-3 w-3 rounded-full shadow-[0_0_10px]",
                                bot.status === 'running' ? "bg-green-500 shadow-green-500/50" : "bg-red-500 shadow-red-500/50"
                            )} />
                            <h3 className="text-xl font-bold text-white">{bot.name}</h3>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 flex items-center"><Server size={14} className="mr-2" /> Storage</span>
                                <span className="text-gray-300">{bot.storage}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 flex items-center"><Cpu size={14} className="mr-2" /> CPU Usage</span>
                                <span className="text-gray-300">{bot.cpu}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 flex items-center"><Clock size={14} className="mr-2" /> Expires In</span>
                                <span className="text-gray-300">{bot.expiry}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            {bot.status === 'running' ? (
                                <Button variant="outline" size="sm" className="flex-1 border-red-500/30 hover:bg-red-500/10 text-red-500">
                                    <StopCircle size={16} className="mr-2" /> Stop
                                </Button>
                            ) : (
                                <Button variant="outline" size="sm" className="flex-1 border-green-500/30 hover:bg-green-500/10 text-green-500">
                                    <PlayCircle size={16} className="mr-2" /> Start
                                </Button>
                            )}
                            <Button variant="ghost" size="sm" className="px-2 text-gray-500 hover:text-red-500">
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Modal Overlay */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <Card className="w-full max-w-lg relative animate-in fade-in zoom-in duration-200 shadow-2xl border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6">Create New Bot</h2>
                        <form onSubmit={handleCreateBot} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Bot Name</label>
                                <Input
                                    placeholder="e.g. My Trading Bot"
                                    value={newBotValues.name}
                                    onChange={e => setNewBotValues({ ...newBotValues, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Telegram API Key</label>
                                <Input
                                    type="password"
                                    placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
                                    value={newBotValues.telegramKey}
                                    onChange={e => setNewBotValues({ ...newBotValues, telegramKey: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Telegram User ID</label>
                                <Input
                                    placeholder="123456789"
                                    value={newBotValues.telegramId}
                                    onChange={e => setNewBotValues({ ...newBotValues, telegramId: e.target.value })}
                                />
                            </div>

                            {/* Billing Summary */}
                            <div className="bg-claw-900/50 p-4 rounded-xl border border-white/5 space-y-2 mt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Deployment Fee (One-time)</span>
                                    <span className="text-white">${DEPLOYMENT_FEE.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Est. Monthly Cost</span>
                                    <span className="text-white">${MONTHLY_ESTIMATE.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-white/10 my-2 pt-2 flex justify-between font-bold">
                                    <span className="text-blue-400">Total Due Now</span>
                                    <span className="text-white">${TOTAL_DUE.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-8 pt-4 border-t border-white/5">
                                <Button type="button" variant="ghost" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
                                <Button type="submit" className="flex-1">Deploy Bot</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    )
}

function SettingsIcon({ size, className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}
