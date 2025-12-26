'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';

export function InfiniteSlider({
  children,
  speed = 20,
  speedOnHover = 0,
  gap = 30
}) {
  const items = React.Children.toArray(children);
  const ref = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const baseX = useMotionValue(0);
  // We use a ref to track the absolute position to avoid closure staleness and manual integration
  const xPos = useRef(0);

  const x = useTransform(baseX, (value) => `${value}px`);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const updateContainerWidth = () => {
      if (element) setContainerWidth(element.offsetWidth);
    };
    const resizeObserver = new ResizeObserver(updateContainerWidth);
    resizeObserver.observe(element);
    updateContainerWidth();
    return () => {
      if (element) resizeObserver.unobserve(element);
    };
  }, []);

  const contentWidth = items.length * (containerWidth + gap);

  useAnimationFrame((time, delta) => {
    if (!ref.current || !containerWidth) return;

    const shouldPause = isHovered || isFocused;
    const currentSpeed = shouldPause ? speedOnHover : speed;

    // Calculate movement based on delta time (ms) to ensure smooth pause/resume
    // Previous implementation used absolute time which caused jumps on pause
    const moveBy = (delta * currentSpeed) * 0.01;

    xPos.current += moveBy;

    // Wrap around logic
    // We use the same contentWidth calculation as before to preserve layout logic
    if (contentWidth > 0 && xPos.current >= contentWidth) {
      xPos.current -= contentWidth;
    }

    baseX.set(-xPos.current);
  });

  return (
    <div
      ref={ref}
      tabIndex={0}
      role="region"
      aria-label="Partner brands slider"
      className="relative w-full overflow-hidden flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 rounded-lg"
      style={{ minHeight: '2rem', maxWidth: '100vw' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <motion.div
        className="flex flex-nowrap"
        style={{ x, gap: `${gap}px`, width: 'max-content' }}
      >
        {items.map((item, index) => (
          <div key={index} className="shrink-0" style={{ paddingLeft: index === 0 ? 0 : `${gap}px` }}>{item}</div>
        ))}
        {items.map((item, index) => (
          <div key={`dup1-${index}`} aria-hidden="true" className="shrink-0" style={{ paddingLeft: `${gap}px` }}>{item}</div>
        ))}
        {items.map((item, index) => (
          <div key={`dup2-${index}`} aria-hidden="true" className="shrink-0" style={{ paddingLeft: `${gap}px` }}>{item}</div>
        ))}
      </motion.div>
    </div>
  );
}
