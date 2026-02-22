'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const CHARS = "0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function GlitchText({
  children,
  className = "",
  as: Component = 'span',
  interval = 0, // Set to > 0 for auto-trigger
  hover = true,
  scrambleColor = 'text-green-500', // Allow customizing the color
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

    let iteration = 0;
    const originalText = String(children);

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
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
        setDisplayText(originalText); // Ensure it resolves perfectly
      }

      iteration += 1 / 3;
    }, 30);

  }, [children]);

  // Periodic trigger
  useEffect(() => {
    if (interval > 0) {
      const timer = setInterval(triggerScramble, interval);
      return () => clearInterval(timer);
    }
  }, [interval, triggerScramble]);

  const scrambleClasses = isScrambling
    ? `${scrambleColor} font-mono tracking-widest`
    : '';

  return (
    <Component
      className={`${className} transition-all duration-200 inline-block ${scrambleClasses}`}
      onMouseEnter={hover ? triggerScramble : undefined}
      {...props}
    >
      {displayText}
    </Component>
  );
}
