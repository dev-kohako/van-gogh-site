"use client";

import { motion } from "framer-motion";
import { PaintingPalette } from "./PaintingPalette";
import { PaintingDetailsProps } from "@/types/paintingDetails.type";

export function PaintingDetails({ painting }: PaintingDetailsProps) {
  return (
    <motion.article
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      className="space-y-3 text-lg leading-relaxed"
    >
      <p className="text-lg lg:text-xl font-bold text-primary">Título original: <span className="font-light">{painting.originalTittle}</span></p>
      <p className="text-lg lg:text-xl font-bold text-primary">Data: <span className="font-light">{painting.datePainting}</span></p>
      <p className="text-lg lg:text-xl font-bold text-primary">Local: <span className="font-light">{painting.local}</span></p>
      <p className="text-lg lg:text-xl font-bold text-primary">Materiais: <span className="font-light">{painting.materials}</span></p>
      <p className="text-lg lg:text-xl font-bold text-primary">Estilo: <span className="font-light">{painting.style}</span></p>
      <p className="text-lg lg:text-xl font-bold text-primary">Dimensões: <span className="font-light">{painting.physicalDimensions}</span></p>
      <p className="text-lg lg:text-xl font-bold text-primary">Período: <span className="font-light">{painting.period}</span></p>
      <p className="text-lg lg:text-xl font-bold text-primary">Gênero: <span className="font-light">{painting.genre}</span></p>
      <p className="text-muted-foreground mt-6 text-base pt-4 border-t">{painting.description}</p>

      <PaintingPalette
        colors={[
          painting.color1,
          painting.color2,
          painting.color3,
          painting.color4,
          painting.color5,
        ].filter(Boolean)}
      />
    </motion.article>
  );
}