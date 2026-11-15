import EarthGlobe from './earthGlobe';

interface SpaceWindowProps {
  size?: 'home' | 'fullscreen';
}

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

export default function SpaceWindow({ size = 'home' }: SpaceWindowProps) {
  const isFullscreen = size === 'fullscreen';

  return (
    <div
      className={`relative flex items-center justify-center rounded-full border-[5px] border-[#18342f] bg-gradient-to-tr from-slate-300 via-slate-100 to-slate-400 ${
        isFullscreen
          ? 'h-[min(86vw,78vh)] w-[min(86vw,78vh)] p-[clamp(16px,4vmin,36px)] shadow-[0_30px_70px_rgba(0,0,0,0.15)]'
          : 'h-[340px] w-[340px] p-[26px] shadow-[0_30px_70px_rgba(0,0,0,0.15)] md:h-[440px] md:w-[440px]'
      }`}
    >
      {bolts.map((position, index) => (
        <div
          key={index}
          aria-hidden="true"
          className="pointer-events-none absolute z-40 h-3.5 w-3.5 rounded-full border border-slate-600 bg-gradient-to-br from-white via-slate-300 to-slate-500 shadow-[inset_0_1px_2px_white,0_2px_4px_rgba(0,0,0,0.5)] md:h-4 md:w-4"
          style={{
            top: position.top,
            left: position.left,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-[6px] border-[#627a74] bg-[#020617] shadow-[inset_0_12px_30px_rgba(0,0,0,0.9)]">
        <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
          <div
            className={`relative overflow-hidden rounded-full ${
              isFullscreen
                ? 'h-full w-full'
                : 'h-[280px] w-[280px] md:h-[380px] md:w-[380px]'
            }`}
          >
            <EarthGlobe showHUD={false} initialDistance={4.2} />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-full">
          <div className="absolute right-[16%] top-[12%] h-[14%] w-[32%] rotate-[-38deg] rounded-[100%] bg-gradient-to-br from-white/70 via-white/25 to-transparent blur-[3px]" />
          <div className="absolute right-[10%] top-[20%] h-[6%] w-[20%] rotate-[-38deg] rounded-full bg-gradient-to-r from-white/50 to-transparent blur-[2px]" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-20 rounded-full shadow-[inset_0_0_35px_rgba(0,180,255,0.25),inset_0_0_90px_rgba(56,189,248,0.12)]" />
      </div>
    </div>
  );
}
