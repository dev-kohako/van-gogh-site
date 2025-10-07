"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { PaintingCarousel } from "@/components/PaintingCarousel";
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";
import { paintings } from "../../public/data/paintings";

export default function HomePage() {
  const theme = useTheme().theme;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen font-josefin pt-5 sm:pt-10 md:pt-0 md:pl-[5%]">
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={25}
          className="w-full h-full"
          particleColor={theme === "dark" ? "#d4d4d8" : "#09090b"}
        />
      </div>

      <main className="flex flex-col items-center justify-center flex-1 w-full max-w-7xl px-4 mx-auto text-center">
        <header className="mb-4 mt-10 lg:mt-0">
          <motion.h1
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="flex flex-col text-5xl font-bold font-josefin sm:text-6xl"
          >
            Van Gogh{" "}
            <motion.span
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="text-6xl sm:text-7xl font-brush bg-gradient-to-br from-blue-700 via-blue-500 to-cyan-700 text-transparent bg-clip-text -mt-10"
            >
              Univers
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-lg z-30 leading-relaxed font-josefin max-w-2xl mx-auto"
          >
            Explore a genialidade e a emoção de um dos maiores mestres da arte
            em uma galeria digital interativa e acessível.
          </motion.p>
        </header>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          aria-label="Galeria digital de obras de Van Gogh"
          className="w-full z-40 mb-4"
        >
          <PaintingCarousel paintings={paintings} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="mb-12"
        >
          <p className="text-lg font-josefin max-w-2xl mx-auto leading-relaxed z-30">
            Arte, história e inspiração em cada pincelada. <br />
            Comece agora sua jornada pelo universo de Van Gogh.
          </p>

          <div className="flex justify-center gap-3 mt-6">
            <Link href="/paintings" passHref>
              <Button
                size="lg"
                className="text-base font-josefin"
                aria-label="Explorar obras de Van Gogh"
              >
                Explorar Obras
              </Button>
            </Link>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
