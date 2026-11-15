import Image from 'next/image';
import Link from 'next/link';

export default function SenaLogo() {
  return (
    <Link href="/" aria-label="Sena, ir al inicio" className="inline-flex shrink-0 items-center justify-center">
      <Image
        src="/loggg.png"
        alt="Sena"
        width={160}
        height={160}
        priority
        className="h-[78px] w-[78px] object-contain"
      />
    </Link>
  );
}
