import React from 'react';

export type PixelButtonVariant = 'default' | 'primary' | 'danger';

export function PixelButton({
  children,
  onClick,
  variant = 'default',
  disabled,
  full,
  small,
  title,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: PixelButtonVariant;
  disabled?: boolean;
  full?: boolean;
  small?: boolean;
  title?: string;
}) {
  const classes = ['pixel-btn', `variant-${variant}`, small ? 'small' : '', full ? 'full' : ''].filter(Boolean).join(' ');
  return (
    <button title={title} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
