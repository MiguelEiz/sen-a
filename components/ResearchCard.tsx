interface ResearchCardProps {
  trendText: string;
  trendType: 'up' | 'down';
  title: React.ReactNode;
  subtitle: string;
}

export default function ResearchCard({ trendText, trendType, title, subtitle }: ResearchCardProps) {
  return (
    <article className="flex cursor-pointer flex-col gap-2 rounded-[22px] border border-[#cbd9d6] bg-white p-5 shadow-[0_6px_20px_rgba(27,48,43,0.035)] transition-all hover:-translate-y-0.5 hover:border-[#9fbdb7] hover:shadow-[0_10px_26px_rgba(27,48,43,0.07)]">
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
          trendType === 'up' ? 'bg-[#e7f1ef] text-[#138078]' : 'bg-[#f7eee2] text-[#a66a1e]'
        }`}>
          {trendText} {trendType === 'up' ? '📈' : '📉'}
        </span>
      </div>
      <h3 className="font-serif text-[20px] font-semibold leading-snug text-[#18342f]">
        {title}
      </h3>
      <p className="text-sm leading-5 text-[#657d77]">
        {subtitle}
      </p>
    </article>
  );
}