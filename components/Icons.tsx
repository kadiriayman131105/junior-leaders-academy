import type { ReactNode } from "react";

type IconProps = { className?: string };

export function WhatsAppIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.4a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 13.9c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.42-.14-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.2-1.16-1.54-1.16-2.94 0-1.4.73-2.08 1-2.37.24-.26.64-.38.86-.38h.62c.2 0 .46-.04.72.55.26.64.9 2.2.98 2.36.08.16.13.35.03.56-.1.22-.16.35-.3.54-.14.18-.3.4-.42.54-.14.14-.28.3-.12.58.16.28.72 1.18 1.54 1.91 1.06.94 1.95 1.24 2.23 1.38.28.14.44.12.6-.06.16-.2.7-.8.88-1.08.18-.28.38-.22.64-.14.26.08 1.66.78 1.94.92.28.14.48.22.54.34.08.12.08.7-.16 1.38Z" />
    </svg>
  );
}

export function PhoneIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.8h2.2l1.2 3-1.6 1a12.5 12.5 0 0 0 5.9 5.9l1-1.6 3 1.2v2.2c0 .8-.6 1.5-1.4 1.6A16 16 0 0 1 4 6.2c.1-.8.8-1.4 1.6-1.4Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className} aria-hidden="true" fill="currentColor">
      <path d="M14.2 21v-7.1h2.4l.4-2.8h-2.8V9.3c0-.8.2-1.4 1.4-1.4H17V5.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2h-2.4v2.8H11V21h3.2Z" />
    </svg>
  );
}

export function MenuIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function SunIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6" />
    </svg>
  );
}

export function MoonIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 13.2A6.2 6.2 0 0 1 10.8 5 6.4 6.4 0 1 0 19 14.6a6.2 6.2 0 0 1-2.5-1.4Z" />
    </svg>
  );
}

export function CloseIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function Stroke({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      {children}
    </svg>
  );
}

export function LanguagesIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <Stroke className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 6h8M9 6c0 6-3 9-6 11M8 12c.8 1.6 2.2 3 4.2 4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 20 17 10l4 10M14.4 17h5.2" />
    </Stroke>
  );
}

export function CompassIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <Stroke className={className}>
      <circle cx="12" cy="12" r="8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.8 9.2-1.2 4.4-4.4 1.2 1.2-4.4 4.4-1.2Z" />
    </Stroke>
  );
}

export function SparkIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <Stroke className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.5 13.6 9 19 10.5 13.6 12 12 17.5 10.4 12 5 10.5 10.4 9 12 3.5Z" />
      <path strokeLinecap="round" d="M18 15.5 18.7 17.3 20.5 18 18.7 18.7 18 20.5 17.3 18.7 15.5 18 17.3 17.3 18 15.5Z" />
    </Stroke>
  );
}

export function StarIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <Stroke className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m12 4 1.9 4.2 4.6.5-3.4 3.1.9 4.5L12 14.2 7.9 16.3l1-4.5L5.5 8.7l4.6-.5L12 4Z" />
    </Stroke>
  );
}
