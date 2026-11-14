'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function UserProfile() {
  return (
    <main className="min-h-screen bg-[#fdfbf7] text-slate-800 flex flex-col font-sans selection:bg-cyan-200 relative overflow-hidden">
      
      {/* 1. NAVBAR SUPERIOR */}
      <header className="w-full max-w-7xl mx-auto px-8 py-6 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <span className="font-extrabold text-2xl tracking-tighter text-slate-900 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Sena*
            </span>
          </Link>
          <div className="hidden sm:block text-[10px] text-slate-400 font-medium leading-tight">
            Agencia Acústica<br />Espacial
          </div>
        </div>

        {/* Botón de volver al inicio */}
        <Link href="/">
          <button className="bg-slate-200/80 hover:bg-slate-300 text-slate-700 text-sm font-medium px-5 py-2 rounded-2xl transition-all cursor-pointer">
            ← Volver al Inicio
          </button>
        </Link>
      </header>

      {/* 2. CONTENIDO DEL PERFIL DE USUARIO */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-8 py-8 flex flex-col gap-8 z-10">
        
        {/* Tarjeta de cabecera del perfil */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center gap-6"
        >
          <div className="w-24 h-24 rounded-full bg-pink-100 border-4 border-pink-300 overflow-hidden flex items-center justify-center shadow-inner text-4xl">
            👩‍🚀
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200/50">
              Comandante de Misión
            </span>
            <h1 className="text-2xl font-bold text-slate-900 mt-2">Dra. Astra Vance</h1>
            <p className="text-sm text-slate-400 font-medium">Especialista en Observación de la Tierra · NASA Space Apps</p>
          </div>

          <button className="bg-[#f27457] hover:bg-[#e06346] text-white text-sm font-medium px-6 py-2.5 rounded-2xl shadow-md shadow-orange-500/15 transition-all cursor-pointer">
            Editar Perfil
          </button>
        </motion.div>

        {/* Sección de estadísticas o investigaciones del usuario */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Mis Investigaciones Activas
          </h2>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                En curso
              </span>
              <h3 className="font-bold text-slate-900 mt-1 text-base">¿Se está volviendo más verde el Sahel?</h3>
              <p className="text-xs text-slate-400">Última sincronización: Hace 2 horas</p>
            </div>
            <button className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer">
              Ver detalles →
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold px-3 py-0.5 rounded-full bg-amber-50 text-amber-700">
                Revisión pendiente
              </span>
              <h3 className="font-bold text-slate-900 mt-1 text-base">Análisis de NO2 en Europa Central</h3>
              <p className="text-xs text-slate-400">Última sincronización: Ayer</p>
            </div>
            <button className="text-sm font-semibold text-blue-600 hover:underline cursor-pointer">
              Ver detalles →
            </button>
          </div>
        </motion.div>

      </div>
    </main>
  );
}