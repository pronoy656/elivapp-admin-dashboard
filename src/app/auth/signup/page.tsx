"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

export default function SignUpPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/auth/verify-otp")
    }, 500)
  }

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Create an account</h1>
        <p className="text-sm text-[#94A3B8]">Get started with elivapp admin console</p>
      </div>

      {/* SignUp Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">
            FULL NAME
          </label>
          <Input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="h-12 bg-[#042850] border-[#0A355C] text-white text-sm placeholder:text-[#64748B] rounded-xl px-4 focus-visible:ring-1 focus-visible:ring-[#C7F556]"
          />
        </div>

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
            placeholder="name@company.com"
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
              placeholder="Create strong password"
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

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">
            CONFIRM PASSWORD
          </label>
          <Input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            className="h-12 bg-[#042850] border-[#0A355C] text-white text-sm placeholder:text-[#64748B] rounded-xl px-4 focus-visible:ring-1 focus-visible:ring-[#C7F556]"
          />
        </div>

        {/* Agree Terms Checkbox */}
        <div className="flex items-center gap-2.5 my-1">
          <input
            type="checkbox"
            required
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="h-4 w-4 rounded border-[#0A355C] bg-[#042850] text-[#C7F556] focus:ring-[#C7F556] accent-[#C7F556] cursor-pointer"
          />
          <span className="text-xs text-[#94A3B8]">
            I agree to the <span className="text-white hover:underline cursor-pointer">Terms of Service</span> & <span className="text-white hover:underline cursor-pointer">Privacy Policy</span>
          </span>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="h-12 w-full bg-[#C7F556] hover:bg-[#bce65c] text-[#00152B] font-semibold text-sm rounded-2xl shadow-sm transition-all cursor-pointer mt-1"
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#0A355C]/70" />
        </div>
        <span className="relative bg-[#00152B] px-3 text-xs text-[#64748B]">or</span>
      </div>

      {/* Already Have Account Link */}
      <Link href="/auth/login" className="w-full">
        <Button
          type="button"
          variant="outline"
          className="h-12 w-full border border-[#0A355C] bg-transparent text-white font-semibold text-sm hover:bg-[#0A355C] rounded-2xl transition-all cursor-pointer"
        >
          Already have an account? Sign in
        </Button>
      </Link>
    </div>
  )
}
