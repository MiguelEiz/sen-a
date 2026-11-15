import EarthGlobe from '../../components/earthGlobe';

export default function ObservatoryPage() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#050b1e]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(110vw,95vh)] w-[min(110vw,95vh)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22)_0%,rgba(59,130,246,0.12)_42%,transparent_72%)] blur-[55px]"
      />
      <section
        aria-label="La Tierra girando en el espacio"
        className="relative z-10 h-[min(92vw,82vh)] w-[min(92vw,82vh)] max-h-[760px] max-w-[760px]"
      >
        <EarthGlobe showHUD={false} initialDistance={4.2} />
      </section>
    </main>
  );
}
