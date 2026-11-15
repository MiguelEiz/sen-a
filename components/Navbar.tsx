'use client';

import Link from 'next/link';
import Image from 'next/image';
import SenaLogo from './SenaLogo';

export default function Navbar() {
  return (
    <header className="w-full max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between z-30 gap-4">
      <div className="mx-auto md:mx-0">
        <SenaLogo />
      </div>

      <div className="hidden md:flex items-center gap-4 z-40">
        <button className="bg-[#f27457] hover:bg-[#e06346] text-white font-bold text-sm px-6 py-2.5 rounded-2xl border-2 border-slate-900 shadow-[0_4px_0_0_#0f172a] transition-all active:translate-y-[2px] cursor-pointer">
        New Investigation
        </button>

        <Link href="/user" className="cursor-pointer pointer-events-auto">
          <div className="relative w-11 h-11 rounded-full bg-pink-100 border-2 border-pink-300 overflow-hidden flex items-center justify-center shadow-inner hover:scale-105 transition-transform">
            <Image src="/ber2.png" alt="Foto de perfil" fill sizes="44px" className="object-contain" />
          </div>
        </Link>
      </div>
    </header>
  );
}