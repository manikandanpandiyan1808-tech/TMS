import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    Car,
    Check,
    CheckCircle2,
    ChevronDown,
    Clock,
    CreditCard,
    Droplets,
    Flame,
    HeartPulse,
    Mail,
    MapPin,
    Moon,
    PersonStanding,
    Phone,
    Quote,
    ShieldCheck,
    Sparkles,
    Star,
    Sun,
    Ticket,
    Zap,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── LAYOUT ───────────────────────────────────────────────────────────────────

/** Shared page gutter so the header and every section line up on the same edges. */
const container = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

/** One vertical rhythm for every section, so the gaps between blocks stay equal. */
const sectionY = "py-12 sm:py-16 lg:py-20";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const STATS = [
    { value: "1", label: "FIFA-grade pitch" },
    { value: "24/7", label: "Slots every hour" },
    { value: "4.8/5", label: "Player rating" },
    { value: "2k+", label: "Matches hosted" },
];

const FEATURES = [
    {
        icon: Zap,
        title: "Open 24/7, floodlit",
        copy: "High-lux LED lights keep every corner bright — day or night, whenever you kick off.",
    },
    {
        icon: ShieldCheck,
        title: "FIFA-grade turf",
        copy: "A true, consistent bounce on premium astroturf — built for fast, technical football.",
    },
    {
        icon: Droplets,
        title: "Showers & lockers",
        copy: "Fresh changing rooms, hot showers and secure lockers so you can head out after.",
    },
    {
        icon: Car,
        title: "Free parking",
        copy: "Dedicated car and bike parking right at the gate. No circling the block.",
    },
    {
        icon: HeartPulse,
        title: "First aid on site",
        copy: "A stocked medical kit and trained staff are always a whistle away.",
    },
    {
        icon: Ticket,
        title: "Instant confirmation",
        copy: "Book, pay and get your match pass in seconds. No calls, no waiting.",
    },
];

const STEPS = [
    {
        icon: CalendarDays,
        title: "Pick your date",
        copy: "See live availability for the next ten days and choose the day that suits your squad.",
    },
    {
        icon: Clock,
        title: "Choose your hour",
        copy: "Tap one or more 60-minute slots. Off-peak and floodlit pricing is shown upfront.",
    },
    {
        icon: CreditCard,
        title: "Pay & play",
        copy: "Pay in full or just 25% today. Your match pass arrives instantly by SMS and email.",
    },
];

const PLANS = [
    {
        name: "Off-peak",
        price: 750,
        icon: Sun,
        tagline: "Weekday mornings & afternoons",
        features: [
            "60-minute pitch slot",
            "Free cancellation up to 4 hrs",
            "Showers & lockers included",
            "Free car & bike parking",
        ],
        featured: false,
    },
    {
        name: "Floodlit peak",
        price: 850,
        icon: Moon,
        tagline: "Every night, 6 PM onwards",
        features: [
            "60-minute pitch slot",
            "Free cancellation up to 4 hrs",
            "High-lux LED floodlights",
            "Showers & lockers included",
        ],
        featured: true,
    },
];

const TESTIMONIALS = [
    {
        quote:
            "Best turf in the neighbourhood. The lights are unreal and the surface is always in perfect shape.",
        name: "Arjun Mehta",
        meta: "Plays every Wednesday",
        initials: "AM",
        color: "from-emerald-500 to-teal-600",
    },
    {
        quote:
            "Booked a 7 PM slot on the way home. The confirmation came through before I reached the gate.",
        name: "Rhea Kapoor",
        meta: "Box cricket regular",
        initials: "RK",
        color: "from-amber-400 to-orange-500",
    },
    {
        quote:
            "Clean changing rooms, easy parking, and staff who actually care about the game. Our team's home turf now.",
        name: "Sameer Patel",
        meta: "Team captain, FC Tiruchengode",
        initials: "SP",
        color: "from-sky-500 to-indigo-600",
    },
];

const FAQS = [
    {
        q: "How do I book a slot?",
        a: "Choose a date and time on the booking page, select one or more hourly slots, and pay online. Your match pass is sent instantly by SMS and email.",
    },
    {
        q: "Can I cancel or reschedule?",
        a: "Yes. You can cancel free of charge up to 4 hours before your slot starts. Inside 4 hours, the booking is non-refundable.",
    },
    {
        q: "What footwear should we bring?",
        a: "Moulded rubber studs or turf trainers only. Metal spikes are strictly prohibited to protect the playing surface.",
    },
    {
        q: "Is parking available?",
        a: "Free car and bike parking is available at the venue. Arrive 10 minutes early so you have time to warm up and check in.",
    },
    {
        q: "Do you provide equipment?",
        a: "The pitch and match ball are included. Bibs and a certified referee can be arranged at the venue — just ask the front desk.",
    },
];

const inr = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
    return (
        <div className="min-h-screen scroll-smooth bg-[#f7f8f6] text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
            {/* ─── NAV ─── */}
            <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
                <div className={cn(container, "flex h-16 items-center justify-between gap-2")}>
                    <Link href="/ui" className="flex items-center gap-2.5">
                        <span className="relative h-9 w-9 overflow-hidden rounded-xl bg-slate-950 ring-1 ring-slate-900/10">
                            <Image
                                src="/images/logo.png"
                                alt="Game On turf club"
                                fill
                                sizes="36px"
                                priority
                                className="object-cover"
                            />
                        </span>
                        <span className="flex flex-col leading-none">
                            <span className="text-sm font-black tracking-[0.18em] text-slate-900 dark:text-white">
                                GAME ON
                            </span>
                            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                Cricket &amp; Football Turf
                            </span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-1.5">
                        <nav className="hidden items-center gap-0.5 md:flex">
                            {[
                                { label: "Facilities", href: "#facilities" },
                                { label: "How it works", href: "#how-it-works" },
                                { label: "Pricing", href: "#pricing" },
                                { label: "FAQ", href: "#faq" },
                            ].map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="rounded-full px-3 py-1.5 text-[11px] font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                        <Link
                            href="/ui/login"
                            className={cn(
                                buttonVariants({ size: "sm" }),
                                "h-9 gap-1.5 rounded-xl bg-emerald-600 px-3.5 text-xs font-bold text-white shadow-sm shadow-emerald-600/20 hover:bg-emerald-700"
                            )}
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                {/* ─── HERO ─── */}
                <section className="relative overflow-hidden bg-[#06130e] text-white">
                    <div aria-hidden className="pointer-events-none absolute inset-0">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.32),transparent_55%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(52,211,153,0.12),transparent_50%)]" />
                        <svg
                            className="absolute -left-40 top-1/2 h-[620px] w-[620px] -translate-y-1/2 text-white/[0.045]"
                            viewBox="0 0 400 400"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect x="8" y="8" width="384" height="384" stroke="currentColor" strokeWidth="2" />
                            <line x1="200" y1="8" x2="200" y2="392" stroke="currentColor" strokeWidth="2" />
                            <circle cx="200" cy="200" r="62" stroke="currentColor" strokeWidth="2" />
                            <circle cx="200" cy="200" r="4" fill="currentColor" />
                            <rect x="8" y="110" width="46" height="180" stroke="currentColor" strokeWidth="2" />
                            <rect x="346" y="110" width="46" height="180" stroke="currentColor" strokeWidth="2" />
                        </svg>
                        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
                    </div>

                    <div
                        className={cn(
                            container,
                            "relative grid items-center gap-12 pb-20 pt-12 lg:grid-cols-[1.07fr_0.93fr] lg:gap-14 lg:pb-28 lg:pt-16"
                        )}
                    >
                        {/* Copy */}
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                    </span>
                                    Open now
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-white/65">
                                    <Sparkles className="h-3 w-3 text-lime-300" />
                                    Tiruchengode&apos;s premium turf
                                </span>
                            </div>

                            <h1 className="mt-6 text-4xl font-black leading-[0.98] tracking-tight text-balance sm:text-5xl lg:text-[clamp(2.75rem,5.6vw,4.5rem)]">
                                Own the pitch.
                                <span className="mt-1 block text-lime-300">Book in seconds.</span>
                            </h1>

                            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                                FIFA-grade five-a-side football in the heart of Tiruchengode. Floodlit
                                nights, free parking and instant confirmation — all from your phone.
                            </p>

                            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                                <Link
                                    href="/ui/booking"
                                    className={cn(
                                        buttonVariants({ size: "lg" }),
                                        "h-12 gap-2 rounded-xl bg-lime-300 px-6 text-sm font-bold text-emerald-950 shadow-xl shadow-lime-300/10 transition hover:bg-lime-200"
                                    )}
                                >
                                    Book a slot
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <a
                                    href="#pricing"
                                    className={cn(
                                        buttonVariants({ variant: "outline", size: "lg" }),
                                        "h-12 gap-2 rounded-xl border-white/15 bg-white/[0.04] px-6 text-sm font-semibold text-white hover:bg-white/10 hover:text-white dark:border-white/15 dark:bg-white/[0.04] dark:hover:bg-white/10"
                                    )}
                                >
                                    See pricing
                                </a>
                            </div>

                            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-white/50">
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                                    Palani Andavar Kovil Thottam, Seetharampalayam, Tiruchengode
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5 text-emerald-400" />
                                    Available 24/7
                                </span>
                            </div>
                        </div>

                        {/* Image card */}
                        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/10 shadow-2xl shadow-black/40">
                                <Image
                                    src="/images/image.png"
                                    alt="The turf at Green Valley Arena, lit by the evening sun"
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 560px"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#04110b] via-[#04110b]/25 to-transparent" />

                                <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[10px] font-semibold text-white/85 backdrop-blur-md">
                                    <ShieldCheck className="h-3 w-3 text-emerald-400" />
                                    FIFA-grade astroturf
                                </span>

                                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur-md">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div>
                                            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/45">
                                                Available 24/7
                                            </p>
                                            <p className="mt-1 text-sm font-bold">slots open now </p>
                                        </div>
                                        <span className="rounded-full bg-lime-300 px-2.5 py-1 text-[10px] font-bold text-emerald-950">
                                            From ₹750/hr
                                        </span>
                                    </div>
                                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15">
                                        <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-emerald-400 to-lime-300" />
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -bottom-3 right-3 hidden items-center gap-2 rounded-2xl border border-white/10 bg-[#0a2118]/90 px-3 py-2 shadow-xl backdrop-blur sm:flex">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                <span className="text-[10px] font-semibold text-white/80">
                                    Instant confirmation
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── STATS ─── */}
                <div className={cn(container, "relative z-10 -mt-9")}>
                    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-200/70 shadow-xl shadow-slate-900/5 sm:grid-cols-4">
                        {STATS.map((stat) => (
                            <div
                                key={stat.label}
                                className="bg-white px-5 py-5 text-center dark:bg-slate-900"
                            >
                                <p className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                                    {stat.value}
                                </p>
                                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── FEATURES ─── */}
                <section id="facilities" className={cn(container, "scroll-mt-24", sectionY)}>
                    <div className="max-w-2xl">
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
                            The venue
                        </p>
                        <h2 className="mt-2 text-3xl font-black tracking-tight text-balance sm:text-4xl">
                            Everything you need for a great game.
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                            From the first whistle to the last, the details are handled. Turn up,
                            play, and head home fresh.
                        </p>
                    </div>

                    <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {FEATURES.map((feature) => (
                            <div
                                key={feature.title}
                                className="group rounded-2xl border border-slate-200/80 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800"
                            >
                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-950/40 dark:text-emerald-400">
                                    <feature.icon className="h-5 w-5" />
                                </span>
                                <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
                                    {feature.title}
                                </h3>
                                <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                    {feature.copy}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ─── NIGHT GAMES ─── */}
                <section className={cn(container, sectionY)}>
                    <div className="grid overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-2">
                        <div className="relative min-h-[320px] overflow-hidden lg:min-h-[420px]">
                            <Image
                                src="/images/dashboard.png"
                                alt="Floodlit turf ready for an evening match"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover object-[center_65%]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#04110b]/85 via-[#04110b]/10 to-transparent" />
                            <div className="absolute bottom-5 left-5">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md">
                                    <Moon className="h-3 w-3 text-lime-300" />
                                    Floodlit all night
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
                                After dark
                            </p>
                            <h2 className="mt-2 text-3xl font-black tracking-tight text-balance sm:text-4xl">
                                Night games hit different.
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                The sun drops, the lights come on, and the pitch gets faster. Book the
                                late slot, bring your squad, and play under the brightest lights in the
                                neighbourhood.
                            </p>

                            <ul className="mt-5 space-y-2.5">
                                {[
                                    "High-lux LED floodlights across the full pitch",
                                    "Cooler evenings and quicker, sharper football",
                                    "Kick-offs any hour, day or night",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2 text-xs font-medium text-slate-600 dark:text-slate-300"
                                    >
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/ui/booking"
                                className={cn(
                                    buttonVariants({ size: "lg" }),
                                    "mt-6 h-11 w-fit gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700"
                                )}
                            >
                                Book an evening slot
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ─── HOW IT WORKS ─── */}
                <section
                    id="how-it-works"
                    className={cn(
                        "scroll-mt-24 border-y border-slate-200/70 bg-white dark:border-slate-800 dark:bg-slate-900",
                        sectionY
                    )}
                >
                    <div className={container}>
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                            <div className="max-w-xl">
                                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
                                    How it works
                                </p>
                                <h2 className="mt-2 text-3xl font-black tracking-tight text-balance sm:text-4xl">
                                    From tap to kick-off in three steps.
                                </h2>
                            </div>
                            <Link
                                href="/ui/booking"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 transition hover:text-emerald-800 dark:text-emerald-400"
                            >
                                Start a booking
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>

                        <div className="mt-9 grid gap-4 lg:grid-cols-3">
                            {STEPS.map((step, index) => (
                                <div
                                    key={step.title}
                                    className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-[#fbfcfa] p-6 dark:border-slate-800 dark:bg-slate-950/40"
                                >
                                    <span
                                        aria-hidden
                                        className="pointer-events-none absolute -right-1 -top-4 text-[76px] font-black leading-none text-slate-900/[0.035] dark:text-white/[0.04]"
                                    >
                                        0{index + 1}
                                    </span>
                                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/25">
                                        <step.icon className="h-5 w-5" />
                                    </span>
                                    <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
                                        Step {index + 1}
                                    </p>
                                    <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                                        {step.title}
                                    </h3>
                                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                        {step.copy}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── PRICING ─── */}
                <section id="pricing" className={cn(container, "scroll-mt-24", sectionY)}>
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
                            Pricing
                        </p>
                        <h2 className="mt-2 text-3xl font-black tracking-tight text-balance sm:text-4xl">
                            Simple rates. No surprises.
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                            Every booking is a full 60-minute slot. Pay in full or reserve with 25%
                            today.
                        </p>
                    </div>

                    <div className="mx-auto mt-9 grid max-w-4xl gap-4 md:grid-cols-2">
                        {PLANS.map((plan) => (
                            <div
                                key={plan.name}
                                className={cn(
                                    "relative overflow-hidden rounded-3xl border p-6 sm:p-7",
                                    plan.featured
                                        ? "border-emerald-900/10 bg-gradient-to-br from-[#071a12] to-[#0d2b1e] text-white shadow-2xl shadow-emerald-950/20"
                                        : "border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                )}
                            >
                                {plan.featured && (
                                    <span className="absolute right-5 top-5 rounded-full bg-lime-300 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-emerald-950">
                                        Most booked
                                    </span>
                                )}

                                <span
                                    className={cn(
                                        "grid h-10 w-10 place-items-center rounded-xl",
                                        plan.featured
                                            ? "bg-white/10 text-lime-300"
                                            : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                                    )}
                                >
                                    <plan.icon className="h-5 w-5" />
                                </span>

                                <h3
                                    className={cn(
                                        "mt-4 text-sm font-bold",
                                        plan.featured ? "text-white" : "text-slate-900 dark:text-white"
                                    )}
                                >
                                    {plan.name}
                                </h3>
                                <p
                                    className={cn(
                                        "mt-0.5 text-[11px]",
                                        plan.featured ? "text-white/50" : "text-slate-500 dark:text-slate-400"
                                    )}
                                >
                                    {plan.tagline}
                                </p>

                                <div className="mt-5 flex items-end gap-1">
                                    <span className="text-4xl font-black leading-none tracking-tight">
                                        {inr(plan.price)}
                                    </span>
                                    <span
                                        className={cn(
                                            "pb-0.5 text-xs",
                                            plan.featured ? "text-white/45" : "text-slate-400"
                                        )}
                                    >
                                        / hour
                                    </span>
                                </div>

                                <div
                                    className={cn(
                                        "my-5 h-px",
                                        plan.featured ? "bg-white/10" : "bg-slate-100 dark:bg-slate-800"
                                    )}
                                />

                                <ul className="space-y-2.5">
                                    {plan.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className={cn(
                                                "flex items-start gap-2 text-xs",
                                                plan.featured
                                                    ? "text-white/70"
                                                    : "text-slate-600 dark:text-slate-300"
                                            )}
                                        >
                                            <Check
                                                className={cn(
                                                    "mt-0.5 h-3.5 w-3.5 shrink-0",
                                                    plan.featured ? "text-lime-300" : "text-emerald-600"
                                                )}
                                                strokeWidth={3}
                                            />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/ui/booking"
                                    className={cn(
                                        buttonVariants({ size: "lg" }),
                                        "mt-6 h-11 w-full rounded-xl text-sm font-bold",
                                        plan.featured
                                            ? "bg-lime-300 text-emerald-950 hover:bg-lime-200"
                                            : "bg-emerald-600 text-white hover:bg-emerald-700"
                                    )}
                                >
                                    Book this slot
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        ))}
                    </div>

                    <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[10px] text-slate-400">
                        <Flame className="h-3 w-3 text-amber-500" />
                        A ₹49 convenience fee applies per booking. Free cancellation up to 4 hours
                        before your slot.
                    </p>
                </section>

                {/* ─── TESTIMONIALS ─── */}
                <section
                    className={cn(
                        "border-y border-slate-200/70 bg-white dark:border-slate-800 dark:bg-slate-900",
                        sectionY
                    )}
                >
                    <div className={container}>
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                            <div className="max-w-xl">
                                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
                                    From the pitch
                                </p>
                                <h2 className="mt-2 text-3xl font-black tracking-tight text-balance sm:text-4xl">
                                    Players keep coming back.
                                </h2>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="flex">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <Star
                                            key={index}
                                            className="h-4 w-4 fill-amber-400 text-amber-400"
                                        />
                                    ))}
                                </div>
                                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                    4.8 from 142 reviews
                                </span>
                            </div>
                        </div>

                        <div className="mt-9 grid gap-4 md:grid-cols-3">
                            {TESTIMONIALS.map((testimonial) => (
                                <figure
                                    key={testimonial.name}
                                    className="flex flex-col rounded-2xl border border-slate-200/80 bg-[#fbfcfa] p-6 dark:border-slate-800 dark:bg-slate-950/40"
                                >
                                    <Quote className="h-6 w-6 text-emerald-600/30" />
                                    <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                        “{testimonial.quote}”
                                    </blockquote>
                                    <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                                        <span
                                            className={cn(
                                                "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white",
                                                testimonial.color
                                            )}
                                        >
                                            {testimonial.initials}
                                        </span>
                                        <div>
                                            <p className="text-xs font-bold text-slate-900 dark:text-white">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-[10px] text-slate-400">{testimonial.meta}</p>
                                        </div>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── FAQ ─── */}
                <section id="faq" className={cn(container, "scroll-mt-24", sectionY)}>
                    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
                                Questions
                            </p>
                            <h2 className="mt-2 text-3xl font-black tracking-tight text-balance sm:text-4xl">
                                Good to know before you play.
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                                Still stuck? Call the venue and a real human will pick up.
                            </p>
                            <a
                                href="tel:+919876543210"
                                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                            >
                                <Phone className="h-3.5 w-3.5 text-emerald-600" />
                                +91 96558 68785
                            </a>
                        </div>

                        <div className="space-y-2.5">
                            {FAQS.map((faq, index) => (
                                <details
                                    key={faq.q}
                                    open={index === 0}
                                    className="group rounded-2xl border border-slate-200/80 bg-white px-5 py-4 transition open:border-emerald-200 open:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:open:border-emerald-900"
                                >
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-slate-900 marker:content-none dark:text-white [&::-webkit-details-marker]:hidden">
                                        {faq.q}
                                        <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-180 group-open:text-emerald-600" />
                                    </summary>
                                    <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                        {faq.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── FINAL CTA ─── */}
                <section className={cn(container, sectionY)}>
                    <div className="relative overflow-hidden rounded-[32px] bg-[#06130e] px-6 py-14 text-center text-white sm:px-12 lg:py-20">
                        <div aria-hidden className="pointer-events-none absolute inset-0">
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.28),transparent_60%)]" />
                            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
                            <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10" />
                            <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full border border-white/10" />
                        </div>

                        <div className="relative mx-auto max-w-2xl">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold text-white/65">
                                <Sparkles className="h-3 w-3 text-lime-300" />
                                Ready when you are
                            </span>
                            <h2 className="mt-4 text-4xl font-black tracking-tight text-balance sm:text-5xl">
                                Your pitch is waiting.
                            </h2>
                            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/55">
                                Grab your squad, pick an hour, and we&apos;ll take care of the rest.
                                Tonight&apos;s slots are filling fast.
                            </p>

                            <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
                                <Link
                                    href="/ui/booking"
                                    className={cn(
                                        buttonVariants({ size: "lg" }),
                                        "h-12 gap-2 rounded-xl bg-lime-300 px-6 text-sm font-bold text-emerald-950 shadow-xl shadow-lime-300/10 hover:bg-lime-200"
                                    )}
                                >
                                    Book a slot
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <a
                                    href="tel:+919876543210"
                                    className={cn(
                                        buttonVariants({ variant: "outline", size: "lg" }),
                                        "h-12 gap-2 rounded-xl border-white/15 bg-white/[0.04] px-6 text-sm font-semibold text-white hover:bg-white/10 hover:text-white dark:border-white/15 dark:bg-white/[0.04] dark:hover:bg-white/10"
                                    )}
                                >
                                    <Phone className="h-4 w-4" />
                                    Call the venue
                                </a>
                            </div>

                            <p className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-white/35">
                                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                                Free cancellation up to 4 hours before your slot
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* ─── FOOTER ─── */}
            <footer className="border-t border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950">
                <div className={cn(container, "py-12 lg:py-14")}>
                    <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
                        <div>
                            <div className="flex items-center gap-2.5">
                                <span className="relative h-10 w-10 overflow-hidden rounded-xl bg-slate-950 ring-1 ring-slate-900/10">
                                    <Image
                                        src="/images/logo.png"
                                        alt="Game On turf club"
                                        fill
                                        sizes="40px"
                                        className="object-cover"
                                    />
                                </span>
                                <span className="flex flex-col leading-none">
                                    <span className="text-sm font-black tracking-[0.18em] text-slate-900 dark:text-white">
                                        GAME ON
                                    </span>
                                    <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                        Cricket &amp; Football Turf
                                    </span>
                                </span>
                            </div>
                            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                A premium five-a-side football turf in Tiruchengode. Floodlit nights,
                                FIFA-grade surface and bookings that take seconds.
                            </p>
                            <p className="mt-4 flex items-start gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                                Palani Andavar Kovil Thottam, Seetharampalayam, Tiruchengode
                            </p>
                        </div>

                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                                Explore
                            </p>
                            <ul className="mt-4 space-y-2.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                                {[
                                    { label: "Book a slot", href: "/ui/booking" },
                                    { label: "Facilities", href: "#facilities" },
                                    { label: "Pricing", href: "#pricing" },
                                    { label: "FAQ", href: "#faq" },
                                ].map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="transition hover:text-emerald-700 dark:hover:text-emerald-400"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                                Get in touch
                            </p>
                            <ul className="mt-4 space-y-2.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                                <li>
                                    <a
                                        href="tel:+919876543210"
                                        className="flex items-center gap-2 transition hover:text-emerald-700 dark:hover:text-emerald-400"
                                    >
                                        <Phone className="h-3.5 w-3.5 text-emerald-600" />
                                        +91 96558 68785
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="mailto:play@gameon.turf"
                                        className="flex items-center gap-2 transition hover:text-emerald-700 dark:hover:text-emerald-400"
                                    >
                                        <Mail className="h-3.5 w-3.5 text-emerald-600" />
                                        play@gameon.turf
                                    </a>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Clock className="h-3.5 w-3.5 text-emerald-600" />
                                    Open 24/7, every day
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col justify-between gap-2 border-t border-slate-100 pt-5 text-[10px] text-slate-400 dark:border-slate-800 sm:flex-row">
                        <p>© {new Date().getFullYear()} Game On Turf Club. All rights reserved.</p>
                        <p className="flex items-center gap-1">
                            Built for players, by players
                            <span className="text-emerald-500">·</span>
                            Tiruchengode, Namakkal, Tamil Nadu
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
