"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaintingNavigationProps } from "@/types/paintingDetails.type";

export function PaintingNavigation({
  prevPainting,
  nextPainting,
}: PaintingNavigationProps) {
  return (
    <>
        {prevPainting && (
          <Button
            asChild
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/40 text-zinc-50 hover:text-zinc-100 rounded-full p-2 shadow-md h-7 w-7 sm:h-9 sm:w-9"
          >
            <Link href={`/paintingsDetails/${prevPainting.id}`}>
              <ChevronLeft strokeWidth={3} className="-ms-0.5" />
            </Link>
          </Button>
        )}
        {nextPainting && (
          <Button
            asChild
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/40 text-zinc-50 hover:text-zinc-100 rounded-full p-2 shadow-md h-7 w-7 sm:h-9 sm:w-9"
          >
            <Link href={`/paintingsDetails/${nextPainting.id}`}>
              <ChevronRight strokeWidth={3} className="-me-0.5" />
            </Link>
          </Button>
        )}
    </>
  );
}
