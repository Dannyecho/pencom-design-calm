"use client";

import { useId, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;
const view = { once: true, margin: "-60px" } as const;

/**
 * Calm section title (homepage copy; C2 makes this the theme's SectionHeading):
 * an eyebrow pill with a green dot that pulses twice and one shimmer sweep, then the title in ink with its
 * highlight phrase in a green→gold gradient and a hand-drawn gold underline that draws in. With no highlight,
 * a short green→gold bar grows in under the title. `dark` switches to light gold for the green inset panel.
 * The gradient ends on a darker gold on light backgrounds so the phrase keeps 3:1 contrast as large text.
 */
export default function Title({
  id,
  eyebrow,
  title,
  highlight,
  intro,
  center = false,
  dark = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  highlight?: string;
  intro?: ReactNode;
  center?: boolean;
  dark?: boolean;
}) {
  const { t, lang } = useI18n();
  const reduce = useReducedMotion();
  const gid = useId().replace(/:/g, "");
  // Translate the whole title, then find the translated highlight in it (ignoring case).
  const T = t(title);
  const H = highlight ? t(highlight) : undefined;
  const at = H ? T.toLowerCase().indexOf(H.toLowerCase()) : -1;
  const hl = at >= 0 ? T.slice(at, at + H!.length) : undefined;
  const [before, after] = hl ? [T.slice(0, at), T.slice(at + hl.length)] : [T, ""];

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={view}
      transition={{ duration: 0.7, ease }}
      className={cn("relative max-w-3xl", center && "mx-auto text-center")}
    >
      <span
        className={cn(
          "relative inline-flex items-center gap-2.5 overflow-hidden rounded-full py-1 pl-1 pr-4 text-[13px] font-bold uppercase tracking-[0.18em] ring-1 sm:text-sm",
          dark ? "bg-white/[0.08] text-[#F4D27A] ring-white/15" : "bg-[#E8F5E9]/80 text-[#0A4A13] ring-[#117F21]/15",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "relative flex h-6 w-6 items-center justify-center rounded-full",
            dark ? "bg-gradient-to-br from-[#F4D27A] to-[#CB9615]" : "bg-gradient-to-br from-[#2E913D] to-[#0A4A13]",
          )}
        >
          <span className={cn("h-2 w-2 rounded-full", dark ? "bg-[#0A4A13]" : "bg-[#F4D27A]")} />
          {!reduce && (
            <motion.span
              className={cn("absolute inset-0 rounded-full", dark ? "bg-[#F4D27A]" : "bg-[#2E913D]")}
              initial={{ scale: 1, opacity: 0.5 }}
              whileInView={{ scale: 1.9, opacity: 0 }}
              viewport={view}
              transition={{ duration: 1.4, repeat: 2, ease: "easeOut" }}
            />
          )}
        </span>
        <span className="relative">{t(eyebrow)}</span>
        {!reduce && (
          <motion.span
            aria-hidden="true"
            className={cn("pointer-events-none absolute inset-y-0 w-10 -skew-x-12", dark ? "bg-white/20" : "bg-white/70")}
            initial={{ left: "-20%" }}
            whileInView={{ left: "120%" }}
            viewport={view}
            transition={{ duration: 1.1, delay: 0.35, ease: "easeInOut" }}
          />
        )}
      </span>

      <h2
        id={id}
        data-i18n-done={lang !== "en" && T !== title ? "" : undefined}
        className={cn("mt-5 text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem]", dark ? "text-white" : "text-[#14261A]")}
      >
        {before}
        {hl && (
          <span className="relative inline-block">
            <span
              className={cn(
                "relative z-10 bg-clip-text text-transparent",
                dark ? "bg-gradient-to-r from-[#F4D27A] via-[#E9B949] to-[#CB9615]" : "bg-gradient-to-r from-[#117F21] via-[#2E913D] to-[#9A6B00]",
              )}
            >
              {hl}
            </span>
            <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" className="absolute -bottom-2.5 left-0 h-3.5 w-full overflow-visible">
              <defs>
                <linearGradient id={`ul-${gid}`} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor={dark ? "#F4D27A" : "#2E913D"} />
                  <stop offset="100%" stopColor="#CB9615" />
                </linearGradient>
              </defs>
              <motion.path
                d="M3 10 C 45 3, 95 2, 140 5 S 190 9, 197 6"
                fill="none"
                stroke={`url(#ul-${gid})`}
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 0.9 : 0 }}
                whileInView={{ pathLength: 1, opacity: 0.9 }}
                viewport={view}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.65, 0, 0.35, 1] }}
              />
            </svg>
          </span>
        )}
        {after}
      </h2>

      {!hl && (
        <motion.span
          aria-hidden="true"
          className={cn(
            "mt-5 block h-1.5 w-16 rounded-full bg-gradient-to-r",
            dark ? "from-[#F4D27A] to-[#CB9615]" : "from-[#117F21] to-[#CB9615]",
            center ? "mx-auto origin-center" : "origin-left",
          )}
          initial={{ scaleX: reduce ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={view}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        />
      )}

      {intro && <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-white/85" : "text-gray-700")}>{intro}</p>}
    </motion.div>
  );
}
