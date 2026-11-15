'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav({ locked = false }: { locked?: boolean }) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav aria-label="Navegación inferior" className={`fixed bottom-0 left-0 right-0 z-50 flex h-[67px] items-center justify-around bg-[#f7f9f8]/95 px-6 shadow-[0_-8px_20px_rgba(27,48,43,0.12)] backdrop-blur-md md:hidden ${locked ? 'pointer-events-none' : ''}`}>
      <Link
        href="/"
        tabIndex={locked ? -1 : undefined}
        aria-label="Inicio"
        aria-current={isActive('/') ? 'page' : undefined}
        className={`transition-colors ${isActive('/') ? 'text-[#173630]' : 'text-[#617872]'}`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[29px] w-[29px]">
          <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
        </svg>
      </Link>
      <Link
        href="/missions"
        tabIndex={locked ? -1 : undefined}
        aria-label="Misiones"
        aria-current={isActive('/missions') ? 'page' : undefined}
        className={`transition-colors ${isActive('/missions') ? 'text-[#173630]' : 'text-[#617872]'}`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[29px] w-[29px]">
          <path d="M5 21V4m0 1h13l-2.5 4L18 13H5" />
        </svg>
      </Link>
      <Link
        href="/#investigations"
        tabIndex={locked ? -1 : undefined}
        aria-label="Investigaciones"
        className="text-[#617872] transition-colors hover:text-[#173630]"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[29px] w-[29px]">
          <circle cx="10.5" cy="10.5" r="7.5" />
          <path d="m16 16 5 5M7 12l2-2 2 2 3-4" />
        </svg>
      </Link>
      <Link
        href="/#new-investigation"
        tabIndex={locked ? -1 : undefined}
        aria-label="Nueva investigación"
        className="text-[#617872] transition-colors hover:text-[#173630]"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[29px] w-[29px]">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      </Link>
      <Link
        href="/user"
        tabIndex={locked ? -1 : undefined}
        aria-label="Perfil"
        aria-current={isActive('/user') ? 'page' : undefined}
        className={`transition-colors ${isActive('/user') ? 'text-[#173630]' : 'text-[#617872]'}`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[29px] w-[29px]">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21v-1a8 8 0 0 1 16 0v1" />
        </svg>
      </Link>
    </nav>
  );
}