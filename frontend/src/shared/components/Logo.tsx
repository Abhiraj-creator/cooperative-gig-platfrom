import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function Logo({ size = 24, className = '', style, ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`sahkaar-logo ${className}`}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      {...props}
    >
      {/* Center People Silhouettes */}
      {/* Center Person (Tall) */}
      <circle cx="100" cy="74" r="14" />
      <path d="M 82 116 C 82 94, 118 94, 118 116 Z" />

      {/* Left Person */}
      <circle cx="67" cy="85" r="10.5" />
      <path d="M 53 116 C 53 99, 81 99, 81 116 Z" />

      {/* Right Person */}
      <circle cx="133" cy="85" r="10.5" />
      <path d="M 119 116 C 119 99, 147 99, 147 116 Z" />

      {/* Top Hand / Swoop (Upper part of S) */}
      <path d="M 182 42 
               C 155 14, 105 10, 65 22 
               C 25 34, 10 68, 20 104 
               C 25 122, 36 136, 50 146 
               C 38 132, 30 112, 34 92 
               C 40 62, 70 40, 105 38 
               C 138 36, 168 54, 178 80 
               C 183 68, 184 54, 182 42 Z" />

      {/* Top Hand Finger Cutout 1 */}
      <path
        d="M 120 23 C 145 25, 166 35, 177 50"
        stroke="var(--background, #f3f2ed)"
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Top Hand Finger Cutout 2 */}
      <path
        d="M 105 17 C 135 18, 160 28, 173 42"
        stroke="var(--background, #f3f2ed)"
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Bottom Hand / Swoop (Lower part of S) */}
      <path d="M 18 158 
               C 45 186, 95 190, 135 178 
               C 175 166, 190 132, 180 96 
               C 175 78, 164 64, 150 54 
               C 162 68, 170 88, 166 108 
               C 160 138, 130 160, 95 162 
               C 62 164, 32 146, 22 120 
               C 17 132, 16 146, 18 158 Z" />

      {/* Bottom Hand Finger Cutout 1 */}
      <path
        d="M 80 177 C 55 175, 34 165, 23 150"
        stroke="var(--background, #f3f2ed)"
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Bottom Hand Finger Cutout 2 */}
      <path
        d="M 95 183 C 65 182, 40 172, 27 158"
        stroke="var(--background, #f3f2ed)"
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
