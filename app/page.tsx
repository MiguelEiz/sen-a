'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ResearchCard from '../components/ResearchCard';
import MobileNav from '../components/MobileNav';
import SenaLogo from '../components/SenaLogo';
import SpaceWindow from '../components/SpaceWindow';

export default function Home() {
  const researchItems = [
    {
      trendText: "Tendencia al alza",
      trendType: "up" as const,
      title: "¿Se está volviendo más verde el Sahel?",
      subtitle: "Vegetación (NDVI) · Sahel · 2000–2025"
    },
    {
      trendText: "Tendencia a la baja",
      trendType: "down" as const,
      title: <>¿Ha bajado el NO<sub>2</sub> sobre las grandes ciudades europeas?</>,
      subtitle: "Calidad del aire · Europa · 2005–2025"
    },
    {
      trendText: "Tendencia al alza",
      trendType: "up" as const,
      title: "¿Se está volviendo más verde el Sahel?",
      subtitle: "Vegetación (NDVI) · Sahel · 2000–2025"
    }
  ];

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f3f6f4] pb-24 font-sans text-[#18342f] selection:bg-[#cce8e3] md:pb-10">

      {/* 1. NAVBAR SUPERIOR */}
      <header className="z-30 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 md:flex-row">
        <div className="mx-auto md:mx-0">
          <SenaLogo />
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#627a74] md:flex">
          <Link href="/missions" className="flex cursor-pointer items-center gap-2 transition-colors hover:text-[#138078]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#c27a1b] shadow-sm shadow-[#c27a1b]"></span>
            Misiones
          </Link>
          <a href="#investigations" className="cursor-pointer transition-colors hover:text-[#138078]">
            Otras Investigaciones
          </a>
        </nav>

        <div className="z-40 hidden items-center gap-4 md:flex">
          <button className="cursor-pointer rounded-2xl bg-[#138078] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#138078]/15 transition-all hover:bg-[#0d6b65] active:scale-95">
            Nueva Investigación
          </button>
          <Link href="/user" className="cursor-pointer pointer-events-auto">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-2 border-[#cbd9d6] bg-[#e7f1ef] shadow-inner transition-transform hover:scale-105">
              <span className="text-xl">👩‍🚀</span>
            </div>
          </Link>
        </div>
      </header>

      {/* 2. CONTENIDO PRINCIPAL A DOS COLUMNAS */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-4 z-10 relative">

        {/* HALO AZUL ESPACIAL (DEGRADADO DE FONDO) */}
        <div className="
          absolute
          left-1/2 lg:left-[35%]
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          h-[600px] w-[600px]
          rounded-full
          bg-[radial-gradient(circle,rgba(56,189,248,0.3)_0%,rgba(20,130,120,0.18)_40%,rgba(14,165,233,0.08)_65%,transparent_80%)]
          blur-[65px]
          pointer-events-none
          z-0
        " />

        {/* COLUMNA IZQUIERDA: ESCOTILLA Y ASTRONAUTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[480px] md:min-h-[560px] z-10 lg:translate-x-8"
        >
          <div className="relative flex items-center justify-center w-full mt-4">

            <SpaceWindow />

            {/* ASTRONAUTA SENA MOVIDA MÁS HACIA LA DERECHA (left-4 md:left-8) */}
            <motion.div 
              animate={{ 
                y: [0, -18, 0], 
                rotate: [-3, 3, -3] 
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute left-2 md:left-8 -bottom-6 md:-bottom-8 z-40 pointer-events-none w-72 md:w-96 filter drop-shadow-[0_25px_30px_rgba(0,0,0,0.35)]"
            >
              <img 
                src="/sena.png" 
                alt="Astronauta Sena flotando" 
                className="w-full h-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </motion.div>

          </div>
        </motion.div>

        {/* COLUMNA DERECHA: INVESTIGACIONES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 flex flex-col gap-4 mt-6 lg:mt-0 z-10"
        >
          <h2 id="investigations" className="mb-2 text-center font-serif text-2xl font-bold tracking-tight text-[#18342f] md:text-3xl lg:text-left">
            Últimas Investigaciones
          </h2>

          {researchItems.map((item, index) => (
            <ResearchCard
              key={index}
              trendText={item.trendText}
              trendType={item.trendType}
              title={item.title}
              subtitle={item.subtitle}
            />
          ))}

        </motion.div>
      </div>

     <MobileNav />
    </main>
  );
}