"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { focus } from "@/views/theme/ui";

/**
 * The app preview's design tokens for the calm theme. `screens.tsx` and `Phone.tsx` are the same file in every
 * theme and read all their colours, radii and flourishes from here, so a theme restyles the app by editing this file.
 *
 * Calm look, scaled to a phone: cream app background (#FBF8F1) with warm panels (#F1EFE8), roomy rounded-3xl white
 * cards, dark-green icon tiles with gold icons, large gold buttons (rounded-2xl), section titles with a short drawn
 * gold underline. One soft glow in the header, no grid, no glass, nothing that moves on its own.
 */

export const sk = {
  /* Type and text colours */
  ink: "text-[#14261A]",
  accent: "text-[#0A4A13]",
  eyebrow: "text-[#7A5200]",
  check: "text-[#117F21]",
  /* Surfaces */
  appBg: "bg-[#FBF8F1]",
  muted: "bg-[#F1EFE8]",
  softColors: "bg-[#E8F5E9] text-[#0A4A13]",
  hoverSoft: "hover:bg-[#E8F5E9]",
  card: "rounded-3xl bg-white ring-1 ring-black/10",
  cardHover: "transition duration-300 hover:-translate-y-0.5 hover:ring-2 hover:ring-[#117F21] hover:shadow-[0_20px_36px_-24px_rgba(10,74,19,0.55)]",
  cardOn: "ring-2 ring-[#117F21]",
  tile: "flex shrink-0 items-center justify-center rounded-2xl bg-[#0A4A13] text-[#F4D27A]",
  tileHover: "transition-transform duration-300 group-hover:-rotate-6",
  bar: "border-b border-black/10 bg-[#FBF8F1]",
  barTitle: "font-bold text-[#14261A]",
  barMuted: "text-gray-700",
  barBack: "text-[#0A4A13] hover:bg-[#E8F5E9]",
  toast: "bg-[#0A4A13] text-white",
  composer: "border-t border-black/10 bg-white",
  /* Controls */
  goldBtn: cn("inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#F4D27A] px-4 text-base font-bold text-[#1A1206] transition hover:bg-[#FFE08F]", focus),
  outlineBtn: cn("inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border-2 border-[#117F21] bg-white px-4 text-base font-semibold text-[#0A4A13] transition hover:bg-[#117F21] hover:text-white", focus),
  savedBtn: cn("inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#E8F5E9] px-4 text-base font-bold text-[#0A4A13] ring-1 ring-[#117F21]/25", focus),
  field: "w-full rounded-2xl bg-white px-4 py-3 text-base text-[#14261A] ring-1 ring-black/15 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117F21]",
  chipOn: "bg-[#0A4A13] text-white ring-[#0A4A13]",
  chipOff: "bg-white text-[#0A4A13] ring-[#117F21]/40 hover:bg-[#E8F5E9]",
  solid: "bg-[#117F21]",
  range: "accent-[#117F21]",
  promptBtn: "bg-white text-[#14261A] ring-1 ring-[#117F21]/30 hover:bg-[#0A4A13] hover:text-white",
  dashed: "border-[#117F21]/40 bg-white text-[#0A4A13] hover:border-[#117F21] hover:bg-[#E8F5E9]",
  /* Home screen header */
  hero: "rounded-b-[2.5rem] bg-[#0A4A13] text-white",
  heroTitle: "text-[26px] font-bold leading-tight tracking-tight",
  heroBell: "bg-white/10 ring-1 ring-white/25 hover:bg-white/20",
  heroBellIcon: "text-[#F4D27A]",
  heroBadge: "bg-[#F4D27A] text-[#1A1206] ring-[#0A4A13]",
  /* Lists, steps, notices, chat */
  stepDot: "bg-[#0A4A13] text-[#F4D27A] ring-4 ring-white",
  stepLine: "bg-gradient-to-b from-[#117F21] to-[#CB9615]/60",
  unread: "bg-[#E8F5E9]/70 ring-[#117F21]/30",
  newBadge: "bg-[#0A4A13] text-white",
  /** "dot": a coloured dot per notice; "bar": a coloured bar down the left edge (classic notices). */
  notice: "dot" as "dot" | "bar",
  bubbleUser: "rounded-tr-lg bg-[#0A4A13] text-white",
  bubbleBot: "rounded-tl-lg bg-white text-[#14261A] ring-1 ring-black/10",
  success: "bg-[#E8F5E9] ring-8 ring-[#E8F5E9]/50",

  /* Phone shell (Phone.tsx) */
  navIndicator: "pill" as "pill" | "line",
  navFloat: false,
  statusHome: "bg-[#0A4A13] text-white",
  statusInner: "bg-[#FBF8F1] text-[#14261A]",
  island: "bg-[#14261A]",
  homeBar: "bg-[#14261A]",
  nav: "border-t border-black/10 bg-white",
  navOn: "text-white",
  navPill: "bg-[#0A4A13]",
  navOff: "text-gray-700",
  navText: "text-[15px]",
  navLabelOn: "font-bold text-[#0A4A13]",
  navLabelOff: "font-medium text-gray-700",
  navDot: "bg-[#CB9615] ring-white",
  fab: "bg-[#0A4A13] text-white ring-2 ring-white shadow-[0_16px_30px_-14px_rgba(10,74,19,0.8)] hover:bg-[#117F21]",
  fabIcon: "bg-[#F4D27A] text-[#1A1206]",
  fabPulse: "ring-[#F4D27A]",
  backdrop: "bg-[#14261A]/35",
  sheet: "rounded-t-[2rem] bg-[#FBF8F1] shadow-[0_-20px_40px_-24px_rgba(10,74,19,0.5)]",
  sheetTitle: "font-bold text-[#14261A]",
  sheetList: "rounded-3xl bg-white ring-1 ring-black/10 divide-black/10",
  sheetRowOn: "bg-[#E8F5E9]",
  sheetBadge: "bg-[#F4D27A] text-[#1A1206]",
  closeBtn: "bg-white text-[#14261A] ring-1 ring-black/15 hover:bg-[#0A4A13] hover:text-white",
};

/** One soft gold glow in the header (calm: no grid, no sweep). */
export function HeroDecor() {
  return <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-16 -z-10 h-56 w-56 rounded-full bg-[#CB9615]/20 blur-3xl" />;
}

/** Section title inside the app: bold ink title with a short gold underline that draws in once. */
export function ScreenTitle({ children, aside }: { n?: number; children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-2">
      <h2 className="text-[19px] font-bold tracking-tight text-[#14261A]">
        {children}
        <svg aria-hidden="true" viewBox="0 0 60 8" className="mt-1 block h-2 w-12">
          <motion.path d="M2 5 C 18 1, 40 1, 58 4" fill="none" stroke="#CB9615" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.25 }} />
        </svg>
      </h2>
      {aside}
    </div>
  );
}
