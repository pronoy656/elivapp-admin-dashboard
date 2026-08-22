"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function VerifyOtpPage() {
  const router = useRouter()
  const [otp, setOtp] = useState(["", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1]
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/auth/reset-password")
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
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Verification Code</h1>
        <p className="text-sm text-[#94A3B8]">
          Enter the 4-digit code sent to your registered email
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* OTP Input Boxes */}
        <div className="flex items-center justify-between gap-3 my-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={inputRefs[idx]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-16 h-16 text-center text-2xl font-bold bg-[#042850] border border-[#0A355C] text-white rounded-2xl focus:outline-none focus:border-[#C7F556] focus:ring-1 focus:ring-[#C7F556] transition-all"
            />
          ))}
        </div>

        <Button
          type="submit"
          disabled={isLoading || otp.some((d) => !d)}
          className="h-12 w-full bg-[#C7F556] hover:bg-[#bce65c] text-[#00152B] font-semibold text-sm rounded-2xl shadow-sm transition-all cursor-pointer"
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </Button>

        <div className="flex items-center justify-center gap-1.5 text-xs text-[#94A3B8]">
          <span>Didn't receive the code?</span>
          <button type="button" className="text-[#C7F556] font-semibold hover:underline cursor-pointer">
            Resend
          </button>
        </div>
      </form>
    </div>
  )
}
