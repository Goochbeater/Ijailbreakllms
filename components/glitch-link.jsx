'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function GlitchLink({
  href,
  children,
  glitchText = "Jailbreaks Here",
  className = "",
  interval = 30000,
  duration = 3000,
  ...props
}) {
  const [displayText, setDisplayText] = useState(children);
  const [isGlitching, setIsGlitching] = useState(false);

  // Sync displayText when children change
  useEffect(() => {
    if (!isGlitching) {
      setDisplayText(children);
    }
  }, [children, isGlitching]);

  useEffect(() => {
    let timeout;

    const triggerGlitch = () => {
      setIsGlitching(true);
      setDisplayText(glitchText);

      // Revert after duration
      timeout = setTimeout(() => {
        setDisplayText(children);
        setIsGlitching(false);
      }, duration);
    };

    // Initial trigger after interval
    const timer = setInterval(triggerGlitch, interval);

    return () => {
      clearInterval(timer);
      if (timeout) clearTimeout(timeout);
    };
  }, [children, glitchText, interval, duration]);

  // Merge classes
  // When glitching, we want to override the color and font.
  // Using !important classes (e.g. !text-green-500) to ensure override.
  const combinedClassName = isGlitching
    ? `${className} !text-green-500 font-mono animate-pulse tracking-widest`
    : className;

  return (
    <Link
      href={href}
      className={combinedClassName}
      {...props}
    >
      {displayText}
    </Link>
  );
}
