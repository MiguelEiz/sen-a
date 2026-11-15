'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import MobileNav from './MobileNav';
import SenaLogo from './SenaLogo';

const senMoments = [
  {
    image: '/sena4.png',
    message: 'Thank you for joining me on your first mission, detective!',
    label: 'A warm welcome',
  },
  {
    image: '/sena1.png',
    message: 'You investigated the rain around Valencia and found your first clues.',
    label: 'The investigation',
  },
  {
    image: '/SEARCH2.png',
    message: 'You learned to read trends and ask whether the evidence is strong.',
    label: 'Reading the evidence',
  },
  {
    image: '/sena3.png',
    message: 'You made your own call and saved your reasoning in a constellation.',
    label: 'Your own verdict',
  },
  {
    image: '/sena5.png',
    message: 'Then you checked the crew’s reports and spotted the faulty reasoning.',
    label: 'Peer review',
  },
  {
    image: '/sena11.png',
    message: 'I’m proud of you. There are many more discoveries waiting out there!',
    label: 'Until the next discovery',
  },
];

const starPositions = [
  'left-[12%] top-[15%]',
  'left-[82%] top-[19%]',
  'left-[8%] top-[52%]',
  'left-[91%] top-[58%]',
  'left-[22%] top-[79%]',
  'left-[75%] top-[83%]',
  'left-[54%] top-[10%]',
  'left-[45%] top-[91%]',
];

export default function MissionThanks() {
  const [momentIndex, setMomentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const moment = senMoments[momentIndex];

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setMomentIndex((current) => (current + 1) % senMoments.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#293453] px-5 pb-28 text-[#f3f1e8] md:pb-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[18%] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#63749b]/15 blur-3xl" />
        {starPositions.map((position, index) => (
          <motion.span
            key={position}
            className={`absolute ${position} h-1 w-1 rounded-full bg-[#f3c9a7]`}
            animate={prefersReducedMotion ? undefined : { opacity: [0.25, 1, 0.25], scale: [0.8, 1.5, 0.8] }}
            transition={{ duration: 2.4 + (index % 3) * 0.65, delay: index * 0.18, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex min-h-dvh w-full max-w-[760px] flex-col items-center">
        <header className="flex h-[92px] items-start justify-center pt-5 md:h-[110px] md:pt-6">
          <SenaLogo imageSrc="/loggg_011.png" />
        </header>

        <section aria-labelledby="thanks-title" className="flex w-full flex-1 flex-col items-center justify-center pb-8 text-center md:pb-12">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[10px] tracking-[0.18em] text-[#b8d7d1]"
          >
          </motion.p>
          <motion.h1
            id="thanks-title"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 max-w-[620px] font-sans text-[32px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[40px] md:text-[52px]"
          >
            Thank you, detective!
          </motion.h1>
          <p className="mt-3 max-w-[520px] text-[14px] leading-5 text-[#c6d3db] md:text-[16px] md:leading-6">
            You completed the tutorial, made your own discovery and helped the crew.
          </p>

          <div className="mt-7 flex w-full flex-col items-center gap-3 md:mt-9 md:flex-row md:items-center md:gap-8">
            <div className="relative flex h-[220px] w-full max-w-[260px] shrink-0 items-center justify-center sm:h-[260px] sm:max-w-[300px]">
              <motion.div
                aria-hidden="true"
                className="absolute h-[190px] w-[190px] rounded-full border border-[#718097]/50 sm:h-[225px] sm:w-[225px]"
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute h-[148px] w-[148px] rounded-full border border-dashed border-[#f3c9a7]/40 sm:h-[175px] sm:w-[175px]"
                animate={prefersReducedMotion ? undefined : { rotate: -360 }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                key={moment.image}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 15, scale: 0.94 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: [0, -7, 0], scale: 1 }}
                transition={{ duration: 0.55, y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' } }}
                className="relative h-[200px] w-[200px] sm:h-[240px] sm:w-[240px]"
              >
                <Image src={moment.image} alt={`Sen: ${moment.label}`} fill sizes="(max-width: 640px) 200px, 240px" className="object-contain drop-shadow-[0_16px_30px_rgba(9,15,34,0.35)]" priority />
              </motion.div>
            </div>

            <div className="w-full max-w-[440px] text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={moment.message}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  aria-live="polite"
                  className="relative rounded-[26px] border border-[#718097] bg-[#f3f6f4] p-5 text-[#18342f] shadow-[0_18px_50px_rgba(9,15,34,0.2)] sm:p-6"
                >
                  <span aria-hidden="true" className="absolute -top-2 left-9 h-4 w-4 rotate-45 border-l border-t border-[#718097] bg-[#f3f6f4] md:-left-2 md:top-10" />
                  <p className="font-mono text-[9px] tracking-[0.15em] text-[#a66a1e]">SEN · {moment.label.toUpperCase()}</p>
                  <p className="mt-2 font-serif text-[21px] leading-[1.2] sm:text-[24px]">{moment.message}</p>
                  <div className="mt-4 flex items-center gap-1.5" aria-label={`Message ${momentIndex + 1} of ${senMoments.length}`}>
                    {senMoments.map((item, index) => (
                      <span key={item.label} className={`h-1.5 rounded-full transition-all ${index === momentIndex ? 'w-6 bg-[#138078]' : 'w-1.5 bg-[#cbd9d6]'}`} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </section>
      </div>

      <MobileNav />
    </main>
  );
}
