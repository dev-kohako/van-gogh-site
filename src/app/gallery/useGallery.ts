import { useScroll, useSpring } from "motion/react";

export function useGallery() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 50,
    restDelta: 0.001,
  });

  const hoverVariants = {
    initial: {
      scale: 1.025,
    },
    hover: {
      scale: 1.075,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      scale: 0.1,
      transition: {
        duration: 0.3,
      },
    },
  } as const;

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
  } as const;

  const titleVariants = {
    initial: { y: 20 },
    hover: { y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  } as const;

  return {
    scaleX,
    hoverVariants,
    overlayVariants,
    titleVariants,
  };
}
