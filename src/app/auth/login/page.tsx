"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, CheckCircle2 } from "lucide-react"

function LoginSuccessBanner() {
  const searchParams = useSearchParams()
  const isResetSuccess = searchParams.get("reset") === "success"

  if (!isResetSuccess) return null

  return (
    <div className="flex items-center gap-3 bg-[#C7F556]/15 border border-[#C7F556]/40 p-4 rounded-2xl mb-6 text-xs text-[#C7F556] font-medium">
      <CheckCircle2 className="h-5 w-5 shrink-0" />
      <span>Password reset successfully! Please sign in with your new password.</span>
    </div>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 500)
  }

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-300">
      {/* Success Notification Banner wrapped in Suspense */}
      <Suspense fallback={null}>
        <LoginSuccessBanner />
      </Suspense>

      {/* Header */}
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Welcome back</h1>
        <p className="text-sm text-[#94A3B8]">Sign in to the elivapp admin console</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Email Field */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">
            EMAIL
          </label>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="h-12 bg-[#042850] border-[#0A355C] text-white text-sm placeholder:text-[#64748B] rounded-xl px-4 focus-visible:ring-1 focus-visible:ring-[#C7F556]"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">
            PASSWORD
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="h-12 bg-[#042850] border-[#0A355C] text-white text-sm placeholder:text-[#64748B] rounded-xl pl-4 pr-11 focus-visible:ring-1 focus-visible:ring-[#C7F556]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-center justify-between mt-1 mb-2">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-[#0A355C] bg-[#042850] text-[#C7F556] focus:ring-[#C7F556] accent-[#C7F556]"
            />
            <span className="text-xs text-[#94A3B8] font-medium">Remember me</span>
          </label>

          <Link
            href="/auth/forgot-password"
            className="text-xs font-semibold text-[#C7F556] hover:underline transition-all"
          >
            Forgot password?
          </Link>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="h-12 w-full bg-[#C7F556] hover:bg-[#bce65c] text-[#00152B] font-semibold text-sm rounded-2xl shadow-sm transition-all cursor-pointer"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  )
}
