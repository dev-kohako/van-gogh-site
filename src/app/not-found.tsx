"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeftCircle } from "lucide-react";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function NotFound() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`min-h-screen flex flex-col items-center justify-center px-4 text-center bg-background ${inter.className}`}
    >
      <motion.h1
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-9xl font-black bg-gradient-to-br from-blue-700 via-blue-500 to-cyan-700 text-transparent bg-clip-text"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-2 text-4 text-muted-foreground"
      >
        Página não encontrada
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-input hover:bg-muted transition"
        >
          <ArrowLeftCircle className="w-5 h-5" />
          Voltar para o início
        </Link>
      </motion.div>
    </motion.main>
  );
}
