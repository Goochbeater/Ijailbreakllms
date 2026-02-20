'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

const CHARS = "0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function GlitchLink({
  href,
  children,
  className = "",
  interval = 4000,
  ...props
}) {
  const [displayText, setDisplayText] = useState(children);
  const [isScrambling, setIsScrambling] = useState(false);

  const isScramblingRef = useRef(false);
  const intervalRef = useRef(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const triggerScramble = useCallback(() => {
    if (isScramblingRef.current) return;

    isScramblingRef.current = true;
    setIsScrambling(true);

    let iteration = -5; // Start with full scramble for a bit
    const originalText = String(children);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      // Scramble logic
      const scrambled = originalText
        .split("")
        .map((char, index) => {
          if (index < Math.floor(iteration)) {
            return originalText[index];
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (iteration >= originalText.length) {
        clearInterval(intervalRef.current);
        isScramblingRef.current = false;
        setIsScrambling(false);
        setDisplayText(originalText);
      }

      iteration += 1 / 2; // Slower resolve
    }, 40); // 25fps

  }, [children]);

  // Periodic trigger
  useEffect(() => {
    const timer = setInterval(triggerScramble, interval);
    return () => clearInterval(timer);
  }, [interval, triggerScramble]);

  // Combined classes
  const scrambleClasses = isScrambling
    ? '!text-green-500 font-mono tracking-widest animate-pulse'
    : '';

  return (
    <Link
      href={href}
      className={`${className} transition-all duration-200 ${scrambleClasses}`}
      onMouseEnter={triggerScramble}
      {...props}
    >
      <span className="inline-block min-w-[140px] text-shadow-matrix">
        {displayText}
      </span>
      <style jsx>{`
        .text-shadow-matrix {
          text-shadow: ${isScrambling ? '0 0 8px rgba(34, 197, 94, 0.8)' : 'none'};
        }
      `}</style>
    </Link>
  );
}
