import React from 'react';

interface LogoProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export function Logo({ size = 79, className = '', style }: LogoProps) {
  return (
    <img
      src="/images/one.png"
      alt="Sahkaar logo"
      width={
        {
          '640px': '50px',
          '768px': '60px',
          '1024px': '70px',
          '1280px': '79px',
          '1536px': '89px',
          default: '79px',
        }[size]
      }
      height={
        {
          '640px': '50px',
          '768px': '60px',
          '1024px': '70px',
          '1280px': '79px',
          '1536px': '89px',
          default: '79px',
        }[size]
      }
      className={`sahkaar-logo ${className}`}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        objectFit: 'cover',
        borderRadius: '6px',
        backgroundColor:'#F3F2ED',
        paddingBottom:'1px',
        ...style,
      }}
    />
  );
}
