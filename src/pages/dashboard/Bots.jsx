import { useState, useEffect } from "react"
import { Plus, Server, Cpu, Clock, Trash2, StopCircle, PlayCircle, RotateCw, Settings, Loader2, RefreshCw } from "lucide-react"
import { Button } from "../../components/ui/Button"
import { Card } from "../../components/ui/Card"
import { Input } from "../../components/ui/Input"
import { cn } from "../../utils"
import { fetchApi } from "../../api"

export default function Bots() {
    const [showModal, setShowModal] = useState(false)
    const [showSettingsModal, setShowSettingsModal] = useState(false)
    const [selectedBot, setSelectedBot] = useState(null)
    const [bots, setBots] = useState([])
    const [loading, setLoading] = useState(true)
    const [processingMessage, setProcessingMessage] = useState(null)

    const [newBotValues, setNewBotValues] = useState({ name: "", telegramKey: "", telegramId: "" })
    const [editBotValues, setEditBotValues] = useState({ name: "", telegramKey: "", telegramId: "" })

    // Fee Logic
    const DEPLOYMENT_FEE = 5.00
    const MONTHLY_ESTIMATE = 29.00
    const TOTAL_DUE = DEPLOYMENT_FEE + MONTHLY_ESTIMATE

    const loadBots = async () => {
        setLoading(true)
        try {
            const response = await fetchApi('/bots')
            setBots(response.data || [])
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadBots()
    }, [])

    const handleCreateBot = async (e) => {
        e.preventDefault()
        setProcessingMessage("Deploying Bot...")
        try {
            await fetchApi('/bots', {
                method: 'POST',
                body: JSON.stringify({
                    name: newBotValues.name,
                    telegramApiKey: newBotValues.telegramKey,
                    telegramUserId: newBotValues.telegramId,
                    type: 'trading' // Default type
                })
            })
            setShowModal(false)
            setNewBotValues({ name: "", telegramKey: "", telegramId: "" })
            loadBots()
        } catch (err) {
            alert(err.message)
        } finally {
            setProcessingMessage(null)
        }
    }

    const openSettings = (bot) => {
        setSelectedBot(bot)
        setEditBotValues({
            name: bot.name,
            telegramKey: bot.telegramApiKey || "",
            telegramId: bot.telegramUserId || ""
        })
        setShowSettingsModal(true)
    }

    const handleUpdateBot = async (e) => {
        e.preventDefault()
        setProcessingMessage("Updating Configuration...")
        try {
            await fetchApi(`/bots/${selectedBot._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    name: editBotValues.name,
                    telegramApiKey: editBotValues.telegramKey,
                    telegramUserId: editBotValues.telegramId
                })
            })
            setShowSettingsModal(false)
            loadBots()
        } catch (err) {
            alert(err.message)
        } finally {
            setProcessingMessage(null)
        }
    }

    const handleAction = async (id, action) => {
        const actionText = action.charAt(0).toUpperCase() + action.slice(1)
        setProcessingMessage(`${actionText}ing Bot...`) // e.g. Starting Bot...
        try {
            await fetchApi(`/bots/${id}/${action}`, { method: 'POST' })
            loadBots()
        } catch (err) {
            alert(err.message)
        } finally {
            setProcessingMessage(null)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this bot? This action cannot be undone.")) return;
        setProcessingMessage("Deleting Bot...")
        try {
            await fetchApi(`/bots/${id}`, { method: 'DELETE' })
            loadBots()
        } catch (err) {
            alert(err.message)
        } finally {
            setProcessingMessage(null)
        }
    }

    if (loading && bots.length === 0) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-claw-400" size={40} /></div>

    return (
        <div className="relative">
            {/* Global Processing Overlay */}
            {processingMessage && (
                <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
                    <Loader2 className="animate-spin text-claw-400 mb-4" size={48} />
                    <h3 className="text-xl font-bold text-white">{processingMessage}</h3>
                    <p className="text-gray-400 text-sm mt-2">This may take a moment.</p>
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Your Bots</h1>
                <Button onClick={() => setShowModal(true)}>
                    <Plus size={20} className="mr-2" /> New Bot
                </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bots.map((bot) => (
                    <Card key={bot._id} className="relative group">
                        <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => openSettings(bot)}
                                className="p-2 bg-claw-900 rounded-full hover:text-blue-500 text-gray-400 border border-white/5"
                            >
                                <Settings size={16} />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 mb-6">
                            <div className={cn(
                                "h-3 w-3 rounded-full shadow-[0_0_10px]",
                                bot.status === 'running' ? "bg-green-500 shadow-green-500/50" :
                                    bot.status === 'provisioning' ? "bg-yellow-500 shadow-yellow-500/50 animate-pulse" :
                                        "bg-red-500 shadow-red-500/50"
                            )} />
                            <div>
                                <h3 className="text-xl font-bold text-white">{bot.name}</h3>
                                {bot.status === 'provisioning' && <span className="text-xs text-yellow-400">Restarting...</span>}
                            </div>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 flex items-center"><Server size={14} className="mr-2" /> ID</span>
                                <span className="text-gray-300 font-mono text-xs">{bot._id.slice(-6)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 flex items-center"><Cpu size={14} className="mr-2" /> Model</span>
                                <span className="text-gray-300">{bot.model}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 flex items-center"><Clock size={14} className="mr-2" /> Created</span>
                                <span className="text-gray-300">{new Date(bot.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {bot.status === 'running' ? (
                                <>
                                    <Button onClick={() => handleAction(bot._id, 'restart')} variant="outline" size="sm" className="flex-1 border-yellow-500/30 hover:bg-yellow-500/10 text-yellow-500">
                                        <RotateCw size={16} className="mr-2" /> Restart
                                    </Button>
                                    <Button onClick={() => handleAction(bot._id, 'stop')} variant="outline" size="sm" className="flex-1 border-red-500/30 hover:bg-red-500/10 text-red-500">
                                        <StopCircle size={16} className="mr-2" /> Stop
                                    </Button>
                                </>
                            ) : (
                                <Button onClick={() => handleAction(bot._id, 'start')} variant="outline" size="sm" className="flex-1 border-green-500/30 hover:bg-green-500/10 text-green-500">
                                    <PlayCircle size={16} className="mr-2" /> Start
                                </Button>
                            )}
                            <Button variant="ghost" size="sm" className="px-2 text-gray-500 hover:text-red-500" onClick={() => handleDelete(bot._id)}>
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Create Modal */}
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
                                    placeholder="123456:ABC-..."
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

                            <div className="bg-claw-900/50 p-4 rounded-xl border border-white/5 space-y-2 mt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Deployment Fee</span>
                                    <span className="text-white">${DEPLOYMENT_FEE.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Monthly</span>
                                    <span className="text-white">${MONTHLY_ESTIMATE.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-white/10 my-2 pt-2 flex justify-between font-bold">
                                    <span className="text-blue-400">Total Due</span>
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

            {/* Edit/Settings Modal */}
            {showSettingsModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <Card className="w-full max-w-lg relative animate-in fade-in zoom-in duration-200 shadow-2xl border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6">Edit Configuration</h2>
                        <p className="text-sm text-yellow-500 mb-4 bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                            Warning: Updating configuration will automatically restart the bot.
                        </p>
                        <form onSubmit={handleUpdateBot} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Bot Name</label>
                                <Input
                                    value={editBotValues.name}
                                    onChange={e => setEditBotValues({ ...editBotValues, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Telegram API Key</label>
                                <Input
                                    type="password"
                                    value={editBotValues.telegramKey}
                                    onChange={e => setEditBotValues({ ...editBotValues, telegramKey: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Telegram User ID</label>
                                <Input
                                    value={editBotValues.telegramId}
                                    onChange={e => setEditBotValues({ ...editBotValues, telegramId: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-4 mt-8 pt-4 border-t border-white/5">
                                <Button type="button" variant="ghost" className="flex-1" onClick={() => setShowSettingsModal(false)}>Cancel</Button>
                                <Button type="submit" className="flex-1">Save & Restart</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    )
}
