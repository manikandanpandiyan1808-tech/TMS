"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function GameOnLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Check role and redirect accordingly
                const userRole = data.role?.toLowerCase();

                if (userRole === "admin") {
                    router.push("/ui/admin");
                } else if (userRole === "customer") {
                    // Customers land on the booking page
                    router.push("/ui/booking");
                } else {
                    // Fallback route if role is unexpected
                    router.push("/ui");
                }
            } else {
                setError(data.error || "Invalid credentials");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-white">
            {/* LEFT: Form */}
            <main className="flex items-center justify-center px-6 py-12 sm:px-12">
                <div className="w-full max-w-sm text-center">
                    <div className="flex items-center justify-center ">
                        <img src="/images/logo.png" alt="Game On logo" className="h-20 w-20 rounded-md object-cover shadow-sm bg-slate-100" />
                    </div>

                    <div className="mt-6 mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h1>
                        <p className="mt-2 text-sm text-slate-500">Enter your details to log in to your account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5 text-left">
                        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
                        
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="player@example.com"
                                className="h-11 border-slate-200 focus-visible:ring-2 focus-visible:ring-primary"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
                                <a href="#" className="text-sm font-medium text-primary hover:underline underline-offset-4">Forgot password?</a>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="h-11 border-slate-200 focus-visible:ring-2 focus-visible:ring-primary"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-11 w-full bg-primary text-base font-semibold text-white shadow-md shadow-primary/25 transition hover:opacity-90"
                        >
                            {loading ? "Logging in..." : "Log in"}
                        </Button>
                    </form>

                    <p className="mt-8 text-sm text-slate-600">
                        Don&apos;t have an account?{" "}
                        <Link href="/ui/signup" className="font-semibold text-primary underline underline-offset-4">Sign up</Link>
                    </p>
                </div>
            </main>

            {/* RIGHT: Visual panel */}
            <aside className="relative hidden lg:flex items-center justify-center overflow-hidden bg-primary px-16 py-12">
                <div className="absolute inset-0 bg-[url('/images/login.webp')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-secondary/40" />

                <div className="relative z-10 w-full max-w-md text-center text-white">
                    <h2 className="text-5xl font-black leading-[1.1] tracking-tight">
                        Play with<br />limitless power
                    </h2>
                    <p className="mx-auto mt-5 max-w-sm text-lg leading-relaxed text-white/80">
                        Track your stats, compete with friends, and climb the leaderboard.
                    </p>

                    <div className="mx-auto mt-10 flex max-w-sm items-center justify-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5 text-left backdrop-blur-md">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white font-bold text-primary">★</div>
                        <div>
                            <p className="font-semibold">Elite membership</p>
                            <p className="text-sm text-white/70">Unlock all premium features today</p>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}