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

const achievements: {
  icon: string;
  title: string;
  description: string;
  progress: string;
  inProgress: boolean;
  unlockOnTutorial?: boolean;
}[] = [
  {
    icon: '🚀',
    title: 'Primer despegue',
    description: 'Completa tu primera misión',
    progress: '0/1',
    inProgress: false,
    unlockOnTutorial: true,
  },
  {
    icon: '🌧️',
    title: 'Cazatormentas',
    description: 'Investiga la lluvia de Valencia',
    progress: '0/1',
    inProgress: false,
    unlockOnTutorial: true,
  },
  {
    icon: '◎',
    title: 'Segunda opinión',
    description: 'Revisa una conclusión con criterio',
    progress: '0/1',
    inProgress: false,
    unlockOnTutorial: true,
  },
  {
    icon: '🌍',
    title: 'Ojos en la Tierra',
    description: 'Explora datos de nuestro planeta',
    progress: '1/3',
    inProgress: true,
  },
  {
    icon: '🔭',
    title: 'Detective espacial',
    description: 'Descubre 5 patrones en los datos',
    progress: '2/5',
    inProgress: true,
  },
];

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
  const completedAchievements = tutorialComplete ? achievements.filter((achievement) => achievement.unlockOnTutorial).length : 0;

  return (
    <main className="min-h-screen bg-[#f3f6f4] text-[#18342f]">
      <div className="mx-auto min-h-screen w-full max-w-[760px] px-5 pb-24 sm:px-8">
        <header className="flex h-[91px] items-start justify-center pt-[25px] md:h-[104px] md:items-center md:justify-between md:pt-0">
          <SenaLogo />
          <Link
            href="/"
            className="hidden rounded-full border border-[#cbd9d6] bg-white px-4 py-2 font-mono text-[11px] tracking-wide text-[#627a74] transition-colors hover:border-[#138078] hover:text-[#138078] md:inline-flex"
          >
            ← BACK TO SENTINEL
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
                <Image src="/ber2.png" alt="Foto de perfil" fill sizes="82px" className="object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="inline-flex rounded-full bg-[#e7f1ef] px-3 py-1 font-mono text-[10px] tracking-wide text-[#138078]">
                  MISSION COMMANDER
                </span>
                <h1 id="profile-title" className="mt-2 font-serif text-[28px] leading-tight tracking-[-0.03em]">
                  Dra. Astra Vance
                </h1>
                <p className="mt-1 text-[13px] leading-5 text-[#657d77]">
                  Especialista en observación de la Tierra
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
                aria-label="Progreso hasta el siguiente rango"
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
                  Logros
                </h2>
              </div>
              <span className="pb-1 font-mono text-[11px] text-[#627a74]">{completedAchievements} / {achievements.length} completados</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {achievements.map((achievement) => {
                const completed = Boolean(achievement.unlockOnTutorial && tutorialComplete);
                const inProgress = completed || achievement.inProgress;
                const progress = completed ? '1/1' : achievement.progress;
                const progressPercent = completed
                  ? 100
                  : (Number(progress.split('/')[0]) / Number(progress.split('/')[1])) * 100;

                return (
                  <article
                    key={achievement.title}
                    className={`flex min-h-[116px] gap-3 rounded-[20px] border p-4 ${
                      inProgress ? 'border-[#cbd9d6] bg-white' : 'border-[#dce5e2] bg-[#edf2f0]'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[22px] ${
                        inProgress ? 'bg-[#e7f1ef]' : 'bg-[#e2e9e6] grayscale'
                      }`}
                    >
                      {achievement.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif text-[17px] leading-5">{achievement.title}</h3>
                        <span className="shrink-0 font-mono text-[10px] text-[#627a74]">{progress}</span>
                      </div>
                      <p className="mt-1 text-[12px] leading-[17px] text-[#657d77]">{achievement.description}</p>
                      <p className="mt-2 font-mono text-[9px] tracking-wide text-[#627a74]">
                        {completed ? 'COMPLETADO' : inProgress ? 'EN PROGRESO' : 'BLOQUEADO'}
                      </p>
                      <div className="mt-1 h-[5px] overflow-hidden rounded-full bg-[#dce5e2]">
                        <div
                          className={`h-full rounded-full ${inProgress ? 'bg-[#138078]' : 'bg-[#cbd9d6]'}`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            aria-labelledby="investigations-title"
            className="pb-2"
          >
            <div className="mb-3 flex items-end justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] tracking-[0.12em] text-[#c27a1b]">CASE FILES</p>
                <h2 id="investigations-title" className="mt-1 font-serif text-[26px] leading-tight tracking-[-0.03em]">
                  Investigaciones
                </h2>
              </div>
              <span className="pb-1 font-mono text-[11px] text-[#627a74]">2 activas</span>
            </div>

            <div className="flex flex-col gap-3">
              <article className="rounded-[20px] border border-[#cbd9d6] bg-white p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-flex rounded-full bg-[#e7f1ef] px-2.5 py-1 font-mono text-[9px] tracking-wide text-[#138078]">
                      EN CURSO
                    </span>
                    <h3 className="mt-2 font-serif text-[18px] leading-snug">¿Se está volviendo más verde el Sahel?</h3>
                    <p className="mt-1 text-[12px] text-[#657d77]">Vegetación (NDVI) · Sahel · 2000–2025</p>
                  </div>
                  <span aria-hidden="true" className="text-xl">🌿</span>
                </div>
                <Link href="/observatory" className="mt-3 inline-flex font-mono text-[10px] tracking-wide text-[#138078] hover:text-[#0d5f59]">
                  ABRIR OBSERVATORIO →
                </Link>
              </article>

              <article className="rounded-[20px] border border-[#cbd9d6] bg-white p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-flex rounded-full bg-[#f7eee2] px-2.5 py-1 font-mono text-[9px] tracking-wide text-[#a66a1e]">
                      REVISIÓN PENDIENTE
                    </span>
                    <h3 className="mt-2 font-serif text-[18px] leading-snug">Análisis de NO₂ en Europa Central</h3>
                    <p className="mt-1 text-[12px] text-[#657d77]">Calidad del aire · Europa · 2005–2025</p>
                  </div>
                  <span aria-hidden="true" className="text-xl">🔎</span>
                </div>
                <p className="mt-3 font-mono text-[10px] tracking-wide text-[#627a74]">ÚLTIMA ACTUALIZACIÓN · AYER</p>
              </article>
            </div>
          </motion.section>
        </div>
      </div>

      <MobileNav />
    </main>
  );
}
