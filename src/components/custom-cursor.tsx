import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const springX = useSpring(ringX, { stiffness: 250, damping: 30, mass: 0.5 });
  const springY = useSpring(ringY, { stiffness: 250, damping: 30, mass: 0.5 });

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const selector =
      'a, button, input, textarea, select, [role="button"], [data-cursor-hover]';
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (t?.closest?.(selector)) setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (t?.closest?.(selector)) setHovering(false);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, [dotX, dotY, ringX, ringY]);

  if (!mounted || !enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1 w-1 rounded-full bg-white mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-8 w-8 rounded-full border border-white mix-blend-difference"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hovering ? 1.6 : 1, opacity: hovering ? 0.5 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </>
  );
}
