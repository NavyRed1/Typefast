import React from 'react';

interface State {
  error: Error | null;
}

const SAVE_KEY = 'typequest.save.v1';

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack?: string }) {
    // Surface it in the console too — a caught error still shouldn't be silent.
    // eslint-disable-next-line no-console
    console.error('TypeQuest crashed:', error, info?.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div
        style={{
          minHeight: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          background: '#05060a',
        }}
      >
        <div
          style={{
            maxWidth: 480,
            background: '#121520',
            border: '2px solid #f85252',
            boxShadow: '4px 4px 0 #05060a',
            padding: 24,
            fontFamily: "'VT323', monospace",
            color: '#f5f7ff',
            textAlign: 'center',
          }}
        >
          <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 16, color: '#f85252', marginBottom: 14 }}>
            SOMETHING WENT WRONG
          </div>
          <p style={{ fontSize: 18, color: '#a7aec4' }}>
            TypeQuest hit an unexpected error and can't continue. This is usually fixed by reloading; if it keeps
            happening, your saved game data may be corrupted and resetting it will help.
          </p>
          <p style={{ fontSize: 14, color: '#626a80', wordBreak: 'break-word' }}>{error.message}</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16 }}>
            <button onClick={() => window.location.reload()} style={buttonStyle('#34d3ff', '#05060a')}>
              RELOAD
            </button>
            <button
              onClick={() => {
                try {
                  window.localStorage.removeItem(SAVE_KEY);
                } catch {
                  // ignore — storage may be unavailable
                }
                window.location.reload();
              }}
              style={buttonStyle('#f85252', '#05060a')}
            >
              RESET SAVE
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function buttonStyle(bg: string, fg: string): React.CSSProperties {
  return {
    fontFamily: "'Press Start 2P', monospace",
    fontSize: 11,
    color: fg,
    background: bg,
    border: '2px solid #05060a',
    borderRadius: 999,
    padding: '10px 16px',
    cursor: 'pointer',
  };
}
