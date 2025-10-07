import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { Photo } from "@/types/types";
import { data_painting } from "../../../public/data/data.json";

export function usePaintings() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [itemsPerPage, setItemsPerPage] = useState("6");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState<"ascendente" | "descendente">(
    "ascendente",
  );
  const [sortBy, setSortBy] = useState<"nome" | "data">("nome");

  useEffect(() => {
    try {
      const processedPhotos: Photo[] = data_painting
        .filter((p) => p.width && p.height && p.imagePainting)
        .map((p) => ({
          id: p.id,
          src: `/assets/paintings/${p.imagePainting}`,
          width: p.width ?? 0,
          height: p.height ?? 0,
          aspectRatio: `${p.width} / ${p.height}`,
          alt: `Pintura "${p.namePainting}", ${p.datePainting}.`,
          title: p.namePainting,
          date: p.datePainting,
          originalTittle: p.originalTittle,
          local: p.local,
          materials: p.materials,
        }));

      setPhotos(processedPhotos);
    } catch (err) {
      console.error("Erro ao carregar as pinturas:", err);
      setError("Não foi possível carregar as pinturas.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filteredAndSortedPhotos = useMemo(() => {
    const filtered = photos.filter((photo) =>
      photo.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return filtered.sort((a, b) => {
      if (sortBy === "data") {
        const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
        return order === "ascendente" ? diff : -diff;
      }
      const diff = a.title.localeCompare(b.title);
      return order === "ascendente" ? diff : -diff;
    });
  }, [photos, searchTerm, order, sortBy]);

  const perPage = parseInt(itemsPerPage, 10);
  const totalPages = Math.ceil(filteredAndSortedPhotos.length / perPage);
  const currentItems = filteredAndSortedPhotos.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const imageVariants = {
    initial: { y: 0, scale: 1.015 },
    hover: {
      y: 30,
      scale: 1.25,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  } as const;

  const overlayVariants = {
    initial: { opacity: 0, scale: 1 },
    hover: {
      opacity: 1,
      scale: 1.25,
      y: 30,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  } as const;

  const titleVariants = {
    initial: { x: 300 },
    hover: { x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  } as const;

  const dateVariants = {
    initial: { x: -300 },
    hover: { x: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  } as const;

  const descriptionTitleVariants = {
    initial: { x: 0 },
    hover: { x: -400, transition: { duration: 0.3, ease: "easeInOut" } },
  } as const;

  const descriptionDateVariants = {
    initial: { x: 0 },
    hover: { x: 400, transition: { duration: 0.3, ease: "easeInOut" } },
  } as const;

  const buttonVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
  } as const;

  const MotionImage = motion.create(Image);

  return {
    photos,
    currentItems,
    totalPages,
    isLoading,
    error,
    itemsPerPage,
    currentPage,
    searchTerm,
    order,
    sortBy,
    setItemsPerPage,
    setCurrentPage,
    setSearchTerm,
    setOrder,
    setSortBy,
    imageVariants,
    overlayVariants,
    titleVariants,
    dateVariants,
    descriptionTitleVariants,
    descriptionDateVariants,
    buttonVariants,
    MotionImage,
  };
}
