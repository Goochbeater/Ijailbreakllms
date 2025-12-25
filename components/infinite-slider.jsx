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
  const baseX = useMotionValue(0);
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

  useAnimationFrame((time) => {
    if (!ref.current || !containerWidth) return;
    const currentSpeed = isHovered ? speedOnHover : speed;
    const moveBy = (time * currentSpeed) * 0.01;
    const position = moveBy % contentWidth;
    baseX.set(-position);
  });

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden flex items-center"
      style={{ minHeight: '2rem', maxWidth: '100vw' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex flex-nowrap"
        style={{ x, gap: `${gap}px`, width: 'max-content' }}
      >
        {items.map((item, index) => (
          <div key={index} className="shrink-0" style={{ paddingLeft: index === 0 ? 0 : `${gap}px` }}>{item}</div>
        ))}
        {items.map((item, index) => (
          <div key={`dup1-${index}`} className="shrink-0" style={{ paddingLeft: `${gap}px` }}>{item}</div>
        ))}
        {items.map((item, index) => (
          <div key={`dup2-${index}`} className="shrink-0" style={{ paddingLeft: `${gap}px` }}>{item}</div>
        ))}
      </motion.div>
    </div>
  );
}
