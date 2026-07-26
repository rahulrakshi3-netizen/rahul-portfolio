"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

import Image from "next/image";
import { DottedPattern } from "@/components/ui/dotted-pattern";

type Polaroid = {
  id: string;
  letter: string;
  src: string;
  rotate: number;
};

const PHOTOS: Polaroid[] = [
  { id: "a", letter: "R", src: "/R.jpeg", rotate: -8 },
  { id: "b", letter: "A", src: "/A.jpeg", rotate: 6 },
  { id: "c", letter: "H", src: "/H.jpeg", rotate: -4 },
  { id: "d", letter: "U", src: "/U.jpeg", rotate: 7 },
  { id: "e", letter: "L", src: "/L.jpeg", rotate: -6 },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function PolaroidCard({
  photo,
  index,
  isMobile,
}: {
  photo: Polaroid;
  index: number;
  isMobile: boolean;
}): ReactNode {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 220, damping: 18, mass: 0.6 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const rotate = isMobile ? 0 : photo.rotate;

  const handleMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const max = 18;
    const k = 0.25;
    mx.set(Math.max(-max, Math.min(max, dx * k)));
    my.set(Math.max(-max, Math.min(max, dy * k)));
  };

  const handleLeave = (): void => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      initial={{ opacity: 0, y: -120, filter: "blur(18px)", rotate }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotate }}
      transition={{
        duration: 0.9,
        delay: 0.05 + index * 0.08,
        ease: EASE,
      }}
      style={{
        x: tx,
        y: ty,
        rotate,
      }}
      className="relative aspect-[3/4] w-[4rem] shrink-0 overflow-hidden rounded-2xl border-4 border-neutral-300/40 bg-white p-1 sm:w-[clamp(6rem,11vw,9rem)] sm:border-6 sm:p-1.5 dark:border-white/15 dark:bg-neutral-900"
    >
      <DottedPattern className="relative h-full w-full overflow-hidden rounded-xl">
        <Image src={photo.src} alt={photo.letter} fill sizes="(max-width: 768px) 6rem, 9rem" className="object-cover" />
      </DottedPattern>
    </motion.div>
  );
}

export function PolaroidStrip(): ReactNode {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!mounted) {
    return <div aria-hidden="true" className="h-[clamp(8rem,15vw,12rem)] w-full" />;
  }

  return (
    <div className="flex w-full items-center justify-center gap-1 px-5 sm:gap-1.5 sm:px-8">
      {PHOTOS.map((photo, i) => (
        <PolaroidCard key={photo.id} photo={photo} index={i} isMobile={isMobile} />
      ))}
    </div>
  );
}
