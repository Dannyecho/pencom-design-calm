"use client";

import { useRef, useState } from "react";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import { Accessibility, ArrowLeft, ArrowRight, Bot, Check, Info, Smartphone, UserRoundCheck, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHero, Rise, focus, sectionCls } from "@/views/theme/ui";
import { SectionHeading } from "@/views/theme/heading";
import { features, type ScreenName } from "./data";
import { Phone, titles } from "./Phone";

/**
 * /mobile in the calm look: a working preview of the planned PenCom app, built for older readers. The hero carries
 * one plain list of features in large type (a mint pill slides to the chosen row, which says "Showing"); the phone sits
 * in the calm arch frame (mint arch, thin gold outline) with large labelled "Previous" and "Next" buttons under it, so
 * people can step through at their own pace (no autoplay). Below, four white cards explain what the app is built for.
 * Screens: ./screens + ./Phone, tokens: ./skin.
 */

const builtFor: { title: string; body: string; icon: typeof Bot; screen: ScreenName }[] = [
  { title: "No sign-in", body: "Everything in the app is public. Open it and start reading, with no account and no password.", icon: UserRoundCheck, screen: "dashboard" },
  { title: "Saved for offline reading", body: "Download circulars and reports once, then read them where the network is weak.", icon: WifiOff, screen: "publications" },
  { title: "Answers show their source", body: "The assistant names the PenCom document each answer comes from.", icon: Bot, screen: "chat" },
  { title: "Text size, contrast and motion", body: "Make words bigger, raise the contrast or turn movement off.", icon: Accessibility, screen: "accessibility" },
];

const stepBtn = cn("inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl px-5 text-lg font-bold transition disabled:cursor-not-allowed disabled:opacity-40", focus);

export default function MobilePage() {
  const reduce = useReducedMotion();
  const [screen, setScreen] = useState<ScreenName>("dashboard");
  const phoneRef = useRef<HTMLDivElement>(null);
  const at = Math.max(features.findIndex((f) => f.screen === screen), 0);
  const showPhone = () => phoneRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

  const pick = (s: ScreenName) => {
    setScreen(s);
    if (window.matchMedia("(max-width: 1023px)").matches) showPhone();
  };

  const featureList = (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">Choose a feature to try</h2>
      <ul className="mt-5 space-y-2 rounded-[2rem] bg-white p-2.5 ring-1 ring-black/10">
        {features.map((f) => {
          const on = screen === f.screen;
          return (
            <li key={f.screen}>
              <button
                type="button"
                aria-pressed={on}
                aria-controls="app-screen"
                onClick={() => pick(f.screen)}
                className={cn("group relative flex min-h-[4.5rem] w-full items-center gap-4 rounded-3xl px-3.5 py-3 text-left transition-colors", !on && "hover:bg-[#FBF8F1]", focus)}
              >
                {on && <motion.span layoutId="calm-feature" transition={{ type: "spring", stiffness: 320, damping: 34 }} className="absolute inset-0 rounded-3xl bg-[#E8F5E9] ring-2 ring-[#117F21]" />}
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0A4A13] text-[#F4D27A] transition-transform duration-300 group-hover:-rotate-6">
                  <f.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="relative min-w-0 flex-1">
                  <span className="block text-xl font-bold leading-tight">{f.label}</span>
                  <span className="mt-0.5 block text-lg leading-snug text-gray-700">{f.desc}</span>
                </span>
                {on ? (
                  <span className="relative hidden shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1 text-base font-bold text-[#0A4A13] ring-1 ring-[#117F21]/30 sm:inline-flex">
                    <Check className="h-4 w-4" aria-hidden="true" /> Showing
                  </span>
                ) : (
                  <ArrowRight className="relative h-5 w-5 shrink-0 text-[#0A4A13] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-5 flex items-start gap-3 rounded-3xl bg-[#F1EFE8] p-5 text-lg leading-relaxed text-gray-800">
        <Info className="mt-1 h-5 w-5 shrink-0 text-[#0A4A13]" aria-hidden="true" />
        <span>This is a design preview. The app is open to everyone, with no sign-in. Updates shown in it are sample content.</span>
      </p>
    </div>
  );

  const phone = (
    <div ref={phoneRef} className="relative mx-auto w-full max-w-[400px] scroll-mt-[110px]">
      <div className="relative px-3 pt-8">
        {/* the calm arch frame: mint arch with a thin gold outline set a little apart */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-16 top-0 -z-10 rounded-t-full bg-[#E8F5E9]" />
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute -inset-x-3 -top-3 bottom-[3.25rem] -z-10 rounded-t-full border-2 border-b-0 border-[#CB9615]/60"
        />
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[3.25rem] bg-[#14261A] p-2.5 shadow-[0_40px_70px_-40px_rgba(10,74,19,0.7)]"
        >
          <Phone
            screen={screen}
            setScreen={setScreen}
            className="h-[calc(100svh-180px)] max-h-[860px] min-h-[720px] rounded-[2.6rem] bg-[#FBF8F1]"
          />
        </motion.div>
      </div>

      {/* step through the features at your own pace */}
      <div className="mt-6 rounded-[2rem] bg-white p-3 ring-1 ring-black/10">
        <p className="text-center text-lg text-gray-700">
          Feature {at + 1} of {features.length}: <strong className="text-[#14261A]">{titles[screen]}</strong>
        </p>
        <div aria-hidden="true" className="mx-auto mt-2 flex w-fit gap-1.5">
          {features.map((f, i) => (
            <span key={f.screen} className={cn("h-2 rounded-full transition-all duration-300", i === at ? "w-6 bg-[#0A4A13]" : "w-2 bg-[#0A4A13]/20")} />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button type="button" disabled={at === 0} onClick={() => setScreen(features[at - 1].screen)} className={cn(stepBtn, "border-2 border-[#117F21] bg-white text-[#0A4A13] enabled:hover:bg-[#117F21] enabled:hover:text-white")}>
            <ArrowLeft className="h-5 w-5" aria-hidden="true" /> Previous
          </button>
          <button type="button" disabled={at === features.length - 1} onClick={() => setScreen(features[at + 1].screen)} className={cn(stepBtn, "bg-[#F4D27A] text-[#1A1206] enabled:hover:bg-[#FFE08F]")}>
            Next <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-x-clip bg-[#FBF8F1] text-[#14261A]">
        <PageHero
          id="mobile-title"
          crumbs={[{ label: "Home", to: "/" }, { label: "Mobile app" }]}
          pill={{ icon: Smartphone, label: "App preview" }}
          title="The PenCom app, in your pocket"
          mark="in your pocket"
          intro={<p>A preview of the PenCom app for Android and iOS. Choose a feature below to see it on the phone, or tap around the phone itself.</p>}
          actions={featureList}
          aside={phone}
        />

        <section aria-labelledby="app-built-title" className={cn(sectionCls, "bg-white")}>
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              id="app-built-title"
              eyebrow="Built for everyone"
              title="Made for the way people really read"
              highlight="really read"
              intro="The app follows the same rules as the website: plain words, labelled buttons and nothing behind a login."
            />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {builtFor.map((b, i) => (
                <li key={b.title}>
                  <Rise delay={i * 0.06} className="h-full">
                    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-black/10 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_50px_-28px_rgba(10,74,19,0.55)] hover:ring-2 hover:ring-[#117F21]">
                      <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#E8F5E9] transition-transform duration-500 group-hover:scale-150" />
                      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A4A13] text-[#F4D27A] transition-transform duration-300 group-hover:-rotate-6">
                        <b.icon className="h-7 w-7" aria-hidden="true" />
                      </span>
                      <h3 className="relative mt-5 text-xl font-bold">{b.title}</h3>
                      <p className="relative mt-2 flex-1 text-lg leading-relaxed text-gray-700">{b.body}</p>
                      <button
                        type="button"
                        onClick={() => { setScreen(b.screen); showPhone(); }}
                        className={cn("relative mt-6 inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 border-[#117F21] px-5 text-lg font-semibold text-[#0A4A13] transition hover:bg-[#117F21] hover:text-white", focus)}
                      >
                        Show me on the phone <ArrowRight className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </Rise>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
