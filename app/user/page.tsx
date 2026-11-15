'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import MobileNav from '../../components/MobileNav';
import SenaLogo from '../../components/SenaLogo';
import ValenciaConstellation from '../../components/ValenciaConstellation';
import {
  getFirstConstellation,
  getServerFirstConstellation,
  getServerTutorialProgress,
  isTutorialComplete,
  subscribeToTutorialProgress,
} from '../../lib/tutorialProgress';

export default function UserProfile() {
  const tutorialComplete = useSyncExternalStore(
    subscribeToTutorialProgress,
    isTutorialComplete,
    getServerTutorialProgress,
  );
  const firstConstellation = useSyncExternalStore(
    subscribeToTutorialProgress,
    getFirstConstellation,
    getServerFirstConstellation,
  );

  const totalXp = tutorialComplete ? 170 : 120;
  return (
    <main className="profile-page min-h-screen bg-[#f3f6f4] text-[#18342f]">
      <div className="mx-auto min-h-screen w-full max-w-[760px] px-5 pb-24 sm:px-8">
        <header className="flex h-[91px] items-start justify-center pt-[25px] md:h-[104px] md:items-center md:justify-between md:pt-0">
          <SenaLogo />
          <Link
            href="/"
            className="hidden rounded-full border border-[#cbd9d6] bg-white px-4 py-2 font-mono text-[11px] tracking-wide text-[#627a74] transition-colors hover:border-[#138078] hover:text-[#138078] md:inline-flex"
          >
            ← BACK TO SEN
          </Link>
        </header>

        <div className="flex flex-col gap-7">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            aria-labelledby="profile-title"
            className="rounded-[24px] border border-[#cbd9d6] bg-white p-5 shadow-[0_8px_24px_rgba(27,48,43,0.04)] sm:p-7"
          >
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <div className="relative h-[82px] w-[82px] shrink-0 overflow-hidden rounded-full border-[3px] border-[#cbd9d6] bg-[#e7f1ef]">
                <Image src="/ber2.png" alt="Profile picture" fill sizes="82px" className="object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="inline-flex rounded-full bg-[#e7f1ef] px-3 py-1 font-mono text-[10px] tracking-wide text-[#138078]">
                  MISSION COMMANDER
                </span>
                <h1 id="profile-title" className="mt-2 font-serif text-[28px] leading-tight tracking-[-0.03em]">
                  Dr. Astra Vance
                </h1>
                <p className="mt-1 text-[13px] leading-5 text-[#657d77]">
                  Earth observation specialist
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-center rounded-2xl bg-[#f7eee2] px-4 py-3 sm:min-w-[92px]">
                <span className="font-mono text-[10px] tracking-wide text-[#a66a1e]">TOTAL XP</span>
                <span className="mt-1 font-serif text-[24px] leading-none text-[#18342f]">{totalXp}</span>
              </div>
            </div>

            <div className="mt-6 border-t border-[#e7eeeb] pt-5">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[10px] tracking-wide text-[#627a74]">NEXT RANK · FIELD AGENT</p>
                <p className="font-mono text-[10px] text-[#627a74]">{totalXp} / 200 XP</p>
              </div>
              <div
                role="progressbar"
                aria-label="Progress to next rank"
                aria-valuemin={0}
                aria-valuemax={200}
                aria-valuenow={totalXp}
                className="mt-2 h-[7px] overflow-hidden rounded-full bg-[#e7eeeb]"
              >
                <div className="h-full rounded-full bg-[#138078] transition-all duration-700" style={{ width: `${(totalXp / 200) * 100}%` }} />
              </div>
            </div>
          </motion.section>

          {firstConstellation && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
              aria-labelledby="constellations-title"
              className="rounded-[24px] border border-[#455272] bg-[#293453] p-5 text-[#f3f1e8] shadow-[0_8px_24px_rgba(27,48,43,0.08)] sm:p-7"
            >
              <p className="font-mono text-[10px] tracking-[0.12em] text-[#f3c9a7]">MISSION 00 · VALENCIA</p>
              <h2 id="constellations-title" className="mt-1 font-serif text-[26px] leading-tight tracking-[-0.03em]">
                Your first constellation
              </h2>
              <ValenciaConstellation rainVerdict={firstConstellation.rainVerdict} className="my-3" />
              <div className="rounded-[18px] border border-[#455272] bg-[#202b49] p-4">
                <p className="font-mono text-[9px] tracking-[0.12em] text-[#b8d7d1]">YOUR FINDINGS & REASONING</p>
                <p className="mt-2 text-[12px] leading-[18px]">
                  Sea temperature: +0.48 °C per decade, confirmed. Poyo river basin wettest day: {firstConstellation.rainVerdict.toLowerCase()}.
                </p>
                <p className="mt-2 text-[12px] leading-[18px] text-[#c6d3db]">“{firstConstellation.rainReasoning}”</p>
              </div>
            </motion.section>
          )}

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            aria-labelledby="achievements-title"
          >
            <div className="mb-3 flex items-end justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] tracking-[0.12em] text-[#c27a1b]">YOUR PROGRESS</p>
                <h2 id="achievements-title" className="mt-1 font-serif text-[26px] leading-tight tracking-[-0.03em]">
                  Achievements
                </h2>
              </div>
              <span className="pb-1 font-mono text-[11px] text-[#627a74]">2 case files</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <article className="overflow-hidden rounded-[20px]">
                <Image
                  src="/investigacion_sahel.svg"
                  alt="Sahel investigation achievement: vegetation confirmed, rainfall clue, temperature not yet explored; in progress, 2 of 3."
                  width={600}
                  height={375}
                  className="h-auto w-full"
                />
              </article>
              <article className="overflow-hidden rounded-[20px]">
                <Image
                  src="/investigacion_no2.svg"
                  alt="Central Europe NO₂ investigation achievement: long-term trend and winter NO₂ confirmed; awaiting peer review."
                  width={600}
                  height={375}
                  className="h-auto w-full"
                />
              </article>
            </div>
          </motion.section>

        </div>
      </div>

      <MobileNav />
    </main>
  );
}
