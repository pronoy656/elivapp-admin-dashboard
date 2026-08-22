"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 500)
  }

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-300">
      {/* Back Link */}
      <Link
        href="/auth/login"
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#94A3B8] hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to sign in</span>
      </Link>

      {/* Header */}
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Reset password</h1>
        <p className="text-sm text-[#94A3B8]">
          Enter your email to receive a password reset verification link
        </p>
      </div>

      {isSubmitted ? (
        <div className="flex flex-col gap-6 bg-[#042850] border border-[#0A355C] rounded-2xl p-6 text-center">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-white">Reset link sent!</h3>
            <p className="text-xs text-[#94A3B8]">
              We have sent a password reset instruction link to <span className="text-[#C7F556] font-medium">{email}</span>.
            </p>
          </div>
          <Button
            type="button"
            onClick={() => router.push("/auth/verify-otp")}
            className="h-12 w-full bg-[#C7F556] hover:bg-[#bce65c] text-[#00152B] font-semibold text-sm rounded-2xl transition-all cursor-pointer"
          >
            Enter Verification Code
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full bg-[#C7F556] hover:bg-[#bce65c] text-[#00152B] font-semibold text-sm rounded-2xl shadow-sm transition-all cursor-pointer mt-2"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      )}
    </div>
  )
}
