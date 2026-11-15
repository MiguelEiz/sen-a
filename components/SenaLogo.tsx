import Image from 'next/image';

export default function SenaLogo({ imageSrc = '/loggg.png' }: { imageSrc?: string }) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center">
      <Image
        src={imageSrc}
        alt="Sena"
        width={160}
        height={160}
        priority
        className="h-[78px] w-[78px] object-contain"
      />
    </span>
  );
}
