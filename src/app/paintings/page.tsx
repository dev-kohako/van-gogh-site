"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { FocusContainer, FocusItem } from "@/components/ui/focus-cards";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePaintings } from "./usePantings";

export default function PaintingsPage() {
  const {
    currentItems,
    currentPage,
    itemsPerPage,
    searchTerm,
    order,
    totalPages,
    sortBy,
    setCurrentPage,
    setItemsPerPage,
    setOrder,
    setSearchTerm,
    setSortBy,
    imageVariants,
    overlayVariants,
    descriptionTitleVariants,
    descriptionDateVariants,
    buttonVariants,
    titleVariants,
    dateVariants,
    MotionImage,
    isLoading,
  } = usePaintings();

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-background">
        <p
          aria-live="polite"
          className="text-lg text-muted-foreground animate-pulse"
        >
          Carregando pinturas...
        </p>
      </main>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="px-[7.5%] md:px-[5%] min-[1350px]:!px-0 my-20 md:my-14 w-full max-w-7xl mx-auto"
    >
      <header className="mb-10 md:pl-10 text-center">
        <motion.h1
          id="gallery-title"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-5xl font-bold md:text-7xl tracking-tight"
        >
          Galeria de Pinturas
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="mt-3 text-lg text-muted-foreground"
        >
          Explore as obras-primas de Van Gogh, contemplando cada traço e
          detalhe.
        </motion.p>
      </header>

      <motion.section
        aria-label="Filtros de pesquisa"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:pl-10"
      >
        <div className="flex flex-col gap-1 w-full sm:max-w-xs">
          <Label htmlFor="search">Buscar pintura</Label>
          <Input
            id="search"
            type="search"
            placeholder="Digite o nome da pintura..."
            value={searchTerm}
            onChange={(e: { target: { value: SetStateAction<string> } }) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pt-1"
          />
        </div>

        <div className="flex flex-row gap-3 sm:gap-6 sm:items-end">
          <div className="flex flex-col gap-1 w-full sm:w-24">
            <Label htmlFor="sortBy">Ordenar por</Label>
            <Select
              value={sortBy}
              onValueChange={(value: "nome" | "data") => {
                setSortBy(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger id="sortBy" className="w-full pb-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nome">Nome</SelectItem>
                <SelectItem value="data">Data</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1 w-full sm:w-34">
            <Label htmlFor="order">Ordem</Label>
            <Select
              value={order}
              onValueChange={(value: "ascendente" | "descendente") => {
                setOrder(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger id="order" className="w-full pb-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ascendente">Ascendente</SelectItem>
                <SelectItem value="descendente">Descendente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.section>

      {currentItems.length > 0 ? (
        <motion.section
          aria-labelledby="gallery-title"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto md:pl-10"
        >
          <FocusContainer>
            {(hovered, setHovered) => (
              <motion.ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none p-0">
                {currentItems.map((photo, i) => (
                  <li key={photo.id}>
                    <FocusItem
                      index={i}
                      hovered={hovered}
                      setHovered={setHovered}
                    >
                      <motion.article
                        aria-labelledby={`painting-${photo.id}`}
                        className="group relative block w-full overflow-hidden rounded-lg bg-transparent border-2 shadow-sm transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-primary focus:outline-none"
                        initial="initial"
                        whileHover="hover"
                      >
                        <motion.figure className="m-0 relative">
                          <MotionImage
                            src={photo.src}
                            alt={photo.alt}
                            width={photo.width}
                            height={photo.height}
                            priority={i < 6}
                            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                            className="h-64 w-full object-cover opacity-0 transition-opacity duration-500 ease-in-out"
                            onLoadingComplete={(img) =>
                              img.classList.remove("opacity-0")
                            }
                            variants={imageVariants}
                          />

                          <motion.figcaption
                            variants={overlayVariants}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/70"
                          >
                            <motion.span
                              id={`painting-${photo.id}`}
                              variants={titleVariants}
                              className="px-10 text-center text-lg font-semibold text-zinc-50"
                            >
                              {photo.title}
                            </motion.span>

                            <motion.p
                              variants={dateVariants}
                              className="text-sm text-muted/65 dark:text-muted-foreground"
                            >
                              {photo.date}
                            </motion.p>

                            <motion.div variants={buttonVariants}>
                              <Button
                                size="sm"
                                asChild
                                aria-label={`Ver detalhes de ${photo.title}`}
                                className="mt-2 text-sm bg-background hover:bg-background/90 dark:bg-foreground dark:hover:bg-foreground/90 text-foreground dark:text-background"
                              >
                                <Link
                                  href={`/paintings/${photo.id}`}
                                  aria-label={`Ver detalhes de ${photo.title}`}
                                >
                                  Ver detalhes
                                </Link>
                              </Button>
                            </motion.div>
                          </motion.figcaption>
                        </motion.figure>

                        <div className="px-3 py-2 text-center">
                          <motion.h2
                            variants={descriptionTitleVariants}
                            className="text-base font-medium truncate"
                          >
                            {photo.title}
                          </motion.h2>
                          <motion.p
                            variants={descriptionDateVariants}
                            className="text-sm text-muted-foreground -mb-1"
                          >
                            {photo.date}
                          </motion.p>
                        </div>
                      </motion.article>
                    </FocusItem>
                  </li>
                ))}
              </motion.ul>
            )}
          </FocusContainer>

          <footer className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row w-full">
            <div className="flex items-center gap-2">
              <Label
                htmlFor="rows-per-page"
                className="text-sm font-medium pt-0.5"
              >
                Itens por página
              </Label>
              <Select
                value={itemsPerPage}
                onValueChange={(value) => {
                  setItemsPerPage(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger
                  id="rows-per-page"
                  size="sm"
                  className="w-20 font-inter text-xs font-semibold"
                >
                  <SelectValue placeholder={itemsPerPage} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[6, 12, 18, 24].map((n) => (
                    <SelectItem key={n} value={`${n}`}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <nav
              aria-label="Paginação de pinturas"
              className="flex items-center gap-2"
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="hidden h-8 w-8 p-0 sm:flex"
              >
                <span className="sr-only">Ir para a primeira página</span>
                <ChevronsLeft />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Página anterior</span>
                <ChevronLeft />
              </Button>

              <span
                aria-live="polite"
                className="px-3 text-sm font-medium text-muted-foreground"
              >
                Página {currentPage} de {totalPages}
              </span>

              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Próxima página</span>
                <ChevronRight />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="hidden h-8 w-8 p-0 sm:flex"
              >
                <span className="sr-only">Ir para a última página</span>
                <ChevronsRight />
              </Button>
            </nav>
          </footer>
        </motion.section>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-center w-full h-140"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="h-fit pl-10 text-muted-foreground"
          >
            Nenhuma pintura encontrada.
          </motion.p>
        </motion.div>
      )}
    </motion.main>
  );
}
