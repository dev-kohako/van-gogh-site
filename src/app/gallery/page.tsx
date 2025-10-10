"use client";

import LightGallery from "lightgallery/react";
import Image from "next/image";
import { motion } from "motion/react";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { useGallery } from "./useGallery";
import { data_painting } from "../../../public/data/data.json";
import { Photo } from "@/types/types";
import { toast } from "sonner";

export default function GalleryPage() {
  const { scaleX, hoverVariants, overlayVariants, titleVariants } =
    useGallery();

  let photos: Photo[] = [];

  try {
    photos = (data_painting || [])
      .filter((p) => p.width && p.height && p.imagePainting)
      .map((painting) => ({
        id: painting.id,
        src: `/assets/paintings/${painting.imagePainting}`,
        width: painting.width,
        height: painting.height,
        aspectRatio: `${painting.width} / ${painting.height}`,
        alt: `Pintura "${painting.namePainting}", datada de ${painting.datePainting}.`,
        title: painting.namePainting,
        date: painting.datePainting,
        originalTitle: painting.originalTitle,
        local: painting.local,
        materials: painting.materials,
      }));
  } catch (error) {
    console.error("Erro ao processar dados da galeria:", error);
    toast.error("Falha ao carregar a galeria. Tente novamente mais tarde.");
  }

  if (!photos.length) {
    return (
      <main className="flex items-center justify-center h-screen">
        <p className="text-lg text-muted-foreground">
          Nenhuma pintura encontrada.
        </p>
      </main>
    );
  }

  return (
    <motion.main className="px-[7.5%] my-20 md:my-16">
      <motion.div
        className="fixed top-0 left-0 right-0 z-40 h-1 origin-left bg-foreground"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <header className="mb-8 text-center">
        <motion.h1
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          id="gallery-title"
          className="text-5xl font-bold sm:text-7xl"
        >
          Galeria
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="mt-3 text-lg text-muted-foreground"
        >
          Uma coleção de pinturas para contemplar, explorar e apreciar em cada
          detalhe.
        </motion.p>
      </header>

      <motion.section
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        aria-labelledby="gallery-title"
        className="mx-auto w-full max-w-7xl md:pl-10"
      >
        <LightGallery
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          elementClassNames="gap-2 columns-2 sm:gap-4 md:columns-3 lg:columns-4 xl:columns-5"
        >
          {photos.map((photo, i) => (
            <motion.a
              key={photo.id}
              href={photo.src}
              initial="initial"
              whileHover="hover"
              data-sub-html={`
                <div class="custom-caption">
                  <h4>${photo.title}</h4>
                  <p><strong>Data:</strong> ${photo.date}</p>
                </div>
              `}
              aria-label={`Ampliar ${photo.title}`}
              className="group relative mb-3 sm:mb-5 block w-full overflow-hidden rounded-lg bg-foreground"
              style={{ aspectRatio: photo.aspectRatio }}
            >
              <motion.figure variants={hoverVariants} className="m-0">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  placeholder="blur"
                  blurDataURL="/assets/placeholder.jpg"
                  priority={i < 5}
                  loading={i < 5 ? "eager" : "lazy"}
                  sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover rounded-lg transition-transform duration-300 ease-in-out"
                />
                <motion.figcaption
                  aria-hidden="true"
                  variants={overlayVariants}
                  className="absolute inset-0 flex items-center justify-center bg-black/50"
                >
                  <motion.span
                    variants={titleVariants}
                    className="px-4 text-center text-lg font-semibold text-zinc-50"
                  >
                    {photo.title}
                  </motion.span>
                </motion.figcaption>
              </motion.figure>
            </motion.a>
          ))}
        </LightGallery>
      </motion.section>
    </motion.main>
  );
}
