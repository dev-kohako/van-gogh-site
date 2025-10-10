import type { Dispatch, SetStateAction } from "react";

export type Painting = {
  id: string;
  namePainting: string;
  originalTittle: string;
  datePainting: string;
  imagePainting: string;
  style: string;
  period: string;
  genre: string;
  materials: string;
  physicalDimensions: string;
  local: string;
  description: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  width: number;
  height: number;
  alt: string;
};

export interface SwiperPainting {
  src: string;
  alt: string;
}

export interface AppSidebarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface PaintingCarouselProps {
  paintings: SwiperPainting[];
}

export interface Links {
  label: string;
  href?: string;
  icon?: React.JSX.Element | React.ReactNode;
}

export interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

export type Photo = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  date: string;
  originalTittle: string;
  local: string;
  materials: string;
};