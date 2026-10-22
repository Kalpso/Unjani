import React from 'react';

interface LogoProps {
  variant?: 'horizontal' | 'symbol' | 'compact';
  theme?: 'light' | 'dark' | 'monochrome';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  className = '',
}) => {
  // Brand color mappings
  const primaryFill =
    theme === 'dark' ? '#F7F2E8' : theme === 'monochrome' ? '#202923' : '#103D32';
  const accentEmerald =
    theme === 'dark' ? '#20B486' : theme === 'monochrome' ? '#5A685D' : '#20B486';
  const warmTerracotta =
    theme === 'dark' ? '#E5926F' : theme === 'monochrome' ? '#8F9B91' : '#C77852';
  const textColor =
    theme === 'dark' ? 'text-[#F7F2E8]' : theme === 'monochrome' ? 'text-[#202923]' : 'text-[#103D32]';

  // The UNJANI Geometric Symbol: Interconnected arching pathways meeting at a forward-ascending node
  const SymbolSvg = (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 shrink-0 transition-transform duration-200 hover:scale-105"
      aria-hidden="true"
    >
      {/* Base Foundation Arc (Community ground) */}
      <path
        d="M6 26C6 19.3726 11.3726 14 18 14"
        stroke={accentEmerald}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Upward Ascending Bridge Arc (Progress) */}
      <path
        d="M14 26C14 17.1634 21.1634 10 30 10"
        stroke={primaryFill}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* Confluence Node (The collective meeting point) */}
      <circle cx="18" cy="14" r="3.2" fill={warmTerracotta} />
      {/* Forward Pinnacle Node (Visible outcome) */}
      <circle cx="30" cy="10" r="3" fill={accentEmerald} />
      {/* Ground horizontal stabilizer */}
      <line x1="6" y1="28" x2="24" y2="28" stroke={primaryFill} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );

  if (variant === 'symbol') {
    return <div className={`inline-flex items-center ${className}`}>{SymbolSvg}</div>;
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        {SymbolSvg}
        <span className={`font-display text-lg font-bold tracking-tight ${textColor}`}>
          UNJANI
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {SymbolSvg}
      <div className="flex flex-col leading-none">
        <span className={`font-display text-xl font-extrabold tracking-tight ${textColor}`}>
          UNJANI
        </span>
      </div>
    </div>
  );
};
