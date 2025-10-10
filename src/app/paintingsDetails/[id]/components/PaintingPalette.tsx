"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import copy from "copy-to-clipboard";
import { PaletteProps } from "@/types/paintingDetails.type";

export function PaintingPalette({ colors }: PaletteProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopy = (color: string) => {
    const ok = copy(color);
    if (ok) {
      setCopiedColor(color);
      toast.success(`Cor ${color.toUpperCase()} copiada com sucesso!`);
    } else {
      toast.error("Falha ao copiar a cor.");
    }
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <section
      aria-label="Paleta de cores da pintura"
      className="mt-10"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Paleta de cores
      </h3>

      <div className="grid grid-cols-5 gap-3 lg:gap-5 w-fit">
        {colors.map((color, i) => (
          <motion.button
            key={i}
            onClick={() => handleCopy(color)}
            whileHover={{
              scale: 1.15,
              rotate: 3,
              boxShadow: "0 0 20px rgba(0,0,0,0.25)",
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-border shadow-lg cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary"
            style={{ backgroundColor: color }}
            aria-label={`Copiar cor ${color}`}
          >
            <AnimatePresence>
              {copiedColor === color ? (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm rounded-full"
                >
                  <Check className="text-zinc-50 w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity rounded-full"
                >
                  <Copy className="text-zinc-50 opacity-80 w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
