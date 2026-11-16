"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { addDays, format, isSameDay } from "date-fns";
import {
  ArrowRight,
  CalendarDays,
  Car,
  Check,
  Clock,
  CreditCard,
  Droplets,
  Flame,
  Heart,
  HeartPulse,
  Info,
  Lightbulb,
  Lock,
  MapPin,
  Moon,
  Navigation2,
  ShieldCheck,
  Sparkles,
  Sun,
  Sunset,
  Ticket,
  Wallet,
  Zap,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Header from "@/components/global/header";
import { cn } from "@/lib/utils";

// ─── LAYOUT ───────────────────────────────────────────────────────────────────

/** Shared page gutter so the header and every section line up on the same edges. */
const container = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

// ─── TYPES & DATA ─────────────────────────────────────────────────────────────

interface Sport {
  name: string;
  icon: string;
  size: string;
}

interface TimeSlot {
  time: string;
  period: "morning" | "afternoon" | "night" | "lateNight";
  booked: boolean;
  isPeak: boolean;
}

type PaymentMode = "full" | "advance";

const TURF_DATA = {
  id: "turf-01",
  name: "Green Valley Arena & Sports Club",
  shortName: "Green Valley Arena",
  location: "Palani Andavar Kovil Thottam, Seetharampalayam, Tiruchengode",
  rating: 4.8,
  reviewsCount: 142,
  sport: { name: "Football & Cricket", icon: "⚽", size: "Pitch A · 100 × 60 ft" } as Sport,
  pricePerHour: 750,
  peakpricePerHour: 850,
  amenities: [
    "FIFA certified astroturf",
    "High-lux LED floodlights",
    "Clean showers & lockers",
    "Free parking (car & bike)",
    "Chilled RO drinking water",
    "First aid & medical kit",
  ],
};

const TIME_SLOTS: TimeSlot[] = [
  { time: "12:00 AM - 01:00 AM", period: "lateNight", booked: false, isPeak: true },
  { time: "01:00 AM - 02:00 AM", period: "lateNight", booked: false, isPeak: true },
  { time: "02:00 AM - 03:00 AM", period: "lateNight", booked: true, isPeak: true },
  { time: "03:00 AM - 04:00 AM", period: "lateNight", booked: false, isPeak: true },
  { time: "04:00 AM - 05:00 AM", period: "lateNight", booked: false, isPeak: true },
  { time: "05:00 AM - 06:00 AM", period: "lateNight", booked: false, isPeak: true },
  { time: "06:00 AM - 07:00 AM", period: "morning", booked: false, isPeak: false },
  { time: "07:00 AM - 08:00 AM", period: "morning", booked: true, isPeak: false },
  { time: "08:00 AM - 09:00 AM", period: "morning", booked: false, isPeak: false },
  { time: "09:00 AM - 10:00 AM", period: "morning", booked: false, isPeak: false },
  { time: "10:00 AM - 11:00 AM", period: "morning", booked: false, isPeak: false },
  { time: "11:00 AM - 12:00 PM", period: "morning", booked: false, isPeak: false },
  { time: "12:00 PM - 01:00 PM", period: "afternoon", booked: false, isPeak: false },
  { time: "01:00 PM - 02:00 PM", period: "afternoon", booked: false, isPeak: false },
  { time: "02:00 PM - 03:00 PM", period: "afternoon", booked: false, isPeak: false },
  { time: "03:00 PM - 04:00 PM", period: "afternoon", booked: false, isPeak: false },
  { time: "04:00 PM - 05:00 PM", period: "afternoon", booked: false, isPeak: false },
  { time: "05:00 PM - 06:00 PM", period: "afternoon", booked: true, isPeak: false },
  { time: "06:00 PM - 07:00 PM", period: "night", booked: false, isPeak: true },
  { time: "07:00 PM - 08:00 PM", period: "night", booked: false, isPeak: true },
  { time: "08:00 PM - 09:00 PM", period: "night", booked: true, isPeak: true },
  { time: "09:00 PM - 10:00 PM", period: "night", booked: false, isPeak: true },
  { time: "10:00 PM - 11:00 PM", period: "night", booked: false, isPeak: true },
  { time: "11:00 PM - 12:00 AM", period: "night", booked: false, isPeak: true },
];

const PERIODS = [
  { key: "morning", label: "Morning", hint: "6 AM – 12 PM", icon: Sun },
  { key: "afternoon", label: "Afternoon", hint: "12 PM – 6 PM", icon: Sunset },
  { key: "night", label: "Evening & night", hint: "6 PM – 12 AM · peak rate", icon: Moon },
  { key: "lateNight", label: "Late night", hint: "12 AM – 6 AM · floodlit", icon: Sparkles },
] as const;

const AMENITY_ICONS = [ShieldCheck, Lightbulb, Lock, Car, Droplets, HeartPulse];

const RULES = [
  "Moulded rubber studs or turf trainers only — no metal spikes.",
  "Arrive 10 minutes early for a smooth check-in.",
  "No food or sugary drinks on the playing surface.",
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const inr = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

const getSlotPrice = (slot: TimeSlot) =>
  slot.isPeak ? TURF_DATA.peakpricePerHour : TURF_DATA.pricePerHour;

const compactTime = (time: string) =>
  time
    .replace(":00", "")
    .replace(/^0/, "")
    .replace("AM", "am")
    .replace("PM", "pm");

const compactRange = (range: string) => {
  const [start, end] = range.split(" - ");
  return `${compactTime(start)} – ${compactTime(end)}`;
};

let ticketSequence = 48213;
const nextTicketId = () => {
  ticketSequence = (ticketSequence + 7919) % 900000;
  return `GV-${100000 + ticketSequence}`;
};

// ─── PRESENTATIONAL PIECES ────────────────────────────────────────────────────

function SectionCard({
  id,
  step,
  title,
  hint,
  action,
  children,
}: {
  id: string;
  step: number;
  title: string;
  hint?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_-32px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-900"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-800">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-600 text-[11px] font-black text-white shadow-sm shadow-emerald-600/30">
            {step}
          </span>
          <div>
            <h2 className="text-[15px] font-bold tracking-tight text-slate-900 dark:text-white">
              {title}
            </h2>
            {hint && (
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{hint}</p>
            )}
          </div>
        </div>
        {action}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

function PriceRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-[11px]">
      <span className="text-slate-500 dark:text-slate-400">{label}</span>
      <span
        className={cn(
          "font-semibold text-slate-800 dark:text-slate-200",
          strong && "text-slate-950 dark:text-white"
        )}
      >
        {value}
      </span>
    </div>
  );
}

// ─── BOOKING SUMMARY ──────────────────────────────────────────────────────────

interface BookingSummaryProps {
  selectedDate: Date;
  selectedSlots: string[];
  slotsTotal: number;
  grandTotal: number;
  paymentMode: PaymentMode;
  onPaymentModeChange: (mode: PaymentMode) => void;
  payableNow: number;
  payAtVenue: number;
  onConfirm: () => void;
  className?: string;
}

function BookingSummary({
  selectedDate,
  selectedSlots,
  slotsTotal,
  grandTotal,
  paymentMode,
  onPaymentModeChange,
  payableNow,
  payAtVenue,
  onConfirm,
  className,
}: BookingSummaryProps) {
  const slotObjects = TIME_SLOTS.filter((slot) => selectedSlots.includes(slot.time));
  const advanceAmount = Math.round(grandTotal * 0.25);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_60px_-40px_rgba(15,23,42,0.4)] dark:border-slate-800 dark:bg-slate-900",
        className
      )}
    >
      {/* Header */}
      <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-emerald-50 via-white to-white px-5 py-4 dark:border-slate-800 dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-900">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
              Your booking
            </p>
            <h2 className="mt-1 text-lg font-black tracking-tight text-slate-900 dark:text-white">
              Summary
            </h2>
          </div>
          <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white">
            {selectedSlots.length} {selectedSlots.length === 1 ? "hour" : "hours"}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-[11px] dark:border-slate-800 dark:bg-slate-950/60">
          <span className="truncate font-semibold text-slate-900 dark:text-slate-100">
            {TURF_DATA.sport.name}
          </span>
          <span className="shrink-0 text-slate-500 dark:text-slate-400">
            {format(selectedDate, "EEE, d MMM")}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-5">
        {slotObjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-7 text-center dark:border-slate-700">
            <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
              <Clock className="h-5 w-5" />
            </span>
            <p className="mt-3 text-xs font-bold text-slate-700 dark:text-slate-200">
              No slots selected yet
            </p>
            <p className="mx-auto mt-1 max-w-[190px] text-[11px] leading-relaxed text-slate-400">
              Pick a time above and your price will appear here instantly.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800">
            {slotObjects.map((slot, index) => (
              <div
                key={slot.time}
                className={cn(
                  "flex items-center justify-between gap-2 px-3 py-2.5 text-[11px]",
                  index !== 0 && "border-t border-slate-100 dark:border-slate-800/70"
                )}
              >
                <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-200">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                  {compactRange(slot.time)}
                  {slot.isPeak && (
                    <span className="rounded bg-amber-100 px-1 py-0.5 text-[9px] font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                      Peak
                    </span>
                  )}
                </span>
                <span className="shrink-0 font-bold text-slate-900 dark:text-white">
                  {inr(getSlotPrice(slot))}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-1.5 border-t border-dashed border-slate-200 pt-3 dark:border-slate-800">
          <PriceRow label="Slot subtotal" value={inr(slotsTotal)} />
        </div>

        {/* Payment */}
        <div>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Payment
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onPaymentModeChange("full")}
              aria-pressed={paymentMode === "full"}
              className={cn(
                "rounded-xl border p-2.5 text-left transition",
                paymentMode === "full"
                  ? "border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600/30 dark:bg-emerald-950/30"
                  : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
              )}
            >
              <span className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold text-slate-900 dark:text-slate-100">
                  Pay in full
                </span>
                {paymentMode === "full" ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} />
                ) : (
                  <CreditCard className="h-3.5 w-3.5 text-slate-400" />
                )}
              </span>
              <span className="mt-1 block text-[10px] text-slate-500 dark:text-slate-400">
                {inr(grandTotal)} today
              </span>
            </button>

            <button
              type="button"
              onClick={() => onPaymentModeChange("advance")}
              aria-pressed={paymentMode === "advance"}
              className={cn(
                "rounded-xl border p-2.5 text-left transition",
                paymentMode === "advance"
                  ? "border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600/30 dark:bg-emerald-950/30"
                  : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
              )}
            >
              <span className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold text-slate-900 dark:text-slate-100">
                  Pay 25%
                </span>
                {paymentMode === "advance" ? (
                  <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} />
                ) : (
                  <Wallet className="h-3.5 w-3.5 text-slate-400" />
                )}
              </span>
              <span className="mt-1 block text-[10px] text-slate-500 dark:text-slate-400">
                {inr(advanceAmount)} today
              </span>
            </button>
          </div>

          {paymentMode === "advance" && selectedSlots.length > 0 && (
            <p className="mt-2 rounded-lg bg-amber-50 px-2.5 py-1.5 text-[10px] font-medium text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
              {inr(payAtVenue)} is due at the venue before kick-off.
            </p>
          )}
        </div>

        {/* Total */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950 p-4 text-white">
          <div className="absolute -right-6 -top-8 h-24 w-24 rounded-full border border-white/10" />
          <div className="relative flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/55">Total</p>
              <p className="text-2xl font-black leading-tight">{inr(grandTotal)}</p>
            </div>
            <p className="pb-0.5 text-right text-[10px] text-white/55">
              {paymentMode === "advance" && selectedSlots.length > 0 ? (
                <>
                  Pay now
                  <br />
                  <span className="text-sm font-bold text-white">{inr(payableNow)}</span>
                </>
              ) : (
                "incl. all fees"
              )}
            </p>
          </div>
        </div>

        <Button
          type="button"
          disabled={selectedSlots.length === 0}
          onClick={onConfirm}
          className="h-12 w-full rounded-xl bg-emerald-600 text-sm font-bold shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700 active:scale-[0.99] disabled:shadow-none"
        >
          {selectedSlots.length === 0 ? (
            "Select a slot to continue"
          ) : (
            <>
              Pay {inr(payableNow)} &amp; confirm
              <ArrowRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>

        <p className="flex items-center justify-center gap-1 text-center text-[10px] text-slate-400">
          <ShieldCheck className="h-3 w-3 shrink-0 text-emerald-600" />
          Free cancellation up to 4 hrs before your slot
        </p>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function TurfBookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("full");
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const nextDays = useMemo(
    () => Array.from({ length: 10 }, (_, index) => addDays(new Date(), index)),
    []
  );

  const slotsLeft = TIME_SLOTS.filter((slot) => !slot.booked).length;

  // ── Handlers ───────────────────────────────────────────────────────────────

  const selectDate = (date: Date) => {
    if (!isSameDay(date, selectedDate)) setSelectedSlots([]);
    setSelectedDate(date);
  };

  const toggleSlot = (time: string, booked: boolean) => {
    if (booked) return;
    setSelectedSlots((prev) =>
      prev.includes(time) ? prev.filter((slot) => slot !== time) : [...prev, time]
    );
  };

  const togglePeriod = (period: TimeSlot["period"]) => {
    const available = TIME_SLOTS.filter(
      (slot) => slot.period === period && !slot.booked
    ).map((slot) => slot.time);

    if (available.length === 0) return;

    const allSelected = available.every((time) => selectedSlots.includes(time));

    setSelectedSlots((prev) =>
      allSelected
        ? prev.filter((time) => !available.includes(time))
        : Array.from(new Set([...prev, ...available]))
    );
  };

  const handleConfirm = () => {
    if (selectedSlots.length === 0) return;
    setTicketId(nextTicketId());
    setIsSummaryOpen(false);
    setIsSuccessOpen(true);
  };

  const resetBooking = () => {
    setIsSuccessOpen(false);
    setSelectedSlots([]);
    setPaymentMode("full");
    setTicketId("");
  };

  // ── Pricing ────────────────────────────────────────────────────────────────

  const slotsTotal = useMemo(
    () =>
      selectedSlots.reduce((sum, time) => {
        const slot = TIME_SLOTS.find((item) => item.time === time);
        return sum + (slot ? getSlotPrice(slot) : 0);
      }, 0),
    [selectedSlots]
  );

  const grandTotal = slotsTotal ;
  const payableNow = paymentMode === "advance" ? Math.round(grandTotal * 0.25) : grandTotal;
  const payAtVenue = grandTotal - payableNow;

  const summaryProps: Omit<BookingSummaryProps, "className"> = {
    selectedDate,
    selectedSlots,
    slotsTotal,
    grandTotal,
    paymentMode,
    onPaymentModeChange: setPaymentMode,
    payableNow,
    payAtVenue,
    onConfirm: handleConfirm,
  };

  // ── Stepper state ──────────────────────────────────────────────────────────

  const stepStatus = (index: number): "done" | "active" => {
    if (index === 0) return "done";
    return selectedSlots.length > 0 ? "done" : "active";
  };

  const steps = [
    { id: "date", label: "Date" },
    { id: "slots", label: "Time" },
  ];

  return (
    <div className="min-h-screen scroll-smooth bg-[#f7f8f6] pb-28 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100 lg:pb-16">
      {/* ─── TOP NAV ─── */}
      <Header
        className={cn(
          "sticky top-0 z-40 border-slate-200/70 bg-white/85 px-0 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85"
        )}
        contentClassName={container}
        titleNode={
            <><span className="relative h-9 w-9 overflow-hidden rounded-xl bg-slate-950 ring-1 ring-slate-900/10">
            <Image
              src="/images/logo.png"
              alt="Game On turf club"
              fill
              sizes="36px"
              priority
              className="object-cover" />
          </span><span className="flex flex-col leading-none">
              <span className="text-sm font-black tracking-[0.18em] text-slate-900 dark:text-white">
                GAME ON
              </span>
              <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Cricket &amp; Football Turf
              </span>
            </span></>
        }
      >
        <nav className="mr-1 hidden items-center gap-0.5 md:flex">
          {["Venues", "How it works", "Support"].map((item) => (
            <a
              key={item}
              href="#"
              className="rounded-full px-3 py-1.5 text-[11px] font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={isLiked ? "Remove from saved venues" : "Save this venue"}
          onClick={() => setIsLiked((prev) => !prev)}
          className="hidden text-slate-500 sm:inline-flex"
        >
          <Heart className={cn("h-4 w-4", isLiked && "fill-rose-500 text-rose-500")} />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-9 gap-1.5 rounded-xl border-slate-200 bg-white px-3 text-xs font-semibold shadow-none dark:border-slate-800 dark:bg-slate-900"
        >
          <Ticket className="h-3.5 w-3.5 text-emerald-600" />
          <span className="hidden sm:inline">My bookings</span>
          <span className="sm:hidden">Bookings</span>
        </Button>
      </Header>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-[#06130e] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.3),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(52,211,153,0.12),transparent_50%)]" />
          <svg
            className="absolute -right-44 top-1/2 h-[620px] w-[620px] -translate-y-1/2 text-white/[0.06]"
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
            <rect x="8" y="150" width="18" height="100" stroke="currentColor" strokeWidth="2" />
            <rect x="374" y="150" width="18" height="100" stroke="currentColor" strokeWidth="2" />
          </svg>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
        </div>

        <div className={cn(container, "relative pb-16 pt-12 lg:pb-20 lg:pt-16")}>
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center lg:gap-12">
            {/* Venue identity */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="gap-1.5 rounded-full border-0 bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-300 hover:bg-emerald-500/15">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Open now
                </Badge>
                <Badge className="gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-white/70 hover:bg-white/5">
                  <Zap className="h-3 w-3 text-emerald-400" />
                  Instant confirmation
                </Badge>
              </div>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-300/75">
                Game On Turf Club · Tiruchengode
              </p>
              <h1 className="mt-2 text-4xl font-black leading-[1.05] tracking-tight text-balance md:text-5xl">
                {TURF_DATA.shortName}
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                Five-a-side football on FIFA-grade turf — open 24/7, floodlit night
                games, booked by the hour and confirmed in seconds.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-white/50">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 shrink-0 text-emerald-400" />
                  {TURF_DATA.location}
                </span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 font-semibold text-emerald-300 transition hover:text-emerald-200"
                >
                  <Navigation2 className="h-3.5 w-3.5" />
                  Directions
                </a>
              </div>
            </div>

            {/* Rate card */}
            <div className="rounded-[28px] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Today&apos;s rate
                </span>
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                  <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  Live availability
                </span>
              </div>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-4xl font-black leading-none tracking-tight">
                  {inr(TURF_DATA.pricePerHour)}
                </span>
                <span className="pb-0.5 text-xs text-white/45">/ hour</span>
              </div>
              <p className="mt-1.5 text-[11px] text-white/45">
                {inr(TURF_DATA.peakpricePerHour)} during floodlit
                peak hours
              </p>

              <div className="my-4 h-px bg-white/10" />

              <div className="space-y-2.5 text-[11px]">
                <div className="flex items-center justify-between text-white/55">
                  <span>Open today</span>
                  <span className="font-semibold text-white">24 hours</span>
                </div>
                <div className="flex items-center justify-between text-white/55">
                  <span>Slots available</span>
                  <span className="font-semibold text-emerald-300">
                    {slotsLeft} of {TIME_SLOTS.length}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-lime-300"
                    style={{ width: `${(slotsLeft / TIME_SLOTS.length) * 100}%` }}
                  />
                </div>
              </div>

              <a
                href="#slots"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-4 h-11 w-full rounded-xl bg-lime-300 text-sm font-bold text-emerald-950 shadow-lg shadow-lime-300/10 transition hover:bg-lime-200"
                )}
              >
                Choose your slot
                <ArrowRight className="h-4 w-4" />
              </a>

              <p className="mt-2.5 flex items-center justify-center gap-1 text-[10px] text-white/40">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                Free cancellation up to 4 hrs before
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAIN ─── */}
      <main className={cn(container, "pb-28 pt-8 lg:pb-16 lg:pt-10")}>
        {/* Progress */}
        <div className="flex items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200/80 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {steps.map((step, index) => {
            const status = stepStatus(index);
            return (
              <React.Fragment key={step.id}>
                <a
                  href={`#${step.id}`}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 transition",
                    status === "active" && "bg-emerald-50 dark:bg-emerald-950/30"
                  )}
                >
                  <span
                    className={cn(
                      "grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold transition",
                      status === "done" &&
                        "bg-emerald-600 text-white shadow-sm shadow-emerald-600/30",
                      status === "active" &&
                        "bg-emerald-600 text-white ring-4 ring-emerald-100 dark:ring-emerald-900/50"
                    )}
                  >
                    {status === "done" ? (
                      <Check className="h-3 w-3" strokeWidth={3} />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span className="text-xs font-semibold text-slate-900 dark:text-white">
                    {step.label}
                  </span>
                </a>
                {index < steps.length - 1 && (
                  <span className="h-px min-w-3 flex-1 bg-slate-200 dark:bg-slate-800" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-8">
          {/* LEFT: booking flow */}
          <div className="space-y-5">
            {/* 1 · Date */}
            <SectionCard
              id="date"
              step={1}
              title="Pick a date"
              hint="Availability is refreshed every morning."
              action={
                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1.5 rounded-lg px-2.5 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/40"
                      />
                    }
                  >
                    <CalendarDays className="h-3.5 w-3.5" />
                    More dates
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && selectDate(date)}
                      disabled={(date: Date) => date < today}
                    />
                  </PopoverContent>
                </Popover>
              }
            >
              <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {nextDays.map((date) => {
                  const isSelected = isSameDay(selectedDate, date);
                  const isToday = isSameDay(today, date);

                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      onClick={() => selectDate(date)}
                      aria-pressed={isSelected}
                      className={cn(
                        "relative flex min-w-[72px] flex-col items-center rounded-2xl border px-3 py-3 transition-all",
                        isSelected
                          ? "border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                          : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/20"
                      )}
                    >
                      <span
                        className={cn(
                          "text-[9px] font-bold uppercase tracking-[0.12em]",
                          isSelected
                            ? "text-emerald-100"
                            : "text-slate-400 dark:text-slate-500"
                        )}
                      >
                        {isToday ? "Today" : format(date, "EEE")}
                      </span>
                      <span className="mt-1 text-xl font-black leading-none">
                        {format(date, "d")}
                      </span>
                      <span
                        className={cn(
                          "mt-1 text-[9px] font-medium uppercase",
                          isSelected ? "text-emerald-100" : "text-slate-400"
                        )}
                      >
                        {format(date, "MMM")}
                      </span>
                      {isToday && !isSelected && (
                        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </SectionCard>

            {/* 2 · Slots */}
            <SectionCard
              id="slots"
              step={2}
              title="Pick your time slots"
              hint="Tap one or more hours — the total updates instantly."
              action={
                selectedSlots.length > 0 ? (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                    {selectedSlots.length} hr selected
                  </span>
                ) : undefined
              }
            >
              <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-[3px] bg-emerald-600" /> Selected
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-[3px] border border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800" />{" "}
                  Available
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="flex h-2.5 w-2.5 items-center justify-center rounded-[3px] bg-amber-400/30">
                    <Flame className="h-2 w-2 text-amber-600" />
                  </span>{" "}
                  Peak
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-[3px] bg-slate-200 dark:bg-slate-700" />{" "}
                  Booked
                </span>
              </div>

              <div className="space-y-5">
                {PERIODS.map((period) => {
                  const slots = TIME_SLOTS.filter((slot) => slot.period === period.key);
                  const available = slots.filter((slot) => !slot.booked);
                  const allSelected =
                    available.length > 0 &&
                    available.every((slot) => selectedSlots.includes(slot.time));
                  const Icon = period.icon;

                  return (
                    <div key={period.key} className="space-y-2.5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="grid h-6 w-6 place-items-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                            {period.label}
                          </span>
                          <span className="hidden text-[10px] text-slate-400 sm:inline">
                            {period.hint}
                          </span>
                          {period.key === "night" && (
                            <span className="hidden items-center gap-0.5 rounded-full bg-amber-50 px-1.5 py-0.5 text-[9px] font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 sm:inline-flex">
                              <Flame className="h-2.5 w-2.5" />
                              High demand
                            </span>
                          )}
                        </div>

                        {available.length > 0 && (
                          <button
                            type="button"
                            onClick={() => togglePeriod(period.key)}
                            className="shrink-0 text-[10px] font-bold text-emerald-700 transition hover:text-emerald-800 hover:underline dark:text-emerald-400"
                          >
                            {allSelected ? "Clear all" : "Select all"}
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
                        {slots.map((slot) => {
                          const isSelected = selectedSlots.includes(slot.time);
                          const price = getSlotPrice(slot);

                          return (
                            <button
                              key={slot.time}
                              type="button"
                              disabled={slot.booked}
                              aria-pressed={isSelected}
                              onClick={() => toggleSlot(slot.time, slot.booked)}
                              className={cn(
                                "relative flex flex-col rounded-xl border px-3 py-2.5 text-left transition-all",
                                slot.booked
                                  ? "cursor-not-allowed border-dashed border-slate-200 bg-slate-50/80 text-slate-400 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-600"
                                  : isSelected
                                    ? "border-emerald-600 bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                                    : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-700"
                              )}
                            >
                              <span className="flex items-center justify-between gap-1">
                                <span
                                  className={cn(
                                    "text-[11px] font-bold tabular-nums",
                                    slot.booked && "line-through decoration-slate-300"
                                  )}
                                >
                                  {compactRange(slot.time)}
                                </span>
                                {isSelected && (
                                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                )}
                              </span>

                              <span className="mt-1 flex items-center gap-1.5">
                                {slot.booked ? (
                                  <span className="text-[10px] font-medium">
                                    Already booked
                                  </span>
                                ) : (
                                  <>
                                    <span
                                      className={cn(
                                        "text-[10px] font-semibold",
                                        isSelected
                                          ? "text-emerald-50"
                                          : "text-slate-500 dark:text-slate-400"
                                      )}
                                    >
                                      {inr(price)}/hr
                                    </span>
                                    {slot.isPeak && (
                                      <span
                                        className={cn(
                                          "rounded px-1 py-0.5 text-[8px] font-bold uppercase tracking-wide",
                                          isSelected
                                            ? "bg-white/15 text-white"
                                            : "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                                        )}
                                      >
                                        Peak
                                      </span>
                                    )}
                                  </>
                                )}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionCard>

            {/* Facilities & rules */}
            <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_-32px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-900">
              <div className="grid gap-5 p-5 sm:grid-cols-[1.05fr_1fr]">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                    At the venue
                  </p>
                  <h2 className="mt-1.5 text-lg font-black tracking-tight text-slate-900 dark:text-white">
                    Everything you need
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    Turn up, play, and head home fresh — the essentials are covered.
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {TURF_DATA.amenities.map((item, index) => {
                      const Icon = AMENITY_ICONS[index % AMENITY_ICONS.length];
                      return (
                        <div
                          key={item}
                          className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-2 text-[11px] font-medium text-slate-600 dark:bg-slate-950/50 dark:text-slate-300"
                        >
                          <Icon className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                  <h3 className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                    <Info className="h-3.5 w-3.5 text-emerald-600" />
                    House rules
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {RULES.map((rule) => (
                      <li
                        key={rule}
                        className="flex gap-2 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                        {rule}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex gap-2 rounded-xl border border-amber-200/70 bg-amber-50/70 p-3 dark:border-amber-950 dark:bg-amber-950/20">
                    <Flame className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
                    <p className="text-[10px] leading-relaxed text-amber-900 dark:text-amber-300">
                      <strong className="font-semibold">Footwear note:</strong> Metal
                      spikes are strictly prohibited to protect the turf surface.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT: sticky summary */}
          <aside
            className="hidden lg:sticky lg:top-24 lg:block"
            aria-label="Booking summary"
          >
            <BookingSummary {...summaryProps} />
          </aside>
        </div>
      </main>

      {/* ─── MOBILE STICKY BAR ─── */}
      <aside
        aria-label="Booking total"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 lg:hidden"
      >
        <div className={cn(container, "flex items-center justify-between gap-3")}>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
              {selectedSlots.length} {selectedSlots.length === 1 ? "slot" : "slots"} ·
              total
            </p>
            <p className="text-xl font-black leading-tight text-slate-900 dark:text-white">
              {inr(grandTotal)}
            </p>
            {paymentMode === "advance" && grandTotal > 0 && (
              <p className="text-[9px] font-medium text-amber-600 dark:text-amber-400">
                {inr(payAtVenue)} due at venue
              </p>
            )}
          </div>

          <Button
            type="button"
            onClick={() => setIsSummaryOpen(true)}
            disabled={selectedSlots.length === 0}
            className="h-11 rounded-xl bg-emerald-600 px-5 text-sm font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700"
          >
            {selectedSlots.length === 0 ? "Select a slot" : "Review & pay"}
            {selectedSlots.length > 0 && <ArrowRight className="ml-1 h-4 w-4" />}
          </Button>
        </div>
      </aside>

      {/* ─── MOBILE SUMMARY DIALOG ─── */}
      <Dialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto p-0 sm:max-w-md">
          <DialogHeader className="sr-only">
            <DialogTitle>Booking summary</DialogTitle>
            <DialogDescription>Review your selected slots and pricing.</DialogDescription>
          </DialogHeader>
          <BookingSummary
            {...summaryProps}
            className="rounded-none border-0 shadow-none ring-0 dark:bg-slate-900"
          />
        </DialogContent>
      </Dialog>

      {/* ─── SUCCESS PASS ─── */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="overflow-hidden p-0 sm:max-w-md">
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-600 to-teal-700 px-6 pb-10 pt-7 text-center text-white">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -right-10 -top-14 h-36 w-36 rounded-full border border-white/10" />
              <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full border border-white/10" />
              <div className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 rounded-full bg-white/10 blur-2xl" />
            </div>
            <div className="relative">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur">
                <Check className="h-7 w-7" strokeWidth={3} />
              </div>
              <DialogTitle className="mt-4 text-2xl font-black tracking-tight">
                You&apos;re booked!
              </DialogTitle>
              <DialogDescription className="mx-auto mt-1 max-w-xs text-[11px] leading-relaxed text-emerald-50/85">
                Your pitch is locked in. Show this match pass at the gate.
              </DialogDescription>
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-wide ring-1 ring-white/10">
                <Ticket className="h-3 w-3" />
                Ticket · {ticketId}
              </p>
            </div>
          </div>

          <div className="relative -mt-5 rounded-t-3xl bg-white px-5 pb-5 pt-5 dark:bg-slate-900">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="space-y-2.5 text-[11px]">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Venue</span>
                  <span className="text-right font-semibold text-slate-900 dark:text-white">
                    {TURF_DATA.name}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Sport</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {TURF_DATA.sport.name}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Date</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {format(selectedDate, "EEE, dd MMM yyyy")}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Slots</span>
                  <span className="max-w-[65%] text-right font-semibold text-emerald-700 dark:text-emerald-400">
                    {TIME_SLOTS.filter((slot) => selectedSlots.includes(slot.time))
                      .map((slot) => compactRange(slot.time))
                      .join(" · ")}
                  </span>
                </div>
              </div>

              <div className="my-3 border-t border-dashed border-slate-300 dark:border-slate-700" />

              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Paid now</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {inr(payableNow)}
                </span>
              </div>
              {paymentMode === "advance" && (
                <div className="mt-1 flex justify-between text-[11px]">
                  <span className="text-slate-500">Due at venue</span>
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    {inr(payAtVenue)}
                  </span>
                </div>
              )}

              <div className="mt-4 flex items-end justify-center gap-[3px] rounded-xl bg-slate-950 px-4 py-3">
                {[2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 2].map(
                  (width, index) => (
                    <span
                      key={index}
                      className="block rounded-full bg-white/80"
                      style={{
                        width: `${width}px`,
                        height: index % 3 === 0 ? "26px" : index % 4 === 0 ? "18px" : "22px",
                      }}
                    />
                  )
                )}
              </div>
              <p className="mt-2 text-center text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Match pass · show at entry
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <Button
                type="button"
                onClick={resetBooking}
                className="h-11 w-full rounded-xl bg-emerald-600 text-sm font-bold hover:bg-emerald-700"
              >
                Done
              </Button>
              <a
                href="tel:+919876543210"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-10 w-full rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300"
                )}
              >
                Need help? Call the venue
              </a>
            </div>

            <p className="mt-3 flex items-center justify-center gap-1 text-[10px] text-slate-400">
              <Sparkles className="h-3 w-3 text-emerald-600" />
              Reach 10 minutes early for a smooth check-in
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
