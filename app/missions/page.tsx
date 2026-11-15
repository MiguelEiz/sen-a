'use client';

import { useSyncExternalStore } from 'react';
import MobileNav from '../../components/MobileNav';
import SenaLogo from '../../components/SenaLogo';
import Link from 'next/link';
import { getServerTutorialProgress, isTutorialComplete, subscribeToTutorialProgress } from '../../lib/tutorialProgress';

function WaterDropIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2.5C9.2 6.6 5 11 5 15.2a7 7 0 0 0 14 0C19 11 14.8 6.6 12 2.5Z" />
    </svg>
  );
}

export default function MissionsPage() {
  const tutorialComplete = useSyncExternalStore(
    subscribeToTutorialProgress,
    isTutorialComplete,
    getServerTutorialProgress,
  );

  return (
    <main className="min-h-screen bg-[#f3f6f4] text-[#18342f]">
      <div className="mx-auto min-h-screen w-full max-w-[1120px] px-[21px] pb-24 md:px-10">
        <header className="flex flex-col items-center">
          <div className="flex h-[91px] items-start justify-center pt-[25px] md:h-[110px] md:pt-[30px]">
            <SenaLogo />
          </div>
        </header>

        <section aria-labelledby="missions-title" className="mt-[12px] md:mt-12 md:grid md:grid-cols-[minmax(0,0.85fr)_minmax(420px,1fr)] md:items-center md:gap-16">
          <div className="md:pb-10">
            <p className="font-mono text-[11px] tracking-wide text-[#c27a1b] md:text-[13px]">THIS WEEK</p>
            <h1 id="missions-title" className="mt-1 font-serif text-[31px] leading-[1.05] tracking-[-0.035em] md:text-[48px]">
              Weekly missions
            </h1>
            <p className="mt-1 text-[16px] leading-5 text-[#657d77] md:mt-3 md:max-w-[380px] md:text-[18px] md:leading-7">
              Two missions. New ones arrive on Monday.
            </p>
            <p className="mt-[31px] hidden text-left font-mono text-[10px] tracking-[0.08em] text-[#627a74] md:block">
              RESETS IN 2 DAYS
            </p>
          </div>

          <div>
            <Link href="/missions/tutorial" className="mt-[18px] block rounded-[23px] outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#138078] md:mt-0">
              <article className="rounded-[23px] border border-[#cbd9d6] bg-white px-[15px] pb-[15px] pt-[15px] shadow-[0_12px_36px_rgba(27,48,43,0.06)] md:rounded-[28px] md:px-8 md:pb-8 md:pt-8">
                <div className="flex items-center gap-[10px]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e7f1ef] text-[#138078] md:h-10 md:w-10">
                    <WaterDropIcon />
                  </span>
                  <p className="flex-1 font-nunito text-[10px] tracking-[0.03em] text-[#c27a1b] md:text-[11px]">
                    {tutorialComplete ? 'MISSION 00 · COMPLETE' : 'MISSION 00 · TUTORIAL'}
                  </p>
                  <span className="rounded-full bg-[#f7eee2] px-[10px] py-[5px] font-mono text-[10px] text-[#c27a1b] md:text-[11px]">
                    +50 XP
                  </span>
                </div>

                <h2 className="mt-[7px] font-serif text-[24px] leading-[1.1] tracking-[-0.025em] md:mt-4 md:text-[34px]">
                  Valencia Raining
                </h2>
                <p className="mt-[7px] text-[14px] leading-[18px] text-[#657d77] md:mt-3 md:text-[16px] md:leading-6">
                  Does it rain differently than it used to?
                  <br />
                  Let’s find out using real NASA data.
                </p>

                <div className="mt-[15px] flex items-center gap-6 md:mt-7">
                  <div
                    role="progressbar"
                    aria-label="Progreso de misiones"
                    aria-valuemin={0}
                    aria-valuemax={1}
                    aria-valuenow={tutorialComplete ? 1 : 0}
                    className="h-[6px] flex-1 overflow-hidden rounded-full bg-[#cbd9d6]"
                  >
                    <div className={`h-full rounded-full bg-[#138078] transition-all duration-700 ${tutorialComplete ? 'w-full' : 'w-0'}`} />
                  </div>
                  <span className="font-mono text-[11px] text-[#627a74]">{tutorialComplete ? '1/1' : '0/1'}</span>
                </div>
              </article>
            </Link>
            <p className="mt-[31px] text-center font-mono text-[10px] tracking-[0.08em] text-[#627a74] md:hidden">
              RESETS IN 2 DAYS
            </p>
          </div>
        </section>
      </div>

      <MobileNav />
    </main>
  );
}
