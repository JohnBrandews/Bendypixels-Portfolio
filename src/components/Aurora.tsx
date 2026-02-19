import { useMemo } from 'react';

type AuroraProps = {
  colorStops: string[];
  blend?: number;
  amplitude?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function Aurora({
  colorStops = ['#2A3439', '#C0C0C0', '#2A3439'],
  blend = 0.35,
  className = '',
  style = {},
}: AuroraProps) {
  const [c0, c1, c2] = colorStops;

  const blobs = useMemo(
    () => [
      { x: 20, y: 20, size: 60 },
      { x: 70, y: 60, size: 50 },
      { x: 40, y: 70, size: 55 },
      { x: 80, y: 25, size: 45 },
    ],
    []
  );

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        background: c0,
        ...style,
      }}
      aria-hidden
    >
      {blobs.map((blob, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            width: `${blob.size}%`,
            aspectRatio: '1',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${i % 2 === 0 ? c1 : c2} 0%, transparent 70%)`,
            filter: 'blur(48px)',
            opacity: blend * 0.4,
          }}
        />
      ))}
    </div>
  );
}
