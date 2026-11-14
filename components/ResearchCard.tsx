interface ResearchCardProps {
  trendText: string;
  trendType: 'up' | 'down';
  title: React.ReactNode;
  subtitle: string;
}

export default function ResearchCard({ trendText, trendType, title, subtitle }: ResearchCardProps) {
  return (
    <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 shadow-[0_6px_0_0_#0f172a] hover:translate-y-[-2px] transition-all cursor-pointer flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border border-slate-900 ${
          trendType === 'up' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
        }`}>
          {trendText} {trendType === 'up' ? '📈' : '📉'}
        </span>
      </div>
      <h3 className="text-lg font-bold text-slate-900 font-sans">
        {title}
      </h3>
      <p className="text-sm text-slate-500 font-sans">
        {subtitle}
      </p>
    </div>
  );
}