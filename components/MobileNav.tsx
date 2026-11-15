'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSyncExternalStore, type ReactNode } from 'react';
import {
  getServerTutorialProgress,
  isTutorialComplete,
  subscribeToTutorialProgress,
} from '../lib/tutorialProgress';

function NavigationItem({
  href,
  label,
  active,
  disabled,
  children,
}: {
  href: string;
  label: string;
  active: boolean;
  disabled: boolean;
  children: ReactNode;
}) {
  const className = `transition-colors ${disabled ? 'cursor-not-allowed text-[#b8c5c1]' : active ? 'text-[#173630]' : 'text-[#617872]'}`;

  if (disabled) {
    return (
      <button
        type="button"
        aria-label={`${label}, bloqueado hasta completar el tutorial`}
        aria-disabled="true"
        title="Completa el tutorial para desbloquear"
        disabled
        className={className}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={className}
    >
      {children}
    </Link>
  );
}

export default function MobileNav({ locked = false }: { locked?: boolean }) {
  const pathname = usePathname();
  const tutorialComplete = useSyncExternalStore(
    subscribeToTutorialProgress,
    isTutorialComplete,
    getServerTutorialProgress,
  );
  const navigationLocked = locked || !tutorialComplete;

  const isActive = (path: string) => pathname === path;

  return (
    <nav aria-label="Navegación inferior" className="fixed bottom-0 left-0 right-0 z-50 flex h-[67px] items-center justify-around bg-[#f7f9f8]/95 px-6 shadow-[0_-8px_20px_rgba(27,48,43,0.12)] backdrop-blur-md md:hidden">
      <NavigationItem href="/" label="Inicio" active={isActive('/')} disabled={navigationLocked}>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[29px] w-[29px]">
          <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
        </svg>
      </NavigationItem>
      <NavigationItem href="/missions" label="Misiones" active={isActive('/missions')} disabled={navigationLocked}>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[29px] w-[29px]">
          <path d="M5 21V4m0 1h13l-2.5 4L18 13H5" />
        </svg>
      </NavigationItem>
      <NavigationItem href="/missions/tutorial" label="Tutorial" active={isActive('/missions/tutorial')} disabled={navigationLocked}>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[29px] w-[29px]">
          <circle cx="10.5" cy="10.5" r="7.5" />
          <path d="m16 16 5 5M7 12l2-2 2 2 3-4" />
        </svg>
      </NavigationItem>
      <NavigationItem href="/observatory" label="Free investigation" active={isActive('/observatory')} disabled={navigationLocked}>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[29px] w-[29px]">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      </NavigationItem>
      <NavigationItem href="/user" label="Perfil" active={isActive('/user')} disabled={false}>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-[29px] w-[29px]">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21v-1a8 8 0 0 1 16 0v1" />
        </svg>
      </NavigationItem>
    </nav>
  );
}