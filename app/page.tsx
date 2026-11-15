'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MobileNav from '../components/MobileNav';
import SenaLogo from '../components/SenaLogo';
import SpaceWindow from '../components/SpaceWindow';

export default function Home() {
  const [showTrainingNotice, setShowTrainingNotice] = useState(false);

  useEffect(() => {
    if (!showTrainingNotice) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowTrainingNotice(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [showTrainingNotice]);

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f3f6f4] pb-24 font-sans text-[#18342f] selection:bg-[#cce8e3] md:pb-10">

      <header className="z-30 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 md:flex-row">
        <div className="mx-auto md:mx-0">
          <SenaLogo />
        </div>

        <div className="z-40 hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={() => setShowTrainingNotice(true)}
            className="cursor-pointer rounded-2xl bg-[#138078] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#138078]/15 transition-all hover:bg-[#0d6b65] active:scale-95"
          >
            New Investigation
          </button>
          <Link href="/user" className="pointer-events-auto cursor-pointer">
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-[#cbd9d6] bg-[#e7f1ef] shadow-inner transition-transform hover:scale-105">
              <Image src="/ber2.png" alt="Foto de perfil" fill sizes="44px" className="object-contain" />
            </div>
          </Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-8 px-6 py-4 lg:grid-cols-12 lg:gap-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.3)_0%,rgba(20,130,120,0.18)_40%,rgba(14,165,233,0.08)_65%,transparent_80%)] blur-[65px] lg:left-[35%]"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex min-h-[480px] flex-col items-center justify-center lg:col-span-6 lg:min-h-[560px] lg:translate-x-8"
        >
          <div className="relative mt-4 flex w-full items-center justify-center">
            <SpaceWindow />

            <motion.div
              animate={{ y: [0, -18, 0], rotate: [-3, 3, -3] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute -bottom-6 left-2 z-40 w-72 drop-shadow-[0_25px_30px_rgba(0,0,0,0.35)] md:-bottom-8 md:left-8 md:w-96"
            >
              <img
                src="/sena.png"
                alt="Astronauta Sena flotando"
                className="h-auto w-full object-contain"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.section
          aria-labelledby="welcome-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto flex w-full max-w-[560px] flex-col gap-5 lg:col-span-6 lg:mt-0"
        >
          <div className="text-center lg:text-left">
            <p className="font-mono text-[10px] tracking-[0.18em] text-[#c27a1b]">YOUR FIRST DISCOVERY STARTS HERE</p>
            <h1 id="welcome-title" className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#18342f] md:text-4xl">
              Hello, detective!
            </h1>
            <p className="mx-auto mt-2 max-w-[440px] text-sm leading-6 text-[#627a74] lg:mx-0 md:text-base">
              Join Sen to investigate real climate data and uncover your first discovery.
            </p>
          </div>

          <Link
            href="/missions"
            className="group rounded-[24px] outline-none transition-transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#138078] focus-visible:ring-offset-4"
          >
            <article className="relative overflow-hidden rounded-[24px] border border-[#cbd9d6] bg-white p-5 shadow-[0_16px_40px_rgba(27,48,43,0.09)] md:p-6">
              <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-14 h-40 w-40 rounded-full bg-[#e7f1ef] transition-transform duration-500 group-hover:scale-125" />
              <div className="relative flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e7f1ef] text-[#138078]">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
                    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                    <path d="M10 21h4" />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] tracking-[0.08em] text-[#a66a1e]">MISSION 00 · YOUR TUTORIAL</p>
                  <h2 className="mt-1 font-serif text-[21px] leading-tight text-[#18342f] md:text-2xl">Start your journey</h2>
                </div>
                <span className="shrink-0 rounded-full bg-[#f7eee2] px-3 py-1 font-mono text-[10px] text-[#a66a1e]">NEW</span>
              </div>
              <div className="relative mt-4 flex items-center justify-between border-t border-[#e7eeeb] pt-3 text-sm text-[#627a74]">
                <span>Investigate the rain around Valencia with Sen.</span>
                <span aria-hidden="true" className="ml-3 text-lg text-[#138078] transition-transform group-hover:translate-x-1">→</span>
              </div>
            </article>
          </Link>

          <article aria-label="Mission 01, locked until you complete Mission 00" className="rounded-[24px] border border-[#d7dfdc] bg-[#edf1ef]/80 p-5 opacity-75 md:p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#dfe8e5] text-[#71827d]">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                  <rect x="5" y="10" width="14" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 1 1 8 0v3m-4 4v3" />
                </svg>
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] tracking-[0.08em] text-[#71827d]">MISSION 01 · PEER REVIEW</p>
                <h2 className="mt-1 font-serif text-[21px] leading-tight text-[#50635e] md:text-2xl">Review the crew’s reports</h2>
              </div>
              <span className="shrink-0 rounded-full bg-[#e1e7e5] px-3 py-1 font-mono text-[10px] text-[#71827d]">LOCKED</span>
            </div>
            <p className="mt-4 border-t border-[#d7dfdc] pt-3 text-sm text-[#71827d]">Complete Mission 00 to unlock this investigation.</p>
          </article>
        </motion.section>
      </div>

      <MobileNav />

      {showTrainingNotice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#10182a]/65 px-5 py-8 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowTrainingNotice(false);
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="training-notice-title"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative w-full max-w-[390px] rounded-[28px] border border-[#cbd9d6] bg-[#f3f6f4] p-6 text-center text-[#18342f] shadow-[0_24px_80px_rgba(0,0,0,0.3)]"
          >
            <button
              type="button"
              onClick={() => setShowTrainingNotice(false)}
              aria-label="Close notice"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#e7f1ef] text-xl text-[#526c66] transition-colors hover:bg-[#d9e9e5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#138078]"
            >
              ×
            </button>
            <div className="relative mx-auto h-40 w-40">
              <Image src="/sena3.png" alt="Sen" fill sizes="160px" className="object-contain" />
            </div>
            <h2 id="training-notice-title" className="mt-3 font-sans text-[22px] font-bold leading-tight">
              You have to complete your training first!
            </h2>
            <button
              type="button"
              onClick={() => setShowTrainingNotice(false)}
              className="mt-5 min-h-11 rounded-full bg-[#138078] px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-[#0d6b65] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#138078]"
            >
              Got it
            </button>
          </motion.section>
        </motion.div>
      )}
    </main>
  );
}