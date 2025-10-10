"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { usePaintingDetails } from "./usePaintingDetails";
import { Painting3DViewer } from "./components/Painting3DViewer";
import { PaintingPageSkeleton } from "./components/PaintingPageSkeleton";
import { PaintingHeader } from "./components/PaintingHeader";
import { PaintingImage } from "./components/PaintingImage";
import { PaintingDetails } from "./components/PaintingDetails";
import { FullscreenImageViewer } from "./components/FullscreenImageViewer";
import { useEffect } from "react";

export default function PaintingsDetailsPage() {
  const { id } = useParams() as { id: string };
  const {
    painting,
    isLoading,
    error,
    prevPainting,
    nextPainting,
    show3D,
    setShow3D,
    isFullscreen,
    setIsFullscreen,
  } = usePaintingDetails(id);

  useEffect(() => {
    if (show3D || isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show3D, isFullscreen]);

  if (isLoading) {
    return <PaintingPageSkeleton />;
  }

  if (error || !painting) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-500">{error ?? "Erro ao carregar."}</p>
      </main>
    );
  }

  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative px-[7.5%] md:px-[5%] min-[1350px]:!px-0 my-20 md:my-14 w-full max-w-7xl flex justify-center flex-col items-center md:ml-10"
      >
        <PaintingHeader painting={painting} />

        <section
          aria-labelledby="painting-title"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start"
        >
          <PaintingImage
            prevPainting={prevPainting}
            nextPainting={nextPainting}
            painting={painting}
            onShow3D={() => setShow3D(true)}
            onOpenFullscreen={() => setIsFullscreen(true)}
          />
          <PaintingDetails painting={painting} />
        </section>
      </motion.main>

      <AnimatePresence>
        {isFullscreen && (
          <FullscreenImageViewer
            key={painting.id || painting.namePainting}
            painting={painting}
            onClose={() => setIsFullscreen(false)}
          />
        )}
        {show3D && (
          <Painting3DViewer
            imageUrl={painting.imagePainting}
            title={painting.namePainting}
            width={painting.width}
            height={painting.height}
            onClose={() => setShow3D(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
