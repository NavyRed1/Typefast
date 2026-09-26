import React from 'react';

export function PixelTitle({
  children,
  size = 40,
  color,
  className,
}: {
  children: React.ReactNode;
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={['tq-title-outline', className].filter(Boolean).join(' ')}
      style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: size,
        lineHeight: 1.15,
        letterSpacing: 1,
        color,
      }}
    >
      {children}
    </div>
  );
}
