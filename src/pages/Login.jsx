import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Twitter, Loader2 } from "lucide-react"

export default function Login() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // API URL from env
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

    useEffect(() => {
        const token = searchParams.get("token")
        if (token) {
            verifyToken(token)
        }
    }, [searchParams])

    const verifyToken = async (oneTimeToken) => {
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/auth/login/x/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: oneTimeToken })
            })

            const data = await res.json()

            if (data.success) {
                localStorage.setItem("authToken", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                navigate("/dashboard/profile")
            } else {
                setError(data.message || "Verification failed")
            }
        } catch (err) {
            setError("Connection error. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async () => {
        setLoading(true)
        setError("")
        try {
            const res = await fetch(`${API_URL}/auth/login/x/init`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ redirect: window.location.origin + '/login' })
            })

            const data = await res.json()

            if (data.url) {
                window.location.href = data.url
            } else {
                setError("Failed to initialize login")
            }
        } catch (err) {
            setError("Connection error. Please try again.")
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Lights */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <Card className="w-full max-w-md p-10 text-center relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] border-white/10">
                <div className="mb-8 flex justify-center">
                    <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                        <span className="text-3xl font-bold text-white">J</span>
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-gray-400 mb-8">Sign in to manage your Clawbots</p>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <Button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-[#1DA1F2] hover:bg-[#1a91da] text-white py-4 shadow-[0_0_20px_rgba(29,161,242,0.3)] border-none group relative"
                >
                    {loading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <>
                            <Twitter className="mr-2 group-hover:scale-110 transition-transform" /> Sign in with Twitter
                        </>
                    )}
                </Button>
            </Card>

            <p className="absolute bottom-8 text-xs text-gray-500 text-center w-full">
                By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
        </div>
    )
}
