import { useState } from "react"
import { Card } from "../../components/ui/Card"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { CreditCard, DollarSign, FileText, QrCode } from "lucide-react"
import { cn } from "../../utils"

export default function Profile() {
    const [showAddFunds, setShowAddFunds] = useState(false)
    const [step, setStep] = useState(1)
    const [amount, setAmount] = useState("")
    const [chain, setChain] = useState("ETH")
    const [token, setToken] = useState("USDT")

    const mockInvoices = [
        { id: "INV-001", date: "2023-10-01", amount: "$29.00", status: "Paid" },
        { id: "INV-002", date: "2023-09-01", amount: "$29.00", status: "Paid" },
        { id: "INV-003", date: "2023-08-01", amount: "$29.00", status: "Paid" },
    ]

    const mockConsumption = [
        { date: "Oct 1", usage: "12 hours", cost: "$0.50" },
        { date: "Oct 2", usage: "24 hours", cost: "$1.00" },
        { date: "Oct 3", usage: "24 hours", cost: "$1.00" },
    ]

    const chains = ["ETH", "BSC", "SOL", "TRX"]
    const tokens = ["USDT", "USDC", "ETH", "BTC"]

    const handleNextStep = () => {
        if (step < 3) setStep(step + 1)
    }

    const resetModal = () => {
        setShowAddFunds(false)
        setStep(1)
        setAmount("")
    }

    return (
        <div className="space-y-8 relative">
            <h1 className="text-3xl font-bold text-white mb-6">Your Profile</h1>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="flex flex-col justify-between">
                    <div>
                        <h3 className="text-gray-400 mb-2">Current Balance</h3>
                        <div className="text-4xl font-bold text-white mb-4">$142.50</div>
                    </div>
                    <div className="flex gap-4">
                        <Button className="flex-1" onClick={() => setShowAddFunds(true)}>Add Funds</Button>
                        <Button variant="outline" className="flex-1 opacity-50 cursor-not-allowed" disabled>Withdraw</Button>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white">Payment Method</h3>
                        <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-claw-900/50 p-3 rounded-xl shadow-inner border border-white/5">
                            <CreditCard className="text-blue-500" />
                        </div>
                        <div>
                            <div className="text-white font-medium">Visa ending in 4242</div>
                            <div className="text-gray-500 text-sm">Expires 12/24</div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <h3 className="text-xl font-bold text-white mb-6">Recent Invoices</h3>
                    <div className="space-y-4">
                        {mockInvoices.map((inv) => (
                            <div key={inv.id} className="flex items-center justify-between p-3 bg-claw-900/40 rounded-lg border border-white/5">
                                <div className="flex items-center gap-3">
                                    <FileText size={18} className="text-gray-400" />
                                    <div>
                                        <div className="text-sm font-medium text-white">{inv.id}</div>
                                        <div className="text-xs text-gray-500">{inv.date}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-white font-medium">{inv.amount}</span>
                                    <span className="text-green-500 text-xs bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">{inv.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card>
                    <h3 className="text-xl font-bold text-white mb-6">Consumption History</h3>
                    <div className="space-y-4">
                        {mockConsumption.map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 border-b border-white/5 last:border-0">
                                <div className="text-gray-300">{item.date}</div>
                                <div className="text-gray-500">{item.usage}</div>
                                <div className="text-white font-medium">{item.cost}</div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Add Funds Modal */}
            {showAddFunds && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <Card className="w-full max-w-md relative animate-in fade-in zoom-in duration-200 border-white/10 shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6">Add Funds</h2>

                        {step === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Amount (USD)</label>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        value={amount}
                                        onChange={e => setAmount(e.target.value)}
                                        className="text-2xl font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Select Chain</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {chains.map(c => (
                                            <button
                                                key={c}
                                                onClick={() => setChain(c)}
                                                className={cn(
                                                    "p-2 rounded-lg border transition-all text-sm font-medium",
                                                    chain === c
                                                        ? "bg-blue-500 text-white border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                                        : "bg-claw-900/50 text-gray-400 border-white/5 hover:border-white/20"
                                                )}
                                            >
                                                {c}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Select Token</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {tokens.map(t => (
                                            <button
                                                key={t}
                                                onClick={() => setToken(t)}
                                                className={cn(
                                                    "p-2 rounded-lg border transition-all text-sm font-medium",
                                                    token === t
                                                        ? "bg-blue-500 text-white border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                                        : "bg-claw-900/50 text-gray-400 border-white/5 hover:border-white/20"
                                                )}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="ghost" className="flex-1" onClick={resetModal}>Cancel</Button>
                                    <Button className="flex-1" onClick={handleNextStep}>Continue</Button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="text-center space-y-6">
                                <div className="bg-white p-4 rounded-xl inline-block mx-auto">
                                    <QrCode size={150} className="text-black" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-gray-400 text-sm">Send <span className="text-white font-bold">{amount || "0"} {token}</span> to:</p>
                                    <div className="bg-claw-900/80 p-3 rounded-lg border border-white/10 text-xs font-mono break-all text-gray-300">
                                        0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                                    </div>
                                </div>
                                <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg text-sm text-blue-300">
                                    Waiting for payment...
                                </div>
                                <Button variant="outline" className="w-full" onClick={resetModal}>Cancel</Button>
                            </div>
                        )}
                    </Card>
                </div>
            )}
        </div>
    )
}
