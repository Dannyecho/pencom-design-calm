"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight, X } from "lucide-react";
import { Link } from "@/lib/router";
import { cn } from "@/lib/utils";

/**
 * Mega menu for the calm theme: a full-width warm sheet that drops under the nav. Large type, plain group
 * titles (no capitals), every link a tall row with a round arrow, thin rules between groups and labelled
 * buttons ("Overview", "Close"). Motion is a short fade only.
 */

type Link_ = { label: string; href: string; plain?: boolean; note?: string };
type Item = { label: string; href: string; description?: string; megaMenu?: { columns: { title: string; links: Link_[] }[] } };

const focus = "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#FFD84D]";

function NavLink({ to, plain, ...rest }: { to: string; plain?: boolean } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return plain ? <a href={to} {...rest} /> : <Link to={to} {...rest} />;
}

export default function MegaPanel({ item, pathname, onClose }: { item: Item; pathname: string; onClose: () => void }) {
  const reduce = useReducedMotion();
  const cols = item.megaMenu?.columns ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-x-0 top-full z-10"
    >
      <div className="border-y border-[#E4DFD2] bg-[#FBF8F1] shadow-[0_30px_50px_-30px_rgba(20,38,26,0.45)]">
        <div className="mx-auto grid max-w-7xl grid-cols-[17rem_1fr] gap-10 px-4 py-9">
          {/* Section intro */}
          <div className="flex flex-col">
            <p className="text-[2rem] font-bold leading-tight text-[#14261A]">{item.label}</p>
            <span aria-hidden="true" className="mt-3 h-[3px] w-14 rounded-full bg-gradient-to-r from-[#117F21] to-[#CB9615]" />
            {item.description && <p className="mt-4 text-lg leading-relaxed text-[#3A4A3F]">{item.description}</p>}
            <div className="mt-auto flex flex-wrap gap-2 pt-6">
              <Link
                to={item.href}
                className={cn("group/o inline-flex min-h-12 items-center gap-2 rounded-full bg-[#0A4A13] px-5 text-base font-semibold text-white transition-colors hover:bg-[#117F21]", focus)}
              >
                Overview
                <ArrowRight className="h-5 w-5 transition-transform group-hover/o:translate-x-1" aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={onClose}
                className={cn("inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-base font-semibold text-[#14261A] ring-1 ring-[#14261A]/20 transition-colors hover:bg-white", focus)}
              >
                <X className="h-5 w-5" aria-hidden="true" />
                Close
              </button>
            </div>
          </div>

          {/* Groups */}
          <div className="grid divide-x divide-[#E4DFD2]" style={{ gridTemplateColumns: `repeat(${cols.length}, minmax(0, 1fr))` }}>
            {cols.map((col) => (
              <div key={col.title} className="px-6 first:pl-0 last:pr-0">
                <p className="mb-3 text-lg font-bold text-[#0A4A13]">{col.title}</p>
                <ul className="space-y-1">
                  {col.links.map((link) => {
                    const here = pathname === link.href;
                    return (
                      <li key={link.label}>
                        <NavLink
                          to={link.href}
                          plain={link.plain}
                          aria-current={here ? "page" : undefined}
                          className={cn(
                            "group/l flex min-h-12 items-center gap-3 rounded-2xl py-2 pl-2 pr-3 text-[17px] leading-snug transition-colors",
                            here ? "bg-white font-semibold text-[#0A4A13] ring-1 ring-[#117F21]/25" : "text-[#14261A] hover:bg-white",
                            focus,
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                              here ? "bg-[#0A4A13] text-[#F4D27A]" : "bg-[#E8F5E9] text-[#0A4A13] group-hover/l:bg-[#0A4A13] group-hover/l:text-[#F4D27A]",
                            )}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="underline-offset-4 group-hover/l:underline">{link.label}</span>
                            {link.note && <span className="mt-0.5 block text-[15px] font-normal text-gray-600">{link.note}</span>}
                          </span>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
