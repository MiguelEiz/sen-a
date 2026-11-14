'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import EarthGlobe from '../components/earthGlobe';
import ResearchCard from '../components/ResearchCard';
import MobileNav from '../components/MobileNav';

export default function Home() {
  // Los 8 pernos posicionados simétricamente sobre el aro metálico exterior
  const bolts = [
    { top: '3%', left: '50%' },
    { top: '16.8%', left: '83.2%' },
    { top: '50%', left: '97%' },
    { top: '83.2%', left: '83.2%' },
    { top: '97%', left: '50%' },
    { top: '83.2%', left: '16.8%' },
    { top: '50%', left: '3%' },
    { top: '16.8%', left: '16.8%' },
  ];

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
    <main className="min-h-screen bg-[#fdfbf7] text-slate-800 flex flex-col font-sans selection:bg-cyan-200 relative pb-24 md:pb-10 overflow-x-hidden">

      {/* 1. NAVBAR SUPERIOR */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between z-30 gap-4">
        <div className="flex flex-col items-center md:items-start mx-auto md:mx-0">
          <span className="font-extrabold text-3xl tracking-tight text-slate-900 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Sena*
          </span>
          <span className="text-[10px] text-slate-500 font-medium tracking-wide text-center">
            Agencia de Detectives Espaciales
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          <button className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-sm shadow-red-500"></span>
            Misiones
          </button>
          <button className="hover:text-blue-600 transition-colors cursor-pointer">
            Otras Investigaciones
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-4 z-40">
          <button className="bg-[#f27457] hover:bg-[#e06346] text-white text-sm font-medium px-6 py-2.5 rounded-2xl shadow-md shadow-orange-500/15 transition-all active:scale-95 cursor-pointer">
            Nueva Investigación
          </button>
          <Link href="/user" className="cursor-pointer pointer-events-auto">
            <div className="w-11 h-11 rounded-full bg-pink-100 border-2 border-pink-300 overflow-hidden flex items-center justify-center shadow-inner hover:scale-105 transition-transform">
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
          w-[600px] h-[600px]
          rounded-full
          bg-[radial-gradient(circle,rgba(56,189,248,0.4)_0%,rgba(59,130,246,0.25)_40%,rgba(14,165,233,0.1)_65%,transparent_80%)]
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

            {/* ESCOTILLA / VENTANA ESPACIAL */}
            <div className="relative w-[340px] h-[340px] md:w-[440px] md:h-[440px] rounded-full p-[26px] bg-gradient-to-tr from-slate-300 via-slate-100 to-slate-400 border-[5px] border-slate-900 shadow-[0_30px_70px_rgba(0,0,0,0.15)] flex items-center justify-center z-0">

              {/* 8 PERNOS METÁLICOS DISTRIBUIDOS SOBRE EL ARO EXTERIOR */}
              {bolts.map((position, index) => (
                <div
                  key={index}
                  className="
                    absolute
                    w-3.5 h-3.5 md:w-4 md:h-4
                    rounded-full
                    bg-gradient-to-br from-white via-slate-300 to-slate-500
                    border border-slate-600
                    shadow-[inset_0_1px_2px_white,0_2px_4px_rgba(0,0,0,0.5)]
                    z-40
                    pointer-events-none
                  "
                  style={{
                    top: position.top,
                    left: position.left,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}

              {/* CAVIDAD INTERIOR OSCURA */}
              <div className="
                relative
                w-full h-full
                rounded-full
                bg-[#020617]
                border-[6px] border-slate-700/90
                shadow-[inset_0_12px_30px_rgba(0,0,0,0.9)]
                overflow-hidden
                flex items-center justify-center
              ">

                {/* GLOBO TERRÁQUEO 3D */}
                <div className="absolute inset-0 w-full h-full z-10 flex items-center justify-center">
                  <div className="w-[280px] h-[280px] md:w-[380px] md:h-[380px] relative rounded-full overflow-hidden">
                    <EarthGlobe showHUD={false} initialDistance={4.2} />
                  </div>
                </div>

                {/* REFLEJOS REALISTAS DEL CRISTAL (PÍLDORAS) */}
                <div className="absolute inset-0 pointer-events-none z-30 rounded-full overflow-hidden">
                  <div className="
                    absolute
                    top-[12%] right-[16%]
                    w-[32%] h-[14%]
                    rounded-[100%]
                    rotate-[-38deg]
                    bg-gradient-to-br from-white/70 via-white/25 to-transparent
                    blur-[3px]
                  " />
                  <div className="
                    absolute
                    top-[20%] right-[10%]
                    w-[20%] h-[6%]
                    rounded-full
                    rotate-[-38deg]
                    bg-gradient-to-r from-white/50 to-transparent
                    blur-[2px]
                  " />
                </div>

                {/* ILUMINACIÓN INTERIOR DEL CRISTAL */}
                <div className="
                  absolute inset-0
                  rounded-full
                  shadow-[inset_0_0_35px_rgba(0,180,255,0.25),inset_0_0_90px_rgba(56,189,248,0.12)]
                  pointer-events-none
                  z-20
                " />
              </div>
            </div>

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
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-2 text-center lg:text-left font-serif">
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