"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bell, BookOpen, ClipboardList, FileCheck, Landmark, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";
import { focus } from "@/views/theme/ui";
import type { notifications as seed, ScreenName } from "./data";
import { Body, stagger } from "./screens";
import { HeroDecor, ScreenTitle, sk } from "./skin";

/**
 * The app's home screen in the calm look, built for older readers: a quiet dark-green welcome card with one soft gold
 * glow and the drawn gold underline, four large full-width task buttons (icon, word, short line, arrow), one clear
 * "Ask a question" button, and a plain list of updates. Fewer choices, bigger words, nothing that moves on its own.
 * Public: no sign-in, no account data.
 */

export function HomeScreen({ go, items, unread }: { go: (s: ScreenName) => void; items: typeof seed; unread: number }) {
  const tasks = [
    { label: "Services", desc: "Open, transfer or retire", icon: ClipboardList, screen: "services" as const },
    { label: "Service Guide", desc: "Step-by-step help", icon: FileCheck, screen: "guidance" as const },
    { label: "Publications", desc: "Read and save documents", icon: BookOpen, screen: "publications" as const },
    { label: "Find a PFA", desc: "Phone numbers and directions", icon: Landmark, screen: "pfa" as const },
  ];
  return (
    <Body label="Home" className={sk.appBg}>
      <div className="px-4 pt-3">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#0A4A13] px-5 pb-6 pt-4 text-white">
          <HeroDecor />
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white p-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/pencom-logo.png" alt="" className="h-full w-full object-contain" />
              </span>
              <span className="text-lg font-bold">PenCom</span>
            </span>
            <button type="button" onClick={() => go("notifications")} className={cn("relative inline-flex min-h-11 items-center gap-2 rounded-2xl bg-white/10 px-3 text-base font-semibold ring-1 ring-white/25 hover:bg-white/20", focus)}>
              <Bell className="h-5 w-5 text-[#F4D27A]" aria-hidden="true" />
              Updates
              {unread > 0 && <span className="rounded-full bg-[#F4D27A] px-2 text-sm font-bold text-[#1A1206]">{unread}</span>}
            </button>
          </div>
          <h2 className="mt-6 text-[28px] font-bold leading-tight tracking-tight">
            Pensions made clear
            <svg aria-hidden="true" viewBox="0 0 120 10" className="mt-1 block h-2.5 w-28">
              <motion.path d="M2 7 C 40 1, 80 1, 118 6" fill="none" stroke="#F4D27A" strokeWidth="3.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.3 }} />
            </svg>
          </h2>
          <p className="mt-2 text-[17px] leading-snug text-white/90">Guides, publications and PFA contacts from the National Pension Commission.</p>
        </div>
      </div>

      <div className="mt-6 px-4">
        <ScreenTitle>What would you like to do?</ScreenTitle>
        <ul className="mt-3 space-y-2.5">
          {tasks.map((t, i) => (
            <motion.li key={t.label} {...stagger(i)}>
              <button type="button" onClick={() => go(t.screen)} className={cn(sk.card, sk.cardHover, "group flex min-h-[4.75rem] w-full items-center gap-4 p-4 text-left active:scale-[0.99]", focus)}>
                <span className={cn(sk.tile, "h-12 w-12", sk.tileHover)}><t.icon className="h-6 w-6" aria-hidden="true" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-bold leading-tight text-[#14261A]">{t.label}</span>
                  <span className="block text-base leading-snug text-gray-700">{t.desc}</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-[#0A4A13] transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </motion.li>
          ))}
        </ul>
        <button type="button" onClick={() => go("chat")} className={cn(sk.goldBtn, "mt-4 min-h-14 w-full text-lg")}>
          <MessageCircleQuestion className="h-6 w-6" aria-hidden="true" /> Ask a question
        </button>
      </div>

      <div className="mt-7 px-4 pb-5">
        <ScreenTitle aside={<span className={cn("rounded-full px-3 py-0.5 text-sm font-bold", sk.muted, sk.eyebrow)}>Sample</span>}>Latest from PenCom</ScreenTitle>
        <ul className="mt-3 space-y-2.5">
          {items.map((n) => (
            <li key={n.title} className="rounded-3xl bg-[#F1EFE8] p-4">
              <span className="flex items-baseline justify-between gap-2">
                <span className="text-[17px] font-bold text-[#14261A]">{n.title}</span>
                <span className="shrink-0 text-sm text-gray-700">{n.time}</span>
              </span>
              <span className="mt-1 block text-base leading-snug text-gray-800">{n.body}</span>
            </li>
          ))}
        </ul>
      </div>
    </Body>
  );
}
