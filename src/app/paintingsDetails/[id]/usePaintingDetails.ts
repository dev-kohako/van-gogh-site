import { useState, useEffect, useMemo } from "react";
import { data_painting } from "../../../../public/data/data.json";
import { Painting } from "@/types/types";
import { toast } from "sonner";

export function usePaintingDetails(id: string) {
  const [painting, setPainting] = useState<Painting | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [show3D, setShow3D] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const found = data_painting.find((p) => String(p.id) === String(id));
      if (!found) {
        setError("Pintura não encontrada.");
        toast.error("Pintura nao encontrada.");
        return;
      }

      const processed: Painting = {
        ...found,
        imagePainting: `/assets/paintings/${found.imagePainting}`,
        alt: `Obra "${found.namePainting}" (${found.datePainting}) por Van Gogh.`,
      };
      setPainting(processed);
      setError(null);
    } catch (err) {
      console.error("Erro ao processar dados:", err);
      toast.error("Falha ao carregar a pintura.");
      setError("Não foi possível carregar esta pintura.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFullscreen(false);
        setShow3D(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { prevPainting, nextPainting } = useMemo(() => {
    if (!painting) return { prevPainting: undefined, nextPainting: undefined };
    const currentId = Number(painting.id);
    const prev = data_painting.find((p) => Number(p.id) === currentId - 1);
    const next = data_painting.find((p) => Number(p.id) === currentId + 1);
    return { prevPainting: prev, nextPainting: next };
  }, [painting]);

  return {
    painting,
    isLoading,
    error,
    prevPainting,
    nextPainting,
    show3D,
    setShow3D,
    isFullscreen,
    setIsFullscreen,
  };
}