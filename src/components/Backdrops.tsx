import React from 'react';

const backdropBase: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
};

function Fireflies({ count = 10, color = '#e8ffb0' }: { count?: number; color?: string }) {
  const dots = Array.from({ length: count }, (_, i) => i);
  return (
    <>
      {dots.map((i) => {
        const left = (i * 137.5) % 100;
        const top = 20 + ((i * 71) % 60);
        const delay = (i % 7) * 0.35;
        return (
          <div
            key={i}
            className="tq-twinkle"
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: `${top}%`,
              width: 3,
              height: 3,
              borderRadius: '50%',
              background: color,
              boxShadow: `0 0 6px 2px ${color}`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </>
  );
}

/** Dashboard / main-menu backdrop — a sunlit forest clearing. */
export function ForestBackdrop() {
  const trunks = [8, 20, 78, 90];
  return (
    <div style={{ ...backdropBase, background: 'linear-gradient(180deg,#0a1a12 0%,#0f2418 45%,#183321 75%,#1f3d26 100%)' }}>
      {/* canopy */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '18%',
          background: 'linear-gradient(180deg,#0c150c 0%, rgba(12,21,12,0) 100%)',
        }}
      />
      {/* light beams */}
      {[18, 38, 60].map((left, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '-10%',
            left: `${left}%`,
            width: 90,
            height: '90%',
            background: 'linear-gradient(180deg, rgba(214,240,180,0.16) 0%, rgba(214,240,180,0.03) 70%, transparent 100%)',
            transform: `rotate(${8 - i * 6}deg)`,
          }}
        />
      ))}
      {/* trunks */}
      {trunks.map((left, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            bottom: 0,
            left: `${left}%`,
            width: 34 + (i % 2) * 12,
            height: '62%',
            background: 'linear-gradient(90deg,#1c1109 0%,#3a2416 45%,#1c1109 100%)',
            borderRadius: '6px 6px 0 0',
          }}
        />
      ))}
      {/* sunlit clearing glow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          width: '70%',
          height: '30%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse at 50% 100%, rgba(210,240,140,0.35) 0%, rgba(210,240,140,0) 70%)',
        }}
      />
      <Fireflies count={12} />
    </div>
  );
}

/** Outdoor battle backdrop — bright cartoon sky with drifting clouds. */
export function SkyBackdrop() {
  return (
    <div style={{ ...backdropBase, background: 'linear-gradient(180deg,#3fa9dc 0%,#7fd0ee 55%,#bfe8f5 100%)' }}>
      {[
        { top: '12%', size: 120, dur: '50s' },
        { top: '28%', size: 90, dur: '65s' },
        { top: '8%', size: 70, dur: '42s' },
      ].map((c, i) => (
        <div
          key={i}
          className="tq-cloud"
          style={{
            position: 'absolute',
            top: c.top,
            left: `${20 + i * 30}%`,
            width: c.size,
            height: c.size * 0.4,
            background: '#ffffff',
            borderRadius: 999,
            boxShadow: `${c.size * 0.35}px ${c.size * 0.08}px 0 -${c.size * 0.08}px #ffffff, -${c.size * 0.3}px ${c.size * 0.12}px 0 -${c.size * 0.12}px #ffffff`,
            opacity: 0.9,
            animationDuration: c.dur,
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '14%',
          background: 'linear-gradient(180deg,#7bc142 0%,#4f8f2a 100%)',
        }}
      />
    </div>
  );
}

/** Interior / dark-area battle backdrop — a cave with slanted light shafts. */
export function CaveBackdrop() {
  return (
    <div style={{ ...backdropBase, background: 'linear-gradient(180deg,#0a0c14 0%,#141222 55%,#1c1930 100%)' }}>
      {[10, 32, 56, 78].map((left, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '-10%',
            left: `${left}%`,
            width: 60,
            height: '110%',
            background: 'linear-gradient(180deg, rgba(180,200,255,0.14) 0%, rgba(180,200,255,0.02) 70%, transparent 100%)',
            transform: `rotate(${10 - i * 5}deg)`,
          }}
        />
      ))}
      <Fireflies count={14} color="#bcd7ff" />
    </div>
  );
}
