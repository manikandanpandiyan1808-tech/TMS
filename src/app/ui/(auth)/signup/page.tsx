"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CreateAccountPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: name.trim(), 
          email: email.trim(), 
          password,
          role: "customer" // Defaults to "customer" (use "CUSTOMER" if your schema requires uppercase)
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Could not create your account. Please try again.")
        return
      }

      router.push("/ui/login?created=1")
    } catch {
      setError("Could not connect to the server. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-2">
      <main className="flex items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-sm">
          <div className="mb-6 flex justify-center">
            <img src="/images/logo.png" alt="Game On logo" className="size-16 rounded-md object-cover shadow-sm" />
          </div>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create your account</h1>
            <p className="mt-2 text-sm text-slate-500">Create an account to start booking your turf.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p>}

            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" name="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required className="h-11" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required className="h-11" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={8} placeholder="At least 8 characters" required className="h-11 pr-11" />
                <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-500 hover:text-slate-700">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                minLength={8}
                placeholder="Re-enter your password"
                required
                className="h-11"
              />
            </div>

            <Button type="submit" disabled={loading} className="h-11 w-full font-semibold text-white">
              {loading ? "Creating account…" : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account? <Link href="/ui/login" className="font-semibold text-primary underline underline-offset-4">Log in</Link>
          </p>
        </div>
      </main>

      <aside className="relative hidden items-center justify-center overflow-hidden bg-primary px-16 py-12 lg:flex">
        <div className="absolute inset-0 bg-[url('/images/login.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-secondary/40" />
        <div className="relative z-10 max-w-md text-center text-white">
          <h2 className="text-5xl font-black tracking-tight">Join the<br />movement</h2>
          <p className="mt-5 text-lg text-white/80">Create your account and secure your next game.</p>
        </div>
      </aside>
    </div>
  )
}