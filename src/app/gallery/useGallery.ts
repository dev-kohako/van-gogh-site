import { useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import type { Photo } from "@/types/types";
import { data_painting } from "../../../public/data/data.json";

export function useGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { scrollYProgress } = useScroll();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const processedPhotos: Photo[] = data_painting
        .filter((p) => p.width && p.height && p.imagePainting)
        .map((painting) => {
          const aspectRatio = `${painting.width} / ${painting.height}`;
          return {
            id: painting.id,
            src: `/assets/paintings/${painting.imagePainting}`,
            width: painting.width ?? 0,
            height: painting.height ?? 0,
            aspectRatio,
            alt: `Pintura "${painting.namePainting}", ${painting.datePainting}.`,
            title: painting.namePainting,
            date: painting.datePainting,
            originalTittle: painting.originalTittle,
            local: painting.local,
            materials: painting.materials,
          };
        });

      setPhotos(processedPhotos);
    } catch (err) {
      console.error("Erro ao processar dados da galeria:", err);
      setError("Não foi possível carregar as imagens.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 50,
    restDelta: 0.001,
  });

  const hoverVariants = {
    initial: {
      scale: 1.001,
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
    photos,
    scaleX,
    hoverVariants,
    overlayVariants,
    titleVariants,
    isLoading,
    error,
  };
}
