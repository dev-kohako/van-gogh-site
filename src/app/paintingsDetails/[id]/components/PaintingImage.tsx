"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Box, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaintingImageProps } from "@/types/paintingDetails.type";
import { PaintingNavigation } from "./PaintingNavigation";

export function PaintingImage({
  painting,
  prevPainting,
  nextPainting,
  onShow3D,
  onOpenFullscreen,
}: PaintingImageProps) {
  return (
    <motion.div
      className="relative w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="relative group rounded-2xl overflow-hidden shadow-lg border border-border">
        <Image
          src={painting.imagePainting}
          alt={painting.alt}
          width={painting.width}
          height={painting.height}
          priority
          className="rounded-2xl object-cover w-full h-auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Button
          onClick={onOpenFullscreen}
          className="absolute bottom-3 right-3 z-20 !bg-transparent backdrop-blur-lg border border-border lg:opacity-0 opacity-100 lg:group-hover:opacity-100 transition-opacity"
          aria-label="Ver imagem em tela cheia"
          size="icon"
        >
          <Maximize strokeWidth={2} className="w-6 h-6 -mt-1 text-zinc-50" />
        </Button>
        <PaintingNavigation prevPainting={prevPainting} nextPainting={nextPainting} />
      </div>
      <Button
        onClick={onShow3D}
        className="mt-4 px-6 pb-1 w-full"
      >
        Visualizar em 3D <Box className="-ml-1 -mt-1" />
      </Button>
    </motion.div>
  );
}
