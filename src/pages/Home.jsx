import { ArrowRight, Box, Shield, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"

function FeatureCard({ icon: Icon, title, description }) {
    return (
        <Card className="hover:scale-105 transition-transform duration-300 group hover:border-blue-500/20">
            <div className="h-12 w-12 rounded-full bg-claw-900/50 flex items-center justify-center mb-4 shadow-[inset_2px_2px_5px_#05080f,inset_-2px_-2px_5px_#151e32] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-shadow">
                <Icon className="text-blue-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </Card>
    )
}

function PricingCard({ title, price, features, recommended = false }) {
    return (
        <Card className={`relative flex flex-col h-full ${recommended ? 'border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : ''}`}>
            {recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Recommended
                </span>
            )}
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <div className="text-4xl font-bold text-blue-400 mb-6 drop-shadow-md">
                ${price}<span className="text-lg text-gray-500 font-medium">/mo</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                        <Zap size={16} className="text-blue-500 mr-2 drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]" />
                        {feature}
                    </li>
                ))}
            </ul>
            <Button variant={recommended ? 'primary' : 'outline'} className="w-full mt-auto">
                Get Started
            </Button>
        </Card>
    )
}

export default function Home() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen pb-20 relative overflow-hidden">
            {/* Ambient Lights */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse duration-[10000ms]"></div>
            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

            {/* Navigation */}
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto relative z-10">
                <div className="flex items-center">
                    <img src="/logo.png" alt="JustClaw" className="h-10 object-contain" />
                </div>
                <div className="space-x-4">
                    <Button onClick={() => navigate('/login')}>Get Started</Button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="max-w-7xl mx-auto pt-10 pb-32 px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight drop-shadow-2xl">
                        Deploy Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-claw-400 to-claw-300">Clawbot</span>
                        <br /> in Seconds.
                    </h1>
                    <p className="text-xl text-gray-400 mb-12 max-w-lg backdrop-blur-sm rounded-xl p-4 border border-white/5 bg-claw-900/30">
                        The most advanced platform for managing and deploying automated trading bots.
                        Enterprise-grade security with consumer-grade simplicity.
                    </p>
                    <div className="flex flex-col md:flex-row gap-6 items-center md:justify-start justify-center">
                        <Button size="lg" onClick={() => navigate('/login')} className="w-full md:w-auto shadow-[0_0_20px_rgba(57,57,201,0.4)]">
                            Start Deploying <ArrowRight className="ml-2" size={20} />
                        </Button>

                    </div>
                </div>
                <div className="flex-1 relative">
                    <div className="absolute inset-0 bg-claw-500/20 blur-[100px] rounded-full"></div>
                    <img src="/banner.png" alt="JustClaw Banner" className="relative z-10 w-full rounded-2xl shadow-2xl border border-white/10 glass hover:scale-105 transition-transform duration-500" />
                </div>
            </header>

            {/* Features */}
            <section className="max-w-7xl mx-auto px-6 mb-32 relative z-10">
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={Zap}
                        title="Instant Deployment"
                        description="One-click setup. No command line, no config files. Just pure performance."
                    />
                    <FeatureCard
                        icon={Shield}
                        title="Enterprise Security"
                        description="Your keys are encrypted with military-grade standards. We never store them in plain text."
                    />
                    <FeatureCard
                        icon={Box}
                        title="Cloud Managed"
                        description="24/7 uptime guarantee. Monitor your bots from anywhere in the world."
                    />
                </div>
            </section>

            {/* Pricing */}
            <section className="max-w-6xl mx-auto px-6 relative z-10">
                <h2 className="text-4xl font-bold text-center text-white mb-4">
                    Simple, Transparent Pricing
                </h2>
                <p className="text-center text-gray-400 mb-16 max-w-lg mx-auto">
                    Choose the plan that fits your trading needs. No hidden fees.
                </p>
                <div className="grid md:grid-cols-3 gap-8 items-stretch">
                    <PricingCard
                        title="Starter"
                        price="0"
                        features={["1 Bot Limit", "Basic Analytics", "Community Support"]}
                    />
                    <PricingCard
                        title="Pro"
                        price="29"
                        recommended
                        features={["5 Bot Limit", "Advanced Analytics", "Priority Support", "Custom Strategies"]}
                    />
                    <PricingCard
                        title="Enterprise"
                        price="99"
                        features={["Unlimited Bots", "Real-time Metrics", "Dedicated Account Manager", "API Access"]}
                    />
                </div>
            </section>
        </div>
    )
}
