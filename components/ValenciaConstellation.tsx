type ValenciaConstellationProps = {
  rainVerdict: 'Lead' | 'Confirmed';
  className?: string;
};

export default function ValenciaConstellation({ rainVerdict, className = '' }: ValenciaConstellationProps) {
  return (
    <svg
      role="img"
      aria-label={`Valencia constellation connecting confirmed sea temperature, ${rainVerdict.toLowerCase()} rainfall, and a shared warming trend`}
      viewBox="0 0 340 260"
      className={`mx-auto w-full max-w-[340px] ${className}`}
    >
      <defs>
        <radialGradient id="constellation-glow">
          <stop stopColor="#f3c9a7" stopOpacity="0.5" />
          <stop offset="1" stopColor="#f3c9a7" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g fill="none" stroke="#7990a2" strokeWidth="1" opacity="0.32">
        <ellipse cx="170" cy="130" rx="143" ry="76" transform="rotate(-18 170 130)" />
        <ellipse cx="170" cy="130" rx="104" ry="119" transform="rotate(32 170 130)" />
        <ellipse cx="170" cy="130" rx="66" ry="92" transform="rotate(-56 170 130)" />
      </g>
      <g fill="none" stroke="#f3c9a7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M80 127 279 92 173 202 80 127" />
        <path d="M173 202 210 48 279 92" strokeDasharray="3 7" opacity="0.55" />
      </g>
      <g fill="#c6d3db" opacity="0.7">
        <circle cx="26" cy="66" r="1.5" /><circle cx="70" cy="220" r="1.5" />
        <circle cx="278" cy="32" r="1.5" /><circle cx="313" cy="174" r="1.5" />
        <circle cx="223" cy="238" r="1.5" /><circle cx="151" cy="26" r="1.5" />
      </g>
      <circle cx="80" cy="127" r="42" fill="url(#constellation-glow)" />
      <circle cx="80" cy="127" r="18" fill="#edb883" />
      <text x="80" y="134" textAnchor="middle" fill="#293453" fontSize="21">★</text>
      <circle cx="279" cy="92" r="18" fill="#34415f" stroke="#d78da7" strokeWidth="1.5" />
      <text x="279" y="99" textAnchor="middle" fill="#f3c9a7" fontSize="19">{rainVerdict === 'Confirmed' ? '★' : '☆'}</text>
      <circle cx="173" cy="202" r="12" fill="#f3f1e8" />
      <circle cx="173" cy="202" r="4" fill="#293453" />
      <circle cx="210" cy="48" r="9" fill="#f3f1e8" />
      <circle cx="210" cy="48" r="3" fill="#293453" />
      <text x="14" y="158" fill="#f3f1e8" fontSize="10">Sea · confirmed</text>
      <text x="235" y="123" fill="#f3f1e8" fontSize="10">Rain · {rainVerdict.toLowerCase()}</text>
      <text x="134" y="228" fill="#c6d3db" fontSize="10">shared trend</text>
      <text x="176" y="34" fill="#c6d3db" fontSize="9">Poyo basin</text>
    </svg>
  );
}
