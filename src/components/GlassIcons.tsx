import React from 'react';

const iconSize = 22;
const IconGlobe = () => (
  <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconPalette = () => (
  <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.75-.2 2.5-.5" />
  </svg>
);

const IconEdit = () => (
  <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export type ServiceTab = 'websites' | 'branding' | 'writing';

export interface GlassIconItem {
  value: ServiceTab;
  label: string;
  icon: React.ReactNode;
  color?: string;
}

const defaultItems: GlassIconItem[] = [
  { value: 'websites', label: 'Websites', icon: <IconGlobe />, color: 'blue' },
  { value: 'branding', label: 'Branding', icon: <IconPalette />, color: 'purple' },
  { value: 'writing', label: 'Writing', icon: <IconEdit />, color: 'orange' },
];

type GlassIconsProps = {
  items?: GlassIconItem[];
  activeTab: ServiceTab;
  onTabChange: (tab: ServiceTab) => void;
  colorful?: boolean;
  className?: string;
};

const colorMap: Record<string, string> = {
  blue: 'var(--color-cyan)',
  purple: '#a78bfa',
  orange: '#fb923c',
  indigo: '#818cf8',
  red: '#f87171',
  green: '#4ade80',
};

export default function GlassIcons({
  items = defaultItems,
  activeTab,
  onTabChange,
  colorful = false,
  className = '',
}: GlassIconsProps) {
  return (
    <div className={`glass-icons-wrap ${className}`.trim()}>
      <div className="glass-icons-grid">
        {items.map((item) => {
          const isActive = activeTab === item.value;
          const accent = colorful && item.color ? colorMap[item.color] || colorMap.blue : 'rgba(255,255,255,0.9)';
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onTabChange(item.value)}
              className="glass-icon-card"
              data-active={isActive}
              style={
                {
                  '--glass-accent': accent,
                } as React.CSSProperties
              }
            >
              <span className="glass-icon-card__icon">{item.icon}</span>
              <span className="glass-icon-card__label">{item.label}</span>
            </button>
          );
        })}
      </div>
      <style>{`
        .glass-icons-wrap {
          width: 100%;
          max-width: 520px;
          margin: 0 auto;
          position: relative;
          background: var(--glass-bg);
          border: 1px solid rgba(0, 255, 255, 0.25);
          border-radius: 24px;
          padding: 1rem clamp(0.75rem, 3vw, 1.5rem);
          box-shadow: 0 4px 24px rgba(0, 255, 255, 0.12);
        }
        .glass-icons-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(100px, 1fr));
          gap: clamp(0.5rem, 2vw, 1rem);
        }
        .glass-icon-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          aspect-ratio: 1;
          padding: 1.25rem;
          min-width: 0;
          background: rgba(0, 180, 200, 0.15);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 255, 255, 0.2);
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--color-text);
          font-weight: 600;
          font-size: 0.9rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
        }
        .glass-icon-card .glass-icon-card__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-cyan);
        }
        .glass-icon-card .glass-icon-card__label {
          letter-spacing: 0.02em;
          color: var(--color-text);
        }
        /* Tablet: slightly smaller tabs */
        @media (max-width: 640px) {
          .glass-icons-wrap {
            max-width: 100%;
            padding: 0.85rem 1rem;
            border-radius: 20px;
          }
          .glass-icons-grid {
            grid-template-columns: repeat(3, minmax(80px, 1fr));
            gap: 0.5rem;
          }
          .glass-icon-card {
            padding: 0.85rem 0.5rem;
            font-size: 0.85rem;
            gap: 0.4rem;
          }
          .glass-icon-card .glass-icon-card__icon {
            width: 20px;
            height: 20px;
          }
          .glass-icon-card .glass-icon-card__icon svg {
            width: 18px;
            height: 18px;
          }
        }
        /* Mobile: stacked layout with proper touch targets */
        @media (max-width: 480px) {
          .glass-icons-wrap {
            padding: 0.6rem 0.75rem;
            border-radius: 16px;
          }
          .glass-icons-grid {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
          .glass-icon-card {
            aspect-ratio: auto;
            flex-direction: row;
            justify-content: flex-start;
            padding: 0.65rem 1rem;
            min-height: 48px;
            border-radius: 12px;
            font-size: 0.9rem;
            gap: 0.65rem;
          }
          .glass-icon-card .glass-icon-card__icon {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
          }
          .glass-icon-card .glass-icon-card__icon svg {
            width: 22px;
            height: 22px;
          }
        }
        .glass-icon-card:hover {
          background: rgba(0, 200, 220, 0.22);
          border-color: rgba(0, 255, 255, 0.35);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 255, 255, 0.15);
        }
        .glass-icon-card[data-active="true"] {
          background: rgba(0, 255, 255, 0.2);
          border-color: var(--color-cyan);
          box-shadow: 0 4px 20px rgba(0, 255, 255, 0.25);
        }
        .glass-icon-card:focus-visible {
          outline: 2px solid var(--color-cyan);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
