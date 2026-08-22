"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/auth/login?reset=success")
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
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Set new password</h1>
        <p className="text-sm text-[#94A3B8]">
          Your new password must be different from previously used passwords
        </p>
      </div>

      {isSuccess ? (
        <div className="flex flex-col gap-6 bg-[#042850] border border-[#0A355C] rounded-2xl p-6 text-center items-center">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#C7F556]/15 text-[#C7F556]">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-lg font-semibold text-white">Password reset complete</h3>
            <p className="text-xs text-[#94A3B8]">
              Your password has been successfully updated. You can now sign in with your new password.
            </p>
          </div>
          <Button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="h-12 w-full bg-[#C7F556] hover:bg-[#bce65c] text-[#00152B] font-semibold text-sm rounded-2xl transition-all cursor-pointer"
          >
            Sign in now
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* New Password Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">
              NEW PASSWORD
            </label>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="h-12 bg-[#042850] border-[#0A355C] text-white text-sm placeholder:text-[#64748B] rounded-xl pl-4 pr-11 focus-visible:ring-1 focus-visible:ring-[#C7F556]"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider">
              CONFIRM PASSWORD
            </label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="h-12 bg-[#042850] border-[#0A355C] text-white text-sm placeholder:text-[#64748B] rounded-xl pl-4 pr-11 focus-visible:ring-1 focus-visible:ring-[#C7F556]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full bg-[#C7F556] hover:bg-[#bce65c] text-[#00152B] font-semibold text-sm rounded-2xl shadow-sm transition-all cursor-pointer mt-3"
          >
            {isLoading ? "Resetting password..." : "Reset Password"}
          </Button>
        </form>
      )}
    </div>
  )
}
