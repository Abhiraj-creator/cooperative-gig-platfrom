import React from 'react';

interface LogoProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export function Logo({ size = 36, className = '', style }: LogoProps) {
  return (
    <img
      src="/images/logo.png"
      alt="Sahkaar logo"
      width={size}
      height={size}
      className={`sahkaar-logo ${className}`}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        objectFit: 'contain',
        borderRadius: '6px',
        ...style,
      }}
    />
  );
}
