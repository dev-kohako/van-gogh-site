"use client";

import React, { type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

type FocusItemProps = {
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  children: ReactNode;
};

export const FocusItem = React.memo(
  ({ index, hovered, setHovered, children }: FocusItemProps) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]",
      )}
    >
      {children}
    </div>
  ),
);

FocusItem.displayName = "FocusItem";

type FocusContainerProps = {
  children: (
    hovered: number | null,
    setHovered: React.Dispatch<React.SetStateAction<number | null>>,
  ) => ReactNode;
};

export function FocusContainer({ children }: FocusContainerProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  return <>{children(hovered, setHovered)}</>;
}
