import React, { useEffect, useRef, useState } from 'react';

export function TypeCapture({
  enabled,
  onChar,
  onBackspace,
  autoFocusDesktop = true,
  children,
}: {
  enabled: boolean;
  onChar: (ch: string) => void;
  onBackspace: () => void;
  /** Auto-focus immediately when enabled (fine on desktop; mobile browsers
   *  ignore programmatic focus without a user gesture, so touch users
   *  always see the tap prompt regardless of this flag). */
  autoFocusDesktop?: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const focus = () => ref.current?.focus();

  useEffect(() => {
    if (enabled && autoFocusDesktop) focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return (
    <div style={{ position: 'relative' }} onClick={() => enabled && focus()}>
      {children}

      <input
        ref={ref}
        defaultValue=""
        disabled={!enabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e: any) => {
          const val = e.currentTarget.value;
          if (val.length > 0) {
            for (const ch of val) onChar(ch);
            e.currentTarget.value = '';
          } else {
            onBackspace();
          }
        }}
        onKeyDown={(e: any) => {
          if (e.key === 'Backspace') {
            onBackspace();
            e.preventDefault();
          }
        }}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        inputMode="text"
        enterKeyHint="done"
        aria-label="Type the passage shown above"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1,
          height: 1,
          opacity: 0,
          border: 'none',
          padding: 0,
          pointerEvents: 'none',
        }}
      />

      {enabled && !focused && (
        <div
          onClick={(e: any) => {
            e.stopPropagation();
            focus();
          }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(5,6,10,0.55)',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 13,
              color: '#f5f7ff',
              background: '#121520',
              border: '2px solid #34d3ff',
              boxShadow: '4px 4px 0 #05060a',
              padding: '10px 16px',
            }}
          >
            TAP TO TYPE
          </div>
        </div>
      )}
    </div>
  );
}
