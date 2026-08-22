import { redirect } from "next/navigation"

export default function AuthPageRedirect() {
  redirect("/auth/login")
}
