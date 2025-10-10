"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { PaintingHeaderProps } from "@/types/paintingDetails.type";
import { useRouter } from "next/navigation";

export function PaintingHeader({ painting }: PaintingHeaderProps) {
  const router = useRouter();

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full mb-4 sm:mb-8 text-center md:text-left"
    >
      <motion.div whileHover={{ x: 12, transition: { duration: 0.2 } }} className="w-fit">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="flex items-center gap-1 mb-6 p-2 pt-3 -ml-2"
        >
          <Undo2 className="!w-5 !h-5 mb-1.5" />
          <span className="text-lg">Voltar</span>
        </Button>
      </motion.div>

      <h1
        id="painting-title"
        className="text-4xl md:text-7xl font-extrabold tracking-tight"
      >
        {painting.namePainting}
      </h1>
    </motion.header>
  );
}
