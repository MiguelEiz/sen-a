'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#fdfbf7]/95 backdrop-blur-md border-t border-slate-200/80 py-3 px-6 flex items-center justify-around z-50 md:hidden shadow-lg">
      <Link 
        href="/" 
        className={`flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-110 ${
          isActive('/') ? 'opacity-100 scale-105' : 'opacity-70 hover:opacity-100'
        }`}
      >
        <span className="text-2xl">🏠</span>
      </Link>

      <Link 
        href="/user" 
        className={`flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-110 ${
          isActive('/user') ? 'opacity-100 scale-105' : 'opacity-70 hover:opacity-100'
        }`}
      >
        <span className="text-2xl">👩‍🚀</span>
      </Link>

      <button className="flex flex-col items-center gap-1 cursor-pointer opacity-70 hover:opacity-100 hover:scale-110 transition-transform">
        <span className="text-2xl">📜</span>
      </button>

      <button className="flex flex-col items-center gap-1 cursor-pointer opacity-70 hover:opacity-100 hover:scale-110 transition-transform">
        <span className="text-2xl">🔍</span>
      </button>

      <button className="flex flex-col items-center gap-1 cursor-pointer opacity-70 hover:opacity-100 hover:scale-110 transition-transform">
        <span className="text-2xl">✍️</span>
      </button>
    </div>
  );
}